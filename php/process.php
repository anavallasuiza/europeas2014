<?php
echo "\n".date('Y-m-d H:i:s').' - Started';

include (__DIR__.'/array_column.php');
include (__DIR__.'/Csv2Json.php');
include (__DIR__.'/Dhont.php');

$config = include (__DIR__.'/conf/config.php');

$name_total = $name_muni = '';

include (__DIR__.'/download.php');

if (empty($name_total) || empty($name_muni)) {
    die('Download can not be processed');
}

$Csv2Json = new Csv2Json;
$Csv2Json->jsonDirectory(__DIR__.'/../json');

$data = $Csv2Json->results(__DIR__.'/csv', $name_total, $name_muni);

$Csv2Json->setProyections($data);

die("\n".date('Y-m-d H:i:s').' - Finished');
