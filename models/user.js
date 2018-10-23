'use strict';
const baseModel = require('./base/baseModel');  //基类模型用于继承

// ****** 用户实体 ******
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: { //用户名
      type: DataTypes.STRING, 
      allowNull: false
    },
    password: { //密码
      type: DataTypes.STRING, 
      allowNull: false
    },
    nickname: { //昵称
      type: DataTypes.STRING, 
      allowNull: false
    },
    
  }, {});
  User.associate = function(models) {
    
      
      User.belongsToMany(models.role, {through: 'userRole'});
      
  };

  //继承基类的一些方法
  baseModel(User);

  return User;
};