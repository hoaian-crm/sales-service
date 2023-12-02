import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateTableSales1701514886276 } from './1701514886276-create-table-sales';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: +process.env.PG_PORT,
  entities: [],
  migrations: [CreateTableSales1701514886276],
});
