import { Field, ObjectType } from "@nestjs/graphql";
import { Category } from "../../categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@ObjectType()
@Entity()
export class Spend {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column({ nullable: false })
  amount: number;

  @Field(() => String)
  @Column({ nullable: false })
  date: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.spends)
  user: User;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.spends)
  category: Category;
}
