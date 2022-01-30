import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payload } from "src/auth/types/payload.type";
import { CategoriesService } from "../categories/categories.service";
import { UsersService } from "../users/users.service";
import { Between, Repository } from "typeorm";
import { Spend } from "./entities/spend.entity";
import { SpendInput } from "./dto/spend.input";
import { User } from "src/users/entities/user.entity";
import { By, OrderByRange } from "./dto/order-by-range.input";

@Injectable()
export class SpendsService {
  constructor(
    private usersService: UsersService,
    private categoriesService: CategoriesService,

    @InjectRepository(Spend)
    private spendRepository: Repository<Spend>,
  ) {}

  async createSpend(
    { name, description, amount, date, categoryId }: SpendInput,
    { userId }: Payload,
  ): Promise<Spend> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const category = await this.categoriesService.getCategoryById(categoryId);
    if (!category) {
      throw new Error("category not found");
    }

    if (!date) {
      date = new Date();
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

  async updateSpend(
    spendId: number,
    spendInput: SpendInput,
    { userId }: Payload,
  ): Promise<Spend> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const spend = await this.spendRepository.findOne({
      where: { id: spendId },
      relations: ["user", "category"],
    });
    if (!spend) {
      throw new Error("spend not found");
    }

    if (!this.isAuthor(spend.user.id, user.id)) {
      throw new Error("not authorized");
    }

    const category = await this.categoriesService.getCategoryById(
      spendInput.categoryId,
    );
    if (!category) {
      throw new Error("category not found");
    }

    return this.spendRepository.save({
      ...spend,
      ...spendInput,
      date: spend.date,
      category,
    });
  }

  async getSpendsByRange(
    orderByRange: OrderByRange,
    limit: number,
    cursor: string,
    { userId }: Payload,
  ): Promise<Array<Spend>> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }

    return this.findSpends(orderByRange, limit, cursor, user);
  }

  async removeSpend(spendId: number, { userId }: Payload): Promise<Boolean> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const spend = await this.spendRepository.findOne({
      where: { id: spendId },
      relations: ["user"],
    });
    if (!spend) {
      throw new Error("spend not found");
    }

    if (!this.isAuthor(spend.user.id, user.id)) {
      throw new Error("not authorized");
    }

    await this.spendRepository.delete({ id: spendId });

    return true;
  }

  async findSpends(
    { start, end, by, order }: OrderByRange,
    limit: number,
    cursor: string | null,
    user: User,
  ): Promise<Array<Spend>> {
    // todos: pagination
    const realLimit = Math.min(50, limit);
    const qb = this.spendRepository
      .createQueryBuilder("spend")
      .leftJoinAndSelect("spend.category", "category")
      .leftJoinAndSelect("spend.user", "user")
      .where("spend.user.id = :id", { id: user.id }); // where user

    if (cursor) {
      qb.andWhere(
        cursor ? `spend.${by} ${order === "DESC" ? "<" : ">"} :cursor` : "",
        {
          cursor:
            by === "date" ? new Date(parseInt(cursor)) : parseFloat(cursor),
        },
      );
    }
    const spends = await qb
      .andWhere("spend.date BETWEEN :start AND :end", { start, end })
      .orderBy(`spend.${by}`, `${order}`)
      .take(realLimit)
      .getMany();

    return spends;
  }

  isAuthor(idFromSpend: number, idFromUser: number) {
    return idFromSpend === idFromUser;
  }
}
