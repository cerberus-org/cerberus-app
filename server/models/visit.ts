import * as mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
   startAt: {
    type: Date,
    required: [true, 'Start time and date is required']
  },
  endAt: {
    type: Date,
    required: [false]
  },
  volunterId: {
    type: String,
    required: [true]
  },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

visitSchema.index({ startAt: 1, endAt: 1, volunterId: 1 }, { unique: true });

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
