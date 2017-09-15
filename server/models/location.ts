import * as mongoose from 'mongoose';
import { isURL } from 'validator';

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
locationSchema.pre('save', function(next) {
  this.name = this.capitalize(this.name);
  next();
});

locationSchema.methods.capitalize = (field: string): string => {
  return field.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1)));
};

export default mongoose.model('organization', locationSchema);
