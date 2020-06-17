import Sequelize from 'sequelize';

const Hook = sequelize => {
  return sequelize.define('hook', {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    token: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    name: Sequelize.STRING
  });
};

export default Hook;
