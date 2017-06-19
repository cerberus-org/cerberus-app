import * as mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  petName: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'} });

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
