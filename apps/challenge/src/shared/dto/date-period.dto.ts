import { IPeriod } from '../interfaces/helpers.interface';
import { IsDate, IsOptional, Validate } from 'class-validator';
import { IsAfterConstraint } from '../validators/IsAfterConstraint';

export class DatePeriodDto implements IPeriod<Date> {
  @IsDate()
  start: Date;

  @IsOptional()
  @IsDate()
  @Validate(IsAfterConstraint, ['start'])
  end: Date;
}
