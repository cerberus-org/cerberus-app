import * as express from 'express';

import VolunteerHandler from './handlers/volunteer';
import VisitHandler from './handlers/visit';
import UserHandler from './handlers/user';
import { Auth } from './middleware/auth';

export default function setRoutes(app) {

  const router = express.Router();

  const auth = new Auth();

  const volunteerHandler = new VolunteerHandler();
  const visitHandler = new VisitHandler();
  const userHandler = new UserHandler();

  // Volunteers
  router.route('/volunteers').get(auth.ensureLoggedIn, volunteerHandler.getAll);
  router.route('/volunteers/count').get(auth.ensureLoggedIn, volunteerHandler.count);
  router.route('/volunteer').post(auth.ensureLoggedIn, volunteerHandler.insert);
  router.route('/volunteer/:id').get(auth.ensureLoggedIn, volunteerHandler.get);
  router.route('/volunteer/:id').put(auth.ensureLoggedIn, volunteerHandler.update);
  router.route('/volunteer/:id').delete(auth.ensureLoggedIn, volunteerHandler.delete);

  // Visits
  router.route('/visits').get(auth.ensureLoggedIn, visitHandler.getAll);
  router.route('/visits/count').get(auth.ensureLoggedIn, visitHandler.count);
  router.route('/visit').post(auth.ensureLoggedIn, visitHandler.insert);
  router.route('/visit/:id').get(auth.ensureLoggedIn, visitHandler.get);
  router.route('/visit/:id').put(auth.ensureLoggedIn, visitHandler.update);
  router.route('/visit/:id').delete(auth.ensureLoggedIn, visitHandler.delete);
  router.route('/visits/:date').get(auth.ensureLoggedIn, visitHandler.getByDate);

  // Users
  router.route('/users').get(auth.ensureLoggedIn, userHandler.getAll);
  router.route('/users/count').get(auth.ensureLoggedIn, userHandler.count);
  router.route('/user').post(auth.ensureLoggedIn, userHandler.insert);
  router.route('/user/:id').get(auth.ensureLoggedIn, userHandler.get);
  router.route('/user/:id').put(auth.ensureLoggedIn, userHandler.update);
  router.route('/user/:id').delete(auth.ensureLoggedIn, userHandler.delete);
  router.route('/user/login').post(userHandler.login);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
