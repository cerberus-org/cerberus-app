abstract class BaseHandler {

  abstract model: any;

  /**
   * Get all
   */
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) {
        res.status(400).send(err);
        return console.error(err);
      }
      res.json(docs);
    });
  };

  /**
   * Count all
   */
  count = (req, res) => {
    this.model.count((err, count) => {
      if (err) {
        res.status(400).send(err);
        return console.error(err);
      }
      res.json(count);
    });
  };

  /**
   * Insert
   */
  insert = (req, res) => {
    const obj = new this.model(req.body);
    obj.save((err, item) => {
      if (err) {
        // 11000 is the code for duplicate key error
        if (err.code === 11000) {
          res.status(409).send(err);
        } else {
          // Validation error
          res.status(400).send(err);
        }
        return console.error(err);
      }
      res.status(201).json(item);
    });
  };

  /**
   * Get by ID
   */
  get = (req, res) => {
    this.model.findById(req.params.id, (err, obj) => {
      if (err || !obj) {
        // Cast to ObjectId failed or object not found
        res.sendStatus(404);
        if (err) {
          return console.error(err);
        }
      } else {
        res.json(obj);
      }
    });
  };

  /**
   * Update by ID
   */
  update = (req, res) => {
    this.model.findByIdAndUpdate(req.params.id, req.body, (err, obj) => {
      if (err || !obj) {
        // 11000 is the code for duplicate key error
        if (err && err.code === 11000) {
          res.status(409).send(err);
        } else {
          // Cast to ObjectId failed or object not found
          res.sendStatus(404);
        }
        if (err) {
          return console.error(err);
        }
      } else {
        res.sendStatus(204);
      }
    });
  };

  /**
   * Delete by ID
   */
  delete = (req, res) => {
    this.model.findByIdAndRemove(req.params.id, (err, obj) => {
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
  };
}

export default BaseHandler;