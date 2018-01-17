#!/bin/bash
echo "*** Nvidia Overclocking Tool @coinscrow ***"

if [ ! $1 ]; then
echo ""
echo "--- EXAMPLE ---"
echo "./overclock_nvidia a b c d"
echo "a = POWER LIMIT in Watts (Example: 120 = 120W) [ROOT REQUIRED]"
echo "b = GLOBAL FAN SPEED (100 = 100%)"
echo "c = Memory Offset"
echo "d = Core Offset"
echo ""
echo "-- Full Example --"
echo "./overclock_nvidia 120 80 1300 100"
echo ""
fi

if [ $1 ]; then
POWERLIMITINWATT=$1
FANSPEED=$2
MEMORYOFFSET=$3
COREOFFSET=$4

nvidia-smi -pl $POWERLIMITINWATT
nvidia-settings -c :0 -a 'GPUFanControlState=1' -a 'GPUTargetFanSpeed='"$FANSPEED"''
nvidia-settings -c :0 -a 'GPUMemoryTransferRateOffset[3]='"$MEMORYOFFSET"''
nvidia-settings -c :0 -a 'GPUGraphicsClockOffset[3]='"$COREOFFSET"''

echo ""
echo "*** https://minerstat.com ***"
echo ""

fi
