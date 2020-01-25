import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
  UnauthorizedException
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { RolePermitted } from "./user.model";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getAllUsers(@Req() req): Promise<any> {
    if (req.user.role !== RolePermitted.admin) {
      throw new UnauthorizedException();
    }
    return await this.userService.findAllUsers();
  }

  @Get("/:id")
  async getUserById(@Param("id") id: string): Promise<any> {
    console.log(id);
    return await this.userService.findUserById(id);
  }
}
