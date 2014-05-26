require(['../../static/js/config'], function () {

	require([
	'jquery',
	'selector'
	], function($, selector) {


		var $menu = $('#menu');
		var $titulo = $('#titulo');
		var $absoluta = $('#absoluta');
		var $ex = $('#extrapolacion');

		var build = function(data){
			$titulo.html(data.nombre);
			$absoluta.html('Mayoría absoluta: ' + data.mayoria + ' escaños');

			$ex.empty();

			$.each(data.grupos, function(i, d) {
				var $grupo = $('<tr></tr>');
				
				var $cabeceira = $('<th>').html(d.nombre).appendTo($grupo);

				var $bloque_actual = $('<td>').addClass('actual');

				for (var i = 0, len = d.actuales; i < len; i++) {
					$('<span>').addClass('diputado').css('background-color', d.color).appendTo($bloque_actual);
				}

				var $bloque_extrapolado = $('<td>').addClass('extrapolado');

				for (var i = 0, len = d.extrapolados; i < len; i++) {
					$('<span>').addClass('diputado').css('background-color', d.color).appendTo($bloque_extrapolado);
				}

				$bloque_actual.appendTo($grupo);
				$bloque_extrapolado.appendTo($grupo);

				if (d.actuales < 1) {
					$bloque_actual.prepend('<p class="actual">Sin representación</p>');
				} else {
					$bloque_actual.prepend('<p class="actual">Actuales: '+d.actuales+'</p>');
				}

				$bloque_extrapolado.prepend('<p class="extrapolado">Extrapolados: '+d.extrapolados+'</p>');


				$grupo.appendTo($ex);
			});


		};

		var proyecciones;
		selector.init($menu);


		$.getJSON('/json/proyecciones.json', function(data) {
			proyecciones = data;
			
			var datos = [];

			$.each(data, function(i, d) {
				datos.push({
					text: d.lugar + ': ' + d.nombre,
					value: i
				});
			});

			selector.replaceOptions($menu, datos);
			selector.seleccionar($menu, 0);
		});

		$menu.change(function () {
			var value = $(this).val() || 0;
			var proyeccion = proyecciones[value];

			if (proyeccion) {
				build(proyeccion);
			}
		});
	});
});
