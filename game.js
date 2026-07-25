const NICHES = [
  {
    id: "gaming",
    name: "Gaming",
    blurb: "High spikes, wild variance",
    virality: 1.35,
    cpm: 0.9,
    loyalty: 0.85,
    topics: ["Boss fight rage", "Speedrun attempt", "New release first look", "Ranked climb"],
    brands: ["RageFuel Energy", "ClickClack Keyboards", "PixelBite Snacks", "NovaHeadset"],
  },
  {
    id: "vlogs",
    name: "Vlogs",
    blurb: "Steady growth, personal vibe",
    virality: 0.95,
    cpm: 0.8,
    loyalty: 1.2,
    topics: ["A day in my life", "Moving update", "Honest talk", "City walk"],
    brands: ["WanderPass", "CozyBeans Coffee", "Daylight Apparel", "SoftFocus Cams"],
  },
  {
    id: "tech",
    name: "Tech",
    blurb: "Slower, stronger money",
    virality: 0.85,
    cpm: 1.45,
    loyalty: 1.05,
    topics: ["Gadget review", "Setup tour", "Is it worth it?", "Hidden tip"],
    brands: ["CircuitBox", "CloudNest VPN", "AlloyStand", "ByteBrew"],
  },
  {
    id: "cooking",
    name: "Cooking",
    blurb: "Comfort views, solid retention",
    virality: 1.0,
    cpm: 1.05,
    loyalty: 1.15,
    topics: ["15-minute dinner", "Baking fail", "Street food remake", "Budget meals"],
    brands: ["PanForge", "Herb&Heat", "MealMap Kits", "CrispOil"],
  },
  {
    id: "comedy",
    name: "Comedy",
    blurb: "Viral potential, rep risk",
    virality: 1.45,
    cpm: 0.85,
    loyalty: 0.75,
    topics: ["Skit series", "Roast video", "POV sketch", "Unhinged rant"],
    brands: ["LOLSocks", "SnackAttack", "JokeJuice", "MemeMattress"],
  },
  {
    id: "education",
    name: "Education",
    blurb: "Trust builds, money follows",
    virality: 0.8,
    cpm: 1.35,
    loyalty: 1.25,
    topics: ["Explain like I'm 5", "Myth busted", "Study method", "Deep dive"],
    brands: ["SkillLadder", "NoteNest", "BrightPath Tutors", "FocusFoam"],
  },
  {
    id: "music",
    name: "Music",
    blurb: "Slow start, loyal fans",
    virality: 0.9,
    cpm: 0.95,
    loyalty: 1.4,
    topics: ["Original track", "Cover song", "Studio session", "Beat breakdown"],
    brands: ["ToneForge", "Earloom Headphones", "StageLite", "LoopLab"],
  },
  {
    id: "fitness",
    name: "Fitness",
    blurb: "Consistency pays off",
    virality: 0.95,
    cpm: 1.15,
    loyalty: 1.1,
    topics: ["Home workout", "Form check", "Transformation tips", "Gym fails"],
    brands: ["IronHour", "PulseProtein", "GripBand", "RecoverWell"],
  },
  {
    id: "custom",
    name: "Something else",
    blurb: "Type your own niche",
    virality: 1.05,
    cpm: 1.0,
    loyalty: 1.0,
    topics: ["First video in my niche", "What nobody tells you", "My weird hobby", "Beginner guide"],
    brands: ["NicheWorks", "Everyday Co.", "FanFirst", "MakerMint"],
  },
];

const EFFORT = {
  low: { energy: 20, quality: 0.8, label: "quick upload" },
  medium: { energy: 35, quality: 1.15, label: "solid video" },
  high: { energy: 55, quality: 1.6, label: "all-nighter" },
};

const THUMB = {
  honest: { click: 0.85, trust: 0.08, label: "honest thumbnail" },
  bold: { click: 1.1, trust: 0.0, label: "bold thumbnail" },
  clickbait: { click: 1.4, trust: -0.12, label: "clickbait thumbnail" },
};

const MERCH_LEVELS = [
  null,
  {
    name: "Starter drop",
    cost: 80,
    minSubs: 250,
    dailyRate: 0.007,
    blurb: "A simple tee and sticker pack. Small daily sales.",
  },
  {
    name: "Fan store",
    cost: 220,
    minSubs: 1200,
    dailyRate: 0.012,
    blurb: "Hoodies, mugs, and a proper storefront.",
  },
  {
    name: "Merch empire",
    cost: 650,
    minSubs: 4000,
    dailyRate: 0.02,
    blurb: "Limited drops and stronger margins.",
  },
];

const RIVAL_NAMES = [
  "UploadOrDie",
  "NicheNinja",
  "ClickCottage",
  "SubSeekers",
  "TrendRabbit",
  "FrameFam",
  "AlgoDreams",
  "MidnightRender",
  "ThumbnailTiger",
  "CouchCreator",
];

const LIVE_UNLOCK_SUBS = 50;
const LIVE_ENERGY_COST = 30;
const LIVE_DURATION_MS = 55_000;

const CHAT_USERS = [
  "luna_bytes",
  "snacklord",
  "pixelpete",
  "mayo_wave",
  "chatgoblin",
  "firstyy",
  "noobqueen",
  "riftkid",
  "tea_and_code",
  "submarine_sam",
  "glowworm",
  "crispy_ctrl",
  "nightowl_99",
  "beanmachine",
  "echoecho",
  "toastprotocol",
  "vibecheck",
  "mod_mira",
  "clamchowder",
  "yeetfarmer",
];

const CHAT_NICHE_LINES = {
  gaming: [
    "clip that moment from the stream",
    "what's your rank while we're live",
    "this live gameplay vibe is clean",
    "GG from chat",
  ],
  vlogs: [
    "live vlog energy is different",
    "where are you streaming from rn",
    "day-in-the-life but make it live",
  ],
  tech: [
    "what's the webcam you're using on stream",
    "lighting looks solid on camera",
    "show the setup while we're live",
  ],
  cooking: [
    "are you cooking on stream or just chatting",
    "I'm hungry watching this live",
    "season the stream chat",
  ],
  comedy: [
    "this live bit is killing me",
    "chat is the real comedy show",
    "clip the face cam reaction",
  ],
  education: [
    "live lesson hits harder",
    "pause the stream I need notes",
    "explain that part again for live chat",
  ],
  music: [
    "sing something live please",
    "stream audio sounding good",
    "drop a live snippet",
  ],
  fitness: [
    "form check on camera",
    "are we working out live or talking",
    "stream hype got me moving",
  ],
  custom: [
    "never seen a live in this niche like this",
    "niche stream supremacy",
    "keep the live going",
  ],
};

const state = createFreshState();

