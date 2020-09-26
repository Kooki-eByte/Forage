module.exports = function(sequelize, DataTypes) {
  const Snack = sequelize.define(
    "Snack",
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      ingredients: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
    }
  );
  Snack.associate = function (models) {
    Snack.belongsTo(models.User);
  };
  return Snack;
};
