import * as express from 'express';

import OrganizationHandler from './handlers/organization';
import VolunteerHandler from './handlers/volunteer';
import VisitHandler from './handlers/visit';
import UserHandler from './handlers/user';
import { Auth } from './middleware/auth';

export default function setRoutes(app) {

  const router = express.Router();

  const auth = new Auth();

  const organizationHandler = new OrganizationHandler();
  const volunteerHandler = new VolunteerHandler();
  const visitHandler = new VisitHandler();
  const userHandler = new UserHandler();

  // Organizations
  router.route('/organizations').get(auth.ensureLoggedIn, organizationHandler.getAll);
  router.route('/organizations/count').get(auth.ensureLoggedIn, organizationHandler.count);
  router.route('/organization').post(organizationHandler.insert);
  router.route('/organization/:id').get(auth.ensureLoggedIn, organizationHandler.get);
  router.route('/organization/:id').put(auth.ensureLoggedIn, organizationHandler.update);
  router.route('/organization/:id').delete(auth.ensureLoggedIn, organizationHandler.delete);

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
  router.route('/user').post(userHandler.insert);
  router.route('/user/:id').get(auth.ensureLoggedIn, userHandler.get);
  router.route('/user/:id').put(auth.ensureLoggedIn, userHandler.update);
  router.route('/user/:id').delete(auth.ensureLoggedIn, userHandler.delete);
  router.route('/user/login').post(userHandler.login);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
