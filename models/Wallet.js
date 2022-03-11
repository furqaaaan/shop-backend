module.exports = (sequelize, Sequelize) => {
  const Wallet = sequelize.define('Wallet', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    gemBalance: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
    goldBalance: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Wallet;
};
