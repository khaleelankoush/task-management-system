import { DataTypes } from 'sequelize';
import sequelizeConnection from './database';

const Member = sequelizeConnection.define<any>('Member', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Member;
