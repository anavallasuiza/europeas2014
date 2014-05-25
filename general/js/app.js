require(['../../static/js/config'], function () {

	require([
	'd3',
	'helpers'
	], function(d3, helpers) {
		var currentData, total_votantes, g;

		var width = 450, 
			height = 150, 
			radius = height;

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
				.style("fill", function(d) { return helpers.logos[d.data.partido.toLowerCase()].color; });

			g.style('opacity', 0)
				.transition()
				.delay(function(d, i){
					return i * 20;
				})
				.duration(500)
				.style('opacity', 1);
		};

		var generateTotalTable = function(data){
			d3.select('#total-table').selectAll('li').remove();

			var total_table = d3.select('#total-table')
				.selectAll('li')
				.data(data.datos)
				.enter();

			var total_partido = total_table.append('li');

			total_partido.style('opacity', 0)
				.transition()
				.delay(function(d, i){
					return i * 20;
				})
				.duration(500)
				.style('opacity', 1);

			total_partido
				.append('span')
				.attr('class', 'logo')
				.text(function(d) {
					return helpers.logos[d.partido.toLowerCase().logo] || 'Pon logo';
				});

			total_partido
				.append('span')
				.attr('class', 'color')
				.style('background', function (d) {
					return helpers.logos[d.partido.toLowerCase()].color;
				});

			total_partido
				.append('strong')
				.attr('class', 'nome')
				.text(function(d) {
					return d.partido;
				});

			total_partido
				.append('span')
				.attr('class', 'datos')
				.text(function(d) {
					var votes_percent = helpers.percent(+total_votantes, +d.votos) + '%';
					var escanos = d.escanos ? d.escanos + ' escaños' : '';
					return votes_percent + ' ' + escanos;
				});
		};


		var updateData = function() {
			generateTotalTable(currentData);

			g.data(pie(currentData.datos));

			g.transition().duration(750).attrTween("d", function (a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
					return arc(i(t));
				};
			});
		};

		//carga datos iniciais
		d3.json('/general/data/totales.json', function(data) {
			total_votantes = data.votantes - data.abstencion;

			generateTotalTable(data);
			generateTotalGraph(data);
		});

		var sel = d3.select('#totales')
			.selectAll('button');

		sel.on('click', function() {
			var file = '/general/data/' + this.value;

			d3.json(file, function(data) {
				currentData = data;
				updateData();
			});
		});
	});
});
