import VolunteerHandler from './volunteer';

const handler = new VolunteerHandler;
let req, res;

describe(typeof VolunteerHandler, () => {

  beforeEach(() => {
    spyOn(console, 'error').and.stub();
    req = {
      query: {},
      params: {},
      body: {},
    };
    res = {
      json: jasmine.createSpy('json').and.callFake(() => res),
      status: jasmine.createSpy('status').and.callFake(() => res),
      send: jasmine.createSpy('send').and.callFake(() => res),
      sendStatus: jasmine.createSpy('sendStatus').and.callFake(() => res)
    };
  });

  describe('Get by locationId', () => {

    afterEach(() => {
      expect(handler.model.find.calls.count()).toEqual(1);
    });

    it('returns a JSON body', done => {
      spyOn(handler.model, 'find').and.callFake((obj, cb) => {
        cb();
      });
      handler.getAll(req, res);
      expect(res.json.calls.count()).toEqual(1);
      expect(res.send.calls.count()).toEqual(0);
      expect(res.status.calls.count()).toEqual(0);
      expect(console.error).not.toHaveBeenCalled();
      done();
    });

    it('returns status code 400 if there is an error', done => {
      spyOn(handler.model, 'find').and.callFake((obj, cb) => {
        cb(true);
      });
      handler.getAll(req, res);
      expect(res.json.calls.count()).toEqual(0);
      expect(res.send.calls.count()).toEqual(1);
      expect(res.status.calls.count()).toEqual(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(console.error).toHaveBeenCalled();
      done();
    });
  });

  describe('Get by organizationId', () => {

    afterEach(() => {
      expect(handler.model.find.calls.count()).toEqual(1);
    });

    it('returns a JSON body', done => {
      spyOn(handler.model, 'find').and.callFake((obj, cb) => {
        cb();
      });
      handler.getAll(req, res);
      expect(res.json.calls.count()).toEqual(1);
      expect(res.send.calls.count()).toEqual(0);
      expect(res.status.calls.count()).toEqual(0);
      expect(console.error).not.toHaveBeenCalled();
      done();
    });

    it('returns status code 400 if there is an error', done => {
      spyOn(handler.model, 'find').and.callFake((obj, cb) => {
        cb(true);
      });
      handler.getAll(req, res);
      expect(res.json.calls.count()).toEqual(0);
      expect(res.send.calls.count()).toEqual(1);
      expect(res.status.calls.count()).toEqual(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(console.error).toHaveBeenCalled();
      done();
    });
  });
});
