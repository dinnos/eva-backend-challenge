import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { IUserDocument } from '../schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * Validates a login handler if the request contains the values username and password
   *
   * if the values are provide check if the credentials are valid in the database
   *
   * @param username
   * @param password
   */
  async validate(username: string, password: string): Promise<IUserDocument> {
    const user = await this.authService.validateUserCredentials(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
