import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { SpendsModule } from "./spends/spends.module";
import { CategoriesModule } from "./categories/categories.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { AuthModule } from "./auth/auth.module";
import { GraphQLError, GraphQLFormattedError } from "graphql";

@Module({
  imports: [
    UsersModule,
    SpendsModule,
    CategoriesModule,
    ConfigModule.forRoot({}),
    GraphQLModule.forRoot({
      cors: {
        origin: "https://localhost:4000/graphql",
        credentials: true,
      },
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      playground: true,
      // plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = error?.extensions
          ?.response?.message
          ? {
              message: error?.extensions?.response?.message || error.message,
            }
          : error;
        return graphQLFormattedError;
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: ["dist/**/entities/*.entity.js"],
      migrations: ["dist/migrations/*.js"],
      cli: {
        migrationsDir: "src/migrations",
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
