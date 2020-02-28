import axios from 'axios';

export const sendProblem = (problem) => () => (
  axios.post('/api/problems/', problem)
);