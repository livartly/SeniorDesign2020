import mongoose, {
  Schema
} from 'mongoose';

const ProblemSchema = new Schema({
  submitUserID: {
    type: Schema.Types.ObjectId,
    required: true
  },
  problemTypeIndex: {
    type: Number,
    required: true
  },
  dateSubmitted: {
    type: Date,
    required: true,
    default: Date.now()
  },
  problemInput: {
    type: Schema.Types.Mixed,
    required: true
  }
}, {
  collection: 'Problems'
});

export default mongoose.model('problems', ProblemSchema);