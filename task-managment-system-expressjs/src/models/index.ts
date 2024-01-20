import User from './user-model';
import Board from './board-model';
import Status from './status-model';
import Member from './member-model';
import Task from './task-model';

Member.belongsTo(User, { foreignKey: 'member_id' });

Board.belongsTo(User, { foreignKey: 'owner_user_id' });

Member.belongsTo(Board, { foreignKey: 'board_id' });

Status.belongsTo(Board, { foreignKey: 'board_id' });

Task.belongsTo(User, { foreignKey: 'member_id' });

Task.belongsTo(Status, { foreignKey: 'status_id' });

async function conn() {
  await User.sync();
  await Board.sync();
  await Status.sync();
  await Task.sync();
  await Member.sync();
}
conn();
