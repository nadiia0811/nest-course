import { 
  IsArray,
  IsInt,
  IsNotEmpty, 
  IsNumber, 
  IsEnum,
  IsOptional, 
  IsPositive, 
  IsString, 
  Length, 
  Matches,
  MinLength
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

  @Matches(/^(?=.*[A-Z])(?=.*[0-9]).+$/)
  @IsString()
  @MinLength(6)
  password: string;

}