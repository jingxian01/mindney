import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class OrderBy {
  @Field()
  by: string;

  @Field({ nullable: true })
  order?: string;
}
