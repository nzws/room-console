import Sequelize from 'sequelize';

const Auth = sequelize => {
  return sequelize.define('auth', {
    token: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.STRING
    },
    IP: Sequelize.STRING
  });
};

export default Auth;
