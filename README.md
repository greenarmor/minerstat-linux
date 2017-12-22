# minerstat.com - Linux Beta v0.3

> with Hardware Monitor!

> [STABLE] it can run weeks without downtime!

# Dependencies
Linux OS with Installed Graphics Drivers

# Basic

1) Register a new account on minerstat.com
2) Create a new worker (Node, Linux , AMD/Nvidia)
3) Mofify your configs in Config Editor -> Save

# How to install on Linux?

1) Open Terminal and Type:

```
wget https://raw.githubusercontent.com/coinscrow/minerstat-linux/master/install.sh; chmod 777 install.sh; sh install.sh
```

2) After the install script you are ready to use our Linux Client!

> Note 

Make sure after install you type

```
cd minerstat-linux
node start
```

# Setup Alias to Start Mining

```
echo "alias minerstat='cd /home/user/minerstat-linux/; node start;'" >> ~/.bashrc && source ~/.bashrc
```

change the /home/user/minerstat-linux path to yours.

After that you can start mining by type ***minerstat*** to your terminal.


## Currently Supported Clients
CCminer-Tpruvot (Nvidia Multi Miner)

CCminer-DJM34 (Nvidia XZC Miner)

Ethminer (Nvidia/AMD EthHash Miner)

Claymore-Dual (Nvidia/AMD ETH/DCR Miner)

Claymore-Equihash (AMD ZEC Miner)

Claymore-Cryptonote (AMD XMR Miner)

Ewbf-Equihash (AMD ZEC Miner)

SGMiner (NVIDIA/AMD Multi Algo)

## Functions
Switch miner from the website

Modify miner settings from the website (pools etc..)

Restart mining

Hardware Monitor (nvidia, amd) (Under testing)

### Support
Noticed something?
Have you got any idea to make it better?

Feel free to write us a message: **app @ minerstat.com**


Tested on Ubuntu 16.04 / lUbuntu 

> © 2017 - https://minerstat.com - Mining Monitor
