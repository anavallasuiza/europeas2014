require(['../../static/js/config'], function () {

	require([
	'd3',
	'helpers',
	'selector'
	], function(d3, helpers, selector) {
		var total_votantes, g;

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
					return helpers.logos[d.partido.toLowerCase()].color
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


		function arcTween(a) {
			var i = d3.interpolate(this._current, a);
			this._current = i(0);
			return function(t) {
				return arc(i(t));
			};
		}

		var sel = d3.select('#totales')
			.selectAll('button');

		sel.on('click', change);

		var change = function() {
			console.log(this);
			var file = '/general/data/' + this.value;
			d3.json(file, function(data) {
				total_votantes = data.votantes - data.abstencion;

				generateTotalTable(data);

				g.data(pie(data.datos));
				g.transition().duration(750).attrTween("d", arcTween);
			});
		};

		//carga datos iniciais
		d3.json('/general/data/totales.json', function(data) {
			total_votantes = data.votantes - data.abstencion;

			generateTotalTable(data);
			generateTotalGraph(data);
		});


		//Selects
		var $selectComunidades = $('#select-comunidades');
		var $selectProvincias = $('#select-provincias');
		var $selectMunicipios = $('#select-municipios');

		selector.init($selectComunidades);
		selector.init($selectProvincias);
		selector.init($selectMunicipios);

		selector.replaceOptions($selectComunidades, [
			{
				text: 'Galicia',
				value: 1
			},{
				text: 'Asturias',
				value: 2
			},{
				text: 'Cantabria',
				value: 3
			}
		]);

		//Ao cambiar de comunidade, carga as provincias e borra municipios:
		$selectComunidades.change(function () {
			// var file = 'data/provincias/' + $selectComunidades.val() + '.json';
			// selector.loadOptions($selectProvincias, file);

			selector.replaceOptions($selectProvincias, [
				{
					text: 'A Coruña',
					value: 1
				},{
					text: 'Lugo',
					value: 2
				},{
					text: 'Ourense',
					value: 3
				},{
					text: 'Pontevedra',
					value: 4
				}
			]);

			//borra municipios no caso de que haxa
			selector.clearOptions($selectMunicipios);
		});

		//Ao cambiar de provincia, carga os municipios:
		$selectProvincias.change(function () {
			// var file = 'data/municipios/' + $selectProvincias.val() + '.json';
			// selector.loadOptions($selectMunicipios, file);

			selector.replaceOptions($selectMunicipios, [
				{
					text: 'Tordoia',
					value: 1
				},{
					text: 'Ordes',
					value: 2
				},{
					text: 'Santa Comba',
					value: 3
				},{
					text: 'A Coruña',
					value: 4
				}
			]);
		});
	});
});
