'use strict';
//本模块放置的是角色(role)的api方法

var express = require('express');
var router = express.Router();
const models = require('../../models');
const Role = models.role;


//获取角色
router.get('/:id', function(req, res, next){
    Role.get(req.params.id).then(function(role){
        res.jsonp({status: 0, message: '获取角色成功', data:role});    
    })
});

//新增角色
router.post('/addRole', function(req, res, next){
    Role.add(req.body).then(function(role){
        if (role) {
            res.jsonp({status: 0, message: '新增角色成功', data:role})
        } else {
            res.jsonp({status: 1, message: '新增角色失败'})
        }
    });
})

//编辑角色
router.post('/editRole', function(req, res, next){
    Role.edit(req.body).then(function(editNum){
        if (editNum > 0) {
            res.jsonp({status: 0, message: '编辑角色成功', data:editNum})
        } else {
            res.jsonp({status: 1, message: '编辑角色失败', data:editNum})
        }
    })
})

//删除角色
router.post('/deleteRole/:id', function(req, res, next){
    Role.delete(req.params.id).then(function(deleteNum){
        if (deleteNum > 0) {
            res.jsonp({status: 0, message: '删除角色成功', data:deleteNum})
        } else {
            res.jsonp({status: 1, message: '删除角色失败', data:deleteNum})
        }
    })
})

//获取角色分页列表
router.post('/roleList', function(req, res, next){
    let {id} = req.body;    //因为find中where不允许多余的字段，所以先过滤一下
    Role.searchListAndCount({id}, 0, 2).then(function(result){
        res.jsonp({status: 0, message: '获取角色分页列表成功', total: result.count, data: result.rows})
    })
})







module.exports = router;