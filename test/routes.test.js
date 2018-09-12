const supertest = require('supertest');
const app = require("../src/app.js");

// test home route
describe("Test the home GET route", () => {
  test("Returns with status code 200", done => {
    supertest(app)
      .get("/")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

// test chat route
describe("Test the /chat GET route", () => {
  test("Returns with status code 200", done => {
    supertest(app)
      .get("/chat")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

// test resources route
describe("Test the /resources GET route", () => {
  test("Returns with status code 200", done => {
    supertest(app)
      .get("/resources")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

// test about route
describe("Test the /about GET route", () => {
  test("Returns with status code 200", done => {
    supertest(app)
    .get("/about")
    .then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});

