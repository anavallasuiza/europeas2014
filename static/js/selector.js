define(['jquery', 'selectize'], function ($) {
	var selector = {
		init: function ($element, options) {
			options = options || {};

			$element.selectize(options);
		},
		ocultar: function ($element) {
			$element.next('.selectize-control').hide();
		},
		mostrar: function ($element) {
			$element.next('.selectize-control').show();
		},
		replaceOptions: function ($element, newData) {
			var selectize = $element[0].selectize;

			selectize.clearOptions();
			selectize.addOption(newData);
		},
		clearOptions: function ($element) {
			var selectize = $element[0].selectize;

			selectize.clearOptions();
		},
		loadOptions: function ($element, url) {
			$.getJSON(url, function (options) {
				selector.replaceOptions($element, options);
			});
		},
		seleccionar: function ($element, valor) {
			var selectize = $element[0].selectize;

			selectize.addItem(valor);
		}
	};

	return selector;
});