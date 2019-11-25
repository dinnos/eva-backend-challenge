import { ArrayMinSize, IsArray, IsBoolean, IsDefined, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { DatePeriodDto } from '../../shared/dto/date-period.dto';

export class FilterByConsumedMedicationsDto {
  @IsDefined()
  @ValidateNested()
  @Type(() => DatePeriodDto)
  period: DatePeriodDto;

  @IsString()
  @IsNotEmpty()
  clinicName: string;

  @IsBoolean()
  isStrict: boolean;

  @IsArray()
  @ArrayMinSize(0)
  consumedMedications: string[];
}
