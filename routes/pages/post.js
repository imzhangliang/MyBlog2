'use strict';
//本模块放置的是文章子目录(/post)的页面

var express = require('express');
var router = express.Router();


router.get('/ok', function(req, res, next) {
    res.render('index', {title:'OK'});
});

module.exports = router;