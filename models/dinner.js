module.exports = function(sequelize, DataTypes) {
  const Dinner = sequelize.define(
    "Dinner",
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      ingredients: DataTypes.TEXT,
      servings: DataTypes.INTEGER,
      calories: DataTypes.INTEGER
    },
    {
      freezeTableName: true,
    }
  );
  Dinner.associate = function (models) {
    Dinner.belongsTo(models.User);
  };
  return Dinner;
};
