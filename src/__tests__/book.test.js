const request = require("supertest");
const app = require("../index");

describe("Book API", () => {
  beforeEach(async () => {
    // Lakukan sesuatu sebelum test
  });

  describe("GET /api/v1/book", () => {
    it("should return all books", async () => {
      const response = await request(app).get("/api/v1/book");
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Books retrieved successfully");
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/v1/book", () => {
    it("should create a new book", async () => {
      const response = await request(app).post("/api/v1/book").send({
        code: "B001",
        title: "Book 1",
        author: "Author 1",
        stock: 10,
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Book created successfully");
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("code");
      expect(response.body.data.title).toBe("Book 1");
      expect(response.body.data.author).toBe("Author 1");
      expect(response.body.data.stock).toBe(10);
    });
  });

  describe("GET /api/v1/book/:id", () => {
    it("should return a single book", async () => {
      const response = await request(app).get("/api/v1/book/1");
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Book retrieved successfully");
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("code");
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("author");
      expect(response.body.data).toHaveProperty("stock");
    });
  });

  describe("PUT /api/v1/book/:id", () => {
    it("should update a book", async () => {
      const response = await request(app).put("/api/v1/book/1").send({
        code: "B001",
        title: "Book 2",
        author: "Author 2",
        stock: 20,
      });
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.message).toBe("Book updated successfully");
      expect(response.body.data).toBeInstanceOf(Object);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("code");
      expect(response.body.data.title).toBe("Book 2");
      expect(response.body.data.author).toBe("Author 2");
      expect(response.body.data.stock).toBe(20);
    });
  });

  describe("DELETE /api/v1/book/:id", () => {
    it("should delete a book", async () => {
      const response = await request(app).delete("/api/v1/book/1");
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
    });
  });
});
