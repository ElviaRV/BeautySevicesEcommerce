import mongoose from 'mongoose';

const salonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  specialists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specialist',
    },
  ],
}, {
  timestamps: true,
});

export default mongoose.model('Salon', salonSchema);
