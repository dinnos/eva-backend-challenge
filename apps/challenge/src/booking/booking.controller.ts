import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { FilterByConsumedMedicationsDto } from './dto/FilterByConsumedMedications.dto';
import { BookingService } from './booking.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('booking')
export class BookingController {

  constructor(private readonly bookingService: BookingService) { }

  /**
   *
   * @param filterDto
   */
  @UseGuards(AuthGuard())
  @Get('consumed-medications')
  getBookingsByConsumedMedications(@Body() filterDto: FilterByConsumedMedicationsDto) {
    return this.bookingService.getByConsumedMedications(filterDto);
  }
}
