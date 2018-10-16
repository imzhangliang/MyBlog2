'use strict';
//本模块放置的是/api根目录下的接口

var express = require('express');
var router = express.Router();


router.get('/ttt', function(req, res, next) {
    res.end("ttttttttt");
});

module.exports = router;