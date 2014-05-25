<?php
isset($config) || die();

include ('Curl.php');

$Curl = new Curl;

$Curl->init('https://descargas2014.interior.es/');

$cookie = tempnam(sys_get_temp_dir(), 'cookie');

$Curl->setOption(CURLOPT_SSL_VERIFYPEER, false);
$Curl->setOption(CURLOPT_COOKIESESSION, true);
$Curl->setOption(CURLOPT_COOKIEJAR, $cookie);
$Curl->setOption(CURLOPT_COOKIEFILE, $cookie);

$Curl->get('remote/login');
$redirect = $Curl->get('remote/logincheck?ajax=1&username='.$config['user'].'&realm=&credential='.$config['password']);
$Curl->get('remote/hostcheck_install?'.preg_replace('/^.*hostcheck_install\?/', '', $redirect));

$files = [
    'TXTOTPE99INI.gz', // Totales Recuento: Datos iniciales
    'TXMUNPE99INI.tar.gz', // Municipios Recuento: Datos iniciales
    'TXTOTDI99INI.gz', // Totales Participacion: Datos iniciales
    'TXMUNDI99INI.tar.gz' // Municipios Participacion: Datos iniciales
];

foreach ($files as $file) {
    $name = preg_replace('/\..*$/', '', $file);
    $dir = __DIR__.'/'.$name;

    if (!is_dir($dir)) {
        mkdir($dir);
    }

    chdir($dir);

    $local = $dir.'/'.$file;

    $Curl->file('proxy/http/descpru2014npv.interior.es/99prdescargas/'.$file, $local);

    if (!is_file($local)) {
        echo "\n".'File '.$file.' could not be downloaded';
        continue;
    }

    if (strstr($file, '.tar.gz')) {
        shell_exec('tar -zxf '.$local);
    } else {
        shell_exec('gunzip '.$local);
    }

    clearstatcache();

    if (is_file($local)) {
        unlink($local);
    }
}
