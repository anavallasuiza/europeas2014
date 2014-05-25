require(['../../static/js/config'], function () {

	require([
	'd3',
	'jquery',
	'helpers',
	'selector'
	], function(d3, $, helpers, selector) {
		var currentData;

		var titulo = d3.select('#titulo');
		var votaron = d3.select('#votaron');
		var novotaron = d3.select('#novotaron');
		var abstencion = d3.select('#abstencion');

		var width = 550, 
			height = 200, 
			radius = height,
			arcs, sliceLabel;
		
		var degree = Math.PI/180;

		var pie = d3.layout.pie()
					.sort(null)
					.value(function(d) { return d.votos; })
					.startAngle(-90 * degree)
					.endAngle(90 * degree);

		var arc = d3.svg.arc()
					.innerRadius(radius- 70)
					.outerRadius(radius - 20);

		var svg = d3.select("#total-viz").append("svg:svg")
			.attr("width", width).attr("height", height);

		var arc_grp = svg.append("svg:g")
			.attr("transform", "translate(" + (width / 2) + "," + (height) + ")");

		var label_group = svg.append("svg:g")
			.attr("transform", "translate(" + (width / 2) + "," + (height) + ")");

		var center_group = svg.append("svg:g")
			.attr("transform", "translate(" + (width / 2) + "," + (height) + ")");

		var pieLabel = center_group.append("svg:text");

		pieLabel.attr("dy", "-0.5em")
			.attr("text-anchor", "middle");

		var generateTotalGraph = function(data){

			pieLabel.text(data.escrutado + '% escrutado');

			arcs = arc_grp.selectAll("path")
				.data(pie(data.datos));

			arcs.enter().append("svg:path")
				.attr("stroke", "white")
				.attr("stroke-width", 0.5)
				.style("fill", function(d) { return helpers.logos[d.data.partido.toLowerCase()].color; })
				.attr("d", arc)
				.each(function (d) {
					this._current = d;
				});

			sliceLabel = label_group.selectAll("text")
				.data(pie(data.datos));

			sliceLabel.enter().append("svg:text")
				.attr("class", "label")
				.attr("transform", function (d) {
					return "translate(" + arc.centroid(d) + ")";
				})
				.attr("text-anchor", "middle")
				.text(function (d) {
					return d.data.partido;
				});
		};

		var generateTotalTable = function(data){
			d3.select('#total-table').selectAll('li').remove();

			var total_table = d3.select('#total-table')
				.selectAll('li')
				.data(data.datos)
				.enter();

			var total_partido = total_table.append('li');

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
					var votes_percent = helpers.percent(+currentData.votos_totales, +d.votos) + '%';
					var escanos = d.escanos ? d.escanos + ' escaños' : '';
					return votes_percent + ' ' + escanos;
				});
		};

		var buildGraph = function() {
			generateTotalTable(currentData);
			generateTotalGraph(currentData);
		};

		var updateGraph = function() {
			generateTotalTable(currentData);
			pieLabel.text(currentData.escrutado + '% escrutado');

			if(abstencion.property('checked')) {
				var newData = currentData.datos.concat([{'partido': 'Abstencion', 'votos': +currentData.abstencion}]);
				arcs.data(pie(newData));
				sliceLabel.data(pie(newData));
			} else {
				arcs.data(pie(currentData.datos));
				sliceLabel.data(pie(currentData.datos));
			}
			arcs.transition().duration(500).attrTween("d", function (a) {
				var i = d3.interpolate(this._current, a);
				this._current = i(0);
				return function(t) {
					return arc(i(t));
				};
			});

			sliceLabel.transition().duration(500)
				.attr("transform", function (d) {
					return "translate(" + arc.centroid(d) + ")";
				})
				.style("fill-opacity", function (d) {
					return d.value === 0 ? 1e-6 : 1;
				});

		};

		var initGraph = function(dataFile) {
			var file = '/general/data/' + dataFile;
			d3.json(file, function(data) {
				titulo.text(data.titulo);
				votaron.text('Votantes: ' + data.votantes_convocados);
				novotaron.text('Abstención: ' + data.abstencion + ' (' + helpers.percent(data.votantes_convocados, data.abstencion) + '%)');

				if(currentData) {
					currentData = data;
					updateGraph();
				} else {
					currentData = data;
					buildGraph();
				}
			});
		};

		var sel = d3.select('#totales')
			.selectAll('button');

		sel.on('click', function() {
			initGraph(this.value);
		});


		abstencion.on('change', function() {
			updateGraph();
		});

		initGraph('totales.json');



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
