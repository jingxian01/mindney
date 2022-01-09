import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Spend } from "../../spends/entities/spend.entity";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true, nullable: false })
  username: string;

  @Field()
  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Field(() => [Spend], { nullable: true })
  @OneToMany(() => Spend, (spend) => spend.user)
  spends?: Spend[];
}
