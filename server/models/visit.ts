import * as mongoose from 'mongoose';

import Location from './location';
import Organization from './organization';
import Volunteer from './volunteer';

const visitSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId, ref: Organization,
    // required: [true, 'Organization ID is required']
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId, ref: Location,
    required: [true, 'Location ID is required']
  },
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId, ref: Volunteer,
    required: [true]
  },
  startedAt: {
    type: Date,
    default: Date.now,
    required: [true]
  },
  endedAt: {
    type: Date,
    required: [false]
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

// Before saving, stringify signature
visitSchema.pre('save', function(next) {
  this.signature = JSON.stringify(this.signature);
  next();
});

// Before returning the signature destringify
visitSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.signature = JSON.parse(ret.signature);
    return ret;
  }
});

export default mongoose.model('Visit', visitSchema);
