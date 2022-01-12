import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty({ message: "username or email should not be empty" })
  usernameOrEmail: string;

  @Field()
  @IsNotEmpty({ message: "password should not be empty" })
  password: string;
}
