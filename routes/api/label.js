'use strict';
//本模块放置的是标签(label)的api方法

var express = require('express');
var router = express.Router();
const models = require('../../models');
const Label = models.label;


//获取标签
router.get('/:id', function(req, res, next){
    Label.get(req.params.id).then(function(label){
        if (label) {
            res.jsonp({status: 0, message: '获取标签成功', data:label});    
        } else {
            res.jsonp({status: 1, message: '获取标签失败', data:label});    
        }
    })
});

//新增标签
router.post('/addLabel', function(req, res, next){
    Label.add(req.body).then(function(label){
        if (label) {
            res.jsonp({status: 0, message: '新增标签成功', data:label})
        } else {
            res.jsonp({status: 1, message: '新增标签失败'})
        }
    });
})

//编辑标签
router.post('/editLabel', function(req, res, next){
    Label.edit(req.body).then(function(editNum){
        if (editNum > 0) {
            res.jsonp({status: 0, message: '编辑标签成功', data:editNum})
        } else {
            res.jsonp({status: 1, message: '编辑标签失败', data:editNum})
        }
    })
})

//删除标签
router.post('/deleteLabel/:id', function(req, res, next){
    Label.delete(req.params.id).then(function(deleteNum){
        if (deleteNum > 0) {
            res.jsonp({status: 0, message: '删除标签成功', data:deleteNum})
        } else {
            res.jsonp({status: 1, message: '删除标签失败', data:deleteNum})
        }
    })
})

//获取标签列表
router.post('/labelList', function(req, res, next){
    Label.searchList({}).then(function(result){
        res.jsonp({status: 0, message: '获取标签列表成功', data: result})
    })
})







module.exports = router;