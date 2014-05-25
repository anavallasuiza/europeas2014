<?php
Class Csv2Json
{
    private $proyections = [];
    private $dir = '';

    public function setProyections($proyections)
    {
        $this->proyections = $proyections;
    }

    public function jsonDirectory($dir)
    {
        if (!is_dir($dir)) {
            throw new Exception($dir.' directory not exists');
        }

        $this->dir = $dir;
    }

    /**
     * Genera los ficheros JSON con la estructura correcta a partir de los resultados parciales
     *
     * @param  dir      Directorio base que contiene los ficheros
     * @return boolean
     */
    public function results($dir, $name_total, $name_muni)
    {
        $array = $this->file2array($dir.'/TXTOTPE99'.$name_total.'/TXTOTPE99'.$name_total);

        $data = [];

        foreach (['TO', 'CM', 'PR', 'MU'] as $type) {
            $data[$type] = [];
        }

        foreach ($array as $row) {
            if ($row[0] !== 'TO') {
                continue;
            }

            $row = $this->setRow($row);

            $data['TO'] = [
                '00' => [
                    'file' => 'TO-00.json',
                    'data' => $row,
                    'parent' => [],
                    'children' => []
                ]
            ];

            break;
        }

        foreach ($array as $row) {
            if ($row[0] !== 'CM') {
                continue;
            }

            $row = $this->setRow($row);

            $data['CM'][$row['CM']] = [
                'file' => ('CM-'.$row['CM'].'.json'),
                'data' => $row,
                'parent' => [
                    'id' => '00',
                    'nombre' => 'España',
                    'json' => 'TO-00.json'
                ]
            ];

            $data['TO']['00']['children'][] = [
                'id' => $row['CM'],
                'nombre' => $row['nombre'],
                'json' => ('CM-'.$row['CM'].'.json')
            ];
        }

        foreach ($array as $row) {
            if ($row[0] !== 'PR') {
                continue;
            }

            $row = $this->setRow($row);

            $data['PR'][$row['PR']] = [
                'file' => ('PR-'.$row['PR'].'.json'),
                'data' => $row,
                'children' => [],
                'parent' => [
                    'id' => $row['CM'],
                    'nombre' => $data['CM'][$row['CM']]['data']['nombre'],
                    'json' => ('CM-'.$row['CM'].'.json')
                ]
            ];

            $data['CM'][$row['CM']]['children'][] = [
                'id' => $row['PR'],
                'nombre' => $row['nombre'],
                'json' => ('PR-'.$row['PR'].'.json')
            ];
        }

        foreach (glob($dir.'/TXMUNPE99'.$name_muni.'/*') as $file) {
            $array = $this->file2array($file);

            foreach ($array as $row) {
                $MU = $row[3];

                unset($row[3], $row[4]);

                array_unshift($row, 'MU');

                $row = $this->setRow(array_values($row), true);

                $data['MU'][$MU] = [
                    'file' => ('MU-'.$MU.'.json'),
                    'data' => $row,
                    'children' => [],
                    'parent' => [
                        'id' => $row['PR'],
                        'nombre' => $data['PR'][$row['PR']]['data']['nombre'],
                        'json' => ('PR-'.$row['PR'].'.json')
                    ]
                ];

                $data['PR'][$row['PR']]['children'][] = [
                    'id' => $MU,
                    'nombre' => $row['nombre'],
                    'json' => ('MU-'.$MU.'.json')
                ];
            }
        }

        foreach ($data as $blocks) {
            foreach ($blocks as $values) {
                $this->saveJson($values['file'], $values);
            }
        }

        return $data;
    }

    /**
     * Devuelve un array a partir de un fichero CSV
     *
     * @param  file     Fichero CSV
     * @return array
     */
    public function file2array($file)
    {
        if (!is_file($file)) {
            throw new Exception($name.' file not exists');
        }

        return array_map(function ($value) {
            return array_map('trim', str_getcsv(utf8_encode($value), ';'));
        }, file($file));
    }

    /**
     * A partir de un array, genera el JSON correspondiente
     *
     * @param  file      Fichero JSON a generar
     * @param  array     Array de datos
     * @return array
     */
    public function saveJson($file, $array)
    {
        $json = @json_encode($array);

        if ($error = json_last_error()) {
            throw new Exception('Json error: '.json_last_error_msg());
        }

        file_put_contents($this->dir.'/'.basename($file), $json);

        return $array;
    }

    /**
     * Trocea la linea de recuento para agrupar la informacion
     * de cada fuerza politica
     *
     * @param  row      Array con la linea
     * @return array
     */
    public function setRow($row, $short = false)
    {
        if ($short) {
            $groups = array_chunk(array_slice($row, 17), 4);
        } else {
            $groups = array_chunk(array_slice($row, 18), 5);
        }

        $groups = array_filter($groups, function ($value) {
            return (int)$value[0];
        });

        array_walk($groups, function (&$value) {
            $value['id'] = $value[0];
            $value['nombre'] = $value[1];
            $value['votos'] = $this->int($value[2]);
            $value['porcentaje'] = $this->percent($value[3]);

            if (isset($value[4])) {
                $value['diputados'] = $this->int($value[4]);
            }

            unset($value[0], $value[1], $value[2], $value[3], $value[4]);
        });

        usort($groups, function ($a, $b) {
            return ($a['votos'] > $b['votos']) ? -1 : 1;
        });

        $others = array_slice($groups, 11);
        $groups = array_slice($groups, 0, 11);

        array_walk($others, function (&$value) {
            $value['votos'] = round($value['votos'] / 10);
        });

        $groups[] = [
            'id' => '-1',
            'nombre' => 'Blanco',
            'votos' => $this->int($row[13]),
            'porcentaje' => $this->percent($row[14]),
            'diputados' => 0
        ];

        $groups[] = [
            'id' => '-2',
            'nombre' => 'Nulos',
            'votos' => $this->int($row[15]),
            'porcentaje' => $this->percent($row[16]),
            'diputados' => 0
        ];

        $groups[] = [
            'id' => '-3',
            'nombre' => 'Otros',
            'votos' => array_sum(array_column($others, 'votos')),
            'porcentaje' => $this->percent(array_sum(array_column($others, 'porcentaje'))),
            'diputados' => array_sum(array_column($others, 'diputados')),
            'otros' => $others
        ];

        return [
            'tipo' => $row[0],
            'CM' => $row[$short ? 2 : 1],
            'PR' => $row[$short ? 1 : 2],
            'nombre' => $row[4],
            'censo' => $this->int($row[6]),
            'escrutado_numero' => $this->int($row[7]),
            'escrutado_porcentaje' => $this->percent($row[8]),
            'votantes_numero' => $this->int($row[9]),
            'votantes_porcentaje' => $this->percent($row[10]),
            'abstencion_numero' => $this->int($row[11]),
            'abstencion_porcentaje' => $this->percent($row[12]),
            'grupos' => $groups
        ];
    }

    public function int($value)
    {
        return (int)$value;
    }

    public function percent($value)
    {
        return preg_replace('/([0-9]{3})([0-9]{2})/', '$1.$2', $value);
    }
}