abstract class BaseController {

  abstract model: any;

  /**
   * Get all
   */
  getAll = (req, res) => {
    this.model.find({}, (err, docs) => {
      if (err) {
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
      // 11000 is the code for duplicate key error
      if (err && err.code === 11000) {
        res.sendStatus(409);
      }
      if (err) {
        // Validation error
        res.sendStatus(400);
        return console.error(err);
      }
      res.status(200).json(item);
    });
  };

  /**
   * Get by ID
   */
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) {
        // Object not found
        res.sendStatus(404);
        return console.error(err);
      }
      res.json(obj);
    });
  };

  /**
   * Update by ID
   */
  update = (req, res) => {
    this.model.findOneAndUpdate({ _id: req.params.id }, req.body, (err) => {
      if (err) {
        // Error updating object
        res.sendStatus(400);
        return console.error(err);
      }
      res.sendStatus(200);
    });
  };

  /**
   * Delete by ID
   */
  delete = (req, res) => {
    this.model.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) {
        // Object not found
        res.sendStatus(404);
        return console.error(err);
      }
      res.sendStatus(200);
    });
  };
}

export default BaseController;
