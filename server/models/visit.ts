import * as mongoose from 'mongoose';
import Volunteer from './volunteer';

const visitSchema = new mongoose.Schema({
  startedAt: {
    type: Date,
    default: Date.now,
    required: [true]
  },
  endedAt: {
    type: Date,
    required: [false]
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId, ref: Volunteer,
    required: [true]
  },
  signature: {
    type: String
  },
  timezone: {
    type: String,
    required: [true]
  }
}, { timestamps: true });

// Hash signature index so there are not any limits placed on key length
visitSchema.index({ startedAt: 1, endedAt: 1, volunterId: 1, signature: 'hashed' }, { unique: true });

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
