import { UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { RegisterInput } from "./dto/register-input.dto";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  @UsePipes(ValidationPipe)
  register(@Args("registerInput") registerInput: RegisterInput): Promise<User> {
    return this.authService.register(registerInput);
  }
}
