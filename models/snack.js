module.exports = function(sequelize, DataTypes) {

    const Snack = sequelize.define("Snack", {
      name: DataTypes.STRING,
      img: DataTypes.STRING,     
      ingredients: DataTypes.TEXT,      
    });
    return Snack
  };
