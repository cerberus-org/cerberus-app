import BaseHandler from './base';
import Location from '../models/location';

export default class LocationHandler extends BaseHandler {
  model = Location;

  getByOrganizationId(req, res) {
    this.model.find({ 'organizationId': req.params.organizationId },
      (err, locations) => {
        if (err) {
          res.status(400).send(err);
          return console.error(err);
        }
        res.json(locations);
      });
  }
}
