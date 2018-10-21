'use strict';
const baseModel = require('./base/baseModel');  //基类模型用于继承

// ****** 角色实体 ******
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
    name: { //角色名称
      type: DataTypes.STRING, 
      allowNull: false
    },
    
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
  };

  //继承基类的一些方法
  baseModel(Role);

  return Role;
};