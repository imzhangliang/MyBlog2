'use strict';
// ****** 文章分类实体 ******
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    name: { //分类名称
      type: DataTypes.STRING, 
      allowNull: false 
    },
    
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};