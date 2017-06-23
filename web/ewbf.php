<?php

//// EWBF_ ZEC MINER API v1.2 /////////////////////////////
///  © minerstat.com
///  in 2017     
  
  date_default_timezone_set('Europe/Amsterdam');
  
  $server = "127.0.0.1";
  $port = 42000;

  $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
  
  $result = socket_connect($socket, $server, $port);
  
  $date = date("Y-m-d H:i"); 
  $date = strtotime($date); 
  
  $request = "{\"id\":1, \"method\":\"getstat\"}\n";
  $request_length = strlen($request);
  socket_send($socket, $request, $request_length, 0);
  
  $response = '';
  socket_recv($socket, $response, 2048, MSG_WAITALL);
  socket_close($socket);

  $power=0; $speed=0; $accept=0; $reject=0; $z=0;

  $result = json_decode($response, TRUE);
  
  foreach ($result["result"] as $id => $data) 
{
   
  $power= $power + $data["gpu_power_usage"];
  $speed= $speed + $data["speed_sps"];
  $accept= $accept + $data["accepted_shares"];
  $reject= $reject + $data["rejected_shares"];
  $time= $data["start_time"];

  echo "GPU".$z."_SPEED: $data[speed_sps] H/s;";
  echo "GPU".$z."_POWER: $data[gpu_power_usage];";

  $z++;

}
  
echo "Power: ".$power.";"; 
echo "Total speed: ".$speed."Sol/s;"; 
echo "Accepted share ".$accept.";"; 
echo "Rejected share ".$reject.";";
echo "Total GPUs: ".$z.";";
echo "START_TIME: ".$time.";";
echo "CURRENT_TIME: ".$date.";";
echo "UPTIME: ".($date - $time).";";

?>
