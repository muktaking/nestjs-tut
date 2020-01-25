import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import * as _ from "lodash";

import { UsersService } from "../users/users.service";
import { jwtPayload } from "./jwt.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let user = await this.usersService.findOneUser(email);

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      user = isValid ? _.pick(user, ["email", "role", "_id"]) : null;
      return user;
    }

    return null;
  }

  async login(user: any): Promise<{ accessToken }> {
    const payload: jwtPayload = {
      email: user.email,
      id: user._id,
      role: user.role
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
