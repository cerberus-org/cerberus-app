import BaseHandler from './base';
import Location from '../models/location';

export default class LocationHandler extends BaseHandler {
  model = Location;

  /**
   * Gets locations by organizationId and responds with the results (200) or an error (400).
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
  };
}
