<?php
Class Csv2Json
{
    private $dir = '';

    public function jsonDirectory ($dir)
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
    public function load($dir)
    {
        $array = $this->file2array($dir.'/TXTOTPE99INI/TXTOTPE99INI');

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

        foreach (glob($dir.'/TXMUNPE99INI/*') as $file) {
            $array = $this->file2array($file);

            foreach ($array as $row) {
                $MU = $row[3];

                unset($row[3], $row[4]);

                array_unshift($row, 'MU');

                $row = $this->setRow(array_values($row));

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
    public function setRow($row)
    {
        $groups = array_chunk(array_slice($row, 18), 5);
        $groups = array_filter($groups, function ($value) {
            return (int)$value[0];
        });

        usort($groups, function ($a, $b) {
            if (isset($a[2]) && isset($b[2])) {
                return ($a[2] > $b[2]) ? -1 : 1;
            }
        });

        $groups = array_slice($groups, 0, 10);

        $groups = array_merge($groups, [
            ['00', 'Blanco', $row[13], $row[14], 0],
            ['00', 'Nulos', $row[15], $row[16], 0]
        ]);

        array_walk($groups, function (&$value) {
            $value['id'] = $value[0];
            $value['nombre'] = $value[1];
            $value['votos'] = $this->int($value[2]);
            $value['porcentaje'] = $this->int($value[3], 100);
            $value['diputados'] = $this->int($value[4]);

            unset($value[0], $value[1], $value[2], $value[3], $value[4]);
        });

        return [
            'tipo' => $row[0],
            'CM' => $row[1],
            'PR' => $row[2],
            'nombre' => $row[4],
            'censo' => $this->int($row[6]),
            'escrutado_numero' => $this->int($row[7]),
            'escrutado_porcentaje' => $this->int($row[8], 100),
            'votantes_numero' => $this->int($row[9]),
            'votantes_porcentaje' => $this->int($row[10], 100),
            'abstencion_numero' => $this->int($row[11]),
            'abstencion_porcentaje' => $this->int($row[12], 100),
            'grupos' => $groups
        ];
    }

    public function int ($value, $max = 0)
    {
        return rand(0, $max ?: 100);
    }
}