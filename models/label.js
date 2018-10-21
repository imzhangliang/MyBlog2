'use strict';
const baseModel = require('./base/baseModel');  //基类模型用于继承

// ****** 标签实体 ******
module.exports = (sequelize, DataTypes) => {
  const Label = sequelize.define('label', {
    name: { //标签名称
      type: DataTypes.STRING, 
      allowNull: false
    },
    
  }, {});
  Label.associate = function(models) {
    // associations can be defined here
  };

  //继承基类的一些方法
  baseModel(Label);

  return Label;
};