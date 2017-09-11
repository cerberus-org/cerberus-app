import * as mongoose from 'mongoose';
import { isURL } from 'validator';

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
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
    validate: isURL,
    trim: true
  },
}, { timestamps: true });

// Before saving the organization, capitalize the name
organizationSchema.pre('save', function(next) {
  this.name = this.capitalize(this.name);
  next();
});

organizationSchema.methods.capitalize = (field: string): string => {
  return field.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1)));
};

export default mongoose.model('organization', organizationSchema);
