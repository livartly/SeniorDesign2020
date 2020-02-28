import mongoose, {
  Schema
} from 'mongoose';

const ProblemSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  typeIndex: {
    type: Number,
    required: true
  },
  dateSubmitted: {
    type: Date,
    required: true,
    default: Date.now()
  },
  input: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  collection: 'Problems'
});

export default mongoose.model('problems', ProblemSchema);