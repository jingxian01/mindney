import { Field, ObjectType } from "@nestjs/graphql";
import { Spend } from "../../spends/entities/spend.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Category {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field(() => [Spend], { nullable: true })
  @OneToMany(() => Spend, (spend) => spend.category)
  spends?: Spend[];
}
