import React, { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    google?: any;
  }
}

const MONTHS = [
  {
    month: 1,
    name: "Zen Monk",
    colors: {
      accent: "#7a9e9f",
      accentSoft: "rgba(122,158,159,0.16)",
      accentLine: "rgba(122,158,159,0.34)",
      heroA: "rgba(44,68,74,0.96)",
      heroB: "rgba(72,108,111,0.94)",
    },
    theme: "Stillness & Awareness",
    detail: "Slow down, observe, reduce mental clutter, and practice intentional attention.",
    tradition: "Zen Buddhism (Mahayana, Japan/China origins)",
    monastery: "Zendo halls, strict sitting schedules (zazen), minimal speaking.",
    diet: "Shojin ryori (Buddhist vegetarian), seasonal, simple.",
    temperament: "Calm, observant, detached, precise.",
    beliefs: "Direct experience (satori), emptiness (śūnyatā), non-duality.",
    reading: "Zen Mind, Beginner's Mind — 2 to 4 pages/day + 1 koan reflection weekly",
    sources: ["Shunryu Suzuki", "Dogen writings (optional excerpts)"],
    longform: "Explain zazen, posture, breath, and the role of koans. Contrast modern mindfulness vs traditional Zen discipline.",
    focus: ["Sit daily", "Move slowly", "Reduce multitasking"],
    rules: ["Sit 10 to 20 minutes daily", "No phone during meals", "Single-task everything"],
    avoid: ["Multitasking", "Overstimulation", "Rushing"],
    signature: "Pause before every transition",
  },
  {
    month: 2,
    name: "Shaolin Monk",
    colors: {
      accent: "#b5523b",
      accentSoft: "rgba(181,82,59,0.16)",
      accentLine: "rgba(181,82,59,0.34)",
      heroA: "rgba(74,34,26,0.96)",
      heroB: "rgba(120,56,40,0.94)",
    },
    theme: "Discipline Through the Body",
    detail: "Build consistency through bodyweight training, stances, repetition, and physical grit.",
    tradition: "Chan Buddhism + Chinese martial tradition",
    monastery: "Shaolin Temple system with regimented martial + meditative training.",
    diet: "High-carb vegetarian meals, rice, vegetables, simple proteins.",
    temperament: "Disciplined, resilient, focused under strain.",
    beliefs: "Physical discipline refines the mind; endurance reveals clarity.",
    reading: "The Shaolin Way — 5 to 10 pages/day + apply 1 concept physically",
    sources: ["Shi Yan Ming teachings", "Shaolin history"],
    longform: "Explain myth vs reality of Shaolin monks, integration of Chan meditation with kung fu.",
    focus: ["Bodyweight training", "Stance work", "No skipped hard days"],
    rules: ["Train daily even if light", "Finish what you start", "Treat discomfort as practice"],
    avoid: ["Skipping workouts", "Comfort-seeking", "Excuses"],
    signature: "Hold one stance past discomfort",
  },
  {
    month: 3,
    name: "Theravāda Monk",
    colors: {
      accent: "#c2873f",
      accentSoft: "rgba(194,135,63,0.16)",
      accentLine: "rgba(194,135,63,0.34)",
      heroA: "rgba(84,58,28,0.96)",
      heroB: "rgba(145,101,49,0.94)",
    },
    theme: "Simplicity",
    detail: "Practice wanting less, simplifying possessions, food, and mental noise.",
    tradition: "Theravāda Buddhism (Sri Lanka, Thailand)",
    monastery: "Forest monasteries, alms rounds, strict Vinaya discipline.",
    diet: "Alms-based meals, typically before noon.",
    temperament: "Content, restrained, grounded.",
    beliefs: "Impermanence (anicca), suffering (dukkha), non-self (anatta).",
    reading: "The Dhammapada — 5 to 10 verses/day + reflect on one teaching",
    sources: ["Pali Canon excerpts"],
    longform: "Explain the Four Noble Truths and how monks live with minimal possessions.",
    focus: ["Simplify", "Eat mindfully", "Need less"],
    rules: ["Reduce one excess daily", "Eat without distraction", "Practice gratitude"],
    avoid: ["Excess consumption", "Impulse buying", "Overeating"],
    signature: "Ask: do I really need this?",
  },
  {
    month: 4,
    name: "Tibetan Monk",
    colors: {
      accent: "#9b5fa8",
      accentSoft: "rgba(155,95,168,0.16)",
      accentLine: "rgba(155,95,168,0.34)",
      heroA: "rgba(63,38,74,0.96)",
      heroB: "rgba(111,70,126,0.94)",
    },
    theme: "Compassion",
    detail: "Train the mind toward kindness, patience, generosity, and care for others.",
    tradition: "Tibetan Buddhism (Vajrayana)",
    monastery: "Ritual-rich monasteries, chanting, debate, visualization practices.",
    diet: "Barley (tsampa), butter tea, simple staples.",
    temperament: "Warm, compassionate, intellectually curious.",
    beliefs: "Bodhicitta (universal compassion), rebirth, visualization.",
    reading: "How to Practice — 3 to 5 pages/day + compassion meditation",
    sources: ["Dalai Lama teachings"],
    longform: "Explain compassion as a trained skill, not just emotion. Include tonglen basics.",
    focus: ["Compassion meditation", "Serve kindly", "Soften judgment"],
    rules: ["Practice compassion daily", "Help one person intentionally", "Reframe negative thoughts"],
    avoid: ["Harsh judgment", "Self-centered thinking", "Impatience"],
    signature: "Wish others well silently",
  },
  {
    month: 5,
    name: "Benedictine Monk",
    colors: {
      accent: "#6e6a86",
      accentSoft: "rgba(110,106,134,0.16)",
      accentLine: "rgba(110,106,134,0.34)",
      heroA: "rgba(44,43,58,0.96)",
      heroB: "rgba(83,80,104,0.94)",
    },
    theme: "Structure",
    detail: "Use routine and order to create calm, discipline, and steady momentum.",
    tradition: "Christian Benedictine Order",
    monastery: "Abbeys with strict daily schedule: ora et labora (prayer and work).",
    diet: "Simple communal meals, bread, vegetables.",
    temperament: "Steady, reliable, structured.",
    beliefs: "Stability, humility, obedience, rhythm of prayer.",
    reading: "Rule of St. Benedict — 1 section/day + reflect on routine",
    sources: ["St. Benedict"],
    longform: "Break down ora et labora and how routine builds stability.",
    focus: ["Honor schedule", "Work with purpose", "Build rhythm"],
    rules: ["Follow schedule closely", "Start on time", "Finish work blocks fully"],
    avoid: ["Drifting", "Procrastination", "Overcomplicating"],
    signature: "Begin each block on the minute",
  },
  {
    month: 6,
    name: "Trappist Monk",
    colors: {
      accent: "#687478",
      accentSoft: "rgba(104,116,120,0.16)",
      accentLine: "rgba(104,116,120,0.34)",
      heroA: "rgba(42,49,52,0.96)",
      heroB: "rgba(76,87,91,0.94)",
    },
    theme: "Silence",
    detail: "Reduce unnecessary speech and observe what surfaces in quiet.",
    tradition: "Trappist (Cistercian) Order",
    monastery: "Strict silence, contemplation, manual labor.",
    diet: "Plain meals, often silent.",
    temperament: "Quiet, introspective.",
    beliefs: "Silence as a path to God and self-awareness.",
    reading: "Thoughts in Solitude — 2 to 3 pages/day",
    sources: ["Thomas Merton"],
    longform: "Explore silence as confrontation with self, not relaxation.",
    focus: ["Pause before speaking", "Quiet work", "Notice inner noise"],
    rules: ["Speak only when needed", "Pause before responding", "Sit in silence daily"],
    avoid: ["Idle talk", "Noise", "Distraction"],
    signature: "Three-second pause before speaking",
  },
  {
    month: 7,
    name: "Forest Monk",
    colors: {
      accent: "#5f7b52",
      accentSoft: "rgba(95,123,82,0.16)",
      accentLine: "rgba(95,123,82,0.34)",
      heroA: "rgba(36,52,34,0.96)",
      heroB: "rgba(71,98,63,0.94)",
    },
    theme: "Nature & Solitude",
    detail: "Spend time outdoors, detach from noise, and return attention to simple presence.",
    tradition: "Thai Forest Tradition",
    monastery: "Jungle monasteries, caves, wandering monks.",
    diet: "Alms-based simple food.",
    temperament: "Independent, observant.",
    beliefs: "Nature supports direct insight and detachment.",
    reading: "Food for the Heart — 2 to 4 pages/day",
    sources: ["Ajahn Chah"],
    longform: "Explain renunciation and the role of isolation in insight.",
    focus: ["Walk outside", "Less screen", "Observe nature"],
    rules: ["Spend real time outside daily", "Limit screens", "Observe without labeling"],
    avoid: ["Digital overload", "Indoor stagnation", "Mindless scrolling"],
    signature: "Walk without headphones",
  },
  {
    month: 8,
    name: "Hindu Sadhu",
    colors: {
      accent: "#d17a3f",
      accentSoft: "rgba(209,122,63,0.16)",
      accentLine: "rgba(209,122,63,0.34)",
      heroA: "rgba(80,44,25,0.96)",
      heroB: "rgba(142,80,42,0.94)",
    },
    theme: "Identity & Detachment",
    detail: "Question ego, labels, and comfort.",
    tradition: "Hindu ascetic tradition",
    monastery: "Ashrams or wandering life.",
    diet: "Minimal, varies widely.",
    temperament: "Detached, unconventional.",
    beliefs: "Atman, illusion of ego, liberation (moksha).",
    reading: "Autobiography of a Yogi — 3 to 5 pages/day",
    sources: ["Paramahansa Yogananda"],
    longform: "Explain ego dissolution and spiritual identity.",
    focus: ["Observe ego", "Embrace discomfort", "Detach from labels"],
    rules: ["Choose discomfort daily", "Loosen identity", "Practice humility"],
    avoid: ["Ego reinforcement", "Comfort addiction", "Status seeking"],
    signature: "Do one uncomfortable thing daily",
  },
  {
    month: 9,
    name: "Franciscan",
    colors: {
      accent: "#8e6b4f",
      accentSoft: "rgba(142,107,79,0.16)",
      accentLine: "rgba(142,107,79,0.34)",
      heroA: "rgba(58,42,33,0.96)",
      heroB: "rgba(111,83,61,0.94)",
    },
    theme: "Service & Humility",
    detail: "Find meaning in kindness and service.",
    tradition: "Franciscan Order",
    monastery: "Community-based, service-focused.",
    diet: "Simple shared meals.",
    temperament: "Joyful, humble.",
    beliefs: "Love, poverty, service.",
    reading: "Life of St. Francis — short daily excerpts",
    sources: ["Francis of Assisi"],
    longform: "Explain radical humility and voluntary poverty.",
    focus: ["Serve others", "Stay humble", "Practice gratitude"],
    rules: ["Do one act of service daily", "Express gratitude", "Live simply"],
    avoid: ["Selfishness", "Excess", "Neglecting others"],
    signature: "Help someone without recognition",
  },
  {
    month: 10,
    name: "Carthusian",
    colors: {
      accent: "#4f5d75",
      accentSoft: "rgba(79,93,117,0.16)",
      accentLine: "rgba(79,93,117,0.34)",
      heroA: "rgba(33,39,52,0.96)",
      heroB: "rgba(63,74,95,0.94)",
    },
    theme: "Deep Silence",
    detail: "Go inward and reduce external input.",
    tradition: "Carthusian Order",
    monastery: "Solitary cells, minimal contact.",
    diet: "Simple solitary meals.",
    temperament: "Deeply contemplative.",
    beliefs: "Union with God through silence.",
    reading: "The Cloud of Unknowing — 1 to 2 pages/day",
    sources: ["Anonymous mystic text"],
    longform: "Explain apophatic theology and unknowing.",
    focus: ["Long silence", "Minimal input", "Deep contemplation"],
    rules: ["Limit interaction", "Sit deeply daily", "Remove noise"],
    avoid: ["Social media", "Excess talking", "Distraction"],
    signature: "Sit in stillness past discomfort",
  },
  {
    month: 11,
    name: "Warrior Monk",
    colors: {
      accent: "#8c4f3d",
      accentSoft: "rgba(140,79,61,0.16)",
      accentLine: "rgba(140,79,61,0.34)",
      heroA: "rgba(57,31,24,0.96)",
      heroB: "rgba(103,58,45,0.94)",
    },
    theme: "Control Under Pressure",
    detail: "Train composure under stress.",
    tradition: "Stoic + Samurai philosophy",
    monastery: "Dojo-like environment.",
    diet: "Performance-based.",
    temperament: "Controlled, decisive.",
    beliefs: "Discipline, honor, mastery.",
    reading: "Book of Five Rings — 2 to 3 pages/day",
    sources: ["Miyamoto Musashi"],
    longform: "Explain strategy, timing, and calm action.",
    focus: ["Hard training", "Stay calm", "Precision"],
    rules: ["Train with intensity", "Control breath", "Act precisely"],
    avoid: ["Reactivity", "Sloppiness", "Avoidance"],
    signature: "Breathe before action",
  },
  {
    month: 12,
    name: "Modern Monk",
    colors: {
      accent: "#3f7f8c",
      accentSoft: "rgba(63,127,140,0.16)",
      accentLine: "rgba(63,127,140,0.34)",
      heroA: "rgba(28,53,58,0.96)",
      heroB: "rgba(48,92,101,0.94)",
    },
    theme: "Integration",
    detail: "Sustain what works.",
    tradition: "Modern synthesis",
    monastery: "Your life system.",
    diet: "Balanced.",
    temperament: "Adaptive.",
    beliefs: "Sustainability over intensity.",
    reading: "Atomic Habits — 3 to 5 pages/day",
    sources: ["James Clear"],
    longform: "Explain habit systems and long-term consistency.",
    focus: ["Refine systems", "Keep momentum", "Live simply"],
    rules: ["Keep core habits", "Review weekly", "Adjust intentionally"],
    avoid: ["Burnout", "All-or-nothing"],
    signature: "Review and refine daily",
  },
] as const;

