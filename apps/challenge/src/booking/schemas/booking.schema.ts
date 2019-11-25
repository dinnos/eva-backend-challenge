import { Document, Schema } from 'mongoose';

const BookingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  clinicName: { type: String, required: true },
  consumedMedications: [String],
}, {
  timestamps: {
    createdAt: 'datetime',
    updatedAt: false,
  },
});

interface IBookingDocument extends Document {
  name: string;
  email: string;
  clinicName: string;
  consumedMedications: string[];
}

export { BookingSchema, IBookingDocument };
