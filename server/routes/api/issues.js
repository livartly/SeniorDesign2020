const Router = require('express').Router();

import Issue from '../../models/Issue';
import User from '../../models/User';


Router.post('/', function (req, res) {
  const submitIssue = new Issue(req.body);
  submitIssue.dateSubmitted = Date.now();

  if (!submitIssue) {
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

  submitIssue.save().then(
    issue => res.status(200).json(issue)
  ).catch(
    error => res.status(400).json(error)
  );
});

Router.get('/', function (req, res) {
  Issue.find({}).then(
    issues => res.status(200).json({ issues })
  ).catch(
    error => res.status(400).json(error)
  );
});



export default Router;