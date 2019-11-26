import { ArrayMinSize, IsArray, IsBoolean, IsDefined, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodDto } from '../../shared/dto/date-period.dto';

export class FilterByConsumedMedicationsDto {
  @IsDefined({ message: 'period must be defined' })
  @ValidateNested()
  @Type(() => DatePeriodDto)
  period: DatePeriodDto;

  @IsString({ message: 'clinicName must be a string' })
  @IsNotEmpty({ message: 'clinicName can\'t be empty' })
  clinicName: string;

  @IsBoolean({ message: 'isStrict must be boolean' })
  isStrict: boolean;

  @IsArray({ message: 'consumedMedications must be an array' })
  consumedMedications: string[];
}
