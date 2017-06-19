import * as express from 'express';

import VolunteerController from './controllers/volunteer';

export default function setRoutes(app) {

  const router = express.Router();

  const volunteerController = new VolunteerController();

  // Volunteers
  router.route('/volunteers').get(volunteerController.getAll);
  router.route('/volunteers/count').get(volunteerController.count);
  router.route('/volunteer').post(volunteerController.insert);
  router.route('/volunteer/:id').get(volunteerController.get);
  router.route('/volunteer/:id').put(volunteerController.update);
  router.route('/volunteer/:id').delete(volunteerController.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
