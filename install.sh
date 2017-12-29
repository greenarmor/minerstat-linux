#!/bin/bash
sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
sudo apt-get --assume-yes update
sudo apt-get --assume-yes install git screen nodejs unzip npm ocl-icd-opencl-dev libcurl3:i386 libcurl4-openssl-dev gcc-4.9 libssl-dev libjansson-dev libpci-dev
sudo apt-get --assume-yes upgrade libstdc++6
git clone https://github.com/coinscrow/minerstat-linux/
cd minerstat-linux
npm install colors sleep pump request express sphp progress ascii-text-generator fkill needle parse-spawn-args

echo " "
echo "Please enter your minerstat.com AccessKey: "
read accesskey
echo " "
echo "Please enter your minerstat.com Worker: "
read worker

echo " "
echo "Installation done for $accesskey $worker"

echo "global.accesskey = '$accesskey'; 
global.worker = '$worker';   
global.path = __dirname;" >> config.js

chmod -R 777 *

echo "alias minerstat-start-bg='cd "$(pwd)"/minerstat-linux; screen -A -m -d -S minerstat-console node start;'" >> ~/.bashrc 
echo "alias minerstat-console='screen -x minerstat-console;'" >> ~/.bashrc
echo "alias minerstat-start='cd "$(pwd)"/minerstat-linux; node start;'" >> ~/.bashrc 
echo "alias minerstat-stop='cd "$(pwd)"/minerstat-linux; node stop;'" >> ~/.bashrc 
exec bash
source ~/.bashrc

echo " "
echo "!!!! INFO !!!!!"
echo "Start mining with output: minerstat-start"
echo "Start mining in the background: minerstat-start-bg"
echo " "
echo "View console in background mode: minerstat-console"
echo "Stop mining and minerstat: minerstat-stop"
echo "!!!! INSTALLATION DONE !!!!!"

