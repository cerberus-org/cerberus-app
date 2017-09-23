import BaseHandler from './base';
import Location from '../models/location';

export default class LocationHandler extends BaseHandler {
  model = Location;

  /**
   * Gets locations by organizationId.
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
