const Party = (() => {
  const MAX_PARTY = 8;

  const ui = {
    page: document.getElementById("page-party"),
    status: document.getElementById("party-status"),
    searchForm: document.getElementById("party-search-form"),
    searchInput: document.getElementById("party-search-input"),
    searchBtn: document.getElementById("party-search-btn"),
    searchResult: document.getElementById("party-search-result"),
    invites: document.getElementById("party-invites"),
    tableBody: document.getElementById("party-table-body"),
    tableHint: document.getElementById("party-table-hint"),
    leaveBtn: document.getElementById("party-leave-btn"),
    inviteModal: document.getElementById("party-invite-modal"),
    inviteText: document.getElementById("party-invite-text"),
    inviteAccept: document.getElementById("party-invite-accept"),
    inviteDecline: document.getElementById("party-invite-decline"),
  };

  let peer = null;
  let ready = false;
  let connections = new Map(); // peerId -> DataConnection
  let members = new Map(); // channelName -> member
  let incomingInvites = []; // { from, profile, conn }
  let activeInvite = null;
  let lastSearch = null;
  let statsTimer = null;

  function api() {
    return window.YTS;
  }

  function toPeerId(channelName) {
    const slug = String(channelName || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 36);
    return `ysim-${slug || "player"}`;
  }

  function setStatus(text) {
    if (ui.status) ui.status.textContent = text;
  }

  function myProfile() {
    const state = api().getState();
    return {
      channelName: state.channelName,
      nicheLabel: state.nicheLabel,
      subs: Math.floor(state.subs),
      money: Math.floor(state.money),
      day: state.day,
      peerId: peer?.id || toPeerId(state.channelName),
    };
  }

  function upsertSelf() {
    const me = myProfile();
    members.set(me.channelName, { ...me, online: true, isSelf: true });
  }

  function send(conn, payload) {
    if (!conn || !conn.open) return;
    try {
      conn.send(payload);
    } catch {
      /* ignore */
    }
  }

  function broadcast(payload, exceptPeerId = null) {
    connections.forEach((conn, peerId) => {
      if (peerId === exceptPeerId) return;
      send(conn, payload);
    });
  }

  function rosterPayload() {
    return {
      type: "party-sync",
      members: [...members.values()].map(({ channelName, nicheLabel, subs, money, day, peerId, online }) => ({
        channelName,
        nicheLabel,
        subs,
        money,
        day,
        peerId,
        online: Boolean(online),
      })),
    };
  }

  function mergeMember(profile, online = true) {
    if (!profile?.channelName) return;
    const prev = members.get(profile.channelName) || {};
    members.set(profile.channelName, {
      ...prev,
      ...profile,
      online,
      isSelf: profile.channelName === api().getState().channelName,
    });
  }

  function ensureSelfInParty() {
    upsertSelf();
    render();
  }

  function rememberConn(conn) {
    if (!conn?.peer) return;
    connections.set(conn.peer, conn);
    if (conn._ytsBound) return;
    conn._ytsBound = true;
    conn.on("data", (data) => onData(conn, data));
    conn.on("close", () => onConnClose(conn));
    conn.on("error", () => onConnClose(conn));
  }

  function onConnClose(conn) {
    connections.delete(conn.peer);
    for (const [name, member] of members) {
      if (member.peerId === conn.peer && !member.isSelf) {
        member.online = false;
        members.set(name, member);
      }
    }
    incomingInvites = incomingInvites.filter((invite) => invite.conn !== conn);
    if (lastSearch?.conn === conn) {
      lastSearch = { ...lastSearch, offline: true };
    }
    render();
  }

  function onData(conn, data) {
    if (!data || typeof data !== "object") return;

    switch (data.type) {
      case "profile-request":
        send(conn, { type: "profile-response", profile: myProfile() });
        break;

      case "profile-response":
        if (lastSearch && lastSearch.peerId === conn.peer) {
          lastSearch = {
            ...lastSearch,
            profile: data.profile,
            conn,
            offline: false,
          };
          renderSearchResult();
        }
        break;

      case "party-invite":
        handleIncomingInvite(conn, data);
        break;

      case "party-invite-response":
        handleInviteResponse(conn, data);
        break;

      case "party-sync":
        if (Array.isArray(data.members)) {
          data.members.forEach((member) => mergeMember(member, member.online !== false));
          upsertSelf();
          render();
          api().addFeed("Party roster updated.", "neutral");
        }
        break;

      case "party-stats":
        if (data.profile) {
          mergeMember(data.profile, true);
          renderTable();
        }
        break;

      case "party-leave":
        if (data.channelName && data.channelName !== api().getState().channelName) {
          members.delete(data.channelName);
          api().addFeed(`${data.channelName} left the party.`, "neutral");
          render();
        }
        break;

      default:
        break;
    }
  }

  function handleIncomingInvite(conn, data) {
    const profile = data.fromProfile;
    if (!profile?.channelName) return;
    if (profile.channelName === api().getState().channelName) return;

    incomingInvites = incomingInvites.filter((invite) => invite.from !== profile.channelName);
    const invite = { from: profile.channelName, profile, conn };
    incomingInvites.unshift(invite);
    activeInvite = invite;

    ui.inviteText.textContent = `${profile.channelName} invited you to their party (${api().formatSubs(profile.subs)} subs · ${api().formatMoney(profile.money)}).`;
    if (!ui.inviteModal.open) ui.inviteModal.showModal();
    api().addFeed(`${profile.channelName} sent you a party invite.`, "good");
    renderInvites();
  }

  function handleInviteResponse(conn, data) {
    if (!data.accepted) {
      api().addFeed(`${data.profile?.channelName || "Someone"} declined your party invite.`, "neutral");
      setStatus("Invite declined.");
      return;
    }

    mergeMember(data.profile, true);
    upsertSelf();
    rememberConn(conn);
    broadcast(rosterPayload());
    send(conn, rosterPayload());
    api().addFeed(`${data.profile.channelName} joined your party!`, "good");
    setStatus(`${data.profile.channelName} joined the party.`);
    render();
  }

  function acceptInvite() {
    const invite = activeInvite || incomingInvites[0];
    if (!invite) {
      ui.inviteModal.close();
      return;
    }

    if (members.size >= MAX_PARTY) {
      setStatus("Party is full.");
      send(invite.conn, { type: "party-invite-response", accepted: false, profile: myProfile() });
      ui.inviteModal.close();
      return;
    }

    rememberConn(invite.conn);
    mergeMember(invite.profile, true);
    upsertSelf();
    send(invite.conn, { type: "party-invite-response", accepted: true, profile: myProfile() });
    send(invite.conn, rosterPayload());
    broadcast(rosterPayload(), invite.conn.peer);

    incomingInvites = incomingInvites.filter((item) => item !== invite);
    activeInvite = null;
    ui.inviteModal.close();
    api().addFeed(`You joined ${invite.from}'s party.`, "good");
    setStatus(`You're in a party with ${invite.from}.`);
    render();
  }

  function declineInvite() {
    const invite = activeInvite || incomingInvites[0];
    if (invite) {
      send(invite.conn, { type: "party-invite-response", accepted: false, profile: myProfile() });
      incomingInvites = incomingInvites.filter((item) => item !== invite);
      api().addFeed(`You declined ${invite.from}'s party invite.`, "neutral");
    }
    activeInvite = null;
    ui.inviteModal.close();
    renderInvites();
  }

  async function connectToPeer(peerId) {
    if (!peer || !ready) throw new Error("Party network is not ready yet.");
    if (peerId === peer.id) throw new Error("That's your own channel.");

    const existing = connections.get(peerId);
    if (existing?.open) return existing;

    return new Promise((resolve, reject) => {
      const conn = peer.connect(peerId, { reliable: true });
      let settled = false;

      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        try {
          conn.close();
        } catch {
          /* ignore */
        }
        reject(new Error("Player not found or offline."));
      }, 6000);

      conn.on("open", () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        rememberConn(conn);
        resolve(conn);
      });

      conn.on("error", () => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        reject(new Error("Could not connect."));
      });
    });
  }

  async function searchPlayer(rawName) {
    const name = rawName.trim();
    if (!name) return;
    if (!ready) {
      setStatus("Still connecting to party network…");
      return;
    }

    const selfName = api().getState().channelName;
    if (name.toLowerCase() === selfName.toLowerCase()) {
      setStatus("That's you.");
      return;
    }

    const peerId = toPeerId(name);
    ui.searchBtn.disabled = true;
    setStatus(`Searching for “${name}”…`);
    ui.searchResult.innerHTML = `<div class="biz-card"><p>Looking for ${api().escapeHtml(name)}…</p></div>`;

    try {
      const conn = await connectToPeer(peerId);
      lastSearch = { name, peerId, conn, profile: null, offline: false };
      send(conn, { type: "profile-request" });
      setStatus(`Found a player online as “${name}”.`);
      // profile-response will fill the card; show a temporary card meanwhile
      renderSearchResult(true);
    } catch (error) {
      lastSearch = null;
      ui.searchResult.innerHTML = `
        <div class="biz-card">
          <h3>Not found</h3>
          <p>${api().escapeHtml(error.message || "Player not found or offline.")}</p>
          <p>They need the game open with that exact channel name.</p>
        </div>`;
      setStatus(error.message || "Search failed.");
    } finally {
      ui.searchBtn.disabled = false;
    }
  }

  async function inviteSearchedPlayer() {
    if (!lastSearch?.conn || !lastSearch.profile) {
      setStatus("Search for a player first.");
      return;
    }
    if (members.size >= MAX_PARTY) {
      setStatus("Party is full (max 8).");
      return;
    }
    if (members.has(lastSearch.profile.channelName)) {
      setStatus("They're already in your party.");
      return;
    }

    upsertSelf();
    send(lastSearch.conn, {
      type: "party-invite",
      fromProfile: myProfile(),
      partyId: peer.id,
    });
    setStatus(`Invite sent to ${lastSearch.profile.channelName}.`);
    api().addFeed(`Party invite sent to ${lastSearch.profile.channelName}.`, "neutral");
  }

  function leaveParty() {
    const me = api().getState().channelName;
    broadcast({ type: "party-leave", channelName: me });
    connections.forEach((conn) => {
      try {
        conn.close();
      } catch {
        /* ignore */
      }
    });
    connections.clear();
    members.clear();
    upsertSelf();
    setStatus("You left the party.");
    api().addFeed("You left the party.", "neutral");
    render();
  }

  function renderSearchResult(waiting = false) {
    if (!lastSearch) {
      ui.searchResult.innerHTML = "";
      return;
    }

    if (waiting && !lastSearch.profile) {
      ui.searchResult.innerHTML = `<div class="biz-card"><p>Connected — loading channel stats…</p></div>`;
      return;
    }

    if (!lastSearch.profile) return;

    const p = lastSearch.profile;
    const already = members.has(p.channelName);
    ui.searchResult.innerHTML = `
      <div class="biz-card">
        <h3>${api().escapeHtml(p.channelName)}</h3>
        <p>${api().escapeHtml(p.nicheLabel || "Creator")} · Day ${p.day || "?"}</p>
        <div class="biz-stat-row">
          <span>${api().formatSubs(p.subs)} subs</span>
          <span>${api().formatMoney(p.money)}</span>
          <span>${lastSearch.offline ? "Offline" : "Online"}</span>
        </div>
        <div class="biz-actions">
          <button type="button" class="btn btn-primary" data-party="invite" ${already || lastSearch.offline ? "disabled" : ""}>
            ${already ? "Already in party" : "Send invite"}
          </button>
        </div>
      </div>`;
  }

  function renderInvites() {
    if (!ui.invites) return;
    if (!incomingInvites.length) {
      ui.invites.innerHTML = `<div class="biz-card"><p>No invites right now.</p></div>`;
      return;
    }

    const yts = api();
    ui.invites.innerHTML = incomingInvites
      .map((invite, index) => {
        const p = invite.profile;
        return `
          <div class="biz-card">
            <h3>${yts.escapeHtml(p.channelName)}</h3>
            <p>wants you in their party</p>
            <div class="biz-stat-row">
              <span>${yts.formatSubs(p.subs)} subs</span>
              <span>${yts.formatMoney(p.money)}</span>
            </div>
            <div class="biz-actions">
              <button type="button" class="btn btn-primary" data-party="accept-invite" data-index="${index}">Accept</button>
              <button type="button" class="btn btn-ghost" data-party="decline-invite" data-index="${index}">Decline</button>
            </div>
          </div>`;
      })
      .join("");
  }

  function renderTable() {
    if (!ui.tableBody) return;
    const yts = api();
    if (!yts?.getState) {
      ui.tableBody.innerHTML = `<tr class="is-self"><td colspan="5">Loading party…</td></tr>`;
      return;
    }

    upsertSelf();
    const rows = [...members.values()]
      .filter((row) => row.channelName)
      .sort((a, b) => {
        if (a.isSelf) return -1;
        if (b.isSelf) return 1;
        return b.subs - a.subs;
      });

    const others = rows.filter((row) => !row.isSelf).length;
    if (ui.tableHint) {
      ui.tableHint.textContent =
        others === 0
          ? "Invite friends to track subs and cash together."
          : `${others + 1} creators in your party.`;
    }
    ui.leaveBtn?.classList.toggle("hidden", others === 0);

    if (!rows.length) {
      ui.tableBody.innerHTML = `<tr class="is-self"><td colspan="5">Your channel will show up here.</td></tr>`;
      return;
    }

    ui.tableBody.innerHTML = rows
      .map((member) => {
        const status = member.isSelf ? "You" : member.online ? "Online" : "Away";
        return `
          <tr class="${member.isSelf ? "is-self" : ""}">
            <td>${yts.escapeHtml(member.channelName)}</td>
            <td>${yts.escapeHtml(member.nicheLabel || "—")}</td>
            <td>${yts.formatSubs(member.subs)}</td>
            <td>${yts.formatMoney(member.money)}</td>
            <td><span class="party-online ${member.online || member.isSelf ? "on" : "off"}">${status}</span></td>
          </tr>`;
      })
      .join("");
  }

  function render() {
    try {
      renderSearchResult();
      renderInvites();
      renderTable();
    } catch (error) {
      console.error("Party UI render failed", error);
      setStatus("Party UI hit a snag, but you can still search.");
    }
  }

  function broadcastStats() {
    if (!ready || connections.size === 0) {
      renderTable();
      return;
    }
    upsertSelf();
    broadcast({ type: "party-stats", profile: myProfile() });
    renderTable();
  }

  function startNetworking() {
    if (typeof Peer === "undefined") {
      setStatus("Party network failed to load. Check your connection and refresh.");
      return;
    }

    const state = api().getState();
    if (!state.channelName) return;

    if (peer) {
      try {
        peer.destroy();
      } catch {
        /* ignore */
      }
      peer = null;
    }

    ready = false;
    connections.clear();
    members.clear();
    incomingInvites = [];
    lastSearch = null;
    upsertSelf();
    render();

    const peerId = toPeerId(state.channelName);
    setStatus("Connecting party network…");

    peer = new Peer(peerId, {
      debug: 0,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
      },
    });

    peer.on("open", (id) => {
      ready = true;
      setStatus(`Online as “${state.channelName}” — friends can search your exact channel name.`);
      upsertSelf();
      render();
      api().addFeed("Party network online. Friends can find your channel name.", "good");
    });

    peer.on("connection", (conn) => {
      rememberConn(conn);
    });

    peer.on("disconnected", () => {
      ready = false;
      setStatus("Disconnected — trying to reconnect…");
      try {
        peer.reconnect();
      } catch {
        /* ignore */
      }
    });

    peer.on("error", (err) => {
      const type = err?.type || "";
      if (type === "unavailable-id") {
        setStatus("That channel name is already online. Pick a different name and relaunch.");
        api().addFeed("Party online name taken — choose another channel name.", "bad");
        return;
      }
      if (type === "peer-unavailable") {
        setStatus("Player not found or offline.");
        return;
      }
      setStatus("Party network error. You can still play solo.");
    });

    clearInterval(statsTimer);
    statsTimer = setInterval(broadcastStats, 3000);
  }

  function bindUi() {
    ui.searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      searchPlayer(ui.searchInput.value);
    });

    ui.searchResult?.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-party='invite']");
      if (!btn || btn.disabled) return;
      inviteSearchedPlayer();
    });

    ui.invites?.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-party]");
      if (!btn) return;
      const index = Number(btn.dataset.index || 0);
      const invite = incomingInvites[index];
      if (!invite) return;
      activeInvite = invite;
      if (btn.dataset.party === "accept-invite") acceptInvite();
      if (btn.dataset.party === "decline-invite") declineInvite();
    });

    ui.leaveBtn?.addEventListener("click", leaveParty);
    ui.inviteAccept?.addEventListener("click", acceptInvite);
    ui.inviteDecline?.addEventListener("click", declineInvite);
  }

  function init() {
    bindUi();
    render();
  }

  return {
    init,
    start: startNetworking,
    render,
    broadcastStats,
    ensureSelfInParty,
  };
})();

window.Party = Party;
if (window.YTS) Party.init();
