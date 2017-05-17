//SETTINGS
//EDIT config.js to edit your worker settings..
var settings = require("./config.js");

var express = require('express');
var sphp = require('sphp');
    
var app = express();
var server = app.listen(9899);
    
app.use(sphp.express(global.path + '/web'));
app.use(express.static(global.path + '/web'));