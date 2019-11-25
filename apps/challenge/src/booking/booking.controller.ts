import { Body, Controller, Get } from '@nestjs/common';
import { FilterByConsumedMedicationsDto } from './dto/FilterByConsumedMedications.dto';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {

  constructor(private readonly bookingService: BookingService) { }

  /**
   *
   * @param filterDto
   */
  @Get('consumed-medications')
  getBookingsByConsumedMedications(@Body() filterDto: FilterByConsumedMedicationsDto) {
    return this.bookingService.getByConsumedMedications(filterDto);
  }
}
