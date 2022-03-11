module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] },
        },
      },
    }
  );

  return User;
};
