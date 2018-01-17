////////////////////////////////////////////////////////////////////////////////////////////
// MINERSTAT.COM - Hardware Monitor

module.exports = {

////////////////////////////////////////////////////////////////////////////////////////////
// DETECT VIDEO CARD TYPE

detect: function () {

var exec = require('child_process').exec;
var child;

global.gputype = "unknown";
  
child = exec("nvidia-smi -L",
     function (error, stdout, stderr) {
       var response = stdout;

        if(response.indexOf("GPU 0:") > -1) {
          global.gputype = "nvidia";
        } 
  
        if (error !== null) {
            console.log('exec error: ' + error);
        }
});

child = exec(global.path + "/bin/amdcovc",
     function (error, stdout, stderr) {
      var response = stderr;

        if(response.indexOf("no version information") === -1) {
          global.gputype = "amd";
        } 
  
        if (error !== null) {
            console.log('exec error: ' + error);
        }
});

},

////////////////////////////////////////////////////////////////////////////////////////////
// AMDMEMINFO (for GPU Temp/Fan/ ... monitoring)

HWamd: function () {

  var exec = require('child_process').exec;

  var query = exec(global.path + "/bin/amdcovc",
  function (error, stdout, stderr) {

  isfinished(stdout,stderr,"amd");

  });

},

////////////////////////////////////////////////////////////////////////////////////////////
// GPU NAME

HWnames: function (hwgtype) {



var lstart = -1;
var response_start = -1;

var exec = require('child_process').exec;
var gpunum;
var hwn = []; 

if (hwgtype == "nvidia") {

gpunum = exec("nvidia-smi --query-gpu=count --format=csv,noheader | tail -n1",
function (error, stdout, stderr) {
var response = stdout;

while (lstart != (response - 1)) {
lstart ++;  
var names = ""; 

var q1 = exec("nvidia-smi -i "+lstart+" --query-gpu=name --format=csv,noheader | tail -n1", 
function (error, stdout, stderr) { 

names = stdout;
response_start ++;  
hwn.push(names);  

if (response_start == (response - 1)) { isfinishedn(hwn,"nvidia"); }

});
  
} // END WHILE
}); // END FETCH

} // END HWGTYPE - NVIDIA

if (hwgtype == "amd") {


}

},

////////////////////////////////////////////////////////////////////////////////////////////
// NVIDIA-SMI (for GPU Temp/Fan/ ... monitoring)

HWnvidia: function () {

var lstart = -1;
var response_start = -1;

var exec = require('child_process').exec;
var gpunum;
var hwg = []; var hwf = [];

gpunum = exec("nvidia-smi --query-gpu=count --format=csv,noheader | tail -n1",
function (error, stdout, stderr) {
var response = stdout;

while (lstart != (response - 1)) {

lstart ++;  
var temp = 0; 
var fan = 0;

var q1 = exec("nvidia-smi -i "+lstart+" --query-gpu=temperature.gpu --format=csv,noheader | tail -n1", 
function (error, stdout, stderr) { 

temp = stdout;

var q2 = exec("nvidia-smi -i "+lstart+" --query-gpu=fan.speed --format=csv,noheader | tail -n1", 
function (error, stdout, stderr) { 

fan = stdout; 
  
// ADD DATA TO ARRAY
hwg.push(temp); 
hwf.push(fan); 
  
response_start ++;  
 
if (response_start == (response - 1)) { isfinished(hwg,hwf,"nvidia"); }

}); });

} // END WHILE
}); // END FETCH
} // END HWNvidia
} // END MODULE.EXPORT

function isfinished(hwg,hwf,typ) {

if (typ === "nvidia") {
// ARRAY to JSON
  var hwg = JSON.stringify(hwg);
  var hwf = JSON.stringify(hwf);
}

// DUMP LOG TO THE CONSOLE
console.log("["+typ+"] Hardware Monitor: " + hwg, hwf);


// SEND DATA TO THE SERVER

var request = require('request');
request.post({
url: 'https://minerstat.com/gethw.php?token='+ global.accesskey +'&worker='+ global.worker+'&fan='+hwf+'&gpu='+hwg, form: { mes: typ }
}, function(error, response, body){ });

} // END isfinished();


function isfinishedn(hwn,typ) {

if (typ === "nvidia") {
  var hwn = JSON.stringify(hwn);
}

//console.log(hwn);

var request = require('request');
request.post({
url: 'https://minerstat.com/gethw.php?token='+ global.accesskey +'&worker='+ global.worker+'&names='+hwn, form: { mes: typ }
}, function(error, response, body){ });

} // END isfinished();
