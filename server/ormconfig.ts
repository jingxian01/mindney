import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number.parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: true,
  synchronize: true,
  entities: ["dist/src/**/entities/*.entity.js"],
  migrations: ["dist/src/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
};

export default config;
