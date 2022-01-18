import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { SpendsService } from "./spends.service";
import { Spend } from "./entities/spend.entity";
import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { Payload } from "src/auth/types/payload.type";
import { OrderBy } from "./dto/order-by.input";
import { SpendInput } from "./dto/spend.input";

@Resolver(() => Spend)
export class SpendsResolver {
  constructor(private readonly spendsService: SpendsService) {}

  @Mutation(() => Spend)
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  createSpend(
    @Args("spendInput") spendInput: SpendInput,
    @Context() ctx: any,
  ): Promise<Spend> {
    const payload: Payload = ctx.req.user;
    return this.spendsService.createSpend(spendInput, payload);
  }

  @Mutation(() => Spend)
  @UseGuards(JwtAuthGuard)
  updateSpend(
    @Args("spendId", { type: () => Int }) spendId: number,
    @Args("spendInput") spendInput: SpendInput,
    @Context() ctx: any,
  ): Promise<Spend> {
    const payload: Payload = ctx.req.user;
    return this.spendsService.updateSpend(spendId, spendInput, payload);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  removeSpend(
    @Args("spendId", { type: () => Int }) spendId: number,
    @Context() ctx: any,
  ): Promise<Boolean> {
    const payload: Payload = ctx.req.user;
    return this.spendsService.removeSpend(spendId, payload);
  }

  @Query(() => [Spend])
  @UseGuards(JwtAuthGuard)
  getSpendsByDay(
    @Args("orderBy") order: OrderBy,
    @Context() ctx: any,
  ): Promise<Array<Spend>> {
    const payload: Payload = ctx.req.user;
    return this.spendsService.getSpendsByDay(order, payload);
  }

  @Query(() => [Spend])
  @UseGuards(JwtAuthGuard)
  getSpendsByWeek(
    @Args("orderBy") order: OrderBy,
    @Context() ctx: any,
  ): Promise<Array<Spend>> {
    const payload: Payload = ctx.req.user;
    return this.spendsService.getSpendsByWeek(order, payload);
  }

  @Query(() => [Spend])
  @UseGuards(JwtAuthGuard)
  getSpendsByMonth(
    @Args("orderBy") order: OrderBy,
    @Context() ctx: any,
  ): Promise<Array<Spend>> {
    const payload: Payload = ctx.req.user;
    return this.spendsService.getSpendsByMonth(order, payload);
  }
}
