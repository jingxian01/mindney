import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesService } from "src/categories/categories.service";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Spend } from "./entities/spend.entity";
import { SpendsResolver } from "./spends.resolver";
import { SpendsService } from "./spends.service";

@Module({
  imports: [TypeOrmModule.forFeature([Spend, User, Category])],
  providers: [SpendsResolver, SpendsService, UsersService, CategoriesService],
  exports: [SpendsService],
})
export class SpendsModule {}
