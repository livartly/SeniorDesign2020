import mongoose, {
  Schema
} from 'mongoose';

const IssueSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  issueType: {
    type: String,
    required: true
  },
  textBody: {
    type: String,
    required: true
  },
  dateSubmitted: {
    type: Date,
    required: true,
    default: Date.now()
  }
}, {
  collection: 'Issues'
});

export default mongoose.model('issues', IssueSchema);