import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import userAPIRouter from './routes/api/users';
import passportConfig from './config/passport';

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mongoose.connect(
  'mongodb://localhost/Wolfram-Beta-Dev', {
  useNewUrlParser: true
}
).then(() => {
  console.log("MongoDB has successfully connected");
})
  .catch((err) => {
    console.log("Mongoose error: " + err);
  });

app.use(passport.initialize());
passportConfig(passport);

app.use('/api/users', userAPIRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});