<?php
echo "\n".date('Y-m-d H:i:s').' - Started';

include (__DIR__.'/array_column.php');
include (__DIR__.'/Csv2Json.php');

$config = include (__DIR__.'/conf/config.php');

include (__DIR__.'/download.php');

$Csv2Json = new Csv2Json;
$Csv2Json->setProyections(include (__DIR__.'/conf/proyecciones.php'));
$Csv2Json->jsonDirectory(__DIR__.'/../json');
$Csv2Json->results(__DIR__.'/csv', $name_total, $name_muni);

die("\n".date('Y-m-d H:i:s').' - Finished');
