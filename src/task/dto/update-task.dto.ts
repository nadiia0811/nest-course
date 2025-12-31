import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateTaskDto {
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty()
  @Length(
    2, 10, { message: 'Min length: 2 characters, max length: 10 characters' }
  )
  title: string;

  @IsBoolean({ message: 'Value must be a boolean'})
  isCompleted: boolean;
}