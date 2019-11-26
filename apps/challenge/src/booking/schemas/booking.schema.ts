import { Document, Schema } from 'mongoose';

interface IBookingDocument extends Document {
  name: string;
  email: string;
  datetime: Date;
  clinicName: string;
  consumedMedications: string[];
}

const BookingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  datetime: { type: Date, required: true },
  clinicName: { type: String, required: true },
  consumedMedications: [String],
});

BookingSchema.pre<IBookingDocument>('save', function(next) {
  if (!this.datetime) {
    this.datetime = new Date();
  }

  next();
});

export { BookingSchema, IBookingDocument };
