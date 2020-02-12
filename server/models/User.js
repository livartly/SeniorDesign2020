import mongoose, {
  Schema
} from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  lastSeen: {
    type: Date,
    default: Date.now()
  }
}, {
  collection: 'Users'
});

export default mongoose.model('users', UserSchema);