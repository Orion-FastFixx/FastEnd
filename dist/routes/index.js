"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ title: 'FastEnd services for FastFixx Horee' });
});
module.exports = router;
