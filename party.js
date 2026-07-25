const Party = (() => {
  const MAX_PARTY = 8;
  const PLAYER_TTL_MS = 45_000;
  const POLL_MS = 3000;

  let ui = {};
  let blobId = null;
  let ready = false;
  let meKey = "";
  let partyId = null;
  let members = new Map();
  let incomingInvites = [];
  let lastSearch = null;
  let pollTimer = null;
  let heartbeatTimer = null;
  let busy = false;

  function api() {
    return window.YTS;
  }

  function bindElements() {
    ui = {
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
  }

  function setStatus(text) {
    if (ui.status) ui.status.textContent = text;
  }

  function normName(name) {
    return String(name || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  function playerKey(name) {
    return normName(name).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "player";
  }

  function myProfile() {
    const state = api().getState();
    return {
      channelName: state.channelName,
      nicheLabel: state.nicheLabel,
      subs: Math.floor(state.subs),
      money: Math.floor(state.money),
      day: state.day,
      partyId: partyId,
      updatedAt: Date.now(),
    };
  }

  function blobUrl(id = blobId) {
    return `https://jsonblob.com/api/jsonBlob/${id}`;
  }

  async function loadRegistryId() {
    try {
      const res = await fetch(`registry.json?ts=${Date.now()}`, { cache: "no-store" });
      if (!res.ok) throw new Error("missing registry");
      const data = await res.json();
      if (!data.blobId) throw new Error("missing blobId");
      blobId = data.blobId;
      return blobId;
    } catch {
      blobId = "019f992e-149a-73e7-aa34-b3ade1145fad";
      return blobId;
    }
  }

  async function readStore() {
    const res = await fetch(blobUrl(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (res.status === 404) {
      throw new Error("Party server expired. Refresh the GitHub page in a minute, or ask the owner to renew registry.");
    }
    if (!res.ok) throw new Error("Could not reach party server.");
    const etag = res.headers.get("ETag");
    const data = await res.json();
    return {
      etag,
      data: {
        players: data.players || {},
        invites: data.invites || {},
        parties: data.parties || {},
        updatedAt: data.updatedAt || 0,
      },
    };
  }

  async function writeStore(data, etag) {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (etag) headers["If-Match"] = etag;
    const res = await fetch(blobUrl(), {
      method: "PUT",
      headers,
      body: JSON.stringify({ ...data, updatedAt: Date.now() }),
    });
    return res.ok;
  }

  async function updateStore(mutator) {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const { data, etag } = await readStore();
      mutator(data);
      const ok = await writeStore(data, etag);
      if (ok) return data;
      await new Promise((r) => setTimeout(r, 120 + attempt * 80));
    }
    throw new Error("Party server is busy. Try again.");
  }

  function upsertSelfLocal() {
    const me = myProfile();
    if (!me.channelName) return;
    members.set(me.channelName, { ...me, online: true, isSelf: true });
  }

  function isFresh(player) {
    return player && Date.now() - (player.updatedAt || 0) < PLAYER_TTL_MS;
  }

  async function heartbeat() {
    if (!ready || !meKey || busy) return;
    busy = true;
    try {
      const profile = myProfile();
      await updateStore((data) => {
        data.players[meKey] = profile;

        // Expire stale players
        Object.keys(data.players).forEach((key) => {
          if (!isFresh(data.players[key]) && key !== meKey) {
            delete data.players[key];
          }
        });

        if (partyId) {
          data.parties[partyId] = data.parties[partyId] || {};
          data.parties[partyId][meKey] = {
            channelName: profile.channelName,
            nicheLabel: profile.nicheLabel,
            subs: profile.subs,
            money: profile.money,
            day: profile.day,
            updatedAt: profile.updatedAt,
          };
        }
      });
    } catch (error) {
      setStatus(error.message || "Party heartbeat failed.");
    } finally {
      busy = false;
    }
  }

  async function syncFromServer() {
    if (!ready || !meKey) {
      render();
      return;
    }

    try {
      const { data } = await readStore();
      const me = data.players[meKey];
      if (me?.partyId) partyId = me.partyId;

      // Invites for me
      const mine = Array.isArray(data.invites[meKey]) ? data.invites[meKey] : [];
      const freshInvites = mine.filter((invite) => Date.now() - (invite.sentAt || 0) < 120000);
      if (freshInvites.length > incomingInvites.length) {
        const newest = freshInvites[0];
        if (newest && ui.inviteModal && !ui.inviteModal.open) {
          ui.inviteText.textContent = `${newest.fromName} invited you to their party (${api().formatSubs(newest.fromSubs)} subs · ${api().formatMoney(newest.fromMoney)}).`;
          ui.inviteModal.showModal();
          api().addFeed(`${newest.fromName} sent you a party invite.`, "good");
        }
      }
      incomingInvites = freshInvites;

      // Party members
      members.clear();
      upsertSelfLocal();
      if (partyId && data.parties[partyId]) {
        Object.values(data.parties[partyId]).forEach((member) => {
          if (!member?.channelName) return;
          const online = isFresh(member) || normName(member.channelName) === normName(api().getState().channelName);
          members.set(member.channelName, {
            ...member,
            online,
            isSelf: normName(member.channelName) === normName(api().getState().channelName),
          });
        });
      }

      // Keep search result fresh if possible
      if (lastSearch?.key && data.players[lastSearch.key] && isFresh(data.players[lastSearch.key])) {
        lastSearch.profile = data.players[lastSearch.key];
        lastSearch.offline = false;
      } else if (lastSearch) {
        lastSearch.offline = true;
      }

      if (!ui.status?.textContent?.includes("busy")) {
        setStatus(`Online as “${api().getState().channelName}”. Search friends by exact channel name.`);
      }
      render();
    } catch (error) {
      setStatus(error.message || "Party sync failed.");
    }
  }

  async function searchPlayer(rawName) {
    const name = rawName.trim();
    if (!name) return;
    if (!ready) {
      setStatus("Party network is still starting…");
      return;
    }

    const key = playerKey(name);
    if (key === meKey) {
      setStatus("That's you.");
      return;
    }

    ui.searchBtn.disabled = true;
    setStatus(`Searching for “${name}”…`);
    try {
      const { data } = await readStore();
      const profile = data.players[key];
      if (!profile || !isFresh(profile)) {
        lastSearch = null;
        ui.searchResult.innerHTML = `
          <div class="biz-card">
            <h3>Not found</h3>
            <p>No online player with that exact channel name.</p>
            <p>They must have the game open on My Party / be playing right now.</p>
          </div>`;
        setStatus("Player not found or offline.");
        return;
      }

      lastSearch = { name: profile.channelName, key, profile, offline: false };
      setStatus(`Found “${profile.channelName}”.`);
      renderSearchResult();
    } catch (error) {
      setStatus(error.message || "Search failed.");
    } finally {
      ui.searchBtn.disabled = false;
    }
  }

  async function inviteSearchedPlayer() {
    if (!lastSearch?.profile || lastSearch.offline) {
      setStatus("Search for an online player first.");
      return;
    }
    if (members.size >= MAX_PARTY) {
      setStatus("Party is full (max 8).");
      return;
    }

    const targetKey = lastSearch.key;
    const me = myProfile();
    if (!partyId) partyId = `party-${meKey}-${Date.now().toString(36)}`;

    try {
      await updateStore((data) => {
        data.players[meKey] = { ...me, partyId };
        data.parties[partyId] = data.parties[partyId] || {};
        data.parties[partyId][meKey] = {
          channelName: me.channelName,
          nicheLabel: me.nicheLabel,
          subs: me.subs,
          money: me.money,
          day: me.day,
          updatedAt: me.updatedAt,
        };

        const list = Array.isArray(data.invites[targetKey]) ? data.invites[targetKey] : [];
        const invite = {
          id: `${meKey}-${Date.now()}`,
          fromKey: meKey,
          fromName: me.channelName,
          fromSubs: me.subs,
          fromMoney: me.money,
          partyId,
          sentAt: Date.now(),
        };
        data.invites[targetKey] = [invite, ...list.filter((item) => item.fromKey !== meKey)].slice(0, 10);
      });

      upsertSelfLocal();
      setStatus(`Invite sent to ${lastSearch.profile.channelName}.`);
      api().addFeed(`Party invite sent to ${lastSearch.profile.channelName}.`, "neutral");
      render();
    } catch (error) {
      setStatus(error.message || "Invite failed.");
    }
  }

  async function acceptInvite() {
    const invite = incomingInvites[0];
    if (!invite) {
      ui.inviteModal?.close();
      return;
    }

    try {
      partyId = invite.partyId;
      const me = myProfile();
      await updateStore((data) => {
        data.players[meKey] = { ...me, partyId };
        data.parties[partyId] = data.parties[partyId] || {};
        data.parties[partyId][meKey] = {
          channelName: me.channelName,
          nicheLabel: me.nicheLabel,
          subs: me.subs,
          money: me.money,
          day: me.day,
          updatedAt: Date.now(),
        };
        // Also ensure inviter stays listed
        const host = data.players[invite.fromKey];
        if (host) {
          data.parties[partyId][invite.fromKey] = {
            channelName: host.channelName,
            nicheLabel: host.nicheLabel,
            subs: host.subs,
            money: host.money,
            day: host.day,
            updatedAt: host.updatedAt,
          };
        }
        data.invites[meKey] = (data.invites[meKey] || []).filter((item) => item.id !== invite.id);
      });

      incomingInvites = incomingInvites.filter((item) => item.id !== invite.id);
      ui.inviteModal?.close();
      api().addFeed(`You joined ${invite.fromName}'s party.`, "good");
      setStatus(`Joined ${invite.fromName}'s party.`);
      await syncFromServer();
    } catch (error) {
      setStatus(error.message || "Could not accept invite.");
    }
  }

  async function declineInvite() {
    const invite = incomingInvites[0];
    if (!invite) {
      ui.inviteModal?.close();
      return;
    }
    try {
      await updateStore((data) => {
        data.invites[meKey] = (data.invites[meKey] || []).filter((item) => item.id !== invite.id);
      });
      incomingInvites = incomingInvites.filter((item) => item.id !== invite.id);
      ui.inviteModal?.close();
      api().addFeed(`You declined ${invite.fromName}'s party invite.`, "neutral");
      renderInvites();
    } catch (error) {
      setStatus(error.message || "Could not decline invite.");
    }
  }

  async function leaveParty() {
    if (!partyId) return;
    const leavingId = partyId;
    try {
      await updateStore((data) => {
        if (data.parties[leavingId]) {
          delete data.parties[leavingId][meKey];
          if (!Object.keys(data.parties[leavingId]).length) delete data.parties[leavingId];
        }
        if (data.players[meKey]) {
          data.players[meKey].partyId = null;
        }
      });
      partyId = null;
      members.clear();
      upsertSelfLocal();
      setStatus("You left the party.");
      api().addFeed("You left the party.", "neutral");
      render();
    } catch (error) {
      setStatus(error.message || "Could not leave party.");
    }
  }

  function renderSearchResult() {
    if (!ui.searchResult) return;
    if (!lastSearch?.profile) {
      if (!lastSearch) ui.searchResult.innerHTML = "";
      return;
    }

    const yts = api();
    const p = lastSearch.profile;
    const already = [...members.values()].some((m) => normName(m.channelName) === normName(p.channelName));
    ui.searchResult.innerHTML = `
      <div class="biz-card">
        <h3>${yts.escapeHtml(p.channelName)}</h3>
        <p>${yts.escapeHtml(p.nicheLabel || "Creator")} · Day ${p.day || "?"}</p>
        <div class="biz-stat-row">
          <span>${yts.formatSubs(p.subs)} subs</span>
          <span>${yts.formatMoney(p.money)}</span>
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
    const yts = api();
    if (!incomingInvites.length) {
      ui.invites.innerHTML = `<div class="biz-card"><p>No invites right now.</p></div>`;
      return;
    }

    ui.invites.innerHTML = incomingInvites
      .map((invite, index) => `
        <div class="biz-card">
          <h3>${yts.escapeHtml(invite.fromName)}</h3>
          <p>wants you in their party</p>
          <div class="biz-stat-row">
            <span>${yts.formatSubs(invite.fromSubs)} subs</span>
            <span>${yts.formatMoney(invite.fromMoney)}</span>
          </div>
          <div class="biz-actions">
            <button type="button" class="btn btn-primary" data-party="accept-invite" data-index="${index}">Accept</button>
            <button type="button" class="btn btn-ghost" data-party="decline-invite" data-index="${index}">Decline</button>
          </div>
        </div>`)
      .join("");
  }

  function renderTable() {
    if (!ui.tableBody) return;
    const yts = api();
    upsertSelfLocal();

    const rows = [...members.values()]
      .filter((row) => row.channelName)
      .sort((a, b) => {
        if (a.isSelf) return -1;
        if (b.isSelf) return 1;
        return (b.subs || 0) - (a.subs || 0);
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
      ui.tableBody.innerHTML = `<tr class="is-self"><td colspan="5">Your channel will show up here after launch.</td></tr>`;
      return;
    }

    ui.tableBody.innerHTML = rows
      .map((member) => {
        const status = member.isSelf ? "You" : member.online ? "Online" : "Away";
        return `
          <tr class="${member.isSelf ? "is-self" : ""}">
            <td>${yts.escapeHtml(member.channelName)}</td>
            <td>${yts.escapeHtml(member.nicheLabel || "—")}</td>
            <td>${yts.formatSubs(member.subs || 0)}</td>
            <td>${yts.formatMoney(member.money || 0)}</td>
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
      console.error(error);
      setStatus("Party UI hit a snag. Try refreshing.");
    }
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
      if (index > 0 && index < incomingInvites.length) {
        const [picked] = incomingInvites.splice(index, 1);
        if (picked) incomingInvites.unshift(picked);
      }
      if (btn.dataset.party === "accept-invite") acceptInvite();
      if (btn.dataset.party === "decline-invite") declineInvite();
    });

    ui.leaveBtn?.addEventListener("click", leaveParty);
    ui.inviteAccept?.addEventListener("click", acceptInvite);
    ui.inviteDecline?.addEventListener("click", declineInvite);
  }

  async function startNetworking() {
    const state = api().getState();
    if (!state.channelName) return;

    meKey = playerKey(state.channelName);
    partyId = null;
    members.clear();
    incomingInvites = [];
    lastSearch = null;
    upsertSelfLocal();
    render();
    setStatus("Connecting party network…");

    try {
      await loadRegistryId();
      // Ensure our player row exists
      await updateStore((data) => {
        data.players[meKey] = myProfile();
      });
      ready = true;
      setStatus(`Online as “${state.channelName}”. Friends can search your exact channel name.`);
      api().addFeed("Party network online. Friends can find your channel name.", "good");

      clearInterval(heartbeatTimer);
      clearInterval(pollTimer);
      heartbeatTimer = setInterval(heartbeat, POLL_MS);
      pollTimer = setInterval(syncFromServer, POLL_MS);
      await syncFromServer();
    } catch (error) {
      ready = false;
      setStatus(error.message || "Party network failed to start.");
      api().addFeed("Party network failed. You can still play solo.", "bad");
      render();
    }
  }

  function init() {
    bindElements();
    bindUi();
    render();
  }

  return {
    init,
    start: startNetworking,
    render,
    broadcastStats: () => {
      heartbeat();
    },
  };
})();

window.Party = Party;
if (window.YTS) Party.init();
