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
    const date = moment(req.params.date).format('YYYY-MM-DD h:mm:ss a');
    this.model.find(
      {'startedAt': { '$gte': date, '$lt': Date.now() }},
      (err, obj) => {
        if (err) {
          res.status(400).send(err);
          return console.error(err);
        }
        res.json(obj);
      }
    );
  };

  /**
   * Remove list of visits.
   *
   * @param req
   * @param res
   */
  batchDelete = (req, res) => {
    // for each visit in req
    for (const visit of req) {
      // find by id and remove
      this.model.findByIdAndRemove(visit.params.id, (err, obj) => {
        if (err || !obj) {
          // Cast to ObjectId failed or object not found
          res.sendStatus(404);
          if (err) {
            return console.error(err);
          }
        } else {
          res.sendStatus(204);
        }
      });
    }
  };
}
