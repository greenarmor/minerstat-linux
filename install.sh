#!/bin/bash

echo "
/*
     ___  ___   _   __   _   _____   _____    _____   _____       ___   _____  
    /   |/   | | | |  \ | | | ____| |  _  \  /  ___/ |_   _|     /   | |_   _| 
   / /|   /| | | | |   \| | | |__   | |_| |  | |___    | |      / /| |   | |   
  / / |__/ | | | | | |\   | |  __|  |  _  /  \___  \   | |     / / | |   | |   
 / /       | | | | | | \  | | |___  | | \ \   ___| |   | |    / /  | |   | |   
/_/        |_| |_| |_|  \_| |_____| |_|  \_\ /_____/   |_|   /_/   |_|   |_|   
*/"

echo "-------- Minerstat Linux Installer -----------"

echo -n "Nvidia or AMD (a/n)? "
read answer
if echo "$answer" | grep -iq "^n" ;then
    GPUTYPE="nvidia"
else
    GPUTYPE="amd"
fi

echo "Your selected gpu type: $GPUTYPE"
echo ""

echo -n "Install Graphics Drivers (y/n)? "
read answerz
if echo "$answerz" | grep -iq "^y" ;then
    DRIVER="yes"
else
    DRIVER="no"
fi

echo "Install Graphics Drivers? $DRIVER"
echo ""

sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
sudo add-apt-repository ppa:graphics-drivers/ppa -y
sudo apt-get --assume-yes update
sudo apt-get --assume-yes install git screen nodejs nodejs-legacy unzip npm ocl-icd-opencl-dev libcurl3:i386 libcurl4-openssl-dev libssl-dev libjansson-dev libpci-dev
sudo apt-get --assume-yes upgrade libstdc++6
git clone https://github.com/coinscrow/minerstat-linux/
cd minerstat-linux
npm install colors sleep pump request express sphp progress ascii-text-generator fkill needle parse-spawn-args


if [ $DRIVER = "yes" ]; then
  
if [ $GPUTYPE = "nvidia" ]; then
sudo apt-get install nvidia-cuda-toolkit -y
sudo update-grub
sudo rm /var/crash/*
sudo nvidia-xconfig -s -a --allow-empty-initial-configuration --cool-bits=28 --registry-dwords="PerfLevelSrc=0x2222" --no-sli --connected-monitor="DFP-0"
fi

if [ $GPUTYPE = "amd" ]; then
echo "Installing Graphics Drivers for AMD.."
wget https://media.githubusercontent.com/media/coinscrow/cloud/master/amd-blockchain-linux.tar.xz
tar -xvf amd-blockchain-linux.tar.xz
cd amdgpu-pro-17.40-483984
chmod 777 amdgpu-pro-install
./amdgpu-pro-install -y --opencl=rocm
echo "AMD Driver Install script done.."
cd ..
rm -rf amdgpu-pro-17.40-483984
echo "AMD Driver folder has been removed"
fi
  
else
  echo "Graphics Driver Insaller Skipped"
fi


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

echo "alias minerstat-start-bg='cd "$(pwd)"/; screen -A -m -d -S minerstat-console node start;'" >> ~/.bashrc 
echo "alias minerstat-console='screen -x minerstat-console;'" >> ~/.bashrc
echo "alias minerstat-start='cd "$(pwd)"/; node start;'" >> ~/.bashrc 
echo "alias minerstat-stop='cd "$(pwd)"/; node stop;'" >> ~/.bashrc 

echo " "
echo "!!!! INSTALLATION DONE !!!!!"
echo "Start mining with output: minerstat-start"
echo "Start mining in the background: minerstat-start-bg"
echo " "
echo "View console in background mode: minerstat-console"
echo "Stop mining and minerstat: minerstat-stop"
echo "!!!! INSTALLATION DONE !!!!!"
echo ""

echo -n "Start Minerstat & Mining on boot (with the system start) (y/n)? "
read onboots
if echo "$onboots" | grep -iq "^y" ;then
    ONBOOT="yes"
else
    ONBOOT="no"
fi

if [ $ONBOOT = "yes" ]; then
crontab -l | { cat; echo "@reboot /bin/sleep 30s; bash -ic 'minerstat-start-bg'"; } | crontab -
echo "----------------------------------------"
echo "Minerstat going to start on system boot."
echo "You can montior your mining process with minerstat-console command in the terminal."
echo "----------------------------------------"
echo ""
fi

if [ $DRIVER = "yes" ]; then

echo "-------- WARNING --------"
echo "You need to reboot your computer to apply graphics driver changes."
echo ""

echo -n "Do you want to REBOOT now (y/n)? "
read rboot

fi

exec bash
source ~/.bashrc

if echo "$rboot" | grep -iq "^y" ;then
    reboot -f
fi
