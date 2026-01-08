import { IsNotEmpty, IsString, IsInt, IsArray, IsUUID } from "class-validator";

export class MovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsInt()
  @IsNotEmpty()
  releaseYear: number;

  @IsArray()
  @IsUUID('4', { each: true })
  actorIds: string[];
}