sudo add-apt-repository ppa:ubuntu-toolchain-r/test -y
sudo apt-get --assume-yes update
sudo apt-get --assume-yes install git nodejs unzip npm ocl-icd-opencl-dev libcurl3:i386 libcurl4-openssl-dev gcc-4.9 libssl-dev libjansson-dev libpci-dev
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

echo " "
echo "Enter: cd minerstat-linux"
echo " "
echo "After run the client with: node start"
echo " "
echo " "
echo "INSTALLATION DONE"
