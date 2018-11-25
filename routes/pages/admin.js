'use strict';
//本模块放置的是文章子目录(/post)的页面

var express = require('express');
var router = express.Router();
var models = require('../../models');
var Post = models.post;

router.get('/', function(req, res, next) {
    res.render("admin/index");
});

//文章分类管理
router.get('/cate', function(req, res, next){
    res.render("admin/cate");
})

//文章管理
router.get('/post', function(req, res, next){
    res.render("admin/post/post");
})

//增加管理
router.get('/addPost', function(req, res, next){
    res.render("admin/post/addPost");
})

//编辑文章
router.get('/editPost', function(req, res, next){
    let id = req.query.id;
    let viewData = {}
    return Post.get(id).then(function(data){
        console.log(id, data.dataValues);
        if (data ) {
            console.log(1);
            res.render("admin/post/editPost", data.dataValues);
        } else {
            res.send(404)
        }
    })    

    
})


//标签管理
router.get('/label', function(req, res, next){
    res.render("admin/label");
})


module.exports = router;