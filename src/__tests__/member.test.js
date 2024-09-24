const request = require("supertest");
const app = require("../index");

describe("Member API", () => {
  beforeEach(async () => {
    // Lakukan sesuatu sebelum test
  });

  describe("GET /api/v1/member", () => {
    it("should return all members", async () => {
      const response = await request(app).get("/api/v1/member");
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Members retrieved successfully");
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/v1/member", () => {
    it("should create a new member", async () => {
      const response = await request(app).post("/api/v1/member").send({
        code: "M001",
        name: "John Doe",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Member created successfully");
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("code");
      expect(response.body.data.name).toBe("John Doe");
    });
  });

  describe("GET /api/v1/member/:id", () => {
    it("should return a single member", async () => {
      const response = await request(app).get("/api/v1/member/1");
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Member retrieved successfully");
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("code");
      expect(response.body.data).toHaveProperty("name");
    });
  });

  describe("PUT api/v1/member/:id", () => {
    it("should update a member", async () => {
      const response = await request(app).put("/api/v1/member/1").send({
        code: "M001",
        name: "Jane Doe",
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Member updated successfully");
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("code");
      expect(response.body.data.name).toBe("Jane Doe");
    });
  });

  describe("DELETE /api/v1/member/:id", () => {
    it("should delete a member", async () => {
      const response = await request(app).delete("/api/v1/member/1");
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Member deleted successfully");
    });
  });
});
