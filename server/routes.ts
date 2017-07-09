import * as express from 'express';

import VolunteerHandler from './handlers/volunteer';
import VisitHandler from './handlers/visit';
import Volunteer from './models/volunteer';
import UserHandler from './handlers/user';

export default function setRoutes(app) {

  const router = express.Router();

  const volunteerHandler = new VolunteerHandler();
  const visitHandler = new VisitHandler();
  const userHandler = new UserHandler();

  // Volunteers
  // router.route('/volunteers').get(volunteerHandler.getAll);
  router.route('/volunteers/count').get(volunteerHandler.count);
  router.route('/volunteer').post(volunteerHandler.insert);
  router.route('/volunteer/:id').get(volunteerHandler.get);
  router.route('/volunteer/:id').put(volunteerHandler.update);
  router.route('/volunteer/:id').delete(volunteerHandler.delete);

  // Visits
  router.route('/visits').get(visitHandler.getAll);
  router.route('/visits/count').get(visitHandler.count);
  router.route('/visit').post(visitHandler.insert);
  router.route('/visit/:id').get(visitHandler.get);
  router.route('/visit/:id').put(visitHandler.update);
  router.route('/visit/:id').delete(visitHandler.delete);
  router.route('/visits/:date').get(visitHandler.getByDate);

  // Users
  router.route('/users').get(userHandler.getAll);
  router.route('/users/count').get(userHandler.count);
  router.route('/user').post(userHandler.insert);
  router.route('/user/:id').get(userHandler.get);
  router.route('/user/:id').put(userHandler.update);
  router.route('/user/:id').delete(userHandler.delete);
  // Test
  router.route('/user/login').post(userHandler.login);

  // Test
  app.get('/volunteers', (req, res, next) => {
    // validation
    if (req.user) {
      next();
    } else {
      res.status(401).json(JSON.stringify({'Message': 'Unauthorized.'}));
    }
    // api call
    Volunteer.find({}, (err, docs) => {
      if (err) {
        res.status(400).send(err);
        return console.error(err);
      }
      res.json(docs);
    });
  });

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
