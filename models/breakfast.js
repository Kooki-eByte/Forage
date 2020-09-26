module.exports = function(sequelize, DataTypes) {
  const Breakfast = sequelize.define(
    "Breakfast",
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      ingredients: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
    }
  );
  Breakfast.associate = function(models) {
    Breakfast.belongsTo(models.User);
  };
  return Breakfast;
};
