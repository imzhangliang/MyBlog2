'use strict';
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
    // associations can be defined here
  };
  return User;
};