import Volunteer from '../models/volunteer';
import BaseHandler from './base';

export default class VolunteerHandler extends BaseHandler {
  model = Volunteer;

  /**
   * Get visits by locationId.
   * @param req - the request with the id parameter
   * @param res - the response
   */
  getByLocationId(req, res) {
    this.model.find({ 'locationId': req.params.id },
      (err, locations) => {
        if (err) {
          res.status(400).send(err);
          return console.error(err);
        }
        res.json(locations);
      });
  }

  /**
   * Get visits by organizationId.
   * @param req - the request with the id parameter
   * @param res - the response
   */
  getByOrganizationId(req, res) {
    this.model.find({ 'organizationId': req.params.id },
      (err, locations) => {
        if (err) {
          res.status(400).send(err);
          return console.error(err);
        }
        res.json(locations);
      });
  }
}
