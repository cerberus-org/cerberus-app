import Visit from '../models/visit';
import BaseHandler from './base';
import moment = require('moment');

export default class VisitHandler extends BaseHandler {
  model = Visit;

  /**
   * Get visits by locationId and responds with the visits (200) or an error (400).
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
  };

  /**
   * Get visits by organizationId and responds with the results (200) or an error (400).
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

  /**
   * Get visits later than the given date and responds with the results (200) or an error (400).
   * @param req - the request with the date parameter
   * @param res - the response
   */
  getByDate = (req, res) => {
    const date = moment(req.params.date).format('YYYY-MM-DD h:mm:ss a');
    this.model.find({ 'startedAt': { '$gte': date, '$lt': Date.now() } }, (err, results) => {
      if (err) {
        res.status(400).send(err);
        return console.error(err);
      }
      res.json(results);
    });
  };
}
