# <a href="https://minerstat.com" target="_blank">minerstat.com</a> - Linux Client
Nvidia & AMD

<b>Features:</b>
- Coin Algorithm
- Dual-Mining Algorithm
- Send miner log file to the server
- Send miner data to the server (GPU, HASHRATE, etc..)
- Remote commands (Restart miner, Reboot PC, Change miner)
- Watchdog 

# Before you start..
..enter this lines on linux terminal..
<pre>
apt update
apt dist-upgrade
apt install nodejs-legacy ocl-icd-opencl-dev libcurl3:i386 libcurl4-openssl-dev unzip git
</pre>

# Install Graphics Drivers

<b>AMD</b> <br>
http://support.amd.com/en-us/kb-articles/Pages/AMDGPU-PRO-Driver-for-Linux-Release-Notes.aspx
<pre>
tar -Jxvf amdgpu-pro-17.10-414273.tar.xz
cd amdgpu-pro-17.10-414273
./amdgpu-pro-install -y --allow-unauthenticated
</pre>

<b>NVIDIA</b> <br>
http://www.nvidia.com/download/driverResults.aspx/118290/en-us
<pre>
chmod +x NVIDIA-Linux-x86_64-375.66.run
./NVIDIA-Linux-x86_64-375.66.run
</pre>

# Download..
..the client to your home folder
<pre>
git clone https://github.com/coinscrow/minerstat-linux
</pre>

# Edit Config File
Press Ctrl + O, to save changes, After Ctrl + X to Exit from the editor.
<pre>
nano config.js
</pre>

<pre>
// EDIT THESE LINES BELOW TO CONFIGURE YOUR WORKER

global.accesskey = "<b>YOURMINERSTATLOGINKEYHERE</b>"; // minerstat.com LOGIN key
global.worker = "<b>YOURRIGNAMEHERE</b>"; // your created worker at the website
global.client = "<b>claymore-eth</b>";

// global.client EXAMPLES:
// NVIDIA: ewbf-zec
// AMD: claymore-zec
// NVIDIA & AMD: claymore-eth, claymore-etc, claymore-exp, claymore-music, claymore-ubq
// claymore-eth ALGO & DUAL-MINING ALGO: algo
</pre>

# Start the client..
..on it's folder
<pre>
node start
</pre>

<a href="https://bitcointalk.org/index.php?topic=1772780.0" target="_blank">BitcoinTalk Topic</a>

<br>
--------------------------------------------- © 2017 minerstat.com ------------------------------------------------------
