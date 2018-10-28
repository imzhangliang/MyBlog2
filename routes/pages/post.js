'use strict';
//本模块放置的是文章子目录(/post)的页面

var express = require('express');
var router = express.Router();


router.get('/show', function(req, res, next) {
    res.render('post/show', {id: req.query.id});
});

module.exports = router;