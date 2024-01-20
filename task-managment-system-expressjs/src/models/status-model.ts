import { DataTypes } from 'sequelize';
import sequelizeConnection from './database';

const Status = sequelizeConnection.define<any>('Status', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isUnique: async function (value: number) {
        const existingStatus = await Status.findOne({
          where: {
            board_id: this.board_id,
            weight: value,
          },
        });
        if (existingStatus) {
          throw new Error(
            'The combination of board_id and weight must be unique.'
          );
        }
      },
    },
  },
});

export default Status;
