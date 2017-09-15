import * as mongoose from 'mongoose';
import { isURL } from 'validator';
import { capitalize } from '../functions/capitalize';

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i,
    trim: true
  },
  address: {
    type: String,
    maxlength: [255],
    trim: true
  }
}, { timestamps: true });

// Before saving the organization, capitalize the name
locationSchema.pre('save', function (next) {
  this.name = this.capitalize(this.name);
  next();
});

locationSchema.methods.capitalize = capitalize;

export default mongoose.model('location', locationSchema);
