'use strict';
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
  return Label;
};