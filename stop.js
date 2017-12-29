////////////////////////////////////////////////////////////////////////////////////////////
// MINERSTAT.COM - LINUX CLIENT

"use strict";

const fkill = require('fkill');
var exec = require('child_process').exec;

try {
fkill('ccminer').then(() => { });
fkill('zecminer64').then(() => { });
fkill('ethminer').then(() => { });
fkill('ethdcrminer64').then(() => { });
fkill('miner').then(() => { });
fkill('sgminer').then(() => { });
fkill('nsgpucnminer').then(() => { });
} catch(e) {
    
} 

var query = exec("killall node",
function (error, stdout, stderr) {
console.log("Terminated");
});