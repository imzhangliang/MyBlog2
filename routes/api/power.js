'use strict';
//本模块放置的是权限(power)的api方法

var express = require('express');
var router = express.Router();
const models = require('../../models');
const Power = models.power;


//获取权限
router.get('/:id', function(req, res, next){
    Power.get(req.params.id).then(function(power){
        res.jsonp({status: 0, message: '获取权限成功', data:power});    
    })
});

//新增权限
router.post('/addPower', function(req, res, next){
    Power.add(req.body).then(function(power){
        if (power) {
            res.jsonp({status: 0, message: '新增权限成功', data:power})
        } else {
            res.jsonp({status: 1, message: '新增权限失败'})
        }
    });
})

//编辑权限
router.post('/editPower', function(req, res, next){
    Power.edit(req.body).then(function(editNum){
        if (editNum > 0) {
            res.jsonp({status: 0, message: '编辑权限成功', data:editNum})
        } else {
            res.jsonp({status: 1, message: '编辑权限失败', data:editNum})
        }
    })
})

//删除权限
router.post('/deletePower/:id', function(req, res, next){
    Power.delete(req.params.id).then(function(deleteNum){
        if (deleteNum > 0) {
            res.jsonp({status: 0, message: '删除权限成功', data:deleteNum})
        } else {
            res.jsonp({status: 1, message: '删除权限失败', data:deleteNum})
        }
    })
})

//获取权限分页列表
router.post('/powerList', function(req, res, next){
    let {id} = req.body;    //因为find中where不允许多余的字段，所以先过滤一下
    Power.searchListAndCount({id}, 0, 2).then(function(result){
        res.jsonp({status: 0, message: '获取权限分页列表成功', total: result.count, data: result.rows})
    })
})







module.exports = router;