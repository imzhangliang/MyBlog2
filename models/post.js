'use strict';
const baseModel = require('./base/baseModel');  //基类模型用于继承

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
      allowNull: true
    },
    content: { //内容
      type: DataTypes.TEXT, 
      allowNull: false
    },
    
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };

  //继承基类的一些方法
  baseModel(Post);

  return Post;
};