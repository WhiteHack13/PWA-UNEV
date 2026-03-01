import { StorageKeys, readJson, writeJson } from "./storage";

export function getSession() {
  return readJson(StorageKeys.SESSION, null);
}

export function setSession(session) {
  writeJson(StorageKeys.SESSION, session);
}

export function clearSession() {
  localStorage.removeItem(StorageKeys.SESSION);
}

export function registerUser({ name, email, password }) {
  const users = readJson(StorageKeys.USERS, []);
  const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) throw new Error("Ese correo ya está registrado.");
  const newUser = { id: crypto.randomUUID(), name, email, password };
  users.push(newUser);
  writeJson(StorageKeys.USERS, users);
  setSession({ email: newUser.email, name: newUser.name });
  return { email: newUser.email, name: newUser.name };
}

export function loginUser({ email, password }) {
  const users = readJson(StorageKeys.USERS, []);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) throw new Error("Credenciales incorrectas.");
  setSession({ email: user.email, name: user.name });
  return { email: user.email, name: user.name };
}
