import { DataSource } from 'typeorm';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import dotenv from 'dotenv';

dotenv.config();

console.log({ DB_HOST: process.env.DB_HOST });
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [UserEntity],
  migrations: [],
  subscribers: [],
});
