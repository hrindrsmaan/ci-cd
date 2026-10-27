import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();

describe("GET /", () => {
  it("returns 200 with an HTML page", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/html/);
  });

  it("renders the CI/CD learnings content", async () => {
    const res = await request(app).get("/");

    expect(res.text).toContain("<title>CI/CD Learnings</title>");
    expect(res.text).toContain("GitHub Actions");
  });
});
