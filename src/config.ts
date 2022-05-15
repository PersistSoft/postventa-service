import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    posgres: {
      name: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
    },
    app: {
      env: process.env.ENV,
    },
  };
});
