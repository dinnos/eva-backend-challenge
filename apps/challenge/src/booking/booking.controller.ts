import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { FilterByConsumedMedicationsDto } from './dto/FilterByConsumedMedications.dto';
import { BookingService } from './booking.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLE_TYPES } from '../auth/schemas/user.schema';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('booking')
export class BookingController {

  constructor(private readonly bookingService: BookingService) { }

  /**
   * HTTP (GET /booking/consumed-medications)
   * Handler to query the bookings by the consumed medications provided for the Patients
   *
   * before enter needs validate the next requirements
   * Requirements:
   *  - Check if the user that makes the request is authenticated (provides a valid JWT)
   *  - Check if the user contains the Role "SCIENCE_DATA"
   *  - Validates the body of the request with the FilterByConsumedMedicationsDto Class
   *
   * If the conditions are covert return and array with the request data
   *
   * @param filterDto
   */
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles(ROLE_TYPES.SCIENCE_DATA)
  @Get('consumed-medications')
  getBookingsByConsumedMedications(@Body() filterDto: FilterByConsumedMedicationsDto) {
    return this.bookingService.getByConsumedMedications(filterDto);
  }
}
