import * as request from 'request';
import createSpy = jasmine.createSpy;

const base_url = 'http://localhost:3000/api';

let req, res;
beforeEach(function() {
  req = {
    query: {},
    params: {},
    body: {},
  };

  res = {
    status: createSpy('status').and.callFake(function(msg) {
      return this;
    }),
    send: createSpy('send').and.callFake(function(msg) {
      return this;
    })
  };
});

afterEach(function() {
  expect(res.status.callCount).toEqual(1);
  expect(res.send.callCount).toEqual(1);
});

describe('VolunteerController', function() {

  describe('Get all', function() {

    it('returns status code 200', function(done) {
      request.get(`${base_url}/volunteers`, function(error, response) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

  });

  describe('Count all', function() {

    it('returns status code 200', function(done) {
      request.get(`${base_url}/volunteers`, function(error, response) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

  });

  describe('Insert', function() {

  });

  describe('Get by ID', function() {

  });

  describe('Update by ID', function() {

  });

  describe('Delete by ID', function() {

  });

});
