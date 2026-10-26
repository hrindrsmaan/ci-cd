import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();

describe("GET /hello", () => {
  it("returns 200 with the hello world message", async () => {
    const res = await request(app).get("/api/hello");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Hello, World!" });
  });

  it("responds with JSON content type", async () => {
    const res = await request(app).get("/api/hello");

    expect(res.headers["content-type"]).toMatch(/application\/json/);
  });
});
