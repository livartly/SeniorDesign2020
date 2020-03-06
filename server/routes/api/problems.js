const Router = require('express').Router();

import Problem from '../../models/Problem';
import User from '../../models/User';


Router.post('/', function (req, res) {
  const submitProblem = new Problem(req.body);
  submitProblem.dateSubmitted = Date.now();

  if (!submitProblem) {
    return res.status(400).json({ error: "invalid parameters" });
  }

  User.findOne({ _id: req.body.userID })
    .then(user => {
      if (user) {
        user.lastSeen = Date.now();
        user.save();
      }
      else {
        console.log(req.body.userID + ": NOT FOUND");
      }
    });

  submitProblem.save().then(
    problem => res.status(200).json(problem)
  ).catch(
    error => res.status(400).json(error)
  );
});

Router.get('/', function (req, res) {
  Problem.find({}).then(
    problems => res.status(200).json({ problems })
  ).catch(
    error => res.status(400).json(error)
  );
});



export default Router;