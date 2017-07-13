import * as mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i
  },
  petName: {
    type: String,
    required: [true, 'Favorite pet name is required'],
    minlength: [2],
    maxlength: [30],
    validate: /^[a-z ,.'-]+$/i
  },
}, { timestamps: true });

volunteerSchema.path('firstName').validate(function (value) {
  const regex = /^\d{10}$/;
  return regex.test(value)
}, 'Invalid first name');

volunteerSchema.index({ firstName: 1, lastName: 1, petName: 1 }, { unique: true });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
