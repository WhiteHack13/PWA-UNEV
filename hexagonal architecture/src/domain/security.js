import crypto from "crypto";

export const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");

export const randomToken = (bytes = 64) => crypto.randomBytes(bytes).toString("hex");
