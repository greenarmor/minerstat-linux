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
var datar = ""; 

var q2 = exec("nvidia-smi -i "+lstart+" --query-gpu=name,temperature.gpu,fan.speed --format=csv,noheader | tail -n1", 
function (error, stdout, stderr) { 

datar = stdout; 
  
// ADD DATA TO ARRAY
hwg.push(datar);  
  
response_start ++;  
 
if (response_start == (response - 1)) { isfinished(hwg,"nvidia"); }

}); 

} // END WHILE
}); // END FETCH
} // END HWNvidia
} // END MODULE.EXPORT

function isfinished(hwdatar,typ) {

if (typ === "nvidia") {
// ARRAY to JSON
  var hwdatas = JSON.stringify(hwdatar);
} else {
  var hwdatas = hwdatar;
}

// DUMP LOG TO THE CONSOLE
console.log("["+typ+"] Hardware Monitor: " + hwdatas);


// SEND DATA TO THE SERVER

var request = require('request');
request.post({
url: 'https://minerstat.com/gethw.php?token='+ global.accesskey +'&worker='+ global.worker+'&datas='+hwdatas, form: { mes: typ }
}, function(error, response, body){ });

} // END isfinished();
