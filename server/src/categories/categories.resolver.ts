import { Query, Resolver } from "@nestjs/graphql";
import { CategoriesService } from "./categories.service";
import { Category } from "./entities/category.entity";

@Resolver()
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [Category])
  getAllCategories(): Promise<Array<Category>> {
    return this.categoriesService.getAllCategories();
  }
}
