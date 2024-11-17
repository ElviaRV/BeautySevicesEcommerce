import mongoose from 'mongoose';

const specialistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
},{
    timestamps: true,
});

export default mongoose.model('Specialist', specialistSchema);
