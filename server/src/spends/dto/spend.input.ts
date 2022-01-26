import { InputType, Int, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

@InputType()
export class SpendInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  @Min(1, { message: "amount should greater than 0" })
  @IsNotEmpty()
  @IsNumber(null, { message: "amount should be number" })
  amount: number;

  @Field(() => String, { nullable: true })
  date?: Date;

  @Field(() => Int)
  @IsNotEmpty()
  categoryId: number;
}
