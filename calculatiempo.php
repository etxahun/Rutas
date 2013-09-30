<?php
$time1 = '07:35:45';
$time2 = date("G:i:s");

list($hours, $minutes, $seconds) = explode(':', $time1);
$startTimestamp = mktime($hours, $minutes, $seconds);

list($hours, $minutes, $seconds) = explode(':', $time2);
$endTimestamp = mktime($hours, $minutes, $seconds);

$seconds = $endTimestamp - $startTimestamp;

$minutes = $seconds / 60;
$seconds = $seconds % 60;
$hours = floor($minutes/ 60);
$minutes = $minutes % 60;

$resultado = "Han pasado: <b>$hours</b> horas, <b>$minutes</b> minutos y <b>$seconds</b> segundos";

echo $resultado; 
?>