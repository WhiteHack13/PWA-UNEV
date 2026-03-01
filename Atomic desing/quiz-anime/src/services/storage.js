export const StorageKeys = {
  USERS: "aqp_users",
  SESSION: "aqp_session",
  RESULTS: "aqp_results",
};

export function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
