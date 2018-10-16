'use strict';
//本模块放置的是根目录下的页面

var express = require('express');
var router = express.Router();


router.get('/ttt', function(req, res, next) {
    res.render('index', {title:'tttttt'})
});

module.exports = router;