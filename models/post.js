'use strict';
// ****** 文章实体 ******
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
    title: { //文章标题
      type: DataTypes.STRING, 
      allowNull: false 
    },
    date: { //文章发表日期
      type: DataTypes.DATE, 
      allowNull: false 
    },
    cateId: { //文章分类ID
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    content: { //内容
      type: DataTypes.TEXT, 
      allowNull: false 
    },
    
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};