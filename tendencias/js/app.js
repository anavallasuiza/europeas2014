require(['../../static/js/config'], function () {

	require([
	'd3',
	'jquery',
	'helpers',
	'selector'
	], function(d3, $, helpers, selector) {
		var titulo = d3.select('#titulo');
		var votaron = d3.select('#votaron');
		var novotaron = d3.select('#novotaron');
		var actualizado = d3.select('#actualizado');

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
			.innerRadius(radius - 100)
			.outerRadius(radius);

		var generateTotalGraph = function(data){

			d3.select("#total-viz").select('svg').remove();

			var svg = d3.select("#total-viz").append("svg:svg")
				.attr("width", width).attr("height", height);

			var arc_grp = svg.append("svg:g")
				.attr("transform", "translate(225,200)");

			var label_group = svg.append("svg:g")
				.attr("transform", "translate(225,200)");

			var center_group = svg.append("svg:g")
				.attr("transform", "translate(225,200)");

			var pieLabel = center_group.append("svg:text");

			pieLabel.attr("dy", "-0.5em")
				.attr("text-anchor", "middle")
				.text(data.escrutado_porcentaje + '% escrutado');

			arcs = arc_grp.selectAll("path")
				.data(pie(data.grupos));

			arcs.enter().append("svg:path")
				.attr("stroke", "white")
				.attr("stroke-width", 0.5)
				.style("fill", function(d) { 
					return helpers.getInfoPartido(d.data.id, 'color', '#CCCCCC');
				})
				.attr("d", arc)
				.attr("svg:title", function(d) {
					return d.data.nombre;
				})
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
					return d.data.nombre.length > 6 ? '' : d.data.nombre;
				})
				.style("fill-opacity", function (d) {
					return d.data.porcentaje > 5 ? 1 : 0;
				});
		};

		var generateTotalTable = function(data, infoPartidos) {
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
				.attr('title', function(d) {
					return d.nombre;
				})
				.text(function(d) {
					return d.nombre;
				});

			total_partido
				.append('strong')
				.attr('class', 'percent')
				.text(function(d) {
					return ' ' + d.porcentaje + '%';
				});

			total_partido
				.append('strong')
				.attr('class', 'tendency')
				.text(function(d) {
					return ' [' + infoPartidos[d.id].tendencia + ']';
				});

			total_partido
				.append('span')
				.attr('class', 'diputados')
				.text(function(d) {
					return d.diputados ? d.diputados + ' escaños' : '';
				});
		};

		var buildGraph = function(data, infoPartidos) {
			generateTotalTable(data, infoPartidos);
			generateTotalGraph(data);
		};


		var initGraph = function(dataFile, callback) {
			var file = '/json/' + dataFile;
			d3.json('/json/grupos.json', function(infoPartidos) {
				d3.json(file, function(data) {
					titulo.text(data.data.nombre);
					votaron.text('Votantes: ' + data.data.censo);
					novotaron.text('Abstención: ' + data.data.abstencion_numero + ' (' + data.data.abstencion_porcentaje+ '%)');

					buildGraph(data.data, infoPartidos);

					if (callback) {
						callback(data.children);
					}
				});
			});
		};

		var sel = d3.select('#totales')
			.selectAll('button');

		sel.on('click', function() {
			initGraph(this.value);
		});

		//Cousas do select
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

		$('#select-total').on('click', function() {
			initGraph('TO-00.json', function (datos) {
				selector.replaceOptions($selectComunidades, datos);

				selector.clearOptions($selectProvincias);
				selector.ocultar($selectProvincias);
				selector.clearOptions($selectMunicipios);
				selector.ocultar($selectMunicipios);
				$('#totales').show();

			});
		
		});

		initGraph('TO-00.json', function (datos) {
			d3.text('/json/last', function(data) {
				var updated = new Date(data);
				actualizado.text('Actualizado: ' + updated.getHours() + ':'+ (updated.getMinutes()<10 ? '0' : '') + updated.getMinutes());
			});

			selector.replaceOptions($selectComunidades, datos);

			//Ao cambiar de comunidade, carga as provincias e borra municipios:
			$selectComunidades.change(function () {
				$('#totales').hide();
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
