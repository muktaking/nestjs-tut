import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { createUserDto } from "./dto/create-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { User } from "./auth.model";
import { GetUser } from "./get-user.decorator";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/registration")
  async signUp(@Body(ValidationPipe) createUserDto: createUserDto) {
    return await this.authService.createUser(createUserDto);
  }

  @Post("/login")
  async signIn(
    @Body("email", ValidationPipe) email: string,
    @Body("password", ValidationPipe) password: string
  ) {
    return await this.authService.validateUser(email, password);
  }

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log(user);
  }
}
