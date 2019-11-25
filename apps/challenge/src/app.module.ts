import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';

const {
  MONGO_INITDB_ROOT_USERNAME: MONGO_USER,
  MONGO_INITDB_ROOT_PASSWORD: MONGO_PASSWORD,
  MONGO_URI: MONGO_PATH,
} = process.env;

const MONGO_URI = `mongodb://${ MONGO_USER }:${ MONGO_PASSWORD }@${ MONGO_PATH }`;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    BookingModule,
  ],
})
export class AppModule {}
