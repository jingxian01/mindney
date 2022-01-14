import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "src/users/entities/user.entity";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./dto/auth-response.dto";
import { LoginInput } from "./dto/login-input.dto";
import { RegisterInput } from "./dto/register-input.dto";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  @UsePipes(ValidationPipe)
  register(
    @Args("registerInput") registerInput: RegisterInput,
    @Context() ctx: any,
  ): Promise<AuthResponse> {
    return this.authService.register(registerInput, ctx.res);
  }

  @Mutation(() => AuthResponse)
  @UsePipes(ValidationPipe)
  login(
    @Args("loginInput") loginInput: LoginInput,
    @Context() ctx: any,
  ): Promise<AuthResponse> {
    return this.authService.login(loginInput, ctx.res);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  logout(@Context() ctx) {
    return this.authService.logout(ctx.req.user.userId, ctx.res);
  }

  @Query(() => User, { nullable: true })
  @UseGuards(JwtAuthGuard)
  me(@Context() ctx): Promise<User> {
    return this.authService.me(ctx.req.user.userId);
  }
}
