////////////////////////////////////////////////////////////////////////////////////////////
// MINERSTAT.COM - LINUX CLIENT

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
    
console.log(colors.cyan(getDateTime() + " STARTING MINER: " + global.client + " (3 sec..)"));

sleep.sleep(3);

if(global.client.indexOf("ccminer") > -1) {

  var parse = require('parse-spawn-args').parse
  var args = parse(global.chunk);
          
  require("child_process").spawn('clients/'+global.client+'/ccminer', args, {
    cwd: process.cwd(),
    detached: false,
    stdio: "inherit"
  });

}

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

if (global.client == "ethminer") {

var parse = require('parse-spawn-args').parse
var args = parse(global.chunk);
        
require("child_process").spawn('clients/'+global.client+'/ethminer', args, {
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
/////////////////////////////// AUTO UPDATE /////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

autoupdate: function () {

var exec = require('child_process').exec;
var main = require('./start.js');

var query = exec("sh git.sh",
function (error, stdout, stderr) {

var res = stdout + "" + stderr;

console.log(colors.magenta("/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"));
console.log(colors.magenta("AUTOUPDATE: DONE"));
if(global.client.indexOf("Already up-to-date") === 0) {
console.log(colors.red("NODE RESTART NEEDED! Press Ctrl + C to exit"));
}
console.log(colors.magenta("*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"));

main.boot();

});

},

/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// REMOTE COMMAND ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
    
remotecommand: function () {
        
const https = require('https');
var needle = require('needle');

var main = require('./start.js');

needle.get('https://minerstat.com/control.php?worker='+ global.accesskey +'.' + global.worker + '&miner=' + global.client +'&os=linux&ver=4&cpu=NO&algo=' + global.isalgo + '&best=' + global.algo_bestalgo + '&client=' + global.client, function(error, response) {
var command = response.body + "";

if (command !== "") {
console.log(colors.red("/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"));
console.log(colors.red("REMOTE COMMAND: " + command));
console.log(colors.red("*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"));
}

if (global.configtype === "algo") {

var request = require('request');
request.get({
  url:     'https://minerstat.com/profitswitch_api.php?token='+ global.accesskey +'&worker=' + global.worker,
  form:    { mes: "kflFDKME" }
}, function(error, response, body){
  
    var json_string = response.body;  

    if(json_string.indexOf("ok") > -1) {

    var json_parse = JSON.parse(json_string);
    
    var algo_status = json_parse.response.status;
    var algo_bestalgo = json_parse.response.bestalgo;
    var algo_dualmode = json_parse.response.dualmode;
    var algo_client = json_parse.response.client;  
    var algo_bestdual = json_parse.response.bestdual;
    var algo_revenue = json_parse.response.revenue;
    var algo_gputype = json_parse.response.gputype;
    var algo_checkdual = json_parse.response.checkdual;
    var algo_db = json_parse.response.db;
    var algo_ccalgo = json_parse.response.ccalgo;
  
    console.log(colors.magenta("/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"));
    console.log(colors.magenta(getDateTime() + " |ALGO| Best Coin Now ["+algo_bestalgo+"]"));
    console.log(colors.magenta(getDateTime() + " |ALGO| Current Profit [$"+algo_revenue+"]"));
    console.log(colors.magenta("*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/"));

    if (global.algo_checkdual != algo_checkdual) {
      clearInterval(global.timeout);
      main.main();
    }

    if (global.algo_checkdual === "YES") {

      if (global.algo_bestalgo != algo_bestalgo) {
        clearInterval(global.timeout);
        main.main();;
      }

      if (global.algo_bestdual != algo_bestdual) {
        clearInterval(global.timeout);
        main.main();
      }

    } else {

      if (global.algo_bestalgo != algo_bestalgo) {
        clearInterval(global.timeout);
        main.main();
      }


    }



    }
  
  });

}


if (command === "RESTARTNODE") {


clearInterval(global.timeout);
main.main();
        
}

if (command === "REBOOT") {

  var exec = require('child_process').exec;

  var query = exec("systemctl reboot",
  function (error, stdout, stderr) {

  console.log("System going to reboot now..");

  });
          
}

});
    
},
    
  
/////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////// KILL ALL RUNNING MINER ////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

    
killall: function () {
           
const fkill = require('fkill');

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

if(global.client.indexOf("ethminer") > -1) {
    
// INTEGRATED TO THE CLIENT 
global.sync = new Boolean(true);
// START WITH --token ACCESKEY --worker WORKERNAME
    
}


if(global.client.indexOf("claymore") > -1) {

var http = require('http');
var options = { host: '127.0.0.1', port: 3333, path: '/' };

var req = http.get(options, function(response) {
res_data = '';
response.on('data', function(chunk) { global.res_data += chunk;  global.status = new Boolean(true);  });
response.on('end', function() { global.sync = new Boolean(true);  }); });
req.on('error', function(err) {  console.log(colors.red(getDateTime() + " MINERSTAT.COM: Package Error. " + err.message)); global.sync = new Boolean(false); });

}

if(global.client.indexOf("ccminer") > -1) {

  const netc = require('net');
  const clientc = netc.createConnection({ port: 3333 }, () => {
    clientc.write("summary");
  });
  clientc.on('data', (data) => {
    console.log(data.toString());
    global.res_data = data.toString();
    
    if (data.toString() === "") {
        global.sync = new Boolean(false);     
    } else {    
      global.sync = new Boolean(true);
    }
    
    clientc.end();
  });
  clientc.on('end', () => {
  });  

}

if(global.client.indexOf("ewbf") > -1) {

  const nete = require('net');
const cliente = nete.createConnection({ port: 42000 }, () => {
  cliente.write("{\"id\":2, \"method\":\"getstat\"}\n");
});
cliente.on('data', (data) => {
  console.log(data.toString());
  global.res_data = data.toString();
  
  if (data.toString() === "") {
      global.sync = new Boolean(false);     
  } else {    
    global.sync = new Boolean(true);
  }
  
  cliente.end();
});
cliente.on('end', () => {
});


}

if(global.client.indexOf("sgminer") > -1) {

  const nets = require('net');
const clients = nets.createConnection({ port: 4028 }, () => {
  clients.write("summary+pools+devs");
});
clients.on('data', (data) => {
  console.log(data.toString());
  global.res_data = data.toString();
  
  if (data.toString() === "") {
      global.sync = new Boolean(false);     
  } else {    
    global.sync = new Boolean(true);
  }
  
  clients.end();
});
clients.on('end', () => {
});

}


  }
  
  
};