const PROGRAM_START_DATE = "2026-04-01";
const STORAGE_KEY = "monastic-year-tracker-v8";
const DRIVE_CONFIG_KEY = "monastic-year-drive-config-v2";

const VIDEO_STRUCTURE = {
  flow: [
    "Hook (personal moment or tension)",
    "Context (what this tradition actually is)",
    "History (where it comes from, key figures)",
    "Practice (what I did daily)",
    "Struggle (what was difficult or surprising)",
    "Insight (what changed in me)",
    "Application (how a beginner can try this)",
    "Closing reflection",
  ],
};

const DEFAULT_PROFILE = {
  wakeTime: "06:30",
  workHoursWeekly: 10,
  schoolHoursWeekly: 10,
  dailyShortGoal: 1,
  weeklyLongformGoal: 1,
};

const DEFAULT_CHECKS = {
  outsideWalkRun: false,
  quickSelfShot: false,
  hydrate: false,
  familyPrep: false,
  meditationMorning: false,
  stretchYoga: false,
  dailyIntention: false,
  editPostShort: false,
  longformStep: false,
  workSchoolErrands: false,
  timeWithKids: false,
  prepareDinner: false,
  familyBedtime: false,
  finishWork: false,
  reading: false,
  meditationNight: false,
  cleanupReset: false,
  tomorrowIdea: false,
  sleep: false,
};

const CHECKLIST_META = [
  { key: "outsideWalkRun", label: "Wake up and go outside for walk/run", category: "Morning" },
  { key: "quickSelfShot", label: "Document thoughts and grab a quick self shot", category: "Morning" },
  { key: "hydrate", label: "Hydrate", category: "Morning" },
  { key: "familyPrep", label: "Help family and yourself prepare for the day", category: "Morning" },
  { key: "meditationMorning", label: "Meditation", category: "Morning" },
  { key: "stretchYoga", label: "Stretching / yoga", category: "Morning" },
  { key: "dailyIntention", label: "Set daily intention", category: "Morning" },
  { key: "editPostShort", label: "Edit and post short", category: "Creation" },
  { key: "longformStep", label: "Long-form weekly video progress step", category: "Creation" },
  { key: "workSchoolErrands", label: "Work / school / errands", category: "Life" },
  { key: "timeWithKids", label: "Spend time with kids", category: "Life" },
  { key: "prepareDinner", label: "Prepare dinner", category: "Life" },
  { key: "familyBedtime", label: "Spend time with family and put kids to bed", category: "Life" },
  { key: "finishWork", label: "Finish any remaining work for the day", category: "Evening" },
  { key: "reading", label: "Reading assignment", category: "Evening" },
  { key: "meditationNight", label: "Evening meditation", category: "Evening" },
  { key: "cleanupReset", label: "Clean up / reset space", category: "Evening" },
  { key: "tomorrowIdea", label: "Note tomorrow's video idea", category: "Evening" },
  { key: "sleep", label: "Sleep on time", category: "Evening" },
] as const;

