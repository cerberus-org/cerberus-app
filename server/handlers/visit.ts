import Visit from '../models/visit';
import BaseHandler from './base';
import moment = require('moment');

export default class VisitHandler extends BaseHandler {
  model = Visit;

  /**
   * Get visits by check in date.
   *
   * @return visits that are greater than req.params.date
   */
  getByDate = (req, res) => {
    const date = moment(req.params.date).format('YYYY-MM-DD');
    this.model.find(
      {'startedAt': { '$gte': date, '$lt': Date.now() }},
      (err, obj) => {
        if (err) {
          res.status(404).send(err);
          return console.error(err);
        }
        res.json(obj);
      }
    );
  };
}
