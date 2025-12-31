import { 
  IsArray,
  IsInt,
  IsNotEmpty, 
  IsNumber, 
  IsEnum,
  IsOptional, 
  IsPositive, 
  IsString, 
  Length 
} from "class-validator";

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home'
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  title: string;

  @IsInt({ message: 'Priority must be a number'})
  @IsOptional()
  @IsPositive()
  priority: number;

  @IsOptional()
  @IsArray()  
  @IsEnum(TaskTag, { each: true })
  tags: TaskTag[];
}