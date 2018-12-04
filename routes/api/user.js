'use strict';
//本模块放置的是用户(user)的api方法

var express = require('express');
var router = express.Router();
const models = require('../../models');
const User = models.user;


//获取用户
router.get('/:id', function(req, res, next){
    User.get(req.params.id).then(function(user){
        if (user) {
            res.jsonp({status: 0, message: '获取用户成功', data:user});    
        } else {
            res.jsonp({status: 1, message: '获取用户失败', data:user});    
        }
    })
});

//新增用户
router.post('/addUser', function(req, res, next){
    User.add(req.body).then(function(user){
        if (user) {
            res.jsonp({status: 0, message: '新增用户成功', data:user})
        } else {
            res.jsonp({status: 1, message: '新增用户失败'})
        }
    });
})

//编辑用户
router.post('/editUser', function(req, res, next){
    User.edit(req.body).then(function(editNum){
        if (editNum > 0) {
            res.jsonp({status: 0, message: '编辑用户成功', data:editNum})
        } else {
            res.jsonp({status: 1, message: '编辑用户失败', data:editNum})
        }
    })
})

//删除用户
router.post('/deleteUser/:id', function(req, res, next){
    User.delete(req.params.id).then(function(deleteNum){
        if (deleteNum > 0) {
            res.jsonp({status: 0, message: '删除用户成功', data:deleteNum})
        } else {
            res.jsonp({status: 1, message: '删除用户失败', data:deleteNum})
        }
    })
})

//获取用户分页列表
router.post('/userList', function(req, res, next){
    User.searchList().then(function(result){
        res.jsonp({status: 0, message: '获取标签列表成功', data: result})
    })
})







module.exports = router;