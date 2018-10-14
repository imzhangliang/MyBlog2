'use strict';
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
  return Power;
};