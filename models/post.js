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
  
  Post.associate = function (models) {
    // associations can be defined here
  };

  Post.addPost = function(model) {
    Post.create(model).then(function(obj){
      return obj;
    });
  }

  Post.editPost = function(model) {
    Post.update(model, {
      where: {
        id:model.id
      }
    }).then(function(res) {
      return res;
    });
  }

  Post.updatePost = function(model) {
    if (model.id) {
      Post.editPost(model);
    } else {
      Post.addPost(model);
    }
  }

  Post.getPost = function(id) {
    Post.findOne({where:{id:id}}).then(function(obj){
      return obj;
    });
  }

  Post.deletePost = function(id) {
    Post.destroy({where:{id:id}, limit:1}).then(function(num) {
      return num;
    });
  }

  Post.postList = function(where, offset, limit) {
    Post.findAll({
      where: where,
      limit: limit,
      offset: offset
    }).then(function(objs){
      return objs;
    })
  }

  Post.postListByPage = function(where, pageNum, pageSize) {

  }

  return Post;
};