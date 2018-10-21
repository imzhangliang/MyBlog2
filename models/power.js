'use strict';
const baseModel = require('./base/baseModel');  //基类模型用于继承

// ****** 权限实体 ******
module.exports = (sequelize, DataTypes) => {
  const Power = sequelize.define('power', {
    name: { //权限名称
      type: DataTypes.STRING, 
      allowNull: false
    },
    
  }, {});
  Power.associate = function(models) {
    // associations can be defined here
  };

  //继承基类的一些方法
  baseModel(Power);

  return Power;
};