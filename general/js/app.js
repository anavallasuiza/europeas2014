require.config({
	paths: {
		'd3': '../../static/libs/d3/d3.min',
		'helpers': '../../static/js/common'	
	}

});

require(['d3', 'helpers'], function(d3, helpers) {
	var total_votantes, g, t;

	var width = 450, 
		height = 150, 
		radius = height;

	var color = d3.scale.ordinal()
		.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

	var degree = Math.PI/180;

	var arc = d3.svg.arc()
		.outerRadius(radius - 10)
		.innerRadius(radius - 80);
	
	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.votos; })
		.startAngle(-90*degree)
		.endAngle(90*degree);

	var svg = d3.select("#total-viz").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height + ")");

	var generateTotalGraph = function(data){

		g = svg.selectAll("path")
			.data(pie(data.datos))
			.enter().append("path");

		g.attr("d", arc)
			.each(function(d) { this._current = d; })
			.style("fill", function(d) { return color(d.data.partido); });

		g.style('opacity', 0)
			.transition()
			.delay(function(d, i){
				return i * 20;
			})
			.duration(500)
			.style('opacity', 1);
	};

	var generateTotalTable = function(data){
		d3.select('#total-table').selectAll('div').remove();

		var total_table = d3.select('#total-table')
			.selectAll('div')
			.data(data.datos)
			.enter();

		var total_partido = total_table.append('div')
			.attr('class', 'partido');

		total_partido.style('opacity', 0)
			.transition()
			.delay(function(d, i){
				return i * 20;
			})
			.duration(500)
			.style('opacity', 1);

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
				var votes_percent = helpers.percent(+total_votantes, +d.votos) + '%';
				var escanos = d.escanos ? d.escanos + ' escaños' : '';
				return votes_percent + ' ' + escanos;
			});
	};

	var change = function(dataset) {
		var file = '/general/data/' + dataset;
		d3.json(file, function(data) {
			total_votantes = data.votantes - data.abstencion;

			generateTotalTable(data);

			g.data(pie(data.datos));
			g.transition().duration(750).attrTween("d", arcTween);
		});
	};

	function arcTween(a) {
		var i = d3.interpolate(this._current, a);
		this._current = i(0);
		return function(t) {
			return arc(i(t));
		};
	}

	//temp
	var boton = d3.select('#cambia');

	boton.on('click', function() {
		change('totales2.json');
	
	});

	//carga datos iniciais
	d3.json('/general/data/totales.json', function(data) {
		total_votantes = data.votantes - data.abstencion;

		generateTotalTable(data);
		generateTotalGraph(data);
	});
});

