import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsInt()
  @IsNotEmpty()
  releaseYear: number;
}