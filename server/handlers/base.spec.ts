import OrganizationHandler from './organization';
import UserHandler from './user';
import VisitHandler from './visit';
import VolunteerHandler from './volunteer';

let req, res;

// Add each BaseHandler implementation here
const handlers = [
  new OrganizationHandler,
  new UserHandler,
  new VisitHandler,
  new VolunteerHandler,
];

handlers.forEach(handler => {

  describe(typeof handler, () => {

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

    describe('Get all', () => {

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

    describe('Count all', () => {

      it('returns a JSON body', done => {
        spyOn(handler.model, 'count').and.callFake(cb => {
          cb();
        });
        handler.count(req, res);
        expect(res.json.calls.count()).toEqual(1);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(0);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 400 if there is an error', done => {
        spyOn(handler.model, 'count').and.callFake(cb => {
          cb(true);
        });
        handler.count(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.send.calls.count()).toEqual(1);
        expect(res.status.calls.count()).toEqual(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(console.error).toHaveBeenCalled();
        done();
      });

    });

    describe('Insert', () => {

      it('returns status code 201', done => {

        spyOn(handler.model.prototype, 'save').and.callFake(cb => {
          cb();
        });
        handler.insert(req, res);
        expect(res.json.calls.count()).toEqual(1);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 409 if there is a duplicate key error', done => {
        spyOn(handler.model.prototype, 'save').and.callFake(cb => {
          cb({ code: 11000 });
        });
        handler.insert(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.send.calls.count()).toEqual(1);
        expect(res.status.calls.count()).toEqual(1);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(console.error).toHaveBeenCalled();
        done();
      });

      it('returns status code 400 if there is an error', done => {
        spyOn(handler.model.prototype, 'save').and.callFake(cb => {
          cb(true);
        });
        handler.insert(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.send.calls.count()).toEqual(1);
        expect(res.status.calls.count()).toEqual(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(console.error).toHaveBeenCalled();
        done();
      });

    });

    describe('Get by ID', () => {

      it('returns a JSON body', done => {

        spyOn(handler.model, 'findById').and.callFake((id, cb) => {
          cb(false, true);
        });
        handler.get(req, res);
        expect(res.json.calls.count()).toEqual(1);
        expect(res.sendStatus.calls.count()).toEqual(0);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if there is no object is found', done => {
        spyOn(handler.model, 'findById').and.callFake((id, cb) => {
          cb(false, false);
        });
        handler.get(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if it receives an invalid key', done => {
        spyOn(handler.model, 'findById').and.callFake((id, cb) => {
          cb(true, true);
        });
        handler.get(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).toHaveBeenCalled();
        done();
      });

    });

    describe('Update by ID', () => {

      it('returns a JSON body', done => {

        spyOn(handler.model, 'findByIdAndUpdate').and.callFake((id, obj, cb) => {
          cb(false, true);
        });
        handler.update(req, res);
        expect(res.json.calls.count()).toEqual(1);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(0);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 409 if there is a duplicate key error', done => {
        spyOn(handler.model, 'findByIdAndUpdate').and.callFake((id, obj, cb) => {
          cb({ code: 11000 }, true);
        });
        handler.update(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.send.calls.count()).toEqual(1);
        expect(res.status.calls.count()).toEqual(1);
        expect(res.sendStatus.calls.count()).toEqual(0);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(console.error).toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if there is no object is found', done => {
        spyOn(handler.model, 'findByIdAndUpdate').and.callFake((id, obj, cb) => {
          cb(false, false);
        });
        handler.update(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if it receives an invalid key', done => {
        spyOn(handler.model, 'findByIdAndUpdate').and.callFake((id, obj, cb) => {
          cb(true, true);
        });
        handler.update(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).toHaveBeenCalled();
        done();
      });

    });

    describe('Delete by ID', () => {

      it('returns status code 204', done => {

        spyOn(handler.model, 'findByIdAndRemove').and.callFake((id, cb) => {
          cb(false, true);
        });
        handler.delete(req, res);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if there is no object is found', done => {
        spyOn(handler.model, 'findByIdAndRemove').and.callFake((id, cb) => {
          cb(false, false);
        });
        handler.delete(req, res);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if it receives an invalid key', done => {
        spyOn(handler.model, 'findByIdAndRemove').and.callFake((id, cb) => {
          cb(true, true);
        });
        handler.delete(req, res);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).toHaveBeenCalled();
        done();
      });

    });

  });

});
