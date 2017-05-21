////////////////////////////////////////////////////////////////////////////////////
/////// start.js START /////////////////////////////////////////////////////////////

var server = require("./query.js");
var colors = require('colors');
var sleep = require('sleep');
var pump = require('pump')
var fs = require('fs')

function main() {

//SETTINGS
//EDIT config.js to edit your worker settings..
var settings = require("./config.js");

//FUNCTIONS
function getDateTime() {
var date = new Date(); var hour = date.getHours(); var min  = date.getMinutes(); var sec  = date.getSeconds(); 
hour = (hour < 10 ? "0" : "") + hour; min = (min < 10 ? "0" : "") + min; sec = (sec < 10 ? "0" : "") + sec; return hour + ":" + min + ":" + sec;
}

function header() {
console.log('\033[2J');
console.log(colors.cyan('----------------------- minerstat.com --------------------------'));
console.log(colors.rainbow('------------------------ Linux Alpha ------------------------'));
console.log('');
}

function killall() {
var execProcess = require("./background.js");

execProcess.result("pkill zecminer64", function(err, response){
if(!err){ } else { } });

execProcess.result("pkill ethdcrminer64", function(err, response){
if(!err){ } else { } });

execProcess.result("pkill miner", function(err, response){
if(!err){ } else { } });

execProcess.result("pkill sgminer", function(err, response){
if(!err){ } else { } });

}

function reboot() {
var execProcess = require("./background.js");

execProcess.result("/sbin/shutdown -r now", function(err, response){
if(!err){ } else { } });

}

killall();
header();

function algoinfo() {
var request = require("request");
request('http://minerstat.com/bestquery.php?token='+ global.accesskey +'&worker=' + global.worker, function(error, response, body) {

global.algoresponse = body;
global.algoresponseold = body;


});

var request = require('request');
request('http://minerstat.com/dualresponse.php?token='+ global.accesskey +'&worker=' + global.worker, function(error, response, body) {

global.dualresponse = body;
global.dualresponserold = body;

dlconf();

});



}

// VARIBLES
var status; var numsync; var res_data; global.res_data; global.dualresponse;
status = new Boolean(true); 
numsync = 0;

//CHECK PARAMETERS
if(global.client === "claymore-eth") { global.coin = "eth"; }
if(global.client === "claymore-etc") { global.client = "claymore-eth"; global.coin = "etc"; }
if(global.client === "claymore-exp") { global.client = "claymore-eth"; global.coin = "exp"; }
if(global.client === "claymore-ubq") { global.client = "claymore-eth"; global.coin = "ubq"; }
if(global.client === "claymore-music") { global.client = "claymore-eth"; global.coin = "music"; }
if(global.client === "claymore-zec") { global.client = "claymore-zec"; global.coin = "zec"; }

if(global.client === "algo") { global.algo = "yes"; global.client = "claymore-eth"; global.coin = ""; }	


//PACKAGE REQUEST ON START
var request = require('request');
request.post({
  url:     'http://minerstat.com/control.php?worker='+ global.accesskey +'.' + global.worker + '&miner=' + global.client + '&os=linux',
  form:    { mes: global.res_data }
}, function(error, response, body){
 console.log(colors.cyan(getDateTime() + " Waiting for the first sync.. (120 sec)")); 
});

//DOWNLOAD CONFIG
function dlconf() {

//CHECK STARTUP
if(global.client === "claymore-eth") { global.db = "eth_conf"; }
if(global.client === "claymore-zec") { global.db = "zec_conf"; } 
if(global.client === "ewbf-zec") { global.db = "ezec_conf"; } 
if(global.client === "sgminer-gm") { global.db = "sgg_conf"; } 

if(global.algo === "yes") {
if(global.dualresponse === "null") {  global.db = "eth_conf";  }
if(global.dualresponse !== "null") {  global.db = "null";  }	
}

var http = require('http'); var fs = require('fs');



if(global.client.indexOf("ewbf") > -1) { global.file = "clients/"+ global.client + "/start.bash"; }
if(global.client.indexOf("claymore") > -1) { global.file = "clients/"+ global.client + "/config.txt"; }
if(global.client.indexOf("sgminer") > -1) { global.file = "clients/"+ global.client + "/sgminer.conf"; }

var request = http.get("http://minerstat.com/getresponse.php?action=config&token="+ global.accesskey +"&worker="+ global.worker +"&db=" + global.db + "&coin=" + global.coin + "&algo=" + global.algo, function(response) {
 
   response.setEncoding('utf8');
  response.on('data', function(chunk){
    
    var writeStream = fs.createWriteStream(global.path + "/" + global.file);
console.log(chunk);
writeStream.write(chunk);
writeStream.end();

global.chunk = chunk;
   
    start(); // START
   
    });
 
 

  
});
}

function start() {

if(global.client.indexOf("ewbf") > -1) { 

// START CLIENT
console.log(getDateTime() + " " +  global.client + " is starting.. Please, wait.."); 
var execProcess = require("./background.js");
execProcess.result("cd clients/ewbf-zec; " + global.chunk, function(err, response){
	if(!err){
		console.log(response);
	}else {
		console.log(colors.red("Something went wrong.."));
		console.log(colors.red("Please, check your " + global.client + " log file.."));
		console.log(err);
		// process.exit(1);
	}
});

} else {

// START CLIENT
console.log(getDateTime() + " " +  global.client + " is starting.. Please, wait.."); 
var execProcess = require("./background.js");
execProcess.result("cd clients/"+ global.client + "; ./start.bash", function(err, response){
	if(!err){
		console.log(response);
	}else {
		console.log(colors.red("Something went wrong.."));
		console.log(colors.red("Please, check your " + global.client + " log file.."));
		console.log(err);
		// process.exit(1);
	}
});

}



}
///////

algoinfo();

var ProgressBar = require('progress');
 
var bar = new ProgressBar(':bar', { total: 59 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 1000);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//START LOOP  ////////////////////////////////////////////////////////////////////////////////////////////////

var requestLoop = setInterval(function(){

// GET LOG FILE

if(global.client.indexOf("claymore") > -1) {

var http = require('http');
var options = { host: '127.0.0.1', port: 3333, path: '/' };

var req = http.get(options, function(response) {
res_data = '';
response.on('data', function(chunk) { res_data += chunk; });
response.on('end', function() { status = new Boolean(true);  }); });
req.on('error', function(err) {  console.log(colors.red(getDateTime() + " Package Error. " + err.message)); status = new Boolean(false); });

}


if(global.client.indexOf("ewbf") > -1) {

var http = require('http');
var options = { host: '127.0.0.1', port: 9899, path: '/ewbf.php' };

var req = http.get(options, function(response) {
res_data = '';
response.on('data', function(chunk) { res_data += chunk; });
response.on('end', function() { status = new Boolean(true);  }); });
req.on('error', function(err) {  console.log(colors.red(getDateTime() + " Package Error. " + err.message)); status = new Boolean(false); });

}

if(global.client.indexOf("sgminer") > -1) {

var http = require('http');
var options = { host: '127.0.0.1', port: 9899, path: '/index.php' };

var req = http.get(options, function(response) {
res_data = '';
response.on('data', function(chunk) { res_data += chunk; });
response.on('end', function() { status = new Boolean(true);  }); });
req.on('error', function(err) {  console.log(colors.red(getDateTime() + " Package Error. " + err.message)); status = new Boolean(false); });

}




// SEND LOG TO SERVER

if(status.toString() === "true"){
if(numsync >= 1) {

var request = require('request');
request.post({
url: 'http://minerstat.com/getstat.php?token='+ global.accesskey +'&worker='+ global.worker, form: { mes: res_data }
}, function(error, response, body){
console.log(colors.green(getDateTime() + " Package Sent")); 
}); } }





// ALGO CHECK

if (global.algo === "yes") {

var request = require('request');
request('http://minerstat.com/bestquerytext.php?token='+ global.accesskey +'&worker=' + global.worker, function(error, response, body) {

if(numsync > 1) {

console.log(colors.yellow(getDateTime() + " " + body)); 

}

});


var request = require('request');
request('http://minerstat.com/bestquery.php?token='+ global.accesskey +'&worker=' + global.worker, function(error, response, body) {

global.algoresponser = body;

if(global.db !== "null") {
if (global.algoresponser !== global.algoresponseold) {
clearInterval(requestLoop); 
main();	
console.log(colors.cyan('ALGO: New Most Profitable Coin ! .. '));
}
}

});

var request = require('request');
request('http://minerstat.com/dualresponse.php?token='+ global.accesskey +'&worker=' + global.worker, function(error, response, body) {

global.dualresponser = body;


if(global.db === "null") {

if(global.dualresponser === "null") {  

clearInterval(requestLoop); 
main();	

console.log(colors.red('SITE: Dual-Mining Algo Disabled!'));

} 

if(global.db === "null") {
if(global.dualresponser !== "null") {  
if (global.dualresponser !== global.dualresponserold) {
clearInterval(requestLoop); 
main();	
console.log(colors.cyan('DUAL-ALGO: New Most Profitable Coin ! .. '));
}
}
}



}

if(global.db !== "null") {

if(global.dualresponser !== "null") {  
clearInterval(requestLoop); 
main();	

console.log(colors.green('SITE: Dual-Mining Algo Enabled!'));
} 
}


});


}


// GET REMOTE COMMANDS
var request = require("request");
request('http://minerstat.com/control.php?worker='+ global.accesskey +'.' + global.worker + '&miner=' + global.client + '&os=linux', function(error, response, body) {

if(body.indexOf("REBOOT") > -1) {
killall();
reboot();
console.log(colors.cyan(getDateTime() + " REMOTE COMMAND: REBOOT")); 
}

if(body.indexOf("SWITCHTOETH") > -1) {
dlconf();
killall();
var execProcess = require("./background.js");
execProcess.result("cd clients/claymore-eth; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
console.log(colors.cyan(getDateTime() + " REMOTE COMMAND: claymore-eth (ETH) restarted..")); 
}

if(body.indexOf("SWITCHTOETC") > -1) {
global.coin = "etc";
dlconf();
killall();
var execProcess = require("./background.js");
execProcess.result("cd clients/claymore-eth; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
console.log(colors.cyan(getDateTime() + " REMOTE COMMAND: claymore-eth (ETC) restarted..")); 
}

if(body.indexOf("SWITCHTOEXP") > -1) {
global.coin = "exp";
dlconf();
killall();
var execProcess = require("./background.js");
execProcess.result("cd clients/claymore-eth; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
console.log(colors.cyan(getDateTime() + " REMOTE COMMAND: claymore-eth (EXP) restarted..")); 
}

if(body.indexOf("SWITCHTOMUSIC") > -1) {
global.coin = "music";
dlconf();
killall();
var execProcess = require("./background.js");
execProcess.result("cd clients/claymore-eth; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
console.log(colors.cyan(getDateTime() + " REMOTE COMMAND: claymore-eth (MUSIC) restarted..")); 
}

if(body.indexOf("SWITCHTOUBQ") > -1) {
global.coin = "ubq";
dlconf();
killall();
var execProcess = require("./background.js");
execProcess.result("cd clients/claymore-eth; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
console.log(colors.cyan(getDateTime() + " REMOTE COMMAND: claymore-eth (UBQ) restarted..")); 
}

if(body.indexOf("SWITCHTOZEC") > -1) {
global.client = "claymore-zec";
global.coin = "";
dlconf();
killall();
var execProcess = require("./background.js");
execProcess.result("cd clients/claymore-zec; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
console.log(colors.cyan(getDateTime() + " REMOTE COMMAND: claymore-zec (ZEC) restarted..")); 
}

if(body.indexOf("SWITCHTOEZEC") > -1) {
global.client = "ewbf-zec";
global.coin = "";
dlconf();
killall();
var execProcess = require("./background.js");
execProcess.result("cd clients/ewbf-zec; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
console.log(colors.cyan(getDateTime() + " REMOTE COMMAND: ewbf-zec restarted..")); 
}

if(body.indexOf("SWITCHTOSGGM") > -1) {
global.client = "sgminer-gm";
global.coin = "";
dlconf();
killall();
var execProcess = require("./background.js");
execProcess.result("cd clients/sgminer-gm; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
console.log(colors.cyan(getDateTime() + " REMOTE COMMAND: sgminer-gm restarted..")); 
}


});

// WATCHDOG
if(numsync >= 2) {
var execProcess = require("./background.js");

if(global.client === "claymore-eth") {
execProcess.result("ps cax | grep ethdcrminer64", function(err, response){ if(!err){
} else {
console.log(colors.red("WATCHDOG: claymore-eth is closed..")); console.log(colors.green("WATCHDOG: claymore-eth is restarted.."));		
execProcess.result("cd clients/"+ global.client + "; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
} });
}

if(global.client === "claymore-zec") {
execProcess.result("ps cax | grep zecminer64", function(err, response){ if(!err){
} else {
console.log(colors.red("WATCHDOG: claymore-zec is closed..")); console.log(colors.green("WATCHDOG: claymore-zec is restarted.."));
execProcess.result("cd clients/"+ global.client + "; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
} });
}

if(global.client === "ewbf-zec") {
execProcess.result("ps cax | grep miner", function(err, response){ if(!err){
} else {
console.log(colors.red("WATCHDOG: ewbf-zec is closed..")); console.log(colors.green("WATCHDOG: ewbf-zec is restarted.."));
execProcess.result("cd clients/"+ global.client + "; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
} });
}

if(global.client === "sgminer-gm") {
execProcess.result("ps cax | grep sgminer", function(err, response){ if(!err){
} else {
console.log(colors.red("WATCHDOG: sgminer-gm is closed..")); console.log(colors.green("WATCHDOG: sgminer-gm is restarted.."));
execProcess.result("cd clients/"+ global.client + "; ./start.bash", function(err, response){ if(!err){ console.log(response); } else { console.log("Something went wrong.."); console.log("Please, check your " + global.client + " log file.."); console.log(err); } });			
} });
}
 
} 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//END LOOP  ////////////////////////////////////////////////////////////////////////////////////////////////

numsync ++;


var ProgressBar = require('progress');
 
var bar = new ProgressBar(':bar', { total: 60 });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    clearInterval(timer);
  }
}, 1000);



}, 60000);


} main();
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////// start.js END /////////////////////////////////////////////////////////////////////////////
