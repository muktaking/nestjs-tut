import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async getAllUsers(): Promise<any> {
    return await this.userService.findAllUsers();
  }

  @Get("/:id")
  async getUserById(@Param("id") id: string): Promise<any> {
    console.log(id);
    return await this.userService.findUserById(id);
  }
}
