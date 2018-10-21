'use strict';
//本模块放置的是文章分类(category)的api方法

var express = require('express');
var router = express.Router();
const models = require('../../models');
const Category = models.category;


//获取文章分类
router.get('/:id', function(req, res, next){
    Category.get(req.params.id).then(function(category){
        res.jsonp({status: 0, message: '获取文章分类成功', data:category});    
    })
});

//新增文章分类
router.post('/addCategory', function(req, res, next){
    Category.add(req.body).then(function(category){
        if (category) {
            res.jsonp({status: 0, message: '新增文章分类成功', data:category})
        } else {
            res.jsonp({status: 1, message: '新增文章分类失败'})
        }
    });
})

//编辑文章分类
router.post('/editCategory', function(req, res, next){
    Category.edit(req.body).then(function(editNum){
        if (editNum > 0) {
            res.jsonp({status: 0, message: '编辑文章分类成功', data:editNum})
        } else {
            res.jsonp({status: 1, message: '编辑文章分类失败', data:editNum})
        }
    })
})

//删除文章分类
router.post('/deleteCategory/:id', function(req, res, next){
    Category.delete(req.params.id).then(function(deleteNum){
        if (deleteNum > 0) {
            res.jsonp({status: 0, message: '删除文章分类成功', data:deleteNum})
        } else {
            res.jsonp({status: 1, message: '删除文章分类失败', data:deleteNum})
        }
    })
})

//获取文章分类分页列表
router.post('/categoryList', function(req, res, next){
    let {id} = req.body;    //因为find中where不允许多余的字段，所以先过滤一下
    Category.searchListAndCount({id}, 0, 2).then(function(result){
        res.jsonp({status: 0, message: '获取文章分类分页列表成功', total: result.count, data: result.rows})
    })
})







module.exports = router;