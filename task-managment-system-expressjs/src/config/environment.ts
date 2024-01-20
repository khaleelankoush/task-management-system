import * as dotenv from 'dotenv';
dotenv.config();
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_PORT = process.env.DATABASE_PORT;
export const DATABASE_HOST = process.env.DATABASE_HOST;

// module.exports = {
//   DATABASE_NAME: process.env.DATABASE_NAME,
//   DATABASE_USER: process.env.DATABASE_USER,
//   DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
//   DATABASE_PORT: process.env.DATABASE_PORT,
//   DATABASE_HOST: process.env.DATABASE_HOST,
// };
