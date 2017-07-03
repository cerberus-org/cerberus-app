import VisitHandler from './visit';

const handler = new VisitHandler;
let req, res;

describe(typeof VisitHandler, () => {

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
      }),
      sendStatus: jasmine.createSpy('sendStatus').and.callFake(() => {
        return res;
      })
    };
  });

  describe('Get by date', () => {
    afterEach(() => {
      expect(handler.model.find.calls.count()).toEqual(1);
    });

    it('returns a JSON body', done => {
      spyOn(handler.model, 'find').and.callFake((obj, cb) => {
        cb();
      });
      handler.getByDate(req, res);
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
      handler.getByDate(req, res);
      expect(res.json.calls.count()).toEqual(0);
      expect(res.send.calls.count()).toEqual(1);
      expect(res.status.calls.count()).toEqual(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(console.error).toHaveBeenCalled();
      done();
    });
  });
});
