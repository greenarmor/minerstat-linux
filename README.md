# minerstat.com - Linux Beta 

![Version](https://img.shields.io/github/release/coinscrow/minerstat-linux.svg)
![Latest](https://img.shields.io/github/last-commit/coinscrow/minerstat-linux.svg)

> [STABLE] it can run weeks without downtime!

> with Hardware Monitor!

# Dependencies
- Linux Ubuntu / lUbuntu 16.04.3 LTS |RECOMMENDED|
- Linux Ubuntu / lUbuntu 17.10.1 (NOT TESTED BY US, BUT SHOULD WORK)

# First Steps

1) Register a new account on https://minerstat.com
2) Create a new worker (Node, Linux , AMD/Nvidia)
3) Mofify your configs in Config Editor -> Save

# How to install on Linux?

1) Open Terminal and Type:

```
wget https://raw.githubusercontent.com/coinscrow/minerstat-linux/master/install.sh; chmod 777 install.sh; sh install.sh
```
* Make sure you give correct login token and worker name to the install script (!case sensitive!).

2) After the install script you are ready to use our Linux Client!


# Commands

```
minerstat-start | Start mining with console & mining output

minerstat-stop | Stop mining and minerstat

minerstat-start-bg | Same as minerstat-start just in the background, ideal for SSH

minerstat-console | View mining output (Only for BG mod)
```

# Informations

You can see mining process by type `minerstat-console` to the terminal.

**Ctrl + A** | **Crtl + D** to safety close the `minerstat-console`.

**Ctrl + C** command quit from the process / close minerstat.

## Currently Supported Clients
Profit Switch by Minerstat

CCminer-Tpruvot (Nvidia Multi Miner)

CCminer-Alexis (Nvidia - better Skein algo)

CCminer-DJM34 (Nvidia XZC Miner)

CCminer-Krnlx (Nvidia - Better Xevan algo)

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

Profit Switch (Between Coins and Algos)

### Support
Noticed something?
Have you got any idea to make it better?

Feel free to write us a message: **app @ minerstat.com**


Tested on Ubuntu 16.04 / lUbuntu 

> © 2017 - https://minerstat.com - Mining Monitor