const els = {
  createScreen: document.getElementById("screen-create"),
  gameScreen: document.getElementById("screen-game"),
  createForm: document.getElementById("create-form"),
  nicheGrid: document.getElementById("niche-grid"),
  customWrap: document.getElementById("custom-niche-wrap"),
  customNiche: document.getElementById("custom-niche"),
  channelName: document.getElementById("channel-name"),
  feed: document.getElementById("feed"),
  actionHint: document.getElementById("action-hint"),
  actionSponsor: document.getElementById("action-sponsor"),
  actionSponsorMeta: document.getElementById("action-sponsor-meta"),
  videoModal: document.getElementById("video-modal"),
  videoForm: document.getElementById("video-form"),
  videoTitle: document.getElementById("video-title"),
  videoEffort: document.getElementById("video-effort"),
  videoThumb: document.getElementById("video-thumb"),
  dayModal: document.getElementById("day-modal"),
  dayModalNum: document.getElementById("day-modal-num"),
  daySummary: document.getElementById("day-summary"),
  dayContinue: document.getElementById("day-continue"),
  pageStudio: document.getElementById("page-studio"),
  pageVideos: document.getElementById("page-videos"),
  pageBusiness: document.getElementById("page-business"),
  videosList: document.getElementById("videos-list"),
  videosHint: document.getElementById("videos-hint"),
  videosTotals: document.getElementById("videos-totals"),
  sponsorHint: document.getElementById("sponsor-hint"),
  sponsorPanel: document.getElementById("sponsor-panel"),
  merchHint: document.getElementById("merch-hint"),
  merchPanel: document.getElementById("merch-panel"),
  rivalsPanel: document.getElementById("rivals-panel"),
  actionLive: document.getElementById("action-live"),
  actionLiveMeta: document.getElementById("action-live-meta"),
  streamModal: document.getElementById("stream-modal"),
  streamVideo: document.getElementById("stream-video"),
  streamPlaceholder: document.getElementById("stream-placeholder"),
  streamViewers: document.getElementById("stream-viewers"),
  streamTimer: document.getElementById("stream-timer"),
  streamAlert: document.getElementById("stream-alert"),
  streamChat: document.getElementById("stream-chat"),
  streamChatSub: document.getElementById("stream-chat-sub"),
  streamStatSubs: document.getElementById("stream-stat-subs"),
  streamStatDonos: document.getElementById("stream-stat-donos"),
  streamStatPeak: document.getElementById("stream-stat-peak"),
  endStreamBtn: document.getElementById("end-stream-btn"),
  streamSummaryModal: document.getElementById("stream-summary-modal"),
  streamSummary: document.getElementById("stream-summary"),
  streamSummaryContinue: document.getElementById("stream-summary-continue"),
  streamReplayWrap: document.getElementById("stream-replay-wrap"),
  streamReplay: document.getElementById("stream-replay"),
  navButtons: document.querySelectorAll(".nav-btn"),
  stats: {
    channelName: document.getElementById("stat-channel-name"),
    niche: document.getElementById("stat-niche"),
    day: document.getElementById("stat-day"),
    subs: document.getElementById("stat-subs"),
    money: document.getElementById("stat-money"),
    energy: document.getElementById("stat-energy"),
    rep: document.getElementById("stat-rep"),
  },
};

let pendingSponsoredUpload = false;

const liveSession = {
  active: false,
  starting: false,
  cameraStream: null,
  recorder: null,
  chunks: [],
  recordingUrl: null,
  timers: [],
  startedAt: 0,
  viewers: 0,
  peakViewers: 0,
  subsGained: 0,
  donations: 0,
  messages: 0,
};

