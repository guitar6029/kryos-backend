import request from "supertest";
import app from "../src/app.js";

describe("Auth register", () => {
  it("register a new user and returns 201", async () => {
    const email = `test_${Date.now()}@example.com`;

    const res = await request(app).post("/auth/register").send({
      name: "Test User",
      email,
      password: "StrongPass123!",
      confirmPassword: "StrongPass123!",
    });

    console.log(res.status, res.body)

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe(email);
  });
});
