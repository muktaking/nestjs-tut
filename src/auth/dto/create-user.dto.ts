import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Matches,
  IsString,
  MaxLength
} from "class-validator";

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message: "Your Password is too weak"
  })
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  district: string;
}
