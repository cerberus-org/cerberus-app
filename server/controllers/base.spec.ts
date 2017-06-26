import VolunteerController from './volunteer';

let req, res;

const controllers = [
  new VolunteerController
];

controllers.forEach(controller => {

  describe(typeof controller, () => {

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
        expect(controller.model.find.calls.count()).toEqual(1);
      });

      it('returns a JSON body', done => {
        spyOn(controller.model, 'find').and.callFake((obj, cb) => {
          cb();
        });
        controller.getAll(req, res);
        expect(res.json.calls.count()).toEqual(1);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(0);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 400 if there is an error', done => {
        spyOn(controller.model, 'find').and.callFake((obj, cb) => {
          cb(true);
        });
        controller.getAll(req, res);
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
        spyOn(controller.model, 'count').and.callFake(cb => {
          cb();
        });
        controller.count(req, res);
        expect(res.json.calls.count()).toEqual(1);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(0);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 400 if there is an error', done => {
        spyOn(controller.model, 'count').and.callFake(cb => {
          cb(true);
        });
        controller.count(req, res);
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

        spyOn(controller.model.prototype, 'save').and.callFake(cb => {
          cb();
        });
        controller.insert(req, res);
        expect(res.json.calls.count()).toEqual(1);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 409 if there is a duplicate key error', done => {
        spyOn(controller.model.prototype, 'save').and.callFake(cb => {
          cb({ code: 11000 });
        });
        controller.insert(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.send.calls.count()).toEqual(1);
        expect(res.status.calls.count()).toEqual(1);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(console.error).toHaveBeenCalled();
        done();
      });

      it('returns status code 400 if there is an error', done => {
        spyOn(controller.model.prototype, 'save').and.callFake(cb => {
          cb(true);
        });
        controller.insert(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.send.calls.count()).toEqual(1);
        expect(res.status.calls.count()).toEqual(1);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(console.error).toHaveBeenCalled();
        done();
      });

    });

    describe('Get by ID', () => {

      it('returns status code 201', done => {

        spyOn(controller.model, 'findById').and.callFake((id, cb) => {
          cb(false, true);
        });
        controller.get(req, res);
        expect(res.json.calls.count()).toEqual(1);
        expect(res.sendStatus.calls.count()).toEqual(0);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if there is no object is found', done => {
        spyOn(controller.model, 'findById').and.callFake((id, cb) => {
          cb(false, false);
        });
        controller.get(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if it receives an invalid key', done => {
        spyOn(controller.model, 'findById').and.callFake((id, cb) => {
          cb(true, true);
        });
        controller.get(req, res);
        expect(res.json.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).toHaveBeenCalled();
        done();
      });

    });

    describe('Update by ID', () => {

      it('returns status code 201', done => {

        spyOn(controller.model, 'findByIdAndUpdate').and.callFake((id, obj, cb) => {
          cb(false, true);
        });
        controller.update(req, res);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 409 if there is a duplicate key error', done => {
        spyOn(controller.model, 'findByIdAndUpdate').and.callFake((id, obj, cb) => {
          cb({ code: 11000 }, true);
        });
        controller.update(req, res);
        expect(res.send.calls.count()).toEqual(1);
        expect(res.status.calls.count()).toEqual(1);
        expect(res.sendStatus.calls.count()).toEqual(0);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(console.error).toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if there is no object is found', done => {
        spyOn(controller.model, 'findByIdAndUpdate').and.callFake((id, obj, cb) => {
          cb(false, false);
        });
        controller.update(req, res);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if it receives an invalid key', done => {
        spyOn(controller.model, 'findByIdAndUpdate').and.callFake((id, obj, cb) => {
          cb(true, true);
        });
        controller.update(req, res);
        expect(res.send.calls.count()).toEqual(0);
        expect(res.status.calls.count()).toEqual(0);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).toHaveBeenCalled();
        done();
      });

    });

    describe('Delete by ID', () => {

      it('returns status code 201', done => {

        spyOn(controller.model, 'findByIdAndRemove').and.callFake((id, cb) => {
          cb(false, true);
        });
        controller.delete(req, res);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if there is no object is found', done => {
        spyOn(controller.model, 'findByIdAndRemove').and.callFake((id, cb) => {
          cb(false, false);
        });
        controller.delete(req, res);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).not.toHaveBeenCalled();
        done();
      });

      it('returns status code 404 if it receives an invalid key', done => {
        spyOn(controller.model, 'findByIdAndRemove').and.callFake((id, cb) => {
          cb(true, true);
        });
        controller.delete(req, res);
        expect(res.sendStatus.calls.count()).toEqual(1);
        expect(res.sendStatus).toHaveBeenCalledWith(404);
        expect(console.error).toHaveBeenCalled();
        done();
      });

    });

  });

});
