import { IsInt, IsNotEmpty } from 'class-validator';

export class FindByUserIdDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
