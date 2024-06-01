var request = require("supertest");
var app = require("../index");

describe("GET /api/users/all-users", function () {
  it("respond with json", function (done) {
    request(app).get("/").expect(404, done);
  });
});
