module.exports = function(sequelize, DataTypes) {

    const Dinner = sequelize.define("Dinner", {
      name: DataTypes.STRING,
      img: DataTypes.STRING,     
      ingredients: DataTypes.TEXT,      
    });
    return Dinner
  };
