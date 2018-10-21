'use strict';
//本模块放置的是标签(label)的api方法

var express = require('express');
var router = express.Router();
const models = require('../../models');
const Label = models.label;


//获取标签
router.get('/:id', function(req, res, next){
    Label.get(req.params.id).then(function(label){
        res.jsonp({status: 0, message: '获取标签成功', data:label});    
    })
});

//新增标签
router.label('/addLabel', function(req, res, next){
    Label.add(req.body).then(function(label){
        if (label) {
            res.jsonp({status: 0, message: '新增标签成功', data:label})
        } else {
            res.jsonp({status: 1, message: '新增标签失败'})
        }
    });
})

//编辑标签
router.label('/editLabel', function(req, res, next){
    Label.edit(req.body).then(function(editNum){
        if (editNum > 0) {
            res.jsonp({status: 0, message: '编辑标签成功', data:editNum})
        } else {
            res.jsonp({status: 1, message: '编辑标签失败', data:editNum})
        }
    })
})

//删除标签
router.label('/deleteLabel/:id', function(req, res, next){
    Label.delete(req.params.id).then(function(deleteNum){
        if (deleteNum > 0) {
            res.jsonp({status: 0, message: '删除标签成功', data:deleteNum})
        } else {
            res.jsonp({status: 1, message: '删除标签失败', data:deleteNum})
        }
    })
})

//获取标签分页列表
router.label('/labelList', function(req, res, next){
    let {id} = req.body;    //因为find中where不允许多余的字段，所以先过滤一下
    Label.searchListAndCount({id}, 0, 2).then(function(result){
        res.jsonp({status: 0, message: '获取标签分页列表成功', total: result.count, data: result.rows})
    })
})







module.exports = router;