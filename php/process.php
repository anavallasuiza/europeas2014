<?php
echo "\n".date('Y-m-d H:i:s').' - Started';

include ('Csv2Json.php');

$config = include (__DIR__.'/config.php');

if ($config['download']) {
    include (__DIR__.'/download.php');
}

$Csv2Json = new Csv2Json;
$Csv2Json->jsonDirectory(__DIR__.'/../json');
$Csv2Json->load(__DIR__);

die("\n".date('Y-m-d H:i:s').' - Finished');
