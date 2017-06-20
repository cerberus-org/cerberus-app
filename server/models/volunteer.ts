import * as mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName:  {
    type: String,
    required: [true, 'Last name is required']
  },
  petName:  {
    type: String,
    required: [true, 'Favorite pet name is required']
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
