import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy as JWTPassportStrategy } from "passport-jwt";
import { Strategy as PassportLocalStrategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(PassportLocalStrategy) {
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

@Injectable()
export class JwtStrategy extends PassportStrategy(JWTPassportStrategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = {
      userId: payload.userId,
    };
    return user;
  }
}
