<?php

require_once (dirname(__FILE__).'/../php/Dhont.php');

class DhontTest extends PHPUnit_Framework_TestCase {

	/**
	 * Proba do cálculo de D'Hont segundo o exemplo da Wikipedia:
	 * http://es.wikipedia.org/wiki/Sistema_D%27Hondt#Ejemplo
	 */
	public function test_repartirBancas() {
		$calculadorEscanos = new Dhont();
		$results = $calculadorEscanos->repartirBancas(7, array(
			'Partido A' => 340000, 
			'Partido B' => 280000, 
			'Partido C' => 160000, 
			'Partido D' => 60000, 
			'Partido E' => 15000
		));
		$this->assertEquals(
			array(
				0 => 'Partido A',
				1 => 'Partido B',
				2 => 'Partido A',
				3 => 'Partido C',
				4 => 'Partido B',
				5 => 'Partido A',
				6 => 'Partido B'
			),
			$results
		);
	}

}
