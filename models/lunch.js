module.exports = function(sequelize, DataTypes) {
  const Lunch = sequelize.define(
    "Lunch",
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      ingredients: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
    }
  );
  return Lunch;
};
