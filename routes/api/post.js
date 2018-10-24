'use strict';
//本模块放置的是文章(post)的api方法

var express = require('express');
var router = express.Router();
const models = require('../../models');
const Post = models.post;


//获取文章
router.get('/:id', function(req, res, next){
    Post.get(req.params.id).then(function(post){
        if (post) {
            res.jsonp({status: 0, message: '获取文章成功', data:post});    
        } else {
            res.jsonp({status: 1, message: '获取文章失败', data:post});    
        }
    })
});

//新增文章
router.post('/addPost', function(req, res, next){
    Post.add(req.body).then(function(post){
        if (post) {
            res.jsonp({status: 0, message: '新增文章成功', data:post})
        } else {
            res.jsonp({status: 1, message: '新增文章失败'})
        }
    });
})

//编辑文章
router.post('/editPost', function(req, res, next){
    Post.edit(req.body).then(function(editNum){
        if (editNum > 0) {
            res.jsonp({status: 0, message: '编辑文章成功', data:editNum})
        } else {
            res.jsonp({status: 1, message: '编辑文章失败', data:editNum})
        }
    })
})

//删除文章
router.post('/deletePost/:id', function(req, res, next){
    Post.delete(req.params.id).then(function(deleteNum){
        if (deleteNum > 0) {
            res.jsonp({status: 0, message: '删除文章成功', data:deleteNum})
        } else {
            res.jsonp({status: 1, message: '删除文章失败', data:deleteNum})
        }
    })
})

//获取文章分页列表
router.post('/postList', function(req, res, next){
    let {id} = req.body;    //因为find中where不允许多余的字段，所以先过滤一下
    Post.searchListAndCount({id}, 0, 2).then(function(result){
        res.jsonp({status: 0, message: '获取文章分页列表成功', total: result.count, data: result.rows})
    })
})







module.exports = router;