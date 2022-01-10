import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { LoginInput } from "./dto/login-input.dto";
import { LoginResponse } from "./dto/login-response.dto";
import { RegisterInput } from "./dto/register-input.dto";
import { GqlAuthGuard } from "./guards/gql.guard";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  @UsePipes(ValidationPipe)
  register(@Args("registerInput") registerInput: RegisterInput): Promise<User> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => LoginResponse)
  @UsePipes(ValidationPipe)
  @UseGuards(GqlAuthGuard)
  login(@Args("loginInput") loginInput: LoginInput, @Context() ctx: any) {
    return this.authService.login(ctx.user, ctx);
  }
}
