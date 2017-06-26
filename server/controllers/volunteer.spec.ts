import * as request from 'request';
import Volunteer from '../models/volunteer';
import VolunteerController from './volunteer';

const base_url = 'http://localhost:3000/api';

Volunteer.prototype.find = function (callback) {
  console.log('in the mock');
  callback();
};

let req, res;
beforeEach(() => {
  console.log('*** BEGIN beforeEach() ***');
  req = {
    query: {},
    params: {},
    body: {},
  };
  res = {
    status: jasmine.createSpy('status').and.callFake((msg) => {
      console.log(`res.status called with ${msg}`);
      return this;
    }),
    send: jasmine.createSpy('send').and.callFake((msg) => {
      console.log(`res.send called with ${msg}`);
      return this;
    })
  };
  console.log(res.status(200));
  console.log('*** END beforeEach() ***');
});

afterEach(() => {
  expect(res.status.calls.count).toEqual(1);
  expect(res.send.calls.count).toEqual(1);
});

const volunteerController = new VolunteerController;

describe('VolunteerController', function () {

  describe('Get all', function () {

    it('returns status code 200', function (done) {
      volunteerController.getAll(req, res);
      expect(Volunteer.find.calls.count).toEqual(1);
      expect(res.status).toHaveBeenCalledWith(200);
      done();
    });

  });

  // describe('Count all', function () {
  //
  //   it('returns status code 200', function (done) {
  //     request.get(`${base_url}/volunteers`, function (error, response) {
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  //   });
  //
  // });
  //
  // describe('Insert', function () {
  //
  // });
  //
  // describe('Get by ID', function () {
  //
  // });
  //
  // describe('Update by ID', function () {
  //
  // });
  //
  // describe('Delete by ID', function () {
  //
  // });

});
