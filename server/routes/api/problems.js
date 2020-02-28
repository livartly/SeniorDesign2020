const Router = require('express').Router();

import Problem from '../../models/Problem';


Router.post('/', function (req, res) {
  const submitProblem = new Problem(req.body);
  submitProblem.dateSubmitted = Date.now();

  if (!submitProblem) {
    return res.status(400).json({ error: "invalid parameters" });
  }

  submitProblem.save().then(
    problem => res.status(200).json(problem)
  ).catch(
    error => res.status(400).json(error)
  );
});



export default Router;