require(['../../static/js/config'], function () {

	require([
	'jquery'
	], function($) {


		var $menu = $('#menu');
		var $titulo = $('#titulo');
		var $absoluta = $('#absoluta');
		var $ex = $('#extrapolacion');

		var build = function(data){
			$titulo.html(data.nombre);
			$absoluta.html(data.mayoria);

			$ex.find('.grupo').remove();

			$.each(data.grupos, function(i, d) {
				var $grupo = $('<div>').addClass('grupo');
				
				$('<h2>').html(d.nombre).appendTo($grupo);

				var $bloque_actual = $('<div>').addClass('actual');

				for (var i = 0, len = d.actuales; i < len; i++) {
					$('<span>').addClass('diputado').appendTo($bloque_actual);
				}

				var $bloque_extrapolado = $('<div>').addClass('extrapolado');

				for (var i = 0, len = d.extrapolados; i < len; i++) {
					$('<span>').addClass('diputado').appendTo($bloque_extrapolado);
				}

				$bloque_actual.appendTo($grupo);
				$bloque_extrapolado.appendTo($grupo);

				$grupo.appendTo($ex);
			});


		}; 

		$.get('/json/proyecciones.json', function(data) {
			$.each(data, function(i, d) {

			var $nuevo_menu = $('<button>')
								.data(d)
								.on('click', function() {
									build($(this).data());
								})
								.html(d.lugar + ': ' + d.nombre);

			$('<li>').append($nuevo_menu).appendTo($menu);
			});
			
			build(data[0]);
		});

	});
});
