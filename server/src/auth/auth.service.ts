import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { genSalt, hash } from "bcryptjs";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register({
    username,
    email,
    password,
    confirmPassword,
  }): Promise<User> {
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

    const saltRound = 7;
    const salt = await genSalt(saltRound);
    const hashedPassword = await hash(password, salt);
    password = "";

    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }
}
