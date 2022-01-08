import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

@InputType()
export class RegisterInput {
  @Field()
  @MinLength(3)
  @MaxLength(150)
  @IsNotEmpty()
  username: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @Field()
  @MinLength(8)
  @IsNotEmpty()
  confirmPassword: string;
}
