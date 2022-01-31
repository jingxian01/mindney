import { Field, InputType, registerEnumType } from "@nestjs/graphql";

export enum Range {
  DAY = "DAY",
  WEEK = "WEEK",
  MONTH = "MONTH",
}

registerEnumType(Range, {
  name: "TimeRange",
  description: "time range to fetch spends",
  valuesMap: {
    DAY: {
      description: "day interval",
    },
    WEEK: {
      description: "week interval",
    },
    MONTH: {
      description: "month interval",
    },
  },
});

export enum By {
  DATE = "date",
  AMOUNT = "amount",
}

registerEnumType(By, {
  name: "By",
  description: "field to fetch spends",
  valuesMap: {
    DATE: {
      description: "fetch by date",
    },
    AMOUNT: {
      description: "fetch by amount",
    },
  },
});

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

registerEnumType(Order, {
  name: "Order",
  description: "order to fetch spends",
  valuesMap: {
    ASC: {
      description: "by ascending order",
    },
    DESC: {
      description: "by descending order",
    },
  },
});

@InputType()
export class OrderByRange {
  @Field(() => Range)
  range: Range;

  @Field(() => By)
  by: By;

  @Field(() => Order)
  order: Order;
}
