import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "usernameOrEmail",
    });
  }

  async validate(usernameOrEmail: string, password: string): Promise<any> {
    const { user, fieldError } = await this.authService.validateUser({
      usernameOrEmail,
      password,
    });
    if (fieldError) {
      throw new Error(fieldError.message);
    }
    return user;
  }
}
