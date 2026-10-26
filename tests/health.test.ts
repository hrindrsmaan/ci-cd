import request from "supertest";
import { createApp } from "../src/app";
import { STARTED_AT } from "../src/routes";

const app = createApp();

describe("GET /health", () => {
  it("returns 200 with status ok", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  it("reports a numeric uptime and the startup timestamp", async () => {
    const res = await request(app).get("/api/health");

    expect(typeof res.body.uptime).toBe("number");
    expect(res.body.uptime).toBeGreaterThanOrEqual(0);
    expect(res.body.startedAt).toBe(STARTED_AT);
  });
});
