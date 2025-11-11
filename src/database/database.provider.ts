import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { User } from 'src/users/entities/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USERNAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'mypassword',
  database: process.env.DATABASE_NAME || 'postgres',
  port: Number(process.env.DATABASE_PORT) || 5432,
  synchronize: true,
  entities: [User],
  migrations: [],
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'development' ? true : false,
};

const dataSource = new DataSource(dataSourceOptions);

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });

export default dataSource;
