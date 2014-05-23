require.config({
	paths: {
		'd3': '../../static/js/d3/d3.min',
		'helpers': '../../static/js/common'	
	}

});

require(['d3', 'helpers'], function(d3, helpers) {
	'use strict';
	var dataset;
	var total_votantes;



	d3.json('/general/data/totales.json', function(data) {
		dataset = data;
		total_votantes = data.votantes - data.abstencion;

		generateTable();
	});

	var generateTable = function(){

		var total_table = d3.select('#total-table')
			.selectAll('div')
			.data(dataset.datos)
			.enter();

		var total_partido = total_table.append('div')
			.attr('class', 'partido');

		total_partido
			.append('div')
			.attr('class', 'logo')
			.text(function(d) {
				return helpers.logos[d.partido] || 'Pon logo';
			});

		total_partido
			.append('div')
			.attr('class', 'nome')
			.text(function(d) {
				return d.partido;
			});

		total_partido
			.append('div')
			.attr('class', 'datos')
			.text(function(d) {
			console.log(total_votantes, d.votos);
				var votes_percent = helpers.percent(+total_votantes, +d.votos) + '%';
				var escanos = d.escanos ? d.escanos + ' escaños' : '';
				return votes_percent + ' ' + escanos;
			});
	};
});

