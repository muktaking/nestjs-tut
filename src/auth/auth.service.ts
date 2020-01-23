import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User, RolePermitted, jwtPayload } from "./auth.model";
import { createUserDto } from "./dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel("User") private readonly UserModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async createUser(createUserDto: createUserDto) {
    let {
      firstName,
      lastName,
      userName,
      password,
      email,
      district
    } = createUserDto;
    const user = new this.UserModel({
      firstName,
      lastName,
      userName,
      password,
      email,
      district,
      role: RolePermitted.student
    });
    //hashing password
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code == 11000) {
        throw new ConflictException(`Email: ['${email}'] is already exist.`);
      } else throw new InternalServerErrorException();
    }
  }

  async validateUser(
    email: string,
    password: string
  ): Promise<
    { accessToken: string } | ExceptionInformation | UnauthorizedException
  > {
    const user = await this.UserModel.findOne({ email });
    try {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const payload: jwtPayload = {
          email: user.email
        };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
      } else return new UnauthorizedException("Invalid credential");
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
