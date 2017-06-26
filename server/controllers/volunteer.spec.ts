import Volunteer from '../models/volunteer';
import VolunteerController from './volunteer';

const volunteerController = new VolunteerController;
let req, res;

describe('VolunteerController', function () {

  beforeEach(() => {
    spyOn(console, 'error').and.stub();
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

    it('returns a JSON body', function (done) {
      spyOn(Volunteer, 'find').and.callFake((obj, cb) => {
        cb();
      });
      volunteerController.getAll(req, res);
      expect(res.json.calls.count()).toEqual(1);
      expect(res.send.calls.count()).toEqual(0);
      expect(res.status.calls.count()).toEqual(0);
      expect(console.error).not.toHaveBeenCalled();
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
      expect(res.status).toHaveBeenCalledWith(400);
      expect(console.error).toHaveBeenCalled();
      done();
    });

  });

  describe('Count all', function () {

    it('returns a JSON body', function (done) {
      spyOn(Volunteer, 'count').and.callFake(cb => {
        cb();
      });
      volunteerController.count(req, res);
      expect(res.json.calls.count()).toEqual(1);
      expect(res.send.calls.count()).toEqual(0);
      expect(res.status.calls.count()).toEqual(0);
      expect(console.error).not.toHaveBeenCalled();
      done();
    });

    it('returns status code 400 if there is an error', function (done) {
      spyOn(Volunteer, 'count').and.callFake(cb => {
        cb(true);
      });
      volunteerController.count(req, res);
      expect(res.json.calls.count()).toEqual(0);
      expect(res.send.calls.count()).toEqual(1);
      expect(res.status.calls.count()).toEqual(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(console.error).toHaveBeenCalled();
      done();
    });

  });

  describe('Insert', function () {

    it('returns status code 201', function (done) {

      spyOn(Volunteer.prototype, 'save').and.callFake(cb => {
        cb();
      });
      volunteerController.insert(req, res);
      expect(res.json.calls.count()).toEqual(1);
      expect(res.send.calls.count()).toEqual(0);
      expect(res.status.calls.count()).toEqual(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(console.error).not.toHaveBeenCalled();
      done();
    });

    it('returns status code 409 if there is a duplicate key error', function (done) {
      spyOn(Volunteer.prototype, 'save').and.callFake(cb => {
        cb({ code: 11000 });
      });
      volunteerController.insert(req, res);
      expect(res.json.calls.count()).toEqual(0);
      expect(res.send.calls.count()).toEqual(1);
      expect(res.status.calls.count()).toEqual(1);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(console.error).toHaveBeenCalled();
      done();
    });

    it('returns status code 400 if there is an error', function (done) {
      spyOn(Volunteer.prototype, 'save').and.callFake(cb => {
        cb(true);
      });
      volunteerController.insert(req, res);
      expect(res.json.calls.count()).toEqual(0);
      expect(res.send.calls.count()).toEqual(1);
      expect(res.status.calls.count()).toEqual(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(console.error).toHaveBeenCalled();
      done();
    });

  });

  describe('Get by ID', function () {

  });

  describe('Update by ID', function () {

  });

  describe('Delete by ID', function () {

  });

});
