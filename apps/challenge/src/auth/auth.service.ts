import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload, IJwtResponse } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserDocument>,
    private readonly jwtService: JwtService,
  ) { }

  /**
   *
   * @param username
   * @param password
   */
  async validateUserCredentials(username: string, password: string): Promise<IUserDocument> {
    const user = await this.findUserByUsername(username);

    if (!user && user.password !== password) {
      return null;
    }

    return user;
  }

  async findUserByUsername(username: string): Promise<IUserDocument> {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      return null;
    }

    return user;
  }

  async login(user: IUserDocument): Promise<IJwtResponse> {
    const { username, roles } = user;

    return { access_token: this.jwtService.sign({ username, roles }) };
  }
}
