import * as mongoose from 'mongoose';

// testing
const volunteerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  petName: {
    type: String,
    required: [true, 'Favorite pet name is required']
  },
}, { timestamps: true });

volunteerSchema.index({ firstName: 1, lastName: 1, petName: 1 }, { unique: true });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
