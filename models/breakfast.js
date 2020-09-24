module.exports = function(sequelize, DataTypes) {

    const Breakfast = sequelize.define("Breakfast", {
      name: DataTypes.STRING,
      img: DataTypes.STRING,     
      ingredients: DataTypes.TEXT,      
    });
    return Breakfast
  };
