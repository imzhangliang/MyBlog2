'use strict';
//本模块放置的是文章（post)的api方法

var express = require('express');
var router = express.Router();


router.get('/test', function(req, res, next) {
    res.end("API POST TEST");
});

module.exports = router;