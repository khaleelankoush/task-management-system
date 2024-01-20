import { DataTypes } from 'sequelize';
import sequelizeConnection from './database';

const Board = sequelizeConnection.define<any>('Board', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  owner_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Board;
