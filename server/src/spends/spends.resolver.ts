import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SpendsService } from './spends.service';
import { Spend } from './entities/spend.entity';
import { CreateSpendInput } from './dto/create-spend.input';
import { UpdateSpendInput } from './dto/update-spend.input';

@Resolver(() => Spend)
export class SpendsResolver {
  constructor(private readonly spendsService: SpendsService) {}

  @Mutation(() => Spend)
  createSpend(@Args('createSpendInput') createSpendInput: CreateSpendInput) {
    return this.spendsService.create(createSpendInput);
  }

  @Query(() => [Spend], { name: 'spends' })
  findAll() {
    return this.spendsService.findAll();
  }

  @Query(() => Spend, { name: 'spend' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.spendsService.findOne(id);
  }

  @Mutation(() => Spend)
  updateSpend(@Args('updateSpendInput') updateSpendInput: UpdateSpendInput) {
    return this.spendsService.update(updateSpendInput.id, updateSpendInput);
  }

  @Mutation(() => Spend)
  removeSpend(@Args('id', { type: () => Int }) id: number) {
    return this.spendsService.remove(id);
  }
}
