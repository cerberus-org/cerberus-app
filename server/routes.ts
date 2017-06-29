import * as express from 'express';

import VolunteerHandler from './handlers/volunteer';

export default function setRoutes(app) {

  const router = express.Router();

  const volunteerHandler = new VolunteerHandler();

  // Volunteers
  router.route('/volunteers').get(volunteerHandler.getAll);
  router.route('/volunteers/count').get(volunteerHandler.count);
  router.route('/volunteer').post(volunteerHandler.insert);
  router.route('/volunteer/:id').get(volunteerHandler.get);
  router.route('/volunteer/:id').put(volunteerHandler.update);
  router.route('/volunteer/:id').delete(volunteerHandler.delete);

  // Visits
  router.route('/visits').get(volunteerHandler.getAll);
  router.route('/visit/count').get(volunteerHandler.count);
  router.route('/visit').post(volunteerHandler.insert);
  router.route('/visit/:id').get(volunteerHandler.get);
  router.route('/visit/:id').put(volunteerHandler.update);
  router.route('/visit/:id').delete(volunteerHandler.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
