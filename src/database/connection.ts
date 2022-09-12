import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '.sqlite3',
  logging: false
});

import User from './models/user';
import Sketch from './models/sketch';

export async function init() {
  try {
    await sequelize.authenticate();

    User.hasMany(Sketch, {
      as: 'sketches',
      foreignKey: 'ownerId'
    });
    Sketch.belongsTo(User, {
      as: 'owner',
      foreignKey: 'ownerId'
    });

    await sequelize.sync({ force: false });
    await sequelize.sync();

    console.log(`Database connected`);
  } catch (e) {
    console.log(`Error when initialising database: ${e.message}`);
  }
}
