# <a href="https://minerstat.com" target="_blank">minerstat.com</a> - Linux Client
Tested on Ubuntu, with Nvidia & AMD GPU's..

<b>Features:</b>
- Coin Algorithm
- Dual-Mining Algorithm
- Send miner log file to the server
- Send miner data to the server (GPU, HASHRATE, etc..)
- Remote commands (Restart miner, Reboot PC, Change miner)
- Watchdog 

<b>In Progress:</b>
- New clients
- Hardware Monitor (Like windows client, GPU Temp, Fans..)

<b>Supported miners:</b>
- Claymore-Dual (ETH, ETC, EXP, MUSIC, UBQ..)
- Claymore-ZEC
- Ewbf-ZEC
- Sgminer-GM

# Before you start..
..enter this lines on linux terminal..
<pre>
apt update
apt dist-upgrade
apt install unzip php7.0 php7.0-cgi git npm
apt install nodejs-legacy ocl-icd-opencl-dev libcurl3:i386 libcurl4-openssl-dev
</pre>

# Install Graphics Drivers

<b>AMD</b> <br>
http://support.amd.com/en-us/kb-articles/Pages/AMD-Radeon-GPU-PRO-Linux-Beta-Driver–Release-Notes.aspx
<pre>
tar -Jxvf amdgpu-pro-16.40-348864.tar.xz
cd amdgpu-pro-16.40-348864
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
Press "Ctrl + O", to save changes, After "Ctrl + X" to close the editor.
<pre>
nano config.js
</pre>

<pre>
// EDIT THESE LINES BELOW TO CONFIGURE YOUR WORKER

global.accesskey = "<b>YOURMINERSTATLOGINKEYHERE</b>"; // minerstat.com LOGIN key
global.worker = "<b>YOURRIGNAMEHERE</b>"; // your created worker at the website
global.client = "<b>claymore-eth</b>";
global.path = "/home/<b>USER</b>/minerstat-linux"; // Full path where you cloned the client

// global.client EXAMPLES:
// NVIDIA: ewbf-zec
// AMD: claymore-zec
// NVIDIA & AMD: claymore-eth, claymore-etc, claymore-exp, claymore-music, claymore-ubq
// claymore-eth ALGO & DUAL-MINING ALGO: algo
</pre>

# Permissions
Navigate your terminal to minerstat-linux folder. Example:
<pre>
cd /home/<b>user</b>/minerstat-linux
chmod -R 777 *
npm install colors sleep pump request express sphp fs progress
</pre>

After the npm command you will get an error, but it's normal. The Setup is ready!

# Start the client..
..on it's folder  (In this case: /home/user/minerstat-linux )
<pre>
sudo node start
</pre>

Press "Ctrl + C" on the terminal, to close the Application.  <br>


<a href="https://bitcointalk.org/index.php?topic=1772780.0" target="_blank">BitcoinTalk Topic</a>

<br>
--------------------------------------------- © 2017 minerstat.com ------------------------------------------------------
