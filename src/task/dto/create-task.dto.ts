import { 
  IsNotEmpty, 
  IsString, 
  Length 
} from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 10)
  title: string;
}