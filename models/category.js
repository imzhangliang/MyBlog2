'use strict';
const baseModel = require('./base/baseModel');  //基类模型用于继承

// ****** 文章分类实体 ******
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    name: { //分类名称
      type: DataTypes.STRING, 
      allowNull: false
    },
    
  }, {});
  Category.associate = function(models) {
    
  };

  //继承基类的一些方法
  baseModel(Category);

  Category.searchList = function (where, offset, limit) {
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    const Post = require('../models').post;
    const co = require('co');
    return Category.findAll({
        where: where,
        limit: limit,
        offset: offset
    }).then(function (objs) {
        let unCate = new Category();
        unCate.name = "未分类";
        objs = [unCate].concat(objs);

        
        return co(function *(){
          for (let i = 0; i < objs.length; i++) {
            let obj = objs[i];
            obj.dataValues.postCount = yield Post.count({where:{cateId:obj.id}});
          }

          return objs;
        });
        
    })
  }

  return Category;
};