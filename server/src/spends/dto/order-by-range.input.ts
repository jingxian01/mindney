import { Field, InputType, registerEnumType } from "@nestjs/graphql";

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

registerEnumType(Order, {
  name: "Order",
  description: "ASC || DESC",
});

export enum By {
  DATE = "date",
  AMOUNT = "amount",
}

registerEnumType(By, {
  name: "By",
  description: "DATE || AMOUNT",
});

@InputType()
export class OrderByRange {
  @Field(() => By)
  by: By;

  @Field(() => Order)
  order: Order;

  @Field()
  start: string;

  @Field()
  end: string;
}
