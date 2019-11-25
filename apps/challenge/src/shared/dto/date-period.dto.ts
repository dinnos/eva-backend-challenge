import { IPeriod } from '../interfaces/helpers.interface';
import { IsDateString, IsOptional, Validate } from 'class-validator';
import { IsAfterConstraint } from '../validators/IsAfterConstraint';

export class DatePeriodDto implements IPeriod<Date> {
  @IsDateString()
  start: Date;

  @IsOptional()
  @IsDateString()
  @Validate(IsAfterConstraint, ['start'])
  end: Date;
}
