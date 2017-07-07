import * as mongoose from 'mongoose';
import moment = require('moment');
import Volunteer from './volunteer';

const visitSchema = new mongoose.Schema({
   startedAt: {
    type: Date, default: Date.now,
    required: [false]
  },
  endedAt: {
    type: Date,
    required: [false]
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId, ref: Volunteer,
    required: [true]
  },
  timezone: {
    type: String,
    required: [true]
  }
}, { timestamps: true });

visitSchema.index({ startedAt: 1, endedAt: 1, volunterId: 1 }, { unique: true });

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
