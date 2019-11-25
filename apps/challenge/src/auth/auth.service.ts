import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async validateUserCredentials(username: string, password: string): Promise<IUserDocument> {
    const user = await this.userModel.findOne({ username });

    if (!user && user.password !== password) {
      return null;
    }

    return user;
  }

  async login(user: IUserDocument) {

    return { access_token: this.jwtService.sign(user) };
  }
}