function createFreshState() {
  return {
    channelName: "",
    nicheId: "",
    nicheLabel: "",
    day: 1,
    subs: 0,
    money: 120,
    energy: 100,
    maxEnergy: 100,
    reputation: 65,
    skill: 1,
    videosToday: 0,
    restedToday: false,
    practicedToday: false,
    streamedToday: false,
    pendingUploads: [],
    videos: [],
    history: [],
    currentPage: "studio",
    sponsorOffer: null,
    activeSponsor: null,
    sponsorCooldown: 0,
    merchLevel: 0,
    rivals: [],
    rivalPressure: 1,
    _monetizedNote: false,
    _merchUnlockedNote: false,
    _liveUnlockedNote: false,
  };
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatMoney(n) {
  return `$${Math.floor(n).toLocaleString()}`;
}

function formatSubs(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${(n / 1000).toFixed(1)}K`;
  return Math.floor(n).toLocaleString();
}

function formatViews(n) {
  return formatSubs(n);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getNiche() {
  return NICHES.find((n) => n.id === state.nicheId) || NICHES[0];
}


function createRivals() {
  const names = [...RIVAL_NAMES].sort(() => Math.random() - 0.5).slice(0, 3);
  return names.map((name, i) => ({
    id: `rival-${i}-${name}`,
    name,
    subs: Math.floor(15 + i * 25 + rand(0, 20)),
    aggression: rand(0.55, 0.9),
    note: "Scouting the same niche.",
  }));
}

function assignState(data) {
  const fresh = createFreshState();
  Object.keys(fresh).forEach((key) => {
    state[key] = data[key] !== undefined ? data[key] : fresh[key];
  });
}






function rebuildFeed() {
  els.feed.innerHTML = "";
  [...state.history].reverse().forEach((entry) => {
    const item = document.createElement("li");
    item.className = `feed-item ${entry.tone || ""}`.trim();
    item.innerHTML = `<span class="feed-time">Day ${entry.day}</span><p>${escapeHtml(entry.text)}</p>`;
    els.feed.prepend(item);
  });
}

function enterGame() {
  els.createScreen.classList.remove("active");
  els.gameScreen.classList.add("active");
  showPage(state.currentPage || "studio");
  rebuildFeed();
  updateStats();
  renderBusinessPage();
}


function showPage(page) {
  state.currentPage = page;
  els.pageStudio.classList.toggle("active", page === "studio");
  els.pageVideos.classList.toggle("active", page === "videos");
  els.pageBusiness.classList.toggle("active", page === "business");
  els.navButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.page === page);
  });
  if (page === "videos") renderVideosPage();
  if (page === "business") renderBusinessPage();
}

function thumbClass(video) {
  if (video.isLivestream) return "live-vod";
  if (video.status === "pending") return "pending";
  if (video.tone === "good") return "viral";
  if (video.tone === "bad") return "flop";
  return "";
}

function renderVideosPage() {
  const live = state.videos.filter((v) => v.status === "live");
  const totalViews = live.reduce((sum, v) => sum + v.views, 0);
  const totalSubs = live.reduce((sum, v) => sum + v.subGain, 0);
  const totalEarn = live.reduce((sum, v) => sum + v.earnings, 0);

  els.videosHint.textContent =
    state.videos.length === 0
      ? "No uploads yet. Make a video in the Studio to start your library."
      : `${state.videos.length} upload${state.videos.length === 1 ? "" : "s"} on the channel.`;

  els.videosTotals.innerHTML =
    state.videos.length === 0
      ? ""
      : `
      <span>${live.length} live</span>
      <span>${formatViews(totalViews)} views</span>
      <span>+${formatSubs(totalSubs)} subs</span>
      <span>${formatMoney(totalEarn)} earned</span>
    `;

  if (state.videos.length === 0) {
    els.videosList.innerHTML = `
      <div class="videos-empty">
        <strong>Empty library</strong>
        Your published videos will show up here with views, subs, and earnings.
      </div>`;
    return;
  }

  els.videosList.innerHTML = state.videos
    .map((video) => {
      const pills = [];
      if (video.status === "pending") pills.push(`<span class="status-pill pending">Processing</span>`);
      else pills.push(`<span class="status-pill live">Live</span>`);
      if (video.sponsored) pills.push(`<span class="status-pill sponsored">Sponsored</span>`);
      if (video.isLivestream) pills.push(`<span class="status-pill sponsored">Live</span>`);

      const stats =
        video.status === "pending"
          ? `
          <div class="video-stat"><span>Views</span><strong>—</strong></div>
          <div class="video-stat"><span>Subs</span><strong>—</strong></div>
          <div class="video-stat"><span>Earned</span><strong>—</strong></div>`
          : `
          <div class="video-stat"><span>${video.isLivestream ? "Peak" : "Views"}</span><strong>${formatViews(video.views)}</strong></div>
          <div class="video-stat"><span>Subs</span><strong>+${formatSubs(video.subGain)}</strong></div>
          <div class="video-stat"><span>Earned</span><strong>${formatMoney(video.earnings)}</strong></div>`;

      const note =
        video.status === "pending"
          ? "Results drop when you end the day."
          : video.eventText || `${video.effortLabel} · ${video.thumbLabel}`;

      const initial = escapeHtml((video.title.trim()[0] || "V").toUpperCase());
      const replay =
        video.recordingUrl
          ? `<video class="stream-replay" src="${video.recordingUrl}" controls playsinline></video>`
          : "";

      return `
        <article class="video-row">
          <div class="video-thumb ${thumbClass(video)}" aria-hidden="true">${initial}</div>
          <div class="video-body">
            <div class="video-title-row">
              <h3>${escapeHtml(video.title)}${pills.join("")}</h3>
              <span class="video-day">Day ${video.day}</span>
            </div>
            <p class="video-meta">${escapeHtml(note)}</p>
            <div class="video-stats">${stats}</div>
            ${replay}
          </div>
        </article>`;
    })
    .join("");
}

function estimatedMerchDaily() {
  const level = MERCH_LEVELS[state.merchLevel];
  if (!level) return 0;
  const niche = getNiche();
  return Math.max(1, state.subs * level.dailyRate * niche.loyalty * (0.7 + state.reputation / 200));
}

function renderBusinessPage() {
  renderSponsors();
  renderMerch();
  renderRivals();
}

function renderSponsors() {
  if (state.subs < 200) {
    els.sponsorHint.textContent = "Sponsors usually show up around 200 subscribers.";
  } else if (state.activeSponsor) {
    els.sponsorHint.textContent = `Active deal with ${state.activeSponsor.brand}.`;
  } else {
    els.sponsorHint.textContent = "Accept deals for cash — sponsored uploads pay more, but can cost trust.";
  }

  let html = "";

  if (state.activeSponsor) {
    html += `
      <div class="biz-card">
        <h3>${escapeHtml(state.activeSponsor.brand)}</h3>
        <p>Active for ${state.activeSponsor.daysLeft} more day${state.activeSponsor.daysLeft === 1 ? "" : "s"}.</p>
        <div class="biz-stat-row">
          <span>+${formatMoney(state.activeSponsor.videoBonus)} / sponsored upload</span>
          <span>${state.activeSponsor.repPerVideo} rep / upload</span>
        </div>
        <p>Use <strong>Sponsored upload</strong> in Studio while the deal lasts.</p>
      </div>`;
  }

  if (state.sponsorOffer) {
    const offer = state.sponsorOffer;
    html += `
      <div class="biz-card">
        <h3>${escapeHtml(offer.brand)}</h3>
        <p>${escapeHtml(offer.pitch)}</p>
        <div class="biz-stat-row">
          <span>Upfront ${formatMoney(offer.upfront)}</span>
          <span>+${formatMoney(offer.videoBonus)} / video</span>
          <span>${offer.days} days</span>
        </div>
        <div class="biz-actions">
          <button type="button" class="btn btn-primary" data-biz="accept-sponsor">Accept deal</button>
          <button type="button" class="btn btn-ghost" data-biz="decline-sponsor">Pass</button>
        </div>
      </div>`;
  } else if (!state.activeSponsor) {
    html += `
      <div class="biz-card">
        <h3>No offer right now</h3>
        <p>${
          state.sponsorCooldown > 0
            ? `Brands are quiet for about ${state.sponsorCooldown} more day${state.sponsorCooldown === 1 ? "" : "s"}.`
            : state.subs < 200
              ? "Keep growing — brands notice consistency."
              : "Keep uploading. A new offer can land after any day."
        }</p>
      </div>`;
  }

  els.sponsorPanel.innerHTML = html;
}

function renderMerch() {
  const level = state.merchLevel;
  const current = MERCH_LEVELS[level];
  const next = MERCH_LEVELS[level + 1];

  if (!current) {
    els.merchHint.textContent = "Launch a store once you have fans who actually want your name on a shirt.";
  } else {
    els.merchHint.textContent = `${current.name} is live · ~${formatMoney(estimatedMerchDaily())}/day`;
  }

  let html = "";

  if (current) {
    html += `
      <div class="biz-card">
        <h3>${escapeHtml(current.name)}</h3>
        <p>${escapeHtml(current.blurb)}</p>
        <div class="biz-stat-row">
          <span>Level ${level}</span>
          <span>~${formatMoney(estimatedMerchDaily())} / day</span>
        </div>
      </div>`;
  }

  if (next) {
    const canBuy = state.money >= next.cost && state.subs >= next.minSubs;
    html += `
      <div class="biz-card">
        <h3>${level === 0 ? "Launch merch" : "Upgrade merch"}: ${escapeHtml(next.name)}</h3>
        <p>${escapeHtml(next.blurb)}</p>
        <div class="biz-stat-row">
          <span>${formatMoney(next.cost)}</span>
          <span>${formatSubs(next.minSubs)}+ subs</span>
        </div>
        <div class="biz-actions">
          <button type="button" class="btn btn-primary" data-biz="buy-merch" ${canBuy ? "" : "disabled"}>
            ${level === 0 ? "Open store" : "Upgrade"}
          </button>
        </div>
      </div>`;
  } else {
    html += `
      <div class="biz-card">
        <h3>Maxed out</h3>
        <p>Your merch line is as big as it gets for now.</p>
      </div>`;
  }

  els.merchPanel.innerHTML = html;
}

function renderRivals() {
  if (!state.rivals.length) {
    els.rivalsPanel.innerHTML = `<div class="biz-card"><p>No rivals yet.</p></div>`;
    return;
  }

  const sorted = [...state.rivals].sort((a, b) => b.subs - a.subs);

  els.rivalsPanel.innerHTML = sorted
    .map((rival) => {
      const ahead = rival.subs > state.subs;
      return `
        <article class="rival-card ${ahead ? "leading" : "behind"}">
          <h3>${escapeHtml(rival.name)}</h3>
          <div class="rival-subs">${formatSubs(rival.subs)} subs</div>
          <p class="rival-note">${escapeHtml(rival.note)}</p>
          <p class="rival-note">${ahead ? "Currently ahead of you." : "You're ahead — for now."}</p>
        </article>`;
    })
    .join("");
}

function renderNiches() {
  els.nicheGrid.innerHTML = NICHES.map(
    (niche, i) => `
    <label class="niche-option">
      <input type="radio" name="niche" value="${niche.id}" ${i === 0 ? "checked" : ""} />
      <span class="niche-card">
        <strong>${niche.name}</strong>
        <small>${niche.blurb}</small>
      </span>
    </label>`
  ).join("");

  els.nicheGrid.addEventListener("change", () => {
    const selected = els.nicheGrid.querySelector('input[name="niche"]:checked')?.value;
    const isCustom = selected === "custom";
    els.customWrap.classList.toggle("hidden", !isCustom);
    els.customNiche.required = isCustom;
    if (isCustom) els.customNiche.focus();
  });
}

function addFeed(text, tone = "") {
  const item = document.createElement("li");
  item.className = `feed-item ${tone}`.trim();
  item.innerHTML = `<span class="feed-time">Day ${state.day}</span><p>${escapeHtml(text)}</p>`;
  els.feed.prepend(item);
  state.history.unshift({ day: state.day, text, tone });
  if (state.history.length > 60) state.history.length = 60;
}

function updateStats() {
  els.stats.channelName.textContent = state.channelName;
  els.stats.niche.textContent = state.nicheLabel;
  els.stats.day.textContent = String(state.day);
  els.stats.subs.textContent = formatSubs(state.subs);
  els.stats.money.textContent = formatMoney(state.money);
  els.stats.energy.textContent = `${Math.round(state.energy)}/${state.maxEnergy}`;
  els.stats.rep.textContent = String(Math.round(state.reputation));
  updateActionAvailability();
  if (state.currentPage === "videos") renderVideosPage();
  if (state.currentPage === "business") renderBusinessPage();
}

function updateActionAvailability() {
  const buttons = document.querySelectorAll(".action-btn");
  const hasSponsor = Boolean(state.activeSponsor);
  const liveUnlocked = state.subs >= LIVE_UNLOCK_SUBS;

  buttons.forEach((btn) => {
    const action = btn.dataset.action;
    if (action === "video") {
      btn.disabled = state.energy < EFFORT.low.energy;
    } else if (action === "rest") {
      btn.disabled = state.restedToday;
    } else if (action === "practice") {
      btn.disabled = state.practicedToday || state.energy < 20;
    } else if (action === "sponsor-video") {
      btn.disabled = !hasSponsor || state.energy < EFFORT.low.energy;
    } else if (action === "livestream") {
      btn.disabled =
        !liveUnlocked || state.streamedToday || state.energy < LIVE_ENERGY_COST || liveSession.active;
    } else {
      btn.disabled = false;
    }
  });

  if (hasSponsor) {
    els.actionSponsorMeta.textContent = `${state.activeSponsor.brand} · +${formatMoney(state.activeSponsor.videoBonus)}`;
  } else {
    els.actionSponsorMeta.textContent = "No active deal";
  }

  if (!liveUnlocked) {
    els.actionLiveMeta.textContent = `Unlocks at ${LIVE_UNLOCK_SUBS} subs`;
  } else if (state.streamedToday) {
    els.actionLiveMeta.textContent = "Already streamed today";
  } else {
    els.actionLiveMeta.textContent = `Webcam + live chat · −${LIVE_ENERGY_COST} energy`;
  }

  if (state.energy < EFFORT.low.energy) {
    els.actionHint.textContent = "You're wiped. Rest, or end the day and recover overnight.";
  } else if (!liveUnlocked && state.subs >= 30) {
    els.actionHint.textContent = `Livestreams unlock at ${LIVE_UNLOCK_SUBS} subs. Almost there.`;
  } else if (state.videosToday > 0) {
    els.actionHint.textContent = "You already uploaded today. Another video is riskier — or end the day.";
  } else if (hasSponsor) {
    els.actionHint.textContent = `Sponsor deal active with ${state.activeSponsor.brand}.`;
  } else {
    els.actionHint.textContent = "You have enough energy for one solid video — or rest and recover.";
  }
}

function clearLiveTimers() {
  liveSession.timers.forEach((id) => clearTimeout(id));
  liveSession.timers = [];
}

function scheduleLive(fn, delay) {
  const id = setTimeout(fn, delay);
  liveSession.timers.push(id);
  return id;
}

function formatStreamTime(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const mins = Math.floor(total / 60);
  const secs = String(total % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function updateLiveHud() {
  els.streamViewers.textContent = `${formatSubs(liveSession.viewers)} watching`;
  els.streamStatSubs.textContent = `+${liveSession.subsGained} subs`;
  els.streamStatDonos.textContent = `${formatMoney(liveSession.donations)} donated`;
  els.streamStatPeak.textContent = `Peak ${formatSubs(liveSession.peakViewers)}`;
  els.streamTimer.textContent = formatStreamTime(Date.now() - liveSession.startedAt);
}

function showStreamAlert(text, kind = "dono") {
  els.streamAlert.textContent = text;
  els.streamAlert.classList.toggle("sub-alert", kind === "sub");
  els.streamAlert.classList.add("show");
  scheduleLive(() => els.streamAlert.classList.remove("show"), 2600);
}

function appendChat(html, type = "") {
  const line = document.createElement("div");
  line.className = `chat-line ${type}`.trim();
  line.innerHTML = html;
  els.streamChat.appendChild(line);
  els.streamChat.scrollTop = els.streamChat.scrollHeight;
  liveSession.messages += 1;
  while (els.streamChat.children.length > 80) {
    els.streamChat.removeChild(els.streamChat.firstChild);
  }
}

function chatColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash + name.charCodeAt(i) * 17) % 360;
  return `hsl(${hash} 70% 68%)`;
}

function liveChatLines() {
  const channel = state.channelName || "this channel";
  const niche = state.nicheLabel || "this niche";
  const viewers = Math.max(1, liveSession.viewers);
  const peak = Math.max(viewers, liveSession.peakViewers);
  const elapsed = Math.max(1, Math.floor((Date.now() - liveSession.startedAt) / 1000));
  const minutes = Math.max(1, Math.floor(elapsed / 60));
  const cameraOn = Boolean(liveSession.cameraStream);
  const nicheLines = CHAT_NICHE_LINES[state.nicheId] || CHAT_NICHE_LINES.custom;

  const lines = [
    `who else is watching ${channel} live rn`,
    `been waiting for a ${niche} livestream`,
    `this live already feels better than the VODs`,
    `chat moving because the stream is good`,
    `how long are we live for`,
    `don't end the stream yet`,
    `live ${channel} supremacy`,
    `the livestream grind is real`,
    `someone clip this part of the stream`,
    `welcome to everyone just joining the live`,
    `stream title pulled me in`,
    `late to the livestream but I'm here`,
    ...nicheLines,
  ];

  if (cameraOn) {
    lines.push(
      "facecam looks clean today",
      "your lighting on stream is actually good",
      "camera angle is perfect for this live",
      "you blinked. chat noticed.",
      "smile at the camera for the lurkers",
      "webcam quality went up fr",
      "is the camera mirrored or is chat confused",
      "background looks stream-ready"
    );
  } else {
    lines.push(
      "no cam? mysterious streamer arc",
      "chat-only live hits different",
      "turn the camera on if you can",
      "imagining your reaction with no facecam"
    );
  }

  if (viewers < 8) {
    lines.push(
      "early stream gang check in",
      "small live but cozy",
      "chat is tiny so hi everyone"
    );
  } else if (viewers < 40) {
    lines.push(
      `okay ${viewers} watching this live is solid`,
      "stream is picking up",
      "more people hopping into the livestream"
    );
  } else {
    lines.push(
      `chat it's busy in here with ${viewers} viewers`,
      "livestream is popping off",
      `peak was ${peak} — stream growing`,
      "raid energy without the raid"
    );
  }

  if (liveSession.subsGained > 0) {
    lines.push(
      "subs in chat during the live let's go",
      "stream converting viewers into subs",
      `${liveSession.subsGained} new subs from this livestream already`
    );
  }

  if (liveSession.donations > 0) {
    lines.push(
      "donos on a livestream feel so real",
      `chat donated $${Math.floor(liveSession.donations)} already???`,
      "support the stream if you can"
    );
  }

  if (elapsed < 20) {
    lines.push(
      "stream just started say hi",
      "first wave of the livestream",
      "audio check for the live?"
    );
  } else if (elapsed > 35) {
    lines.push(
      `still live after ${minutes} min, respect`,
      "this stream segment is flying by",
      "end screen when? not yet please",
      "one more topic before the live ends"
    );
  }

  if (state.reputation >= 70) {
    lines.push("rep in this niche is deserved, great live");
  }
  if (state.subs < 100) {
    lines.push("supporting small livestreamers hits different");
  }

  return lines;
}

