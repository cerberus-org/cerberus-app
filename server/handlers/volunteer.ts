import Volunteer from '../models/volunteer';
import BaseHandler from './base';

export default class VolunteerHandler extends BaseHandler {
  model = Volunteer;

  /**
   * Get volunteers by locationId and responds with the results (200) or an error (400).
   * @param req - the request with the id parameter
   * @param res - the response
   */
  getByLocationId = (req, res) => {
    this.model.find({ 'locationId': req.params.id },
      (err, results) => {
        if (err) {
          res.status(400).send(err);
          return console.error(err);
        }
        res.json(results);
      });
  }

  /**
   * Get volunteers by organizationId and responds with the results (200) or an error (400).
   * @param req - the request with the id parameter
   * @param res - the response
   */
  getByOrganizationId = (req, res) => {
    this.model.find({ 'organizationId': req.params.id },
      (err, results) => {
        if (err) {
          res.status(400).send(err);
          return console.error(err);
        }
        res.json(results);
      });
  }
}
