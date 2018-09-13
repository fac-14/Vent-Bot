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

describe("Test the 404 route", ()=> {
  test("Returns with status code 404", done => {
    supertest(app)
    .get("/wrongway")
    .then(response => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});

describe("Test CSS 500 route", () => {
  test("Returns with status code of 500", done => {
    supertest(app)
    .get("/test500")
    .then(response => {
      expect(response.statusCode).toBe(500);
      done();
    });
  });
});

// describe("Test the send-message POST route", () => {
//   test("Returns with a redirect status code of 302", done => {
//     supertest(app)
//       .post('/send-message')
//       .then( response => {
//         expect(response.statusCode).toBe(200)
//         done();
//       });
//   });
// }); 
