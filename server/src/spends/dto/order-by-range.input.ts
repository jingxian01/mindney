import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class OrderByRange {
  @Field()
  by: string;

  @Field({ nullable: true })
  order?: string;

  @Field()
  start: string;

  @Field()
  end: string;
}