const DEFAULT_DRIVE_CONFIG = {
  enabled: false,
  clientId: "",
  folderId: "",
  accessToken: "",
  tokenExpiresAt: 0,
  isConnected: false,
  authMode: "manual" as "manual" | "google-popup",
};

function getFallbackTheme() {
  return {
    accent: "#8b5e34",
    accentSoft: "rgba(139,94,52,0.16)",
    accentLine: "rgba(139,94,52,0.34)",
    heroA: "rgba(58,46,35,0.96)",
    heroB: "rgba(95,111,82,0.92)",
  };
}

function getManualTheme() {
  return {
    accent: "#6f59a8",
    accentSoft: "rgba(111,89,168,0.16)",
    accentLine: "rgba(111,89,168,0.34)",
    heroA: "rgba(42,33,66,0.96)",
    heroB: "rgba(79,61,122,0.94)",
  };
}

function getDateKey(date: Date | string) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getProgramStartDate() {
  return new Date(`${PROGRAM_START_DATE}T00:00:00`);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getNextMondayOnOrAfter(date: Date) {
  const next = new Date(date);
  const day = next.getDay();
  const daysUntilMonday = day === 1 ? 0 : day === 0 ? 1 : 8 - day;
  next.setDate(next.getDate() + daysUntilMonday);
  return next;
}

function getPhaseStartDates() {
  const starts = [getProgramStartDate()];
  for (let i = 1; i < MONTHS.length; i += 1) {
    const candidate = addDays(starts[i - 1], 30);
    starts.push(getNextMondayOnOrAfter(candidate));
  }
  return starts;
}

const PHASE_START_DATES = getPhaseStartDates();

function getMonthData(dateStr: string) {
  const current = new Date(`${dateStr}T00:00:00`);
  let index = 0;
  for (let i = 0; i < PHASE_START_DATES.length; i += 1) {
    if (current >= PHASE_START_DATES[i]) index = i;
    else break;
  }
  return MONTHS[Math.max(0, Math.min(MONTHS.length - 1, index))] || MONTHS[0];
}

function getPhaseWindowByMonth(monthNumber: number) {
  const index = Math.max(0, Math.min(MONTHS.length - 1, monthNumber - 1));
  const start = PHASE_START_DATES[index];
  const end = index < PHASE_START_DATES.length - 1 ? addDays(PHASE_START_DATES[index + 1], -1) : null;
  return {
    start: getDateKey(start),
    end: end ? getDateKey(end) : "Ongoing",
  };
}

function getPhaseWindow(dateStr: string) {
  const monthData = getMonthData(dateStr);
  return getPhaseWindowByMonth(monthData.month);
}

function getWeekKey(dateStr: string) {
  const d = new Date(`${dateStr}T00:00:00`);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d);
  monday.setDate(diff);
  return getDateKey(monday);
}

function computeScore(checks: Record<string, boolean> | undefined) {
  return Object.values(checks || {}).filter(Boolean).length;
}

