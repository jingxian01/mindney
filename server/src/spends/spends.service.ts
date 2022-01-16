import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payload } from "src/auth/types/payload.type";
import { CategoriesService } from "../categories/categories.service";
import { UsersService } from "../users/users.service";
import { Repository } from "typeorm";
import { CreateSpendInput } from "./dto/create-spend.input";
import { UpdateSpendInput } from "./dto/update-spend.input";
import { Spend } from "./entities/spend.entity";

@Injectable()
export class SpendsService {
  constructor(
    private usersService: UsersService,
    private categoriesService: CategoriesService,

    @InjectRepository(Spend)
    private spendRepository: Repository<Spend>,
  ) {}

  async create(
    { name, description, amount, date, categoryId }: CreateSpendInput,
    { userId }: Payload,
  ): Promise<Spend> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      // todos: figure out how to handle
      return null;
    }

    const category = await this.categoriesService.getCategoryById(categoryId);
    if (!category) {
      // todos: figure out how to handle
      return null;
    }

    const spend = this.spendRepository.create({
      name,
      description,
      amount,
      date,
      user,
      category,
    });

    return this.spendRepository.save(spend);
  }

  findAll() {
    return `This action returns all spends`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spend`;
  }

  update(id: number, updateSpendInput: UpdateSpendInput) {
    return `This action updates a #${id} spend`;
  }

  remove(id: number) {
    return `This action removes a #${id} spend`;
  }
}
