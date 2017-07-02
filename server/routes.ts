import * as express from 'express';

import VolunteerHandler from './handlers/volunteer';
import VisitHandler from './handlers/visit';

export default function setRoutes(app) {

  const router = express.Router();

  const volunteerHandler = new VolunteerHandler();
  const visitHandler = new VisitHandler();

  // Volunteers
  router.route('/volunteers').get(volunteerHandler.getAll);
  router.route('/volunteers/count').get(volunteerHandler.count);
  router.route('/volunteer').post(volunteerHandler.insert);
  router.route('/volunteer/:id').get(volunteerHandler.get);
  router.route('/volunteer/:id').put(volunteerHandler.update);
  router.route('/volunteer/:id').delete(volunteerHandler.delete);

  // Visits
  router.route('/visits').get(visitHandler.getAll);
  router.route('/visit/count').get(visitHandler.count);
  router.route('/visit').post(visitHandler.insert);
  router.route('/visit/:id').get(visitHandler.get);
  router.route('/visit/:id').put(visitHandler.update);
  router.route('/visit/:id').delete(visitHandler.delete);
  router.route('/visits/:date').get(visitHandler.getByDate);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
