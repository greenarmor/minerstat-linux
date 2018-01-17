#!/bin/bash
echo "*** Nvidia Overclocking Tool @coinscrow ***"

if [ ! $1 ]; then
echo ""
echo "--- EXAMPLE ---"
echo "./overclock_nvidia a b c d e"
echo "a = GPUID"
echo "b = POWER LIMIT in Watts (Example: 120 = 120W) [ROOT REQUIRED]"
echo "c = GLOBAL FAN SPEED (100 = 100%)"
echo "d = Memory Offset"
echo "e = Core Offset"
echo ""
echo "-- Full Example --"
echo "./overclock_nvidia 0 120 80 1300 100"
echo ""
fi

if [ $1 ]; then
GPUID=$1
POWERLIMITINWATT=$2
FANSPEED=$3
MEMORYOFFSET=$4
COREOFFSET=$5

nvidia-smi -i $GPUID -pl $POWERLIMITINWATT
#nvidia-settings -c :0 -a '[gpu:'"$GPUID"']/GPUFanControlState=1' -a '[fan:0]/GPUTargetFanSpeed='"$FANSPEED"'';
nvidia-settings -c :0 -a 'GPUFanControlState=1' -a 'GPUTargetFanSpeed="$FANSPEED"'
nvidia-settings -c :0 -a '[gpu:'"$GPUID"']/GPUMemoryTransferRateOffset[3]='"$MEMORYOFFSET"''
nvidia-settings -c :0 -a '[gpu:'"$GPUID"']/GPUGraphicsClockOffset[3]='"$COREOFFSET"''

echo ""
echo "*** https://minerstat.com ***"
echo ""

fi
