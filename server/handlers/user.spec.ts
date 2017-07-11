import UserHandler from './user';

const handler = new UserHandler;
let req, res;

describe(typeof UserHandler, () => {

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

  // describe('Login', () => {
  //   afterEach(() => {
  //     expect(handler.model.find.calls.count()).toEqual(1);
  //   });
  //
  //   it('returns a JSON body', done => {
  //     spyOn(handler.model, 'findOne').and.callFake((obj, cb) => {
  //       cb();
  //     });
  //     handler.login(req, res);
  //     expect(res.json.calls.count()).toEqual(1);
  //     expect(res.send.calls.count()).toEqual(0);
  //     expect(res.status.calls.count()).toEqual(0);
  //     expect(console.error).not.toHaveBeenCalled();
  //     done();
  //   });
  //
  //   it('returns status code 401 if there is an error', done => {
  //     spyOn(handler.model, 'findOne').and.callFake((obj, cb) => {
  //       cb(true);
  //     });
  //     handler.login(req, res);
  //     expect(res.json.calls.count()).toEqual(0);
  //     expect(res.send.calls.count()).toEqual(1);
  //     expect(res.status.calls.count()).toEqual(1);
  //     expect(res.status).toHaveBeenCalledWith(401);
  //     expect(console.error).toHaveBeenCalled();
  //     done();
  //   });
  // });
});
