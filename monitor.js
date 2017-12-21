////////////////////////////////////////////////////////////////////////////////////////////
// MINERSTAT.COM - LINUX CLIENT BETA

module.exports = {

////////////////////////////////////////////////////////////////////////////////////////////
// DETECT VIDEO CARD TYPE

detect: function () {

var exec = require('child_process').exec;
var child;
  
child = exec("lshw -C display",
     function (error, stdout, stderr) {
       var response = stdout;
        global.gputype = "unknown";
        if(response.indexOf("NVIDIA") > -1) {
          global.gputype = "nvidia";
        } 
        if(response.indexOf("AMD") > -1) {
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

},

////////////////////////////////////////////////////////////////////////////////////////////
// NVIDIA-SMI (for GPU Temp/Fan/ ... monitoring)

HWnvidia: function () {

}

}