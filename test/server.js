let expect  = require("chai").expect;
let request = require("request");

let authToken = ""

describe("Test System", function() {

    describe("GET /ok", function() {
  
      var url = "http://localhost:8000/ok";
  
      it("returns status 200", function(done) {
        request(url, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });
  
      it("returns success", function(done) {
        request(url, function(error, response, body) {
            expect((res) => {
                assert.equal(res.body.status, 'true', 'Expected status true')
            })
            done();
        });
      });
  
    })

    describe("GET /health", function() {
  
        var url = "http://localhost:8000/health";
    
        it("returns status 200", function(done) {
          request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
        });

        it("returns success", function(done) {
            request(url, function(error, response, body) {
                expect((res) => {
                    assert.equal(res.body.status, 'true', 'Expected status true')
                });
                done();
            });
        })
      })

      describe("GET /token", function() {
  
        var url = "http://localhost:8000/token";
    
        it("returns status 200", function(done) {
            request(url, function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it("returns token", function(done) {
            request(url, function(error, response, body) {
                expect((res) => {
                    assert.equal(res.body.status, 'true', 'Expected status true')
                    authToken = body.token;
                });
                done();
            });
        })
    });
});