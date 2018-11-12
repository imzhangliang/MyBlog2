'use strict';
//本模块放置的是文章子目录(/post)的页面

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render("admin/index");
});

//文章分类管理
router.get('/cate', function(req, res, next){
    res.render("admin/cate");
})

//文章管理
router.get('/post', function(req, res, next){
    res.render("admin/post");
})

//文章管理
router.get('/addPost', function(req, res, next){
    res.render("admin/addPost");
})


module.exports = router;