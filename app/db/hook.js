import Sequelize from 'sequelize';

const Hook = sequelize => {
  return sequelize.define('hook', {
    token: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.STRING
    },
    name: Sequelize.STRING
  });
};

export default Hook;
