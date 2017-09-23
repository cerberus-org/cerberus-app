import * as express from 'express';

import OrganizationHandler from './handlers/organization';
import VolunteerHandler from './handlers/volunteer';
import VisitHandler from './handlers/visit';
import UserHandler from './handlers/user';
import { Auth } from './middleware/auth';
import LocationHandler from './handlers/location';

export default function setRoutes(app) {

  const router = express.Router();

  const auth = new Auth();

  const locationHandler = new LocationHandler();
  const organizationHandler = new OrganizationHandler();
  const volunteerHandler = new VolunteerHandler();
  const visitHandler = new VisitHandler();
  const userHandler = new UserHandler();

  // Locations
  router.route('/locations').get(auth.ensureLoggedIn, locationHandler.getAll);
  router.route('/locations/count').get(auth.ensureLoggedIn, locationHandler.count);
  router.route('/location').post(locationHandler.insert);
  router.route('/location/:id').get(auth.ensureLoggedIn, locationHandler.getById);
  router.route('/location/:id').put(auth.ensureLoggedIn, locationHandler.update);
  router.route('/location/:id').delete(auth.ensureLoggedIn, locationHandler.delete);
  router.route('/location/:id/visits').get(auth.ensureLoggedIn, visitHandler.getByLocationId);
  router.route('/location/:id/volunteers').get(auth.ensureLoggedIn, volunteerHandler.getByLocationId);

  // Organizations
  router.route('/organizations').get(auth.ensureLoggedIn, organizationHandler.getAll);
  router.route('/organizations/count').get(auth.ensureLoggedIn, organizationHandler.count);
  router.route('/organization').post(organizationHandler.insert);
  router.route('/organization/:id').get(auth.ensureLoggedIn, organizationHandler.getById);
  router.route('/organization/:id').put(auth.ensureLoggedIn, organizationHandler.update);
  router.route('/organization/:id').delete(auth.ensureLoggedIn, organizationHandler.delete);
  router.route('/organization/:id/locations').get(auth.ensureLoggedIn, locationHandler.getByOrganizationId);
  router.route('/organization/:id/visits').get(auth.ensureLoggedIn, visitHandler.getByOrganizationId);
  router.route('/organization/:id/volunteers').get(auth.ensureLoggedIn, volunteerHandler.getByOrganizationId);

  // Users
  router.route('/users').get(auth.ensureLoggedIn, userHandler.getAll);
  router.route('/users/count').get(auth.ensureLoggedIn, userHandler.count);
  router.route('/user').post(userHandler.insert);
  router.route('/user/:id').get(auth.ensureLoggedIn, userHandler.getById);
  router.route('/user/:id').put(auth.ensureLoggedIn, userHandler.update);
  router.route('/user/:id').delete(auth.ensureLoggedIn, userHandler.delete);
  router.route('/user/login').post(userHandler.login);

  // Visits
  router.route('/visits').get(auth.ensureLoggedIn, visitHandler.getAll);
  router.route('/visits/count').get(auth.ensureLoggedIn, visitHandler.count);
  router.route('/visit').post(auth.ensureLoggedIn, visitHandler.insert);
  router.route('/visit/:id').get(auth.ensureLoggedIn, visitHandler.getById);
  router.route('/visit/:id').put(auth.ensureLoggedIn, visitHandler.update);
  router.route('/visit/:id').delete(auth.ensureLoggedIn, visitHandler.delete);
  router.route('/visits/:date').get(auth.ensureLoggedIn, visitHandler.getByDate);

  // Volunteers
  router.route('/volunteers').get(auth.ensureLoggedIn, volunteerHandler.getAll);
  router.route('/volunteers/count').get(auth.ensureLoggedIn, volunteerHandler.count);
  router.route('/volunteer').post(auth.ensureLoggedIn, volunteerHandler.insert);
  router.route('/volunteer/:id').get(auth.ensureLoggedIn, volunteerHandler.getById);
  router.route('/volunteer/:id').put(auth.ensureLoggedIn, volunteerHandler.update);
  router.route('/volunteer/:id').delete(auth.ensureLoggedIn, volunteerHandler.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}
