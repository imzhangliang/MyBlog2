'use strict';
//本包放置的都是页面的相关路由
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
var express = require('express');
var router = express.Router();



// 包含其他子路由的模块
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let mainName = file.replace('.js', '');     //把其他的子路由都包括进来，并以文件名为相对路径。如post.js代表的相对路径是/post
        let subRouter = require(`./${mainName}`)
        if (mainName == 'root') {
            router.use('/', subRouter);
        } else {
            router.use(`/${mainName}`, subRouter);
        }
    });
module.exports = router;