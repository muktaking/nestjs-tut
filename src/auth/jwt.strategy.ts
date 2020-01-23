import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { jwtPayload, User } from "./auth.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel("User") private readonly UserModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        'o7D+?wq::jKxyqX<[.j>+B2ij{w2y@S+"CpQ[l2ad0{;hf36+~g$KtEd-Ts>y:~'
    });
  }

  async validate(payload: jwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