function pushChatMessage() {
  if (!liveSession.active) return;
  const user = pick(CHAT_USERS);
  const text = pick(liveChatLines());
  appendChat(
    `<span class="chat-user" style="color:${chatColor(user)}">${escapeHtml(user)}</span>${escapeHtml(text)}`
  );
}

function pushSubEvent() {
  if (!liveSession.active) return;
  const user = pick(CHAT_USERS);
  const gained = Math.max(1, Math.floor(rand(1, 3 + state.subs / 400)));
  liveSession.subsGained += gained;
  const subLines = [
    "just subscribed because this livestream is good",
    "subbed live — don't end yet",
    `subscribed during the ${state.nicheLabel} stream`,
    "was lurking, subbing to the live now",
  ];
  appendChat(
    `<span class="chat-user" style="color:${chatColor(user)}">${escapeHtml(user)}</span> ${escapeHtml(pick(subLines))}`,
    "chat-sub"
  );
  showStreamAlert(`${user} subscribed! +${gained}`, "sub");
  updateLiveHud();
}

function pushDonationEvent() {
  if (!liveSession.active) return;
  const user = pick(CHAT_USERS);
  const amount = pick([1, 2, 5, 5, 10, 10, 15, 20, 25, 50]);
  const notes = [
    "for the livestream",
    "keep the stream going",
    "loved that part live",
    "facecam tax",
    "buy snacks for stream",
    "chat made me do it",
    `support ${state.channelName}'s live`,
    "don't burn out on stream",
  ];
  liveSession.donations += amount;
  appendChat(
    `<span class="chat-user" style="color:${chatColor(user)}">${escapeHtml(user)}</span> donated ${formatMoney(amount)}: "${escapeHtml(pick(notes))}"`,
    "chat-dono"
  );
  showStreamAlert(`${user} donated ${formatMoney(amount)}!`, "dono");
  updateLiveHud();
}

