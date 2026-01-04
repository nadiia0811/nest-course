import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsInt()
  @IsNotEmpty()
  releaseYear: number;
}