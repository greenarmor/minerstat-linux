////////////////////////////////////////////////////////////////////////////////////////////
// MINERSTAT.COM - LINUX CLIENT BETA

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

// TO DO AS NVIDIA
// AMDMEMINFO QUERY
// POST DATA TO THE SERVER

},

////////////////////////////////////////////////////////////////////////////////////////////
// NVIDIA-SMI (for GPU Temp/Fan/ ... monitoring)

// gpucount > nvidia-smi --query-gpu=count --format=csv,noheader
// fans > nvidia-smi -i 0 --query-gpu=fan.speed --format=csv,noheader
// temp > nvidia-smi -i 0 --query-gpu=temperature.gpu --format=csv,noheader

HWnvidia: function () {

// TO DO
// CREATE LOOP EVERY MINUTE
// WHILE X != GPUCOUNT
// FAN, TEMP to array
// JSON 
// SEND DATA TO THE SERVER

}

}