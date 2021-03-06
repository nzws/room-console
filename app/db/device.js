import Sequelize from 'sequelize';

const Device = sequelize => {
  return sequelize.define('device', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    deviceId: Sequelize.STRING,
    isRunning: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    data: {
      type: Sequelize.JSON,
      defaultValue: {}
    }
  });
};

export default Device;
