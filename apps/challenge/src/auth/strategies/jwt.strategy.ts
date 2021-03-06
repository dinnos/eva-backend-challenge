import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interfaces/jwt.interface';
import { AuthService } from '../auth.service';
import { IUserDocument } from '../schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * If the bearer token it's valid inject an user instance into the request if the user exist in the database otherwise returns
   * an UnauthorizedException (HTTP Status Code 401)
   *
   * @param payload
   */
  async validate(payload: IJwtPayload): Promise<IUserDocument> {
    const user = await this.authService.findUserByUsername(payload.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
