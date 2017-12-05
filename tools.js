////////////////////////////////////////////////////////////////////////////////////////////
// MINERSTAT.COM - LINUX CLIENT BETA

var colors = require('colors');
var sleep = require('sleep');
var pump = require('pump');
var fs = require('fs');


// VARIBLES

function getDateTime() {
var date = new Date(); var hour = date.getHours(); var min  = date.getMinutes(); var sec  = date.getSeconds(); 
hour = (hour < 10 ? "0" : "") + hour; min = (min < 10 ? "0" : "") + min; sec = (sec < 10 ? "0" : "") + sec; return hour + ":" + min + ":" + sec;
}

module.exports = {
    
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////   START MINER   ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
    
start: function () {
    
var sleep = require('sleep');
sleep.sleep(3);
    
console.log(colors.cyan(getDateTime() + " STARTING MINER: " + global.client + " (8 sec..)"));

sleep.sleep(8);

if (global.client == "claymore-eth") {
   
require("child_process").spawn('clients/'+global.client+'/ethdcrminer64', {
  cwd: process.cwd(),
  detached: false,
  stdio: "inherit"
});

    
}



if (global.client == "claymore-zec") {
   
require("child_process").spawn('clients/'+global.client+'/zecminer64', {
  cwd: process.cwd(),
  detached: false,
  stdio: "inherit"
});

    
}


if (global.client == "claymore-xmr") {
   
require("child_process").spawn('clients/'+global.client+'/nsgpucnminer', {
  cwd: process.cwd(),
  detached: false,
  stdio: "inherit"
});

    
}


if (global.client == "ewbf-zec") {

var parse = require('parse-spawn-args').parse
var args = parse(global.chunk);
        
require("child_process").spawn('clients/'+global.client+'/miner', args, {
  cwd: process.cwd(),
  detached: false,
  stdio: "inherit"
});

    
}


if (global.client == "sgminer-gm") {

var larg = "-c sgminer.conf --gpu-reorder --api-listen";
var parse = require('parse-spawn-args').parse
var args = parse(larg);

       require("child_process").spawn('clients/'+global.client+'/sgminer', args,  {
  cwd: process.cwd(),
  detached: false,
  stdio: "inherit"
});

    
}

},

/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// REMOTE COMMAND ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
    
    remotecommand: function () {
        
        
const https = require('https');
var needle = require('needle');

needle.get('https://minerstat.com/control.php?worker='+ global.accesskey +'.' + global.worker + '&miner=' + global.client +'&os=linux&ver=4&cpu=NO', function(error, response) {
var command = response.body + "";

if (command !== "") {
console.log(colors.red("/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"));
console.log(colors.red("REMOTE COMMAND: " + command));
console.log(colors.red("*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"));
}

if (command === "RESTARTNODE") {

var main = require('./start.js');
clearInterval(global.timeout);
main.main();
        
}

});
    
},
    
  
/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// KILL ALL RUNNING MINER ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

    
killall: function () {
           
const fkill = require('fkill');

try {
fkill('zecminer64').then(() => { });
fkill('ethdcrminer64').then(() => { });
fkill('miner').then(() => { });
fkill('sgminer').then(() => { });
fkill('nsgpucnminer').then(() => { });
} catch(e) {
    
} 

},
  
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// START /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
  
  restart: function () {
     var main = require('./start.js');
     main.main(); 
  },
  
  
/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// FETCH INFO FROM THE MINER ///////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
  
  fetch: function () {
      

 // GET LOG FILE



if(global.client.indexOf("claymore") > -1) {

var http = require('http');
var options = { host: '127.0.0.1', port: 3333, path: '/' };

var req = http.get(options, function(response) {
res_data = '';
response.on('data', function(chunk) { global.res_data += chunk;  global.status = new Boolean(true);  });
response.on('end', function() { global.sync = new Boolean(true);  }); });
req.on('error', function(err) {  console.log(colors.red(getDateTime() + " MINERSTAT.COM: Package Error. " + err.message)); global.sync = new Boolean(false); });

}


if(global.client.indexOf("ewbf") > -1) {

const net = require('net');
const client = net.createConnection({ port: 42000 }, () => {
  client.write("{\"id\":2, \"method\":\"getstat\"}\n");
});
client.on('data', (data) => {
  console.log(data.toString());
  global.res_data = data.toString();
  
  if (data.toString() === "") {
      global.sync = new Boolean(false);     
  } else {    
    global.sync = new Boolean(true);
  }
  
  client.end();
});
client.on('end', () => {
});


}

if(global.client.indexOf("sgminer") > -1) {

const net = require('net');
const client = net.createConnection({ port: 4028 }, () => {
  client.write("summary+pools+devs");
});
client.on('data', (data) => {
  console.log(data.toString());
  global.res_data = data.toString();
  
  if (data.toString() === "") {
      global.sync = new Boolean(false);     
  } else {    
    global.sync = new Boolean(true);
  }
  
  client.end();
});
client.on('end', () => {
});

}


  }
  
  
};
