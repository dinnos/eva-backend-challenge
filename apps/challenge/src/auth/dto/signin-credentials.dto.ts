import { IsNotEmpty, IsString } from 'class-validator';

export class SigninCredentialsDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
