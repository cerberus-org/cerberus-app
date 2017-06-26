import Volunteer from '../models/volunteer';
import VolunteerController from './volunteer';

const volunteerController = new VolunteerController;
let req, res;

describe('VolunteerController', function () {
  beforeEach(() => {
    req = {
      query: {},
      params: {},
      body: {},
    };
    res = {
      json: jasmine.createSpy('json').and.callFake(() => {
        return res;
      }),
      status: jasmine.createSpy('status').and.callFake(() => {
        return res;
      }),
      send: jasmine.createSpy('send').and.callFake(() => {
        return res;
      })
    };
  });

  describe('Get all', function () {

    afterEach(() => {
      expect(Volunteer.find.calls.count()).toEqual(1);
    });

    it('returns status code 200', function (done) {
      spyOn(Volunteer, 'find').and.callFake((obj, cb) => {
        cb();
      });
      volunteerController.getAll(req, res);
      expect(res.json.calls.count()).toEqual(1);
      expect(res.send.calls.count()).toEqual(0);
      expect(res.status.calls.count()).toEqual(0);
      done();
    });

    it('returns status code 400 if there is an error', function (done) {
      spyOn(Volunteer, 'find').and.callFake((obj, cb) => {
        cb(true);
      });
      volunteerController.getAll(req, res);
      expect(res.json.calls.count()).toEqual(0);
      expect(res.send.calls.count()).toEqual(1);
      expect(res.status.calls.count()).toEqual(1);
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
