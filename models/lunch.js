module.exports = function(sequelize, DataTypes) {
  const Lunch = sequelize.define(
    "Lunch",
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
  Lunch.associate = function (models) {
    Lunch.belongsTo(models.User);
  };
  return Lunch;
};
