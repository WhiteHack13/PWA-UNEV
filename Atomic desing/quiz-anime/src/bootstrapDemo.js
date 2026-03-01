import { StorageKeys, readJson, writeJson } from "./services/storage";

export function ensureDemoUser() {
  const users = readJson(StorageKeys.USERS, []);
  const exists = users.some(u => u.email?.toLowerCase() === "demo@anime.com");
  if (!exists) {
    users.push({
      id: crypto.randomUUID(),
      name: "Demo",
      email: "demo@anime.com",
      password: "demo1234"
    });
    writeJson(StorageKeys.USERS, users);
  }
}