function tickViewers() {
  if (!liveSession.active) return;
  const base = 4 + Math.floor(state.subs * 0.08 + state.reputation * 0.15);
  const wave = Math.sin(Date.now() / 1800) * base * 0.18;
  const spike = Math.random() < 0.12 ? rand(3, 18) : 0;
  liveSession.viewers = Math.max(1, Math.floor(base + wave + spike + liveSession.subsGained * 0.8));
  liveSession.peakViewers = Math.max(liveSession.peakViewers, liveSession.viewers);
  updateLiveHud();
}

function scheduleNextChatEvent() {
  if (!liveSession.active) return;
  const delay = rand(450, 1400);
  scheduleLive(() => {
    if (!liveSession.active) return;
    const roll = Math.random();
    if (roll < 0.14) pushDonationEvent();
    else if (roll < 0.3) pushSubEvent();
    else if (roll < 0.38) {
      const systemLines = [
        `Welcome to ${state.channelName}'s livestream!`,
        "People are joining the live right now.",
        "Thanks for watching the stream — say something in chat!",
        liveSession.cameraStream
          ? "Facecam is live for the lurkers."
          : "Streaming without camera — chat is carrying.",
      ];
      appendChat(pick(systemLines), "chat-system");
    } else {
      pushChatMessage();
      if (Math.random() < 0.45) pushChatMessage();
    }
    scheduleNextChatEvent();
  }, delay);
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    els.streamPlaceholder.classList.remove("hidden");
    els.streamVideo.classList.add("hidden");
    return null;
  }

  const videoConstraint = {
    video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
  };

  try {
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ ...videoConstraint, audio: true });
    } catch {
      stream = await navigator.mediaDevices.getUserMedia({ ...videoConstraint, audio: false });
    }
    els.streamVideo.srcObject = stream;
    els.streamVideo.classList.remove("hidden");
    els.streamPlaceholder.classList.add("hidden");
    await els.streamVideo.play().catch(() => {});
    return stream;
  } catch {
    els.streamPlaceholder.classList.remove("hidden");
    els.streamVideo.classList.add("hidden");
    els.streamVideo.srcObject = null;
    return null;
  }
}

function startRecording(stream) {
  liveSession.chunks = [];
  liveSession.recordingUrl = null;
  liveSession.recorder = null;
  if (!stream || typeof MediaRecorder === "undefined") return;

  const mime = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
    ? "video/webm;codecs=vp9,opus"
    : MediaRecorder.isTypeSupported("video/webm")
      ? "video/webm"
      : "";

  try {
    const recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
    recorder.ondataavailable = (event) => {
      if (event.data?.size) liveSession.chunks.push(event.data);
    };
    recorder.start(1000);
    liveSession.recorder = recorder;
  } catch {
    liveSession.recorder = null;
  }
}

function stopCameraAndRecorder() {
  return new Promise((resolve) => {
    const finish = () => {
      if (liveSession.cameraStream) {
        liveSession.cameraStream.getTracks().forEach((track) => track.stop());
        liveSession.cameraStream = null;
      }
      els.streamVideo.srcObject = null;
      resolve();
    };

    if (liveSession.recorder && liveSession.recorder.state !== "inactive") {
      liveSession.recorder.onstop = () => {
        if (liveSession.chunks.length) {
          const blob = new Blob(liveSession.chunks, { type: liveSession.recorder.mimeType || "video/webm" });
          liveSession.recordingUrl = URL.createObjectURL(blob);
        }
        finish();
      };
      liveSession.recorder.stop();
    } else {
      finish();
    }
  });
}

