import { categories } from "../categories/utils/categories";
import { MigrationInterface, QueryRunner } from "typeorm";

export class SpendCategoriesSetup1642561535203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      categories.map((category) =>
        queryRunner.query(
          `INSERT INTO public.category(id, name) VALUES (${category.id}, '${category.name}');`,
        ),
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(
      categories.map((category) =>
        queryRunner.query(
          `DELETE FROM public.category WHERE name='${category.name}';`,
        ),
      ),
    );
  }
}
