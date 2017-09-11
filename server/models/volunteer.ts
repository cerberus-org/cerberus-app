import * as mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i,
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i,
    trim: true
  },
  petName: {
    type: String,
    required: [true, 'Favorite pet name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i,
    trim: true
  },
}, { timestamps: true });

volunteerSchema.index({ firstName: 1, lastName: 1, petName: 1 }, { unique: true });

// Before saving the user, capitalize name fields
volunteerSchema.pre('save', function(next) {
  this.firstName = this.capitalize(this.firstName);
  this.lastName = this.capitalize(this.lastName);
  this.petName = this.capitalize(this.petName);
  next();
});

volunteerSchema.methods.capitalize = function(field: string): string {
  return field.replace(/\b[\w']+\b/g, (txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
};

export default mongoose.model('Volunteer', volunteerSchema);
