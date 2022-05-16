import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      type: 'postgres',
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
    },
    app: {
      env: process.env.ENV,
    },
  };
});
