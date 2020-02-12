import {
  Strategy,
  ExtractJwt
} from 'passport-jwt';
import mongoose from 'mongoose';
import keys from './keys';

const User = mongoose.model("users");
const opts = {
  secretOrKey: keys.secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export default function (passport) {
  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
}