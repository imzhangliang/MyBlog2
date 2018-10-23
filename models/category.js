'use strict';
const baseModel = require('./base/baseModel');  //基类模型用于继承

// ****** 文章分类实体 ******
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    name: { //分类名称
      type: DataTypes.STRING, 
      allowNull: false
    },
    
  }, {});
  Category.associate = function(models) {
    
  };

  //继承基类的一些方法
  baseModel(Category);

  return Category;
};