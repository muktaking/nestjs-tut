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
    const isValid = await bcrypt.compare(password, user.password);
    if (user && isValid) {
      user = _.pick(user, ["email", "role"]);
      console.log(user);
      return user;
    }

    return null;
  }

  async login(user: any): Promise<{ accessToken }> {
    const payload: jwtPayload = {
      email: user.email
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
