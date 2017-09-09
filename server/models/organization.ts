import * as mongoose from 'mongoose';
import { isURL } from 'validator';

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i,
    trim: true
  },
  description: {
    type: String,
    maxlength: [255],
    trim: true
  },
  website: {
    type: String,
    maxlength: [255],
    validate: [isURL, 'Invalid website'],
    trim: true
  },
}, { timestamps: true });

organizationSchema.index({ name: 1, description: 1, website: 1 }, { unique: true });

// Before saving the organization, capitalize name field
organizationSchema.pre('save', next => {
  this.name = this.capitalize(this.name);
  next();
});

organizationSchema.methods.capitalize = (field: string): string => {
  return field.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1)));
};

const organization = mongoose.model('organization', organizationSchema);

export default organization;
