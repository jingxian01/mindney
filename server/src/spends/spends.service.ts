import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payload } from "src/auth/types/payload.type";
import { CategoriesService } from "../categories/categories.service";
import { UsersService } from "../users/users.service";
import { Between, Repository } from "typeorm";
import { Spend } from "./entities/spend.entity";
import {
  getCurrentDate,
  getCurrentDatePlusOneDay,
  getCurrentMonth,
  getCurrentWeek,
} from "./utils/date";
import { OrderBy } from "./dto/order-by.input";
import { SpendInput } from "./dto/spend.input";

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

  async getSpendsByDay(
    orderBy: OrderBy,
    { userId }: Payload,
  ): Promise<Array<Spend>> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const currentDate = getCurrentDate();
    const currentDatePlusOneDay = getCurrentDatePlusOneDay();

    // todos: pagination
    const spendsInDay = await this.spendRepository.find({
      where: { user, date: Between(currentDate, currentDatePlusOneDay) },
      relations: ["category", "user"],
      take: 10,
      order:
        orderBy.by === "orderByAmount"
          ? {
              amount: orderBy.order ? "ASC" : "DESC",
              date: "DESC",
            }
          : {
              date: orderBy.order ? "DESC" : "ASC",
            },
    });

    return spendsInDay;
  }

  async getSpendsByWeek(
    orderBy: OrderBy,
    { userId }: Payload,
  ): Promise<Array<Spend>> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const { start, end } = getCurrentWeek();

    // todos: pagination
    const spendsInDay = await this.spendRepository.find({
      where: { user, date: Between(start, end) },
      relations: ["category", "user"],
      take: 10,
      order:
        orderBy.by === "orderByAmount"
          ? {
              amount: orderBy.order ? "ASC" : "DESC",
              date: "DESC",
            }
          : {
              date: orderBy.order ? "DESC" : "ASC",
            },
    });

    return spendsInDay;
  }

  async getSpendsByMonth(
    orderBy: OrderBy,
    { userId }: Payload,
  ): Promise<Array<Spend>> {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new Error("user not found");
    }

    const { start, end } = getCurrentMonth();

    // todos: pagination
    const spendsInDay = await this.spendRepository.find({
      where: { user, date: Between(start, end) },
      relations: ["category", "user"],
      take: 10,
      order:
        orderBy.by === "orderByAmount"
          ? {
              amount: orderBy.order ? "ASC" : "DESC",
              date: "DESC",
            }
          : {
              date: orderBy.order ? "DESC" : "ASC",
            },
    });

    return spendsInDay;
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

  isAuthor(idFromSpend: number, idFromUser: number) {
    return idFromSpend === idFromUser;
  }
}
