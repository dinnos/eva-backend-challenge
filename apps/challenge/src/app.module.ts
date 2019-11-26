import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

const {
  MONGO_INITDB_ROOT_USERNAME: MONGO_USER,
  MONGO_INITDB_ROOT_PASSWORD: MONGO_PASSWORD,
  MONGO_URI: MONGO_PATH,
  MONGO_DBNAME,
} = process.env;

const MONGO_URI = `mongodb://${ MONGO_USER }:${ MONGO_PASSWORD }@${ MONGO_PATH }/${ MONGO_DBNAME }?authSource=admin`;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    BookingModule,
    AuthModule,
  ],
})
export class AppModule {}
