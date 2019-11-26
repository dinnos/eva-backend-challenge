import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBookingDocument } from './schemas/booking.schema';
import { FilterByConsumedMedicationsDto } from './dto/FilterByConsumedMedications.dto';
import { getBetweenQuery, getFindArrayQuery } from '../shared/utils/mongodb.util';

@Injectable()
export class BookingService {

  constructor(@InjectModel('Booking') private readonly bookingModel: Model<IBookingDocument>) {}

  /**
   * Make a query to the database with the provided data of the handler
   * (/booking/consumed-medications) the query are in base of one period (start and end date)
   * and the consumed medications
   *
   * Success: Returns the data queried
   * Fail: Throws and internal server exception (HTTP Status Code 500)
   *
   * @param filter
   */
  async getByConsumedMedications(filter: FilterByConsumedMedicationsDto) {
    const { period, clinicName, isStrict, consumedMedications } = filter;

    const query = {
      clinicName,
      datetime: getBetweenQuery<Date>(period),
      consumedMedications: getFindArrayQuery(isStrict, consumedMedications),
    };

    try {
      return await this.bookingModel.find(query).exec();
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
