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