function computeStreak(entries: Record<string, any>) {
  const keys = Object.keys(entries || {});
  if (!keys.length) return 0;
  let streak = 0;
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (true) {
    const key = getDateKey(cursor);
    const entry = entries[key];
    const score = entry ? computeScore(entry.checks || {}) : 0;
    if (score > 0) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function categoryGroups() {
  return ["Morning", "Creation", "Life", "Evening"];
}

function createDefaultEntry() {
  return {
    checks: { ...DEFAULT_CHECKS },
    notes: "",
    readingNotes: "",
    longformNotes: "",
  };
}

function createDefaultWeek() {
  return {
    title: "",
    hook: "",
    keyMessage: "",
    ending: "",
    status: "Ideation",
    shots: "",
  };
}

function exportJson(data: any) {
  if (typeof window === "undefined") return;
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "monastic-year-tracker-data.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function createTimestampedBackupName() {
  return `monastic-backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
}

function isSandboxEnvironment() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host.includes("oaiusercontent.com") || host.includes("chatgpt.com") || host.includes("openai.com");
}

function loadGoogleIdentityScript() {
  return new Promise<any>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is not available."));
      return;
    }
    if (window.google?.accounts?.oauth2) {
      resolve(window.google);
      return;
    }
    const existing = document.querySelector('script[data-google-identity="true"]') as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve(window.google));
      existing.addEventListener("error", () => reject(new Error("Failed to load Google Identity Services.")));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.onload = () => resolve(window.google);
    script.onerror = () => reject(new Error("Failed to load Google Identity Services."));
    document.head.appendChild(script);
  });
}

async function requestDriveAccessToken(clientId: string, promptMode = "consent") {
  if (isSandboxEnvironment()) {
    throw new Error("Popup-based Google auth is blocked in this sandbox. Use a deployed site for Google sign-in, or paste a temporary access token manually.");
  }
  const googleObject = await loadGoogleIdentityScript();
  return new Promise<any>((resolve, reject) => {
    const tokenClient = googleObject.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "https://www.googleapis.com/auth/drive.file",
      callback: (response: any) => {
        if (response?.error) {
          reject(new Error(response.error));
          return;
        }
        resolve(response);
      },
      error_callback: (error: any) => {
        const message = error?.type === "popup_failed_to_open"
          ? "Google popup was blocked by the browser. Allow popups or use a deployed site."
          : error?.type || "Google auth failed.";
        reject(new Error(message));
      },
    });
    try {
      tokenClient.requestAccessToken({ prompt: promptMode });
    } catch (error: any) {
      reject(new Error(error?.message || "Google auth failed to start."));
    }
  });
}

async function autoBackupToDrive(data: any, driveConfig: typeof DEFAULT_DRIVE_CONFIG) {
  if (typeof window === "undefined") return;
  if (!driveConfig?.enabled || !driveConfig?.folderId || !driveConfig?.accessToken) {
    console.info("Drive backup skipped: Google Drive is not configured.");
    return;
  }
  if (driveConfig.tokenExpiresAt && Date.now() > driveConfig.tokenExpiresAt) {
    console.info("Drive backup skipped: Google token expired.");
    return;
  }
  const metadata = {
    name: createTimestampedBackupName(),
    parents: [driveConfig.folderId],
    mimeType: "application/json",
  };
  const form = new FormData();
  form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
  form.append("file", new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
  const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${driveConfig.accessToken}`,
    },
    body: form,
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Drive backup failed: ${response.status} ${errorText}`);
  }
  const result = await response.json();
  console.info("Drive backup completed:", result);
}

function getMillisecondsUntilNextMidnight(now = new Date()) {
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0);
  return nextMidnight.getTime() - now.getTime();
}

function runSelfTests() {
  console.assert(computeScore({ a: true, b: false, c: true }) === 2, "computeScore should count checked items");
  console.assert(getDateKey("2026-04-01") === "2026-04-01", "getDateKey should normalize YYYY-MM-DD");
  console.assert(getMonthData("2026-04-01").name === "Zen Monk", "April 1, 2026 should map to month 1");
  console.assert(getWeekKey("2026-04-01") === "2026-03-30", "Week key should resolve to Monday");
  console.assert(getNextMondayOnOrAfter(new Date("2026-05-01T00:00:00")).getDay() === 1, "Phase rollover should land on Monday");
  console.assert(getMonthData("2026-05-03").name === "Zen Monk", "Phase should stay until Sunday before rollover");
  console.assert(getMonthData("2026-05-04").name === "Shaolin Monk", "Phase should roll over on Monday");
  console.assert(getPhaseWindow("2026-04-15").start === "2026-04-01", "Phase window start should be correct");
  console.assert(getPhaseWindow("2026-04-15").end === "2026-05-03", "Phase window end should be correct");
  console.assert(getPhaseWindowByMonth(2).start === "2026-05-04", "Manual month lookup should return correct start window");
  console.assert(PHASE_START_DATES.slice(1).every((date) => date.getDay() === 1), "Every phase after the first should start on Monday");
  console.assert(Boolean(getFallbackTheme().heroA), "Fallback theme should always exist");
  console.assert(MONTHS.length === 12, "There should be exactly 12 monthly paths");
  console.assert(MONTHS.every((month, index) => month.month === index + 1), "Month numbers should run from 1 to 12 in order");
  console.assert(getMillisecondsUntilNextMidnight(new Date("2026-04-01T23:59:00")) === 60000, "Midnight rollover timing should be correct to the minute");
  console.assert(typeof MONTHS[0].signature === "string", "Each month should have a signature habit");
  console.assert(createTimestampedBackupName().startsWith("monastic-backup-"), "Backup name should use monastic-backup prefix");
  console.assert(typeof isSandboxEnvironment() === "boolean", "Sandbox detection should return a boolean");

  const today = getDateKey(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = getDateKey(yesterdayDate);
  const streakEntries = {
    [today]: { checks: { one: true } },
    [yesterday]: { checks: { one: true } },
  };
  console.assert(computeStreak(streakEntries) >= 2, "computeStreak should count consecutive days with progress");
}

function styles(themeColors: ReturnType<typeof getFallbackTheme>, isManualMode = false) {
  const safeTheme = themeColors || getFallbackTheme();
  const palette = {
    ink: "#1c1917",
    stone: "#f5f1e8",
    parchment: "#fbf8f1",
    cedar: "#8b5e34",
    bronze: "#b07a3f",
    slate: "#5b6470",
    gold: "#c9a45c",
    line: "rgba(69, 51, 31, 0.16)",
    shadow: "rgba(45, 31, 18, 0.10)",
    white: "#fffdf8",
  };

  return {
    page: {
      minHeight: "100vh",
      background: `radial-gradient(circle at top, ${palette.parchment} 0%, ${palette.stone} 52%, #efe7d8 100%)`,
      color: palette.ink,
      fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: "12px clamp(10px, 3vw, 16px) 24px",
    },
    container: {
      maxWidth: 1240,
      margin: "0 auto",
      display: "grid",
      gap: 14,
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
      gap: 14,
      alignItems: "start",
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
      gap: 10,
      alignItems: "start",
    },
    card: {
      background: `linear-gradient(180deg, ${palette.white} 0%, ${palette.parchment} 100%)`,
      border: `1px solid ${palette.line}`,
      borderRadius: 20,
      padding: "16px clamp(12px, 3vw, 18px)",
      boxShadow: `0 12px 30px ${palette.shadow}`,
      backdropFilter: "blur(4px)",
      overflow: "hidden",
    },
    heroCard: {
      background: `linear-gradient(135deg, ${safeTheme.heroA} 0%, ${safeTheme.heroB} 72%, rgba(28,25,23,0.96) 100%)`,
      color: palette.white,
      border: `1px solid ${safeTheme.accentLine}`,
      borderRadius: 22,
      padding: "18px clamp(14px, 3vw, 20px)",
      boxShadow: `0 16px 40px rgba(28,25,23,0.22)`,
      overflow: "hidden",
    },
    h1: {
      fontSize: "clamp(28px, 6vw, 34px)",
      lineHeight: 1.05,
      margin: 0,
      fontWeight: 800,
      letterSpacing: "-0.04em",
    },
    h2: {
      fontSize: "clamp(20px, 4.6vw, 22px)",
      lineHeight: 1.15,
      margin: 0,
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
    h3: {
      fontSize: 14,
      margin: 0,
      fontWeight: 700,
      letterSpacing: "0.03em",
      color: isManualMode ? safeTheme.accent : palette.cedar,
      textTransform: "uppercase",
    },
    small: {
      color: palette.slate,
      fontSize: 14,
      lineHeight: 1.55,
      overflowWrap: "anywhere" as const,
    },
    heroSmall: {
      color: "rgba(255,253,248,0.82)",
      fontSize: 14,
      lineHeight: 1.55,
      overflowWrap: "anywhere" as const,
    },
    label: {
      display: "block",
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 6,
      color: isManualMode ? safeTheme.accent : palette.cedar,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    },
    input: {
      width: "100%",
      boxSizing: "border-box" as const,
      border: `1px solid ${palette.line}`,
      borderRadius: 14,
      padding: "12px 13px",
      minHeight: 46,
      fontSize: 16,
      background: "rgba(255,253,248,0.9)",
      color: palette.ink,
      outline: "none",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.65)",
    },
    inputDark: {
      width: "100%",
      boxSizing: "border-box" as const,
      border: "1px solid rgba(255,253,248,0.16)",
      borderRadius: 12,
      padding: "10px 12px",
      minHeight: 40,
      fontSize: 15,
      background: "rgba(255,253,248,0.08)",
      color: palette.white,
      outline: "none",
    },
    dateInputDark: {
      width: "100%",
      boxSizing: "border-box" as const,
      border: "1px solid rgba(255,253,248,0.16)",
      borderRadius: 999,
      padding: "8px 12px",
      minHeight: 38,
      fontSize: 14,
      background: "rgba(255,253,248,0.08)",
      color: palette.white,
      outline: "none",
    },
    textarea: {
      width: "100%",
      minHeight: 120,
      boxSizing: "border-box" as const,
      border: `1px solid ${palette.line}`,
      borderRadius: 14,
      padding: 12,
      fontSize: 16,
      resize: "vertical" as const,
      background: "rgba(255,253,248,0.92)",
      color: palette.ink,
      lineHeight: 1.5,
    },
    button: {
      border: `1px solid ${palette.ink}`,
      background: `linear-gradient(180deg, ${palette.ink} 0%, #322a24 100%)`,
      color: palette.white,
      borderRadius: 999,
      padding: "12px 16px",
      minHeight: 46,
      cursor: "pointer",
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: "0.01em",
      boxShadow: `0 6px 14px rgba(28,25,23,0.16)`,
      width: "100%",
    },
    buttonSecondary: {
      border: `1px solid ${palette.line}`,
      background: "rgba(255,253,248,0.92)",
      color: palette.ink,
      borderRadius: 999,
      padding: "12px 16px",
      minHeight: 46,
      cursor: "pointer",
      fontSize: 15,
      fontWeight: 700,
      boxShadow: "0 2px 8px rgba(28,25,23,0.04)",
      width: "100%",
    },
    actionRow: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
      gap: 10,
      alignItems: "stretch",
    },
    tabRow: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
      gap: 8,
      minWidth: 620,
    },
    tabScroller: {
      overflowX: "auto" as const,
      paddingBottom: 2,
      WebkitOverflowScrolling: "touch" as const,
    },
    tab: {
      border: `1px solid ${palette.line}`,
      background: "rgba(255,253,248,0.94)",
      color: palette.ink,
      borderRadius: 999,
      padding: "12px 14px",
      minHeight: 46,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 700,
      width: "100%",
    },
    tabActive: {
      border: `1px solid ${safeTheme.accent}`,
      background: `linear-gradient(180deg, ${safeTheme.accent} 0%, ${palette.bronze} 100%)`,
      color: palette.white,
      borderRadius: 999,
      padding: "12px 14px",
      minHeight: 46,
      cursor: "pointer",
      fontSize: 14,
      fontWeight: 700,
      boxShadow: `0 8px 18px rgba(139,94,52,0.20)`,
      width: "100%",
    },
    badge: {
      display: "inline-block",
      borderRadius: 999,
      padding: "7px 10px",
      background: safeTheme.accentSoft,
      border: `1px solid ${safeTheme.accentLine}`,
      fontSize: 12,
      fontWeight: 600,
      color: safeTheme.accent,
      marginRight: 8,
      marginBottom: 8,
    },
    checklistItem: {
      display: "grid",
      gridTemplateColumns: "24px 1fr",
      alignItems: "start",
      gap: 12,
      border: `1px solid ${palette.line}`,
      background: "rgba(255,253,248,0.82)",
      borderRadius: 16,
      padding: 12,
      boxShadow: "0 2px 8px rgba(28,25,23,0.03)",
    },
    stat: {
      border: `1px solid ${palette.line}`,
      background: "rgba(255,253,248,0.76)",
      borderRadius: 18,
      padding: 14,
      boxShadow: "0 2px 10px rgba(28,25,23,0.04)",
      overflowWrap: "anywhere" as const,
    },
    progressWrap: {
      width: "100%",
      height: 12,
      borderRadius: 999,
      background: safeTheme.accentSoft,
      overflow: "hidden",
      border: "1px solid rgba(95,111,82,0.10)",
    },
    progressBar: (value: number) => ({
      width: `${value}%`,
      height: "100%",
      background: `linear-gradient(90deg, ${safeTheme.accent} 0%, ${palette.gold} 100%)`,
      transition: "width 160ms ease",
    }),
    pillActive: {
      border: `1px solid ${safeTheme.accent}`,
      background: `linear-gradient(135deg, ${safeTheme.accent} 0%, ${palette.bronze} 100%)`,
      color: palette.white,
      borderRadius: 18,
      padding: 14,
      boxShadow: `0 10px 22px rgba(139,94,52,0.20)`,
    },
    pill: {
      border: `1px solid ${palette.line}`,
      background: "rgba(255,253,248,0.82)",
      color: palette.ink,
      borderRadius: 18,
      padding: 14,
      boxShadow: "0 2px 8px rgba(28,25,23,0.03)",
    },
    divider: {
      height: 1,
      background: `linear-gradient(90deg, transparent 0%, ${palette.line} 18%, ${palette.line} 82%, transparent 100%)`,
      margin: "8px 0 2px",
    },
    compactSection: {
      display: "grid",
      gap: 12,
    },
    stickyTopCard: {
      position: "sticky" as const,
      top: 64,
      alignSelf: "start",
    },
    mobileStack: {
      display: "grid",
      gap: 12,
    },
    inlineInfo: {
      color: palette.slate,
      fontSize: 14,
      lineHeight: 1.55,
      overflowWrap: "anywhere" as const,
      display: "flex",
      alignItems: "flex-start",
      gap: 4,
      flexWrap: "wrap" as const,
    },
    plannerRow: {
      display: "grid",
      gridTemplateColumns: "88px 1fr",
      alignItems: "start",
      gap: 12,
      border: `1px solid ${palette.line}`,
      background: "rgba(255,253,248,0.82)",
      borderRadius: 16,
      padding: 12,
      boxShadow: "0 2px 8px rgba(28,25,23,0.03)",
    },
    plannerTime: {
      fontWeight: 700,
      fontSize: 14,
      whiteSpace: "nowrap" as const,
      color: palette.cedar,
      paddingTop: 1,
    },
    plannerTask: {
      fontSize: 14,
      lineHeight: 1.45,
      overflowWrap: "anywhere" as const,
    },
  };
}

