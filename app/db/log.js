import Sequelize from 'sequelize';

const Log = sequelize => {
  return sequelize.define('log', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    deviceId: Sequelize.UUID,
    createdBy: Sequelize.STRING,
    type: Sequelize.STRING,
    data: {
      type: Sequelize.JSON,
      defaultValue: {}
    }
  });
};

export default Log;
