import * as mongoose from 'mongoose';
import Volunteer from './volunteer';

const visitSchema = new mongoose.Schema({
   startedAt: {
    type: Date, default: Date.now,
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
    type: String // { data: Buffer, contentType: String }
  },
  timezone: {
    type: String,
    required: [true]
  }
}, { timestamps: true });

visitSchema.index({ startedAt: 1, endedAt: 1, volunterId: 1, signature: 1 }, { unique: true });

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
