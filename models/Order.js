module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('Order', {
    id: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.DataTypes.UUIDV4,
      primaryKey: true,
    },
    itemName: {
      type: Sequelize.DataTypes.STRING,
    },
    gemPaid: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
    goldAwarded: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Order;
};
