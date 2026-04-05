import { StorageKeys, readJson, writeJson } from "./storage";

export function saveResult({ userEmail, userName, category, score, total, breakdown }) {
  const results = readJson(StorageKeys.RESULTS, []);
  results.unshift({
    id: Math.random().toString(36).substring(2, 15),
    userEmail,
    userName,
    category,
    score,
    total,
    breakdown, // { correct, incorrect }
    createdAt: Date.now(),
  });
  writeJson(StorageKeys.RESULTS, results);
}

export function getResultsForUser(userEmail) {
  const results = readJson(StorageKeys.RESULTS, []);
  return results.filter(r => r.userEmail === userEmail);
}

export function getAllResults() {
  return readJson(StorageKeys.RESULTS, []);
}
