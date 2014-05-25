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

			pieLabel.text(data.escrutado_porcentaje + '% escrutado');

			arcs = arc_grp.selectAll("path")
				.data(pie(data.grupos));

			arcs.enter().append("svg:path")
				.attr("stroke", "white")
				.attr("stroke-width", 0.5)
				.style("fill", function(d) { 
					return helpers.getInfoPartido(d.data.id, 'color', '#CCCCCC');
				})
				.attr("d", arc)
				.each(function (d) {
					this._current = d;
				});

			sliceLabel = label_group.selectAll("text")
				.data(pie(data.grupos));

			sliceLabel.enter().append("svg:text")
				.attr("class", "label")
				.attr("transform", function (d) {
					return "translate(" + arc.centroid(d) + ")";
				})
				.attr("text-anchor", "middle")
				.text(function (d) {
					return d.data.nombre;
				})
				.style("fill-opacity", function (d) {
					return d.data.porcentaje > 10 ? 1 : 0;
				});
		};

		var generateTotalTable = function(data){
			d3.select('#total-table').selectAll('li').remove();

			var total_table = d3.select('#total-table')
				.selectAll('li')
				.data(data.grupos)
				.enter();

			var total_partido = total_table.append('li');

			total_partido
				.append('span')
				.attr('class', 'color')
				.style('background', function (d) {
					return helpers.getInfoPartido(d.id, 'color', '#CCCCCC');
				});

			total_partido
				.append('strong')
				.attr('class', 'nome')
				.text(function(d) {
					return d.nombre;
				});

			total_partido
				.append('span')
				.attr('class', 'datos')
				.text(function(d) {
					var escanos = d.escanos ? d.escanos + ' escaños' : '';
					return d.porcentaje + '% ' + escanos;
				});
		};

		var buildGraph = function() {
			generateTotalTable(currentData);
			generateTotalGraph(currentData);
		};

		var updateGraph = function() {
			generateTotalTable(currentData);
			pieLabel.text(currentData.escrutado_porcentaje + '% escrutado');

			if(abstencion.property('checked')) {
				var abstencion_template = {
					'nombre': 'Abstencion',
					'id': '00',
					'votos': currentData.abstencion_numero
				};

				var newData = currentData.grupos.concat([abstencion_template]);

				arcs.data(pie(newData));
				sliceLabel.data(pie(newData));
			} else {
				arcs.data(pie(currentData.grupos));
				sliceLabel.data(pie(currentData.grupos));
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
					return d.data.porcentaje > 10 ? 1 : 0;
				});

		};

		var initGraph = function(dataFile, callback) {
			var file = '/json/' + dataFile;
			d3.json(file, function(data) {
				titulo.text(data.data.nombre);
				votaron.text('Votantes: ' + data.data.censo);
				novotaron.text('Abstención: ' + data.data.abstencion_numero + ' (' + data.data.abstencion_porcentaje+ '%)');

				if(currentData) {
					currentData = data.data;
					updateGraph();
				} else {
					currentData = data.data;
					buildGraph();
				}

				if (callback) {
					callback(data.children);
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


		var $selectComunidades = $('#select-comunidades');
		var $selectProvincias = $('#select-provincias');
		var $selectMunicipios = $('#select-municipios');

		selector.init($selectComunidades, {
			labelField: "nombre",
			valueField: "json"
		});
		selector.init($selectProvincias, {
			labelField: "nombre",
			valueField: "json"
		});
		selector.init($selectMunicipios, {
			labelField: "nombre",
			valueField: "json"
		});

		selector.ocultar($selectProvincias);
		selector.ocultar($selectMunicipios);

		initGraph('TO-00.json', function (datos) {
			selector.replaceOptions($selectComunidades, datos);

			//Ao cambiar de comunidade, carga as provincias e borra municipios:
			$selectComunidades.change(function () {
				initGraph($selectComunidades.val(), function (datos) {
					selector.mostrar($selectProvincias);
					selector.replaceOptions($selectProvincias, datos);

					//borra municipios no caso de que haxa
					selector.clearOptions($selectMunicipios);
					selector.ocultar($selectMunicipios);

					//Ao cambiar de provincia, carga os municipios
					$selectProvincias.change(function () {
						initGraph($selectProvincias.val(), function (datos) {
							selector.mostrar($selectMunicipios);
							selector.replaceOptions($selectMunicipios, datos);

							$selectMunicipios.change(function () {
								initGraph($selectMunicipios.val());
							});
						});
					});
				});
			});
		});
	});
});