function SectionTitle({ title, description, dark = false, stylesObj }: { title: string; description?: string; dark?: boolean; stylesObj: any }) {
  const s = stylesObj;
  return (
    <div style={{ marginBottom: 12 }}>
      <h2 style={s.h2}>{title}</h2>
      {description ? <div style={dark ? s.heroSmall : s.small}>{description}</div> : null}
      <div style={s.divider} />
    </div>
  );
}

function TraditionDetails({ monthData, s, compact = false }: { monthData: (typeof MONTHS)[number]; s: any; compact?: boolean }) {
  return (
    <div style={{ marginTop: 12, display: "grid", gap: 6 }}>
      <div style={s.small}><strong>Tradition:</strong> {monthData.tradition}</div>
      <div style={s.small}><strong>Monastery:</strong> {monthData.monastery}</div>
      <div style={s.small}><strong>Diet:</strong> {monthData.diet}</div>
      <div style={s.small}><strong>Temperament:</strong> {monthData.temperament}</div>
      <div style={s.small}><strong>Beliefs:</strong> {monthData.beliefs}</div>
      {!compact ? (
        <>
          <div style={s.small}><strong>Daily Rules:</strong> {monthData.rules.join(", ")}</div>
          <div style={s.small}><strong>Avoid:</strong> {monthData.avoid.join(", ")}</div>
          <div style={s.small}><strong>Signature Habit:</strong> {monthData.signature}</div>
        </>
      ) : null}
    </div>
  );
}

