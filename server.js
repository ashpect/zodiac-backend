import http from "node:http";
import { signFor } from "./zodiac.js";

const PORT = Number(process.env.PORT) || 4000;
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function ageOn(today, dob) {
  let age = today.getUTCFullYear() - dob.getUTCFullYear();
  const beforeBirthday =
    today.getUTCMonth() < dob.getUTCMonth() ||
    (today.getUTCMonth() === dob.getUTCMonth() && today.getUTCDate() < dob.getUTCDate());
  if (beforeBirthday) age -= 1;
  return age;
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return json(res, 204, {});
  if (req.method === "GET" && req.url === "/health") return json(res, 200, { ok: true });
  if (req.method !== "POST" || req.url !== "/api/zodiac") {
    return json(res, 404, { error: "not found" });
  }

  let body;
  try {
    body = JSON.parse(await readBody(req));
  } catch {
    return json(res, 400, { error: "body must be JSON" });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const dob = typeof body.dob === "string" ? body.dob : "";
  if (!name) return json(res, 400, { error: "name is required" });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return json(res, 400, { error: "dob must be YYYY-MM-DD" });

  const date = new Date(`${dob}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dob) {
    return json(res, 400, { error: "dob is not a real date" });
  }
  if (date > new Date()) return json(res, 400, { error: "dob is in the future" });

  const sign = signFor(date.getUTCMonth() + 1, date.getUTCDate());
  return json(res, 200, {
    name,
    dob,
    sign: sign.name,
    symbol: sign.symbol,
    element: sign.element,
    dates: sign.dates,
    bornOn: DAYS[date.getUTCDay()],
    age: ageOn(new Date(), date),
    funFacts: sign.facts,
  });
});

server.listen(PORT, () => {
  console.log(`zodiac backend listening on http://localhost:${PORT}`);
});
