import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { SpendsService } from "./spends.service";
import { Spend } from "./entities/spend.entity";
import { CreateSpendInput } from "./dto/create-spend.input";
import { UpdateSpendInput } from "./dto/update-spend.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { Payload } from "src/auth/types/payload.type";

@Resolver(() => Spend)
export class SpendsResolver {
  constructor(private readonly spendsService: SpendsService) {}

  @Mutation(() => Spend)
  @UseGuards(JwtAuthGuard)
  createSpend(
    @Args("createSpendInput") createSpendInput: CreateSpendInput,
    @Context() ctx: any,
  ): Promise<Spend> {
    const payload: Payload = ctx.req.user;
    return this.spendsService.create(createSpendInput, payload);
  }

  @Query(() => [Spend], { name: "spends" })
  findAll() {
    return this.spendsService.findAll();
  }

  @Query(() => Spend, { name: "spend" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.spendsService.findOne(id);
  }

  @Mutation(() => Spend)
  updateSpend(@Args("updateSpendInput") updateSpendInput: UpdateSpendInput) {
    return this.spendsService.update(updateSpendInput.id, updateSpendInput);
  }

  @Mutation(() => Spend)
  removeSpend(@Args("id", { type: () => Int }) id: number) {
    return this.spendsService.remove(id);
  }
}
