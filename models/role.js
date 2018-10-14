'use strict';
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
  return Role;
};