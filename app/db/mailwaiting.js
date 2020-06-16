import Sequelize from 'sequelize';

const Mailwaiting = sequelize => {
  return sequelize.define('mailwaiting', {
    token: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    type: Sequelize.STRING,
    IP: Sequelize.STRING,
    isApproved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });
};

export default Mailwaiting;
