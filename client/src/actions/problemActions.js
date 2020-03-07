import axios from 'axios';

export const sendProblem = (problem) => () => (
  axios.post('/api/problems/', problem)
);

export const fetchProblems = () => dispatch => {
  axios.get('/api/problems/').then(answer => {
    console.log(answer);
  }).catch(error => {
    console.log("error: " + error);
  });
};