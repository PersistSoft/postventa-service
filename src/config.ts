import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATA_BASE_NAME,
      port: process.env.DATA_BASE_PORT,
    },
    app: {
      env: process.env.ENV,
      apikey: process.env.API_KEY,
    },
  };
});
