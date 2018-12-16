'use strict';
//本模块放置的是文章子目录(/post)的页面

var express = require('express');
var router = express.Router();
var models = require('../../models');
var Post = models.post;
var User = models.user;
var Role = models.role;

router.get('/', function(req, res, next) {
    res.render("admin/index");
});

//文章分类管理页面
router.get('/cate', function(req, res, next){
    res.render("admin/cate");
})

//文章管理页面
router.get('/post', function(req, res, next){
    res.render("admin/post/post");
})

//增加文章页面
router.get('/addPost', function(req, res, next){
    res.render("admin/post/addPost");
})

//编辑文章页面
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


//标签管理页面
router.get('/label', function(req, res, next){
    res.render("admin/label");
})


//用户管理页面
router.get('/user', function(req, res, next){
    res.render("admin/user/user")
})

//增加用户页面
router.get('/addUser', function(req, res, next){
    return Role.searchList().then(function(roles){
        res.render("admin/user/addUser", {globalRoles:roles});
    })
})

//编辑用户页面
router.get('/editUser', function(req, res, next){
    let id = req.query.id;
    let viewData = {}
    return User.get(id).then(function(data){
        if (data ) {
            return Role.searchList().then(function(roles){
                data.dataValues.globalRoles = roles;
                data.dataValues.roleId = data.dataValues.roles[0] ? data.dataValues.roles[0].id : null;
                res.render("admin/user/editUser", data.dataValues);
            })
        } else {
            res.send(404)
        }
    })    
})


//角色管理页面
router.get('/role', function(req, res, next){
    res.render("admin/role/role")
})

//增加角色页面
router.get('/addRole', function(req, res, next){
    res.render("admin/role/addRole");
})

//编辑角色页面
router.get('/editRole', function(req, res, next){
    let id = req.query.id;
    let viewData = {}
    return Role.get(id).then(function(data){
        if (data ) {
            console.log(1);
            res.render("admin/role/editRole", data.dataValues);
        } else {
            res.send(404)
        }
    })    
})



module.exports = router;