export default function MonasticYearTrackerApp() {
  const todayKey = getDateKey(new Date());
  const [activeTab, setActiveTab] = useState("today");
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [monthMode, setMonthMode] = useState<"calendar" | "manual">("calendar");
  const [manualMonth, setManualMonth] = useState<(typeof MONTHS)[number] | null>(null);
  const [entries, setEntries] = useState<Record<string, any>>({});
  const [weeklyVideo, setWeeklyVideo] = useState<Record<string, any>>({});
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [rolloverNotice, setRolloverNotice] = useState("");
  const [driveConfig, setDriveConfig] = useState(DEFAULT_DRIVE_CONFIG);
  const [driveStatus, setDriveStatus] = useState("");

  const calendarMonthData = useMemo(() => getMonthData(selectedDate), [selectedDate]);
  const effectiveTheme = useMemo(() => {
    if (monthMode === "manual") return getManualTheme();
    return (calendarMonthData && calendarMonthData.colors) || getFallbackTheme();
  }, [monthMode, calendarMonthData]);
  const s = useMemo(() => styles(effectiveTheme, monthMode === "manual"), [effectiveTheme, monthMode]);

  useEffect(() => {
    runSelfTests();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setEntries(parsed.entries || {});
        setWeeklyVideo(parsed.weeklyVideo || {});
        setProfile(parsed.profile || DEFAULT_PROFILE);
      }
      const savedDriveConfig = window.localStorage.getItem(DRIVE_CONFIG_KEY);
      if (savedDriveConfig) {
        setDriveConfig({ ...DEFAULT_DRIVE_CONFIG, ...JSON.parse(savedDriveConfig) });
      }
    } catch (error) {
      console.error("Failed to load saved tracker data", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ entries, weeklyVideo, profile }));
    } catch (error) {
      console.error("Failed to save tracker data", error);
    }
  }, [entries, weeklyVideo, profile, isLoaded]);

  useEffect(() => {
    if (typeof window === "undefined" || !isLoaded) return;
    try {
      window.localStorage.setItem(DRIVE_CONFIG_KEY, JSON.stringify(driveConfig));
    } catch (error) {
      console.error("Failed to save drive config", error);
    }
  }, [driveConfig, isLoaded]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const delay = getMillisecondsUntilNextMidnight(new Date()) + 50;
    const timeoutId = window.setTimeout(async () => {
      try {
        await autoBackupToDrive({ entries, weeklyVideo, profile, months: MONTHS }, driveConfig);
      } catch (error: any) {
        console.error("Midnight backup failed", error);
        setDriveStatus(`Backup failed: ${error?.message || "Unknown error"}`);
      }
      const newTodayKey = getDateKey(new Date());
      setSelectedDate((prev) => {
        if (prev !== newTodayKey) {
          const newMonthData = getMonthData(newTodayKey);
          setRolloverNotice(`A new day has begun. Now tracking ${newTodayKey} · ${newMonthData.name}.`);
          if (monthMode === "calendar") setManualMonth(null);
          setActiveTab("today");
          return newTodayKey;
        }
        return prev;
      });
    }, delay);
    return () => window.clearTimeout(timeoutId);
  }, [monthMode, selectedDate, entries, weeklyVideo, profile, driveConfig]);

  const monthData = useMemo(() => {
    if (monthMode === "manual" && manualMonth) return manualMonth;
    return calendarMonthData || MONTHS[0];
  }, [calendarMonthData, monthMode, manualMonth]);

  const weekKey = useMemo(() => getWeekKey(selectedDate), [selectedDate]);
  const phaseWindow = useMemo(() => {
    if (monthMode === "manual" && manualMonth) return getPhaseWindowByMonth(manualMonth.month);
    return getPhaseWindow(selectedDate);
  }, [selectedDate, monthMode, manualMonth]);

  const currentEntry = entries[selectedDate] || createDefaultEntry();
  const currentWeek = weeklyVideo[weekKey] || createDefaultWeek();
  const totalChecks = Object.keys(DEFAULT_CHECKS).length;
  const score = computeScore(currentEntry.checks || {});
  const scorePct = Math.round((score / totalChecks) * 100);
  const streak = useMemo(() => computeStreak(entries), [entries]);

  const weeklyStats = useMemo(() => {
    const base = new Date(`${weekKey}T00:00:00`);
    const dates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return getDateKey(d);
    });
    const items = dates.map((d) => entries[d]).filter(Boolean);
    const scores = items.map((entry) => computeScore(entry.checks || {}));
    const avg = scores.length ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) / 10 : 0;
    const shorts = items.filter((entry) => entry.checks?.editPostShort).length;
    const longformSteps = items.filter((entry) => entry.checks?.longformStep).length;
    const readingDays = items.filter((entry) => entry.checks?.reading).length;
    return { avg, shorts, longformSteps, readingDays };
  }, [entries, weekKey]);

  const previewMode = monthMode === "manual" && Boolean(manualMonth);
  const points = score * 10;
  const level = Math.floor(points / 100) + 1;

  function getBadge() {
    if (streak >= 30) return "🔥 Discipline Master";
    if (streak >= 14) return "⚔️ Warrior Streak";
    if (streak >= 7) return "🧘 Consistency Builder";
    if (streak >= 3) return "🌱 Getting Started";
    return "🪨 Day One";
  }

  function getDailyRank() {
    if (score === totalChecks) return "🏆 Perfect Day";
    if (score >= totalChecks * 0.75) return "⚔️ Strong Day";
    if (score >= totalChecks * 0.5) return "🧘 Solid Day";
    if (score > 0) return "🌱 Showing Up";
    return "🪨 Missed Day";
  }

  function getWeeklyBossStatus() {
    if (weeklyStats.shorts >= 5 && weeklyStats.longformSteps >= 5) return "🐉 Boss Defeated";
    if (weeklyStats.shorts >= 3) return "⚔️ In the Fight";
    return "🌱 Training";
  }

  const todayPlan = [
    { time: profile.wakeTime, task: "Wake up, hydrate, and go outside for walk/run" },
    { time: "07:00", task: "Grab quick self shot and document thoughts" },
    { time: "07:10", task: "Help family and yourself prepare for the day" },
    { time: "08:00", task: "Meditation with stretching/yoga" },
    { time: "08:30", task: "Edit and post short" },
    { time: "09:00", task: "Long-form video progress or brainstorming" },
    { time: "10:00", task: "Work / school / errands block" },
    { time: "16:00", task: "Spend time with kids" },
    { time: "17:30", task: "Prepare dinner" },
    { time: "18:30", task: "Family time and kids bedtime" },
    { time: "20:30", task: "Finish up any work" },
    { time: "21:00", task: "Reading assignment" },
    { time: "21:30", task: "Meditate and wind down" },
  ];

  const updateCheck = (key: string, value: boolean) => {
    setEntries((prev) => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || createDefaultEntry()),
        checks: {
          ...((prev[selectedDate] || createDefaultEntry()).checks || DEFAULT_CHECKS),
          [key]: value,
        },
      },
    }));
  };

  const updateEntryField = (field: string, value: string) => {
    setEntries((prev) => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || createDefaultEntry()),
        [field]: value,
      },
    }));
  };

  const updateWeekField = (field: string, value: string) => {
    setWeeklyVideo((prev) => ({
      ...prev,
      [weekKey]: {
        ...(prev[weekKey] || createDefaultWeek()),
        [field]: value,
      },
    }));
  };

  const resetDay = () => {
    setEntries((prev) => ({
      ...prev,
      [selectedDate]: createDefaultEntry(),
    }));
    setShowResetConfirm(false);
  };

  const connectGoogleDrive = async () => {
    if (!driveConfig.clientId || !driveConfig.folderId) {
      setDriveStatus("Add your Google OAuth Client ID and Drive folder ID first.");
      return;
    }
    try {
      setDriveStatus("Connecting to Google Drive...");
      const tokenResponse = await requestDriveAccessToken(driveConfig.clientId, driveConfig.isConnected ? "" : "consent");
      const expiresInSeconds = Number(tokenResponse.expires_in || 3600);
      setDriveConfig((prev) => ({
        ...prev,
        enabled: true,
        accessToken: tokenResponse.access_token,
        tokenExpiresAt: Date.now() + expiresInSeconds * 1000,
        isConnected: true,
      }));
      setDriveStatus("Google Drive connected. Midnight backups are enabled.");
    } catch (error: any) {
      console.error("Google Drive connection failed", error);
      setDriveStatus(error?.message || "Google Drive connection failed.");
    }
  };

  const saveManualDriveToken = () => {
    if (!driveConfig.folderId || !driveConfig.accessToken) {
      setDriveStatus("Paste a Drive folder ID and temporary access token first.");
      return;
    }
    setDriveConfig((prev) => ({
      ...prev,
      enabled: true,
      isConnected: true,
      authMode: "manual",
      tokenExpiresAt: prev.tokenExpiresAt || Date.now() + 3600 * 1000,
    }));
    setDriveStatus("Manual token saved. Midnight backups are enabled until the token expires.");
  };

  const disconnectGoogleDrive = () => {
    setDriveConfig((prev) => ({
      ...prev,
      enabled: false,
      accessToken: "",
      tokenExpiresAt: 0,
      isConnected: false,
    }));
    setDriveStatus("Google Drive disconnected.");
  };

  const jumpMonth = (direction: number) => {
    const currentMonthNumber = (manualMonth || calendarMonthData || MONTHS[0]).month;
    const nextMonthNumber = Math.max(1, Math.min(MONTHS.length, currentMonthNumber + direction));
    const nextMonth = MONTHS.find((m) => m.month === nextMonthNumber);
    if (nextMonth) {
      setMonthMode("manual");
      setManualMonth(nextMonth);
    }
  };

  return (
    <div style={s.page}>
      <style>{`
        @media (max-width: 767px) {
          input, textarea, select, button { font-size: 16px; }
          body { overflow-x: hidden; }
        }
      `}</style>
      <div style={s.container}>
        <div style={s.grid2}>
          <div style={s.heroCard}>
            <h1 style={s.h1}>Monastic Year Tracker</h1>
            <p style={{ ...s.heroSmall, marginTop: 8 }}>
              Track your daily habits, weekly content pipeline, readings, streaks, and year-long monastic progression.
            </p>
            <div style={{ ...s.grid3, marginTop: 16 }}>
              <div>
                <label style={{ ...s.label, color: "rgba(255,253,248,0.82)" }}>Date</label>
                <input
                  style={s.dateInputDark}
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    if (monthMode === "calendar") setManualMonth(null);
                  }}
                />
              </div>
              <div>
                <label style={{ ...s.label, color: "rgba(255,253,248,0.82)" }}>Wake Time</label>
                <input style={s.inputDark} value={profile.wakeTime} onChange={(e) => setProfile({ ...profile, wakeTime: e.target.value })} />
              </div>
              <div>
                <label style={{ ...s.label, color: "rgba(255,253,248,0.82)" }}>Work Hours / Week</label>
                <input style={s.inputDark} type="number" value={profile.workHoursWeekly} onChange={(e) => setProfile({ ...profile, workHoursWeekly: Number(e.target.value) || 0 })} />
              </div>
              <div>
                <label style={{ ...s.label, color: "rgba(255,253,248,0.82)" }}>School Hours / Week</label>
                <input style={s.inputDark} type="number" value={profile.schoolHoursWeekly} onChange={(e) => setProfile({ ...profile, schoolHoursWeekly: Number(e.target.value) || 0 })} />
              </div>
            </div>
          </div>

          <div style={{ ...s.card, ...((activeTab === "today" || activeTab === "month") ? s.stickyTopCard : {}) }}>
            <SectionTitle title="Momentum" description="Quick snapshot of consistency" stylesObj={s} />
            <div style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", fontSize: 14 }}>
              <span>Today score</span>
              <strong>{score}/{totalChecks}</strong>
            </div>
            <div style={{ marginBottom: 6, fontSize: 12 }}>{getDailyRank()}</div>
            <div style={s.progressWrap}>
              <div style={s.progressBar(scorePct)} />
            </div>
            <div style={{ ...s.grid2, marginTop: 16 }}>
              <div style={s.stat}>
                <div style={{ fontSize: 12, color: "#7c6346", textTransform: "uppercase", letterSpacing: "0.06em" }}>Current streak</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{streak} days</div>
                <div style={{ marginTop: 6, fontSize: 12, color: effectiveTheme.accent, fontWeight: 700 }}>{getBadge()}</div>
              </div>
              <div style={s.stat}>
                <div style={{ fontSize: 12, color: "#7c6346", textTransform: "uppercase", letterSpacing: "0.06em" }}>Weekly avg</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{weeklyStats.avg}</div>
                <div style={{ marginTop: 6, fontSize: 12, color: effectiveTheme.accent, fontWeight: 700 }}>{getWeeklyBossStatus()}</div>
                <div style={{ marginTop: 6, fontSize: 12, color: "#8b5e34", fontWeight: 700 }}>Level {level}</div>
              </div>
            </div>
            <div style={{ ...s.actionRow, marginTop: 16 }}>
              <button style={s.button} onClick={() => exportJson({ entries, weeklyVideo, profile, months: MONTHS })}>Export Data</button>
              <button style={s.buttonSecondary} onClick={() => setShowResetConfirm(true)}>Reset Day</button>
            </div>
            {showResetConfirm ? (
              <div style={{ ...s.stat, marginTop: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Reset today?</div>
                <div style={s.small}>This will clear the checklist and notes for {selectedDate}. Previous days stay intact.</div>
                <div style={{ ...s.actionRow, marginTop: 12 }}>
                  <button style={s.buttonSecondary} onClick={() => setShowResetConfirm(false)}>Cancel</button>
                  <button style={s.button} onClick={resetDay}>Confirm Reset</button>
                </div>
              </div>
            ) : null}
            {rolloverNotice ? (
              <div style={{ ...s.stat, marginTop: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Midnight rollover</div>
                <div style={s.small}>{rolloverNotice}</div>
                <div style={{ ...s.actionRow, marginTop: 10 }}>
                  <button style={s.buttonSecondary} onClick={() => setRolloverNotice("")}>Dismiss</button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ ...s.card, paddingTop: 14, paddingBottom: 14 }}>
          <div style={s.tabScroller}>
            <div style={s.tabRow}>
            {[
              ["today", "Today"],
              ["month", "Month Path"],
              ["weekly", "Weekly Video"],
              ["planner", "Planner"],
              ["system", "System"],
            ].map(([key, label]) => (
              <button key={key} style={activeTab === key ? s.tabActive : s.tab} onClick={() => setActiveTab(key)}>
                {label}
              </button>
            ))}
            </div>
          </div>
        </div>

        {activeTab === "today" && (
          <div style={s.grid2}>
            <div style={s.card}>
              <SectionTitle title="Daily Checklist" description={`${monthData.name} · ${monthData.theme}`} stylesObj={s} />
              {previewMode ? (
                <div style={{ ...s.stat, marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Preview mode</div>
                  <div style={s.small}>You are viewing {monthData.name} while your saved checklist and notes still belong to {selectedDate}.</div>
                </div>
              ) : null}
              {categoryGroups().map((category) => (
                <div key={category} style={{ marginBottom: 18 }}>
                  <div style={{ ...s.h3, marginBottom: 10 }}>{category}</div>
                  <div style={{ display: "grid", gap: 10 }}>
                    {CHECKLIST_META.filter((item) => item.category === category).map((item) => (
                      <label key={item.key} style={s.checklistItem}>
                        <input
                          type="checkbox"
                          checked={!!currentEntry.checks?.[item.key]}
                          onChange={(e) => updateCheck(item.key, e.target.checked)}
                          style={{ marginTop: 3, width: 20, height: 20 }}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={s.compactSection}>
              <div style={s.card}>
                <SectionTitle title="Reading Assignment" description={monthData.reading} stylesObj={s} />
                {previewMode ? (
                  <div style={{ ...s.stat, marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>Previewing a different path</div>
                    <div style={s.small}>Reading and focus below are shown for exploration only. Your notes still save to the selected date: {selectedDate}.</div>
                  </div>
                ) : null}
                <p style={s.small}>{monthData.detail}</p>
                <TraditionDetails monthData={monthData} s={s} />
                <div style={{ marginTop: 12 }}>
                  {monthData.focus.map((item) => (
                    <span key={item} style={s.badge}>{item}</span>
                  ))}
                </div>
                <div style={{ marginTop: 12 }}>
                  <label style={s.label}>Reading notes</label>
                  <textarea
                    style={s.textarea}
                    value={currentEntry.readingNotes || ""}
                    onChange={(e) => updateEntryField("readingNotes", e.target.value)}
                    placeholder="What stood out from today's reading?"
                  />
                </div>
              </div>

              <div style={s.card}>
                <SectionTitle title="Daily Reflection" description="One line is enough" stylesObj={s} />
                <textarea
                  style={{ ...s.textarea, minHeight: 140 }}
                  value={currentEntry.notes || ""}
                  onChange={(e) => updateEntryField("notes", e.target.value)}
                  placeholder="What did you notice today? What was hard? What changed?"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "month" && (
          <div style={s.grid2}>
            <div style={s.card}>
              <SectionTitle title={monthData.name} description={`Month ${monthData.month} · ${monthData.theme}`} stylesObj={s} />
              <div style={{ ...s.stat, marginBottom: 16 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>30-ish day phase window</div>
                <div style={s.small}>Start: {phaseWindow.start}</div>
                <div style={s.small}>End: {phaseWindow.end}</div>
                <div style={{ ...s.small, marginTop: 8 }}>Each new path begins on the first Monday on or after 30 days from the previous phase start.</div>
              </div>
              <p style={s.small}>{monthData.detail}</p>
              <TraditionDetails monthData={monthData} s={s} compact />
              <div style={{ marginTop: 16 }}>
                <div style={s.label}>Reading</div>
                <div style={s.stat}>{monthData.reading}</div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={s.label}>Monthly focus</div>
                {monthData.focus.map((item) => (
                  <span key={item} style={s.badge}>{item}</span>
                ))}
              </div>
              <div style={{ marginTop: 16, display: "grid", gap: 6 }}>
                <div style={s.small}><strong>Daily Rules:</strong> {monthData.rules.join(", ")}</div>
                <div style={s.small}><strong>Avoid:</strong> {monthData.avoid.join(", ")}</div>
                <div style={s.small}><strong>Signature Habit:</strong> {monthData.signature}</div>
              </div>
            </div>

            <div style={s.card}>
              <SectionTitle title="12-Month Path" description="Calendar mode follows your selected date. Manual mode lets you look ahead or reflect without changing the date itself." stylesObj={s} />
              <div style={{ ...s.actionRow, marginBottom: 14 }}>
                <button style={s.buttonSecondary} onClick={() => jumpMonth(-1)}>← Previous Path</button>
                <button style={s.buttonSecondary} onClick={() => jumpMonth(1)}>Next Path →</button>
              </div>
              <div style={{ ...s.actionRow, marginBottom: 14 }}>
                <button
                  style={monthMode === "calendar" ? s.button : s.buttonSecondary}
                  onClick={() => {
                    setMonthMode("calendar");
                    setManualMonth(null);
                  }}
                >
                  Sync to Calendar
                </button>
                <button
                  style={monthMode === "manual" ? s.button : s.buttonSecondary}
                  onClick={() => {
                    setMonthMode("manual");
                    setManualMonth(manualMonth || calendarMonthData || MONTHS[0]);
                  }}
                >
                  Manual Select
                </button>
                <div style={s.inlineInfo}>
                  <span>Active source:</span>
                  <strong>{monthMode === "calendar" ? `Calendar (${(calendarMonthData || MONTHS[0]).name})` : `Manual (${(manualMonth || monthData).name})`}</strong>
                </div>
              </div>
              <div style={{ ...s.stat, marginBottom: 14 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Calendar sync behavior</div>
                <div style={s.small}>Starting from {PROGRAM_START_DATE}, each path runs for at least 30 days and rolls over on the next Monday.</div>
                <div style={{ ...s.small, marginTop: 8 }}>Manual mode is safe for previewing future paths and reviewing past ones. It changes what you are viewing, not the selected date.</div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {MONTHS.map((month) => (
                  <div
                    key={month.month}
                    onClick={() => {
                      setMonthMode("manual");
                      setManualMonth(month);
                    }}
                    style={{
                      ...(month.month === monthData.month ? s.pillActive : s.pill),
                      cursor: "pointer",
                      transition: "transform 140ms ease, box-shadow 140ms ease",
                    }}
                  >
                    <div style={{ fontWeight: 700 }}>Month {month.month}: {month.name}</div>
                    <div style={{ fontSize: 11, marginTop: 4, opacity: month.month === monthData.month ? 0.9 : 0.7 }}>
                      Starts {getDateKey(PHASE_START_DATES[month.month - 1])}
                    </div>
                    {monthMode === "calendar" && month.month === (calendarMonthData || MONTHS[0]).month ? (
                      <div style={{ fontSize: 11, marginTop: 4, opacity: 0.85 }}>Calendar-selected</div>
                    ) : null}
                    {monthMode === "manual" && manualMonth && month.month === manualMonth.month ? (
                      <div style={{ fontSize: 11, marginTop: 4, opacity: 0.85 }}>Manual override</div>
                    ) : null}
                    <div style={{ fontSize: 14, opacity: month.month === monthData.month ? 0.9 : 0.7 }}>{month.theme}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "weekly" && (
          <div style={s.grid2}>
            <div style={s.card}>
              <SectionTitle title="Weekly Long-Form Dashboard" description={`Week of ${weekKey}`} stylesObj={s} />
              <div style={{ ...s.stat, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Recommended Episode Structure</div>
                <div style={s.small}>
                  {VIDEO_STRUCTURE.flow.map((step, i) => (
                    <div key={i}>{i + 1}. {step}</div>
                  ))}
                </div>
                <div style={{ ...s.small, marginTop: 8 }}>
                  <strong>This month’s focus:</strong> {monthData.longform}
                </div>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <div>
                  <label style={s.label}>Working title</label>
                  <input style={s.input} value={currentWeek.title || ""} onChange={(e) => updateWeekField("title", e.target.value)} placeholder="Week 3: Silence is harder than exercise" />
                </div>
                <div>
                  <label style={s.label}>Status</label>
                  <input style={s.input} value={currentWeek.status || ""} onChange={(e) => updateWeekField("status", e.target.value)} placeholder="Ideation / Gathering / Editing / Published" />
                </div>
                <div>
                  <label style={s.label}>Hook</label>
                  <textarea style={s.textarea} value={currentWeek.hook || ""} onChange={(e) => updateWeekField("hook", e.target.value)} placeholder="Strong opening idea for the episode" />
                </div>
                <div>
                  <label style={s.label}>Key message</label>
                  <textarea style={s.textarea} value={currentWeek.keyMessage || ""} onChange={(e) => updateWeekField("keyMessage", e.target.value)} placeholder="What is the deeper point of this week's story?" />
                </div>
                <div>
                  <label style={s.label}>Ending / takeaway</label>
                  <textarea style={s.textarea} value={currentWeek.ending || ""} onChange={(e) => updateWeekField("ending", e.target.value)} placeholder="How does the episode land?" />
                </div>
                <div>
                  <label style={s.label}>Shot list / clips to gather</label>
                  <textarea style={s.textarea} value={currentWeek.shots || ""} onChange={(e) => updateWeekField("shots", e.target.value)} placeholder="Morning run, talking head, yoga detail, family prep, reading excerpt, reflection..." />
                </div>
              </div>
            </div>

            <div style={s.compactSection}>
              <div style={s.card}>
                <SectionTitle title="Weekly Metrics" description="Your actions automatically count here" stylesObj={s} />
                <div style={s.grid3}>
                  <div style={{ ...s.stat, borderLeft: `4px solid ${effectiveTheme.accent}` }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Shorts posted</div>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{weeklyStats.shorts}</div>
                  </div>
                  <div style={{ ...s.stat, borderLeft: "4px solid #b07a3f" }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Long-form steps</div>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{weeklyStats.longformSteps}</div>
                  </div>
                  <div style={{ ...s.stat, borderLeft: monthMode === "manual" ? "4px solid #8b5bd1" : "4px solid #8b5e34" }}>
                    <div style={{ fontSize: 12, color: "#64748b" }}>Reading days</div>
                    <div style={{ fontSize: 28, fontWeight: 700 }}>{weeklyStats.readingDays}</div>
                  </div>
                </div>
                <p style={{ ...s.small, marginTop: 12 }}>
                  ✔ Checking 'Edit and post short' automatically increases Shorts count. ✔ Checking 'Long-form step' increases Long-form progress. ✔ Checking 'Reading' increases Reading days. Aim for one meaningful long-form step each day so Sunday does not become a bottleneck.
                </p>
              </div>
              <div style={s.card}>
                <SectionTitle title="Daily Long-Form Notes" description="Small progress compounds" stylesObj={s} />
                <textarea
                  style={s.textarea}
                  value={currentEntry.longformNotes || ""}
                  onChange={(e) => updateEntryField("longformNotes", e.target.value)}
                  placeholder="What did you do today that moved the weekly episode forward?"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "planner" && (
          <div style={s.grid2}>
            <div style={s.card}>
              <SectionTitle title="Suggested Daily Flow" description="Built around your 6:30 a.m. start" stylesObj={s} />
              <div style={s.mobileStack}>
                {todayPlan.map((item) => (
                  <div key={`${item.time}-${item.task}`} style={s.plannerRow}>
                    <div style={s.plannerTime}>{item.time}</div>
                    <div style={s.plannerTask}>{item.task}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={s.card}>
              <SectionTitle title="Planning Notes" description="Loose guide for energy and workload" stylesObj={s} />
              <div style={{ display: "grid", gap: 12 }}>
                <div style={s.stat}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Weekly commitments</div>
                  <div style={s.small}>Work: {profile.workHoursWeekly} hours</div>
                  <div style={s.small}>Audio design school: {profile.schoolHoursWeekly} hours</div>
                  <div style={s.small}>Daily short goal: {profile.dailyShortGoal}</div>
                  <div style={s.small}>Weekly long-form goal: {profile.weeklyLongformGoal}</div>
                </div>
                <div style={s.stat}>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>What often gets missed</div>
                  <ul style={{ margin: 0, paddingLeft: 18, color: "#334155", lineHeight: 1.6 }}>
                    <li>Hydration before momentum tasks</li>
                    <li>One-line daily intention</li>
                    <li>One tiny long-form step every day</li>
                    <li>Cleanup reset so tomorrow starts smoother</li>
                    <li>Tomorrow's video idea before bed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div style={s.grid2}>
            <div style={s.card}>
              <SectionTitle title="Methodology" description="Designed for consistency, not perfection" stylesObj={s} />
              <div style={{ ...s.stat, marginBottom: 12 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>Google Drive Backups</div>
                <div style={{ display: "grid", gap: 10 }}>
                  <div>
                    <label style={s.label}>Google OAuth Client ID</label>
                    <input
                      style={s.input}
                      value={driveConfig.clientId}
                      onChange={(e) => setDriveConfig((prev) => ({ ...prev, clientId: e.target.value }))}
                      placeholder="Paste your Google OAuth Client ID"
                    />
                  </div>
                  <div>
                    <label style={s.label}>Google Drive Folder ID</label>
                    <input
                      style={s.input}
                      value={driveConfig.folderId}
                      onChange={(e) => setDriveConfig((prev) => ({ ...prev, folderId: e.target.value }))}
                      placeholder="Paste your Google Drive folder ID"
                    />
                  </div>
                  <div>
                    <label style={s.label}>Temporary Drive Access Token</label>
                    <input
                      style={s.input}
                      value={driveConfig.accessToken}
                      onChange={(e) => setDriveConfig((prev) => ({ ...prev, accessToken: e.target.value, authMode: "manual" }))}
                      placeholder="Paste a temporary access token if popup auth is unavailable"
                    />
                  </div>
                  <div>
                    <label style={s.label}>Token Expiration Time</label>
                    <input
                      style={s.input}
                      type="datetime-local"
                      value={driveConfig.tokenExpiresAt ? new Date(driveConfig.tokenExpiresAt).toISOString().slice(0, 16) : ""}
                      onChange={(e) => setDriveConfig((prev) => ({ ...prev, tokenExpiresAt: e.target.value ? new Date(e.target.value).getTime() : 0 }))}
                    />
                  </div>
                  <div style={s.actionRow}>
                    <button style={s.button} onClick={connectGoogleDrive}>Connect Google Drive</button>
                    <button style={s.buttonSecondary} onClick={saveManualDriveToken}>Save Manual Token</button>
                    <button style={s.buttonSecondary} onClick={disconnectGoogleDrive}>Disconnect</button>
                  </div>
                  <div style={s.small}>
                    Status: {driveConfig.isConnected ? "Connected" : "Not connected"}
                    {driveConfig.tokenExpiresAt ? ` · Token expires ${new Date(driveConfig.tokenExpiresAt).toLocaleString()}` : ""}
                  </div>
                  {isSandboxEnvironment() ? (
                    <div style={s.small}>
                      This canvas runs in a sandbox where Google popup auth is blocked. Use a deployed site for the Connect button, or paste a temporary token manually here.
                    </div>
                  ) : null}
                  {driveStatus ? <div style={s.small}>{driveStatus}</div> : null}
                </div>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                <p style={s.small}>This version is fully standalone. It does not rely on path aliases, shadcn UI components, or third-party icon packages that may fail in a sandboxed environment.</p>
                <p style={s.small}>It uses a lightweight local-first approach. Your data stays in your browser through local storage, which keeps the setup simple and fast.</p>
                <p style={s.small}>The routine is organized around Morning, Creation, Life, and Evening so the system remains realistic for a parent, creator, worker, and student.</p>
                <p style={s.small}>Small self-tests run in the console on load to verify date handling, week mapping, Monday phase rollovers, fallback themes, score counting, streak calculation, month ordering, and backup naming.</p>
              </div>
            </div>
            <div style={s.card}>
              <SectionTitle title="Notion Setup Blueprint" description="Mirror this app in Notion if you want a cloud version" stylesObj={s} />
              <div style={{ display: "grid", gap: 12 }}>
                <div style={s.stat}>
                  <div style={{ fontWeight: 700 }}>Database 1: Daily Logs</div>
                  <div style={s.small}>Fields: Date, Month Tradition, Score, Short Posted, Long-form Step, Reading, Notes, Reflection</div>
                </div>
                <div style={s.stat}>
                  <div style={{ fontWeight: 700 }}>Database 2: Weekly Episodes</div>
                  <div style={s.small}>Fields: Week Of, Title, Hook, Key Message, Ending, Shot List, Status</div>
                </div>
                <div style={s.stat}>
                  <div style={{ fontWeight: 700 }}>Recommended views</div>
                  <div style={s.small}>Calendar for daily logs, board by month tradition, and a weekly episode pipeline board.</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
