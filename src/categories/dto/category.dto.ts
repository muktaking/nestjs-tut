import {
  IsNotEmpty,
  MaxLength,
  IsString,
  IsOptional,
  IsNotIn
} from "class-validator";

export class createCategoryDto {
  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  @IsNotIn(["_"])
  name: string;

  @IsNotEmpty()
  @MaxLength(300)
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  parentId: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsOptional()
  order: number;
}
