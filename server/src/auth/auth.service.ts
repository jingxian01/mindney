import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { compare, genSalt, hash } from "bcryptjs";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { LoginInput } from "./dto/login-input.dto";
import { LoginResponse } from "./dto/login-response.dto";
import { RegisterInput } from "./dto/register-input.dto";
import { ValidateResponse } from "./dto/validate-response.dto";

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
    const saltRound = 7;
    const salt = await genSalt(saltRound);
    const hashedPassword = await hash(password, salt);
    password = "";

    // create user
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
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

  async login(user: User): Promise<LoginResponse> {
    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
      }),
      user,
    };
  }
}
