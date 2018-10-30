'use strict';
//本模块放置的是文章子目录(/post)的页面

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render("admin/index");
});

module.exports = router;