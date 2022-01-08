import { CreateSpendInput } from './create-spend.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSpendInput extends PartialType(CreateSpendInput) {
  @Field(() => Int)
  id: number;
}
