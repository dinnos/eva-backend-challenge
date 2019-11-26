import { IPeriod } from '../interfaces/helpers.interface';
import { IsDateString, IsOptional, Validate } from 'class-validator';
import { IsAfterConstraint } from '../validators/IsAfterConstraint';

export class DatePeriodDto implements IPeriod<Date> {
  @IsDateString({ message: 'start must be a string date' })
  start: Date;

  @IsOptional()
  @IsDateString({ message: 'end must be a string date' })
  @Validate(IsAfterConstraint, ['start'])
  end: Date;
}
