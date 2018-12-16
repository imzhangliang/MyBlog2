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

  User.searchList = function (where, offset, limit) {
    const Role = require('../models').role;
    return User.findAll({
        where: where,
        include: [
          {model: Role}
        ],
        limit: limit,
        offset: offset
    }).then(function (objs) {
        return objs;
    })
  }

  User.get = function (id) {
    const Role = require('../models').role;
    return User.findOne({ 
      where: { id: id },
      include: [
        {model: Role}
      ]
    }).then(function (obj) {
        return obj;
    });
  }

  User.edit = function (model) {
    const Role = require('../models').role;

    return User.update(model, {
        where: {
            id: model.id
        }
    }).then(function (res) {
        if (res[0] > 0 && model.roleId && model.roleId != -1) { //设置角色, 当前每个用户最多只能有1个角色
          return User.get(model.id).then(function(user){
            return Role.get(model.roleId).then(function(role){
              return user.setRoles([role]).then(function(result){
                return res[0];
              })
            })
          })

        } else {
          return res[0];
        }
    }).catch(function (err) {
        return 0;
    });
  }

  User.add = function (model) {
    const Role = require('../models').role;

    return User.create(model).then(function (user) {
      if (user && model.roleId && model.roleId != -1) { //设置角色, 当前每个用户最多只能有1个角色
        return Role.get(model.roleId).then(function(role){
          return user.setRoles([role]).then(function(result){
            return user;
          })
        })
      } else {
        return user;
      }
    }).catch(function (err) {
        return null;
    });
  }

  return User;
};