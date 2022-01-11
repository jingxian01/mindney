import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, genSalt, hash } from "bcryptjs";
import { Request, Response } from "express";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { LoginInput } from "./dto/login-input.dto";
import { LoginResponse } from "./dto/login-response.dto";
import { RegisterInput } from "./dto/register-input.dto";
import { ValidateResponse } from "./dto/validate-response.dto";
import { Payload } from "./types/payload.type";
import { Tokens } from "./types/tokens.type";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register({
    username,
    email,
    password,
    confirmPassword,
  }: RegisterInput): Promise<User> {
    // check user with same username
    const userWithSameUsername = await this.userRepository.findOne({
      username,
    });
    if (userWithSameUsername) {
      throw new Error("username has already been used");
    }

    // check user with same email
    const userWithSameEmail = await this.userRepository.findOne({ email });
    if (userWithSameEmail) {
      throw new Error("email has already been used");
    }

    // check password
    if (password != confirmPassword) {
      throw new Error("passwords do not match");
    }

    // hashing
    const hashedPassword = await this.hashData(password);
    password = "";

    // create user
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });
    const returnUser = await this.userRepository.save(newUser);

    // get tokens
    const tokens: Tokens = await this.getTokens(
      returnUser.id,
      returnUser.email,
    );

    // update refresh token in database
    await this.updateRefreshToken(returnUser.id, tokens.refreshToken);

    return returnUser;
  }

  async validateUser({
    usernameOrEmail,
    password,
  }: LoginInput): Promise<ValidateResponse> {
    // find user
    const user = await this.userRepository.findOne(
      usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    );

    // user not found
    if (!user) {
      return {
        fieldError: {
          field: "usernameOrEmail",
          message: "invalid username or email",
        },
      };
    }

    // password does not match
    const isValid = await compare(password, user.password);
    if (!isValid) {
      return {
        fieldError: {
          field: "password",
          message: "invalid password",
        },
      };
    }

    return { user };
  }

  async login(user: User, res: any): Promise<LoginResponse> {
    // get tokens
    const { accessToken, refreshToken }: Tokens = await this.getTokens(
      user.id,
      user.email,
    );

    // update refresh token in database
    await this.updateRefreshToken(user.id, refreshToken);

    // send refresh token cookie
    res.cookie("mid", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      // todos: set up domain, secure in production
    });

    return {
      accessToken: accessToken,
      user,
    };
  }

  async logout(userId: number, res: any): Promise<Boolean> {
    await this.userRepository.update({ id: userId }, { refreshToken: null });
    res.clearCookie("mid");
    return true;
  }

  async refreshToken(req: Request, res: Response) {
    // get refresh token from cookie in the request object
    const refreshToken = req.cookies.mid;
    if (!refreshToken) {
      return res.send({ ok: false, accessToken: "" });
    }

    // verify the refresh token and get the payload
    let payload: Payload = null;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    // find user
    const userId = payload.userId;
    const user = await this.userRepository.findOne({ id: userId });

    // verify refresh token with the one in database
    const refreshTokenIsValid = await compare(refreshToken, user.refreshToken);
    if (!refreshTokenIsValid) {
      return res.send({ ok: false, accessToken: "" });
    }

    // get new access and refresh token and update new refresh token in database
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    // return the new access token
    return res.send({ ok: true, accessToken: tokens.accessToken });
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const accessToken = await this.jwtService.signAsync(
      { userId, email },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: 60 * 15,
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      { userId, email },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: 60 * 60 * 24 * 7,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userRepository.update(
      {
        id: userId,
      },
      {
        refreshToken: hashedRefreshToken,
      },
    );
  }

  async hashData(data: string): Promise<string> {
    const saltRound = 7;
    const salt = await genSalt(saltRound);
    const hashedData = await hash(data, salt);
    return hashedData;
  }
}
