import * as mongoose from 'mongoose';
import moment = require('moment');
import Volunteer from './volunteer';

const express = require('express');
const fs = require('fs');
const Schema = mongoose.Schema;

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
    type: Buffer, // Allows us to store our image as data in the form of arrays.
    contentType: String,
    required: [false]
  },
  timezone: {
    type: String,
    required: [true]
  }
}, { timestamps: true });

visitSchema.index({ startedAt: 1, endedAt: 1, volunterId: 1, signature: 1 }, { unique: true });

visitSchema.pre('buffer image', function(next) {
  // returns contents of path
  this.signature.data = fs.readFileSync(this.signature);
  this.signature.contentType = 'image/jpeg';
  next();
});

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
