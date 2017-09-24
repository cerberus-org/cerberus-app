abstract class BaseHandler {

  abstract model: any;

  /**
   * Gets all documents and responds with the results (200) or an error (400).
   * @param req - the request
   * @param res - the response
   */
  getAll = (req, res) => {
    this.model.find({}, (err, results) => {
      if (err) {
        res.status(400).send(err);
        return console.error(err);
      }
      res.json(results);
    });
  };

  /**
   * Counts all documents and responds with the count (200) or an error (400).
   * @param req - the request
   * @param res - the response
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
   * Inserts a document and responds with the inserted document (201), a validation error (400),
   * or duplicate key error (409).
   * @param req - the request with the body
   * @param res - the response
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
   * Gets a document by ID and responds with the result (200) or cast to ObjectId error/Not Found (404).
   * @param req - the request with the id parameter
   * @param res - the response
   */
  getById = (req, res) => {
    this.model.findById(req.params.id, (err, result) => {
      if (err || !result) {
        // Cast to ObjectId failed or object not found
        res.sendStatus(404);
        if (err) {
          return console.error(err);
        }
      } else {
        res.json(result);
      }
    });
  };

  /**
   * Finds a document by ID, updates it, and responds with the updated document (200),
   * cast to ObjectId error/Not Found (404), or duplicate key error (409).
   * @param req - the request with the id parameter and body
   * @param res - the response
   */
  update = (req, res) => {
    this.model.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
      if (err || !result) {
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
        res.json(Object.assign(result, req.body));
      }
    });
  };

  /**
   * Deletes a document by ID and responds with No Content (204) or Not Found (404).
   * @param req - the request with the id parameter
   * @param res - the response
   */
  delete = (req, res) => {
    this.model.findByIdAndRemove(req.params.id, (err, result) => {
      if (err || !result) {
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
