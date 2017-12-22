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

child = exec("bin/amdmeminfo",
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

  var query = exec("nvidia-smi --query-gpu=count --format=csv,noheader",
  function (error, stdout, stderr) {

  isfinished(stdout,stderr,"amd");

  });

},

////////////////////////////////////////////////////////////////////////////////////////////
// NVIDIA-SMI (for GPU Temp/Fan/ ... monitoring)

HWnvidia: function () {

var lstart = -1;

var exec = require('child_process').exec;
var gpunum;
var hwg = []; var hwf = [];

gpunum = exec("nvidia-smi --query-gpu=count --format=csv,noheader",
function (error, stdout, stderr) {
var response = stdout;

while (lstart != (response - 1)) {

lstart ++;  
var temp = 0; 
var fan = 0;

var q1 = exec("nvidia-smi -i "+lstart+" --query-gpu=temperature.gpu --format=csv,noheader", 
function (error, stdout, stderr) { 

temp = stdout;

var q2 = exec("nvidia-smi -i "+lstart+" --query-gpu=fan.speed --format=csv,noheader", 
function (error, stdout, stderr) { 

fan = stdout; 
  
// ADD DATA TO ARRAY
hwg.push(temp); 
hwf.push(fan); 
 
if (lstart == (response - 1)) { isfinished(hwg,hwf,"nvidia"); }

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

// SEND DATA TO THE SERVER

var request = require('request');
request.post({
url: 'https://minerstat.com/gethw.php?token='+ global.accesskey +'&worker='+ global.worker+'&fan='+hwf+'&gpu='+hwg, form: { mes: typ }
}, function(error, response, body){ });

} // END isfinished();