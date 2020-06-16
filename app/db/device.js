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
    title: Sequelize.STRING,
    type: Sequelize.STRING,
    status: Sequelize.STRING,
    data: Sequelize.JSON
  });
};

export default Device;
