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

$html = $Curl->get('proxy/http/descargas2014npv.interior.es/99descargas/DESCAR99.htm');

if (strstr($html, 'credential')) {
    $Curl->get('remote/login');
    $redirect = $Curl->get('remote/logincheck?ajax=1&username='.$config['user'].'&realm=&credential='.$config['password']);
    $Curl->get('remote/hostcheck_install?'.preg_replace('/^.*hostcheck_install\?/', '', $redirect));

    $html = $Curl->get('proxy/http/descargas2014npv.interior.es/99descargas/DESCAR99.htm');
}

if (strstr($html, 'credential')) {
    die('Waiting for login access');
}

preg_match_all('/TXTOTPE99[^"]+.gz/', $html, $files_total);
preg_match_all('/TXMUNPE99[^"]+.gz/', $html, $files_municipios);

$files = [end($files_total[0]), end($files_municipios[0])];

$download = false;

shell_exec('rm -rf "'.__DIR__.'/csv/*"');

foreach ($files as $file) {
    $name = preg_replace('/\..*$/', '', $file);
    $dir = __DIR__.'/csv/'.$name;

    if (!is_dir($dir)) {
        mkdir($dir);
    }

    chdir($dir);

    $local = $dir.'/'.$file;

    $Curl->file('proxy/http/descargas2014npv.interior.es/99descargas/'.$file, $local);

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

    $download = true;
}

if (empty($download)) {
    die('Files could not be downloaded');
}

$name = str_replace(['TXTOTPE99', '.gz'], '', $files[0]);

file_put_contents(__DIR__.'/../json/last', date('c'));

chdir(__DIR__);
