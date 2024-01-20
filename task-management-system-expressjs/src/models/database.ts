import { Dialect, Sequelize } from 'sequelize';
import { dbName, dbUser, dbPassword, dbPort, dbHost } from '../config/config';

console.log(dbUser)
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: +dbPort,
  dialect: 'mysql',
});

export default sequelizeConnection;
