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
  MinLength,
  IsUrl
} from "class-validator";
import { StartsWith } from "../decorators/starts-with.decorator";

export enum TaskTag {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home'
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 40)
  @StartsWith('Task: ')
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

  @IsUrl({
    protocols: ['http', 'https', 'wss'],
    require_protocol: true,
    require_port: false,
    host_blacklist: ['htmllessons.io']
  }, 
  { message: 'Incorrect URL format' })
  websiteUrl: string;
}