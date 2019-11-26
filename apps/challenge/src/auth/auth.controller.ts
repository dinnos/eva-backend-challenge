import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../shared/decorators/user.decorator';
import { IUserDocument } from './schemas/user.schema';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  /**
   *
   * @param user
   */
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@User() user: IUserDocument) {
    return this.authService.login(user);
  }
}