async function beginLivestream() {
  if (liveSession.active || liveSession.starting) return;
  if (state.subs < LIVE_UNLOCK_SUBS) {
    addFeed(`Livestreams unlock at ${LIVE_UNLOCK_SUBS} subscribers.`, "neutral");
    return;
  }
  if (state.streamedToday) {
    addFeed("You already went live today. Rest the voice and try tomorrow.", "neutral");
    return;
  }
  if (state.energy < LIVE_ENERGY_COST) {
    addFeed("Not enough energy to go live.", "bad");
    return;
  }

  liveSession.starting = true;
  state.energy -= LIVE_ENERGY_COST;
  state.streamedToday = true;
  updateStats();

  liveSession.active = true;
  liveSession.startedAt = Date.now();
  liveSession.viewers = Math.max(3, Math.floor(state.subs * 0.05));
  liveSession.peakViewers = liveSession.viewers;
  liveSession.subsGained = 0;
  liveSession.donations = 0;
  liveSession.messages = 0;
  liveSession.chunks = [];
  liveSession.recordingUrl = null;
  clearLiveTimers();

  els.streamChat.innerHTML = "";
  els.streamChatSub.textContent = `${state.channelName} is live`;
  els.streamAlert.classList.remove("show");
  updateLiveHud();
  els.streamModal.showModal();

  appendChat("Stream starting… say hi in chat!", "chat-system");
  liveSession.cameraStream = await startCamera();
  if (liveSession.cameraStream) {
    startRecording(liveSession.cameraStream);
    appendChat("Camera is live. You're on air.", "chat-system");
  } else {
    appendChat("Camera unavailable — streaming with chat only.", "chat-system");
  }

  scheduleNextChatEvent();
  const viewerTick = () => {
    if (!liveSession.active) return;
    tickViewers();
    scheduleLive(viewerTick, 900);
  };
  viewerTick();

  const timerTick = () => {
    if (!liveSession.active) return;
    updateLiveHud();
    if (Date.now() - liveSession.startedAt >= LIVE_DURATION_MS) {
      endLivestream();
      return;
    }
    scheduleLive(timerTick, 250);
  };
  timerTick();

  liveSession.starting = false;
  addFeed("You're live! Chat is filling up.", "good");
}

async function endLivestream() {
  if (!liveSession.active) return;
  liveSession.active = false;
  clearLiveTimers();
  els.endStreamBtn.disabled = true;

  await stopCameraAndRecorder();
  els.streamModal.close();
  els.endStreamBtn.disabled = false;

  const durationMin = Math.max(1, Math.round((Date.now() - liveSession.startedAt) / 60000));
  const bonusRep = clamp(liveSession.peakViewers / 40, 0.5, 4);
  state.subs += liveSession.subsGained;
  state.money += liveSession.donations;
  state.reputation = clamp(state.reputation + bonusRep, 5, 100);
  state.skill += 0.08;

  const vod = {
    id: `live-${Date.now()}`,
    title: `LIVE: ${state.nicheLabel} stream`,
    day: state.day,
    status: "live",
    views: liveSession.peakViewers,
    subGain: liveSession.subsGained,
    earnings: liveSession.donations,
    retention: 0.7,
    repDelta: bonusRep,
    effortLabel: "livestream",
    thumbLabel: "webcam",
    energyCost: LIVE_ENERGY_COST,
    eventText: `Peak ${formatSubs(liveSession.peakViewers)} viewers · ${liveSession.messages} chat messages`,
    tone: liveSession.donations >= 20 || liveSession.subsGained >= 5 ? "good" : "neutral",
    sponsored: false,
    isLivestream: true,
    recordingUrl: liveSession.recordingUrl,
  };
  state.videos.unshift(vod);

  els.streamSummary.innerHTML = [
    `Peak viewers: ${formatSubs(liveSession.peakViewers)}`,
    `New subscribers: +${liveSession.subsGained}`,
    `Donations: ${formatMoney(liveSession.donations)}`,
    `Chat messages: ${liveSession.messages}`,
    `Approx. length: ${durationMin} min segment`,
  ]
    .map((line) => `<li>${escapeHtml(line)}</li>`)
    .join("");

  if (liveSession.recordingUrl) {
    els.streamReplayWrap.classList.remove("hidden");
    els.streamReplay.src = liveSession.recordingUrl;
  } else {
    els.streamReplayWrap.classList.add("hidden");
    els.streamReplay.removeAttribute("src");
  }

  els.streamSummaryModal.showModal();
  addFeed(
    `Stream ended — peak ${formatSubs(liveSession.peakViewers)} viewers, +${liveSession.subsGained} subs, ${formatMoney(liveSession.donations)} donated.`,
    vod.tone
  );
  updateStats();
}

function closeStreamSummary() {
  els.streamSummaryModal.close();
  els.streamReplay.pause?.();
}

function simulateVideo(title, effortKey, thumbKey, sponsored = false) {
  const niche = getNiche();
  const effort = EFFORT[effortKey];
  const thumb = THUMB[thumbKey];

  const baseAudience = 90 + state.subs * 0.55 + state.skill * 28;
  const quality = effort.quality * (0.95 + state.skill * 0.1);
  const luck = rand(0.75, 2.1) * niche.virality;
  const repFactor = 0.85 + state.reputation / 120;
  const multiUploadPenalty = state.videosToday > 0 ? 0.75 : 1;
  const rivalFactor = clamp(state.rivalPressure, 0.85, 1.2);

  let views = Math.floor(
    baseAudience * quality * thumb.click * luck * repFactor * multiUploadPenalty * rivalFactor
  );

  const roll = Math.random();
  let eventText = null;
  let tone = "neutral";

  if (roll > 0.9) {
    views = Math.floor(views * rand(3.2, 6.5));
    eventText = "It caught fire overnight.";
    tone = "good";
  } else if (roll < 0.04) {
    views = Math.floor(views * rand(0.35, 0.55));
    eventText = "The algorithm basically ignored it.";
    tone = "bad";
  }

  if (rivalFactor < 0.9 && !eventText) {
    eventText = "A rival ate some of the niche traffic today.";
    tone = "bad";
  } else if (rivalFactor > 1.05 && !eventText) {
    eventText = "You outpaced the rivals in recommendations.";
    tone = "good";
  }

  const retention = clamp(0.35 + quality * 0.18 * niche.loyalty + rand(-0.08, 0.08), 0.2, 0.95);
  let subGain = Math.max(
    1,
    Math.floor(views * retention * 0.06 * niche.loyalty * (0.85 + state.reputation / 160))
  );

  const monetized = state.subs >= 500;
  let earnings = monetized ? (views / 1000) * (3.4 * niche.cpm) * retention : views * 0.004;
  let repDelta = thumb.trust * 10 + (quality - 1) * 3 + (views > baseAudience * 2 ? 2.5 : 0.4);

  if (sponsored && state.activeSponsor) {
    earnings += state.activeSponsor.videoBonus;
    repDelta += state.activeSponsor.repPerVideo;
    subGain = Math.floor(subGain * 0.98);
    if (!eventText) {
      eventText = `Includes a ${state.activeSponsor.brand} sponsorship.`;
      tone = state.activeSponsor.repPerVideo < 0 ? "neutral" : "good";
    }
  }

  return {
    id: `vid-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
    title,
    day: state.day,
    status: "pending",
    views,
    subGain,
    earnings,
    retention,
    repDelta,
    effortLabel: effort.label,
    thumbLabel: thumb.label,
    energyCost: effort.energy,
    eventText,
    tone,
    sponsored,
    sponsorBrand: sponsored && state.activeSponsor ? state.activeSponsor.brand : null,
    topicHint: pick(niche.topics),
  };
}

function startChannel(event) {
  event.preventDefault();

  const name = els.channelName.value.trim();
  const nicheId = els.nicheGrid.querySelector('input[name="niche"]:checked')?.value;
  const niche = NICHES.find((n) => n.id === nicheId);

  if (!name || !niche) return;

  let nicheLabel = niche.name;
  if (niche.id === "custom") {
    const custom = els.customNiche.value.trim();
    if (!custom) {
      els.customNiche.focus();
      return;
    }
    nicheLabel = custom;
  }

  assignState(createFreshState());
  state.channelName = name;
  state.nicheId = niche.id;
  state.nicheLabel = nicheLabel;
  state.rivals = createRivals();
  pendingSponsoredUpload = false;

  els.feed.innerHTML = "";
  enterGame();

  addFeed(
    `${state.channelName} is live — a ${state.nicheLabel} channel with big dreams and a cheap mic.`,
    "good"
  );
  addFeed(`Three rival channels are already hunting the same audience. Stay sharp.`);
  addFeed(`Tip: your first videos will be rough. Consistency beats perfection early on.`);
  updateStats();
  els.channelName.blur();
}

function openVideoModal(sponsored = false) {
  if (state.energy < EFFORT.low.energy) return;
  if (sponsored && !state.activeSponsor) return;

  pendingSponsoredUpload = sponsored;
  const niche = getNiche();
  const base = pick(niche.topics);
  els.videoTitle.value =
    sponsored && state.activeSponsor ? `${base} (sponsored by ${state.activeSponsor.brand})` : base;
  els.videoEffort.value = state.energy >= EFFORT.high.energy ? "medium" : "low";
  els.videoThumb.value = "bold";
  els.videoModal.showModal();
  els.videoTitle.focus();
  els.videoTitle.select();
}

function handleVideoForm(event) {
  event.preventDefault();
  const submitter = event.submitter;
  const value = submitter?.value || "cancel";

  if (value === "cancel") {
    pendingSponsoredUpload = false;
    els.videoModal.close();
    return;
  }

  const effortKey = els.videoEffort.value;
  const energyCost = EFFORT[effortKey].energy;

  if (state.energy < energyCost) {
    addFeed(`Not enough energy for that ${EFFORT[effortKey].label}. Try a quicker upload.`, "bad");
    pendingSponsoredUpload = false;
    els.videoModal.close();
    updateStats();
    return;
  }

  const sponsored = pendingSponsoredUpload && Boolean(state.activeSponsor);
  const title = els.videoTitle.value.trim() || pick(getNiche().topics);
  const result = simulateVideo(title, effortKey, els.videoThumb.value, sponsored);

  state.energy -= result.energyCost;
  state.videosToday += 1;
  state.pendingUploads.push(result);
  state.videos.unshift(result);

  addFeed(
    `Uploaded “${title}” (${result.effortLabel}, ${result.thumbLabel}${sponsored ? ", sponsored" : ""}). Results drop in overnight.`,
    "neutral"
  );

  pendingSponsoredUpload = false;
  els.videoModal.close();
  updateStats();
}

function rest() {
  if (state.restedToday) return;
  state.restedToday = true;
  state.energy = clamp(state.energy + 55, 0, state.maxEnergy);
  addFeed("You rested, answered a few comments, and got some energy back.", "good");
  updateStats();
}

function practice() {
  if (state.practicedToday || state.energy < 20) return;
  state.practicedToday = true;
  state.energy -= 20;
  state.skill += 0.15;
  addFeed("Practice session done. Your editing feels a little sharper.", "good");
  updateStats();
}

function acceptSponsor() {
  const offer = state.sponsorOffer;
  if (!offer) return;

  state.money += offer.upfront;
  state.activeSponsor = {
    brand: offer.brand,
    daysLeft: offer.days,
    videoBonus: offer.videoBonus,
    repPerVideo: offer.repPerVideo,
  };
  state.sponsorOffer = null;
  state.sponsorCooldown = 2;

  addFeed(
    `Deal signed with ${offer.brand}. Upfront ${formatMoney(offer.upfront)} landed in your account.`,
    "good"
  );
  updateStats();
  renderBusinessPage();
}

function declineSponsor() {
  if (!state.sponsorOffer) return;
  const brand = state.sponsorOffer.brand;
  state.sponsorOffer = null;
  state.sponsorCooldown = 2;
  addFeed(`You passed on ${brand}. Maybe another brand later.`, "neutral");
  renderBusinessPage();
}

function buyMerch() {
  const next = MERCH_LEVELS[state.merchLevel + 1];
  if (!next) return;
  if (state.money < next.cost || state.subs < next.minSubs) return;

  state.money -= next.cost;
  state.merchLevel += 1;
  addFeed(
    state.merchLevel === 1
      ? `Merch store is open — ${next.name}. Fans can finally buy something.`
      : `Merch upgraded to ${next.name}.`,
    "good"
  );
  updateStats();
  renderBusinessPage();
}

function maybeCreateSponsorOffer() {
  if (state.sponsorOffer || state.activeSponsor) return;
  if (state.sponsorCooldown > 0) return;
  if (state.subs < 200) return;
  if (Math.random() > 0.62) return;

  const niche = getNiche();
  const brand = pick(niche.brands);
  const tier = state.subs >= 3000 ? 2 : state.subs >= 800 ? 1 : 0;
  const upfront = [120, 300, 750][tier] + Math.floor(rand(0, 50));
  const videoBonus = [55, 130, 280][tier] + Math.floor(rand(0, 30));
  const days = [4, 5, 6][tier];
  const repPerVideo = [-0.6, -0.3, 0][tier];

  state.sponsorOffer = {
    brand,
    upfront,
    videoBonus,
    days,
    repPerVideo,
    pitch: `${brand} wants a short integration in your ${state.nicheLabel} videos.`,
  };

  addFeed(`${brand} sent a sponsorship offer. Check the Business tab.`, "good");
}

function tickRivals(summary) {
  if (!state.rivals.length) return;

  let pressure = 1;
  let bestRival = null;

  for (const rival of state.rivals) {
    const growth = Math.floor((6 + state.day * 0.45 + rival.subs * 0.015) * rival.aggression * rand(0.6, 1.15));
    rival.subs += Math.max(1, growth);

    if (!bestRival || rival.subs > bestRival.subs) bestRival = rival;
  }

  const leader = [...state.rivals].sort((a, b) => b.subs - a.subs)[0];
  const gap = leader.subs - state.subs;

  if (Math.random() < 0.22) {
    const rival = pick(state.rivals);
    const roll = Math.random();

    if (roll < 0.28) {
      const steal = Math.floor(12 + rival.subs * 0.02);
      rival.subs += steal;
      rival.note = "Dropped a video that stole niche traffic.";
      pressure = 0.9;
      summary.push(`${rival.name} went semi-viral in your niche.`);
      addFeed(`${rival.name} ate into your recommendations today.`, "bad");
    } else if (roll < 0.8) {
      rival.note = "Posted something mid. Quiet day for them.";
      pressure = 1.12;
      summary.push(`You edged out ${rival.name} in the feed.`);
    } else {
      const swing = Math.floor(rand(2, 10));
      rival.subs += swing;
      rival.note = "Tried to start drama. Nobody really cared.";
      summary.push(`${rival.name} stirred drama. It fizzled out.`);
      addFeed(`${rival.name} poked the fanbase, but it barely landed.`, "neutral");
    }
  } else {
    for (const rival of state.rivals) {
      if (rival.subs > state.subs) rival.note = "Still climbing — slowly.";
      else rival.note = "Watching your numbers a little too closely.";
    }
  }

  if (gap > 1200 && Math.random() < 0.12) {
    pressure *= 0.95;
    summary.push(`${leader.name} is the niche favorite right now.`);
  }

  state.rivalPressure = pressure;
}

function endDay() {
  const summary = [];

  if (state.pendingUploads.length === 0) {
    summary.push("No upload today — the channel stayed quiet.");
  }

  for (const video of state.pendingUploads) {
    video.status = "live";
    state.subs += video.subGain;
    state.money += video.earnings;
    state.reputation = clamp(state.reputation + video.repDelta, 5, 100);

    let line = `“${video.title}” hit ${formatViews(video.views)} views (+${formatSubs(video.subGain)} subs)`;
    if (video.earnings > 0) {
      line += ` and earned ${formatMoney(video.earnings)}`;
    } else if (state.subs < 500) {
      line += ` · Better ads at 500 subs`;
    }
    summary.push(line);

    if (video.eventText) {
      summary.push(video.eventText);
      addFeed(`“${video.title}”: ${video.eventText}`, video.tone);
    } else {
      addFeed(
        `“${video.title}” finished with ${formatViews(video.views)} views and +${formatSubs(video.subGain)} subs.`,
        video.subGain >= 10 ? "good" : "neutral"
      );
    }
  }

  if (state.merchLevel > 0) {
    const merchPay = estimatedMerchDaily() * rand(0.75, 1.25);
    state.money += merchPay;
    summary.push(`Merch sales: +${formatMoney(merchPay)}`);
  }

  if (state.activeSponsor) {
    state.activeSponsor.daysLeft -= 1;
    if (state.activeSponsor.daysLeft <= 0) {
      summary.push(`${state.activeSponsor.brand} deal ended.`);
      addFeed(`Your sponsorship with ${state.activeSponsor.brand} wrapped up.`, "neutral");
      state.activeSponsor = null;
      state.sponsorCooldown = Math.max(state.sponsorCooldown, 2);
    }
  }

  if (state.sponsorCooldown > 0) state.sponsorCooldown -= 1;

  const recover = state.restedToday ? 35 : 60;
  state.energy = clamp(state.energy + recover, 0, state.maxEnergy);

  if (state.money >= 2) {
    state.money -= 2;
    summary.push("Living costs: −$2");
  } else {
    summary.push("You're nearly broke — time to hustle.");
  }

  if (state.subs >= 500 && !state._monetizedNote) {
    state._monetizedNote = true;
    summary.push("You hit 500 subscribers — ads are paying better now!");
    addFeed("Stronger monetization unlocked. Videos earn more from ads.", "good");
  }

  if (state.subs >= 250 && state.merchLevel === 0 && !state._merchUnlockedNote) {
    state._merchUnlockedNote = true;
    summary.push("Merch store is available in the Business tab.");
    addFeed("You're big enough for merch. Check Business when you're ready.", "good");
  }

  if (state.subs >= LIVE_UNLOCK_SUBS && !state._liveUnlockedNote) {
    state._liveUnlockedNote = true;
    summary.push("Livestreams unlocked — Go live with your camera!");
    addFeed("You can go live now. Real webcam, fake chat chaos, real donations.", "good");
  }

  tickRivals(summary);
  maybeCreateSponsorOffer();

  if (state.sponsorOffer && !summary.some((s) => s.includes("sponsorship offer"))) {
    summary.push(`${state.sponsorOffer.brand} wants to sponsor you.`);
  }

  if (Math.random() < 0.18) {
    const flavors = [
      "A stranger commented 'first' on your latest video.",
      "Someone asked when merch is dropping.",
      "Your thumbnail got a tiny design compliment.",
      "A brand scout liked one of your older videos.",
    ];
    summary.push(pick(flavors));
  }

  state.pendingUploads = [];
  state.videosToday = 0;
  state.restedToday = false;
  state.practicedToday = false;
  state.streamedToday = false;

  els.dayModalNum.textContent = String(state.day);
  els.daySummary.innerHTML = summary.map((s) => `<li>${escapeHtml(s)}</li>`).join("");
  els.dayModal.showModal();
  updateStats();
}

function continueDay() {
  state.day += 1;
  els.dayModal.close();
  addFeed(`Day ${state.day} begins. What's the move?`);
  updateStats();
}

function handleBusinessClick(event) {
  const btn = event.target.closest("[data-biz]");
  if (!btn || btn.disabled) return;

  const action = btn.dataset.biz;
  if (action === "accept-sponsor") acceptSponsor();
  if (action === "decline-sponsor") declineSponsor();
  if (action === "buy-merch") buyMerch();
}

function bindActions() {
  document.querySelector(".action-list").addEventListener("click", (event) => {
    const btn = event.target.closest("[data-action]");
    if (!btn || btn.disabled) return;

    const action = btn.dataset.action;
    if (action === "video") openVideoModal(false);
    if (action === "sponsor-video") openVideoModal(true);
    if (action === "livestream") beginLivestream();
    if (action === "rest") rest();
    if (action === "practice") practice();
    if (action === "end-day") endDay();
  });

  els.navButtons.forEach((btn) => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });

  els.pageBusiness.addEventListener("click", handleBusinessClick);
  els.createForm.addEventListener("submit", startChannel);
  els.videoForm.addEventListener("submit", handleVideoForm);
  els.dayContinue.addEventListener("click", continueDay);
  els.endStreamBtn.addEventListener("click", () => endLivestream());
  els.streamSummaryContinue.addEventListener("click", closeStreamSummary);

  els.streamModal.addEventListener("cancel", (event) => {
    event.preventDefault();
    endLivestream();
  });
}

function init() {
  renderNiches();
  bindActions();
  els.channelName.focus();
}

init();
