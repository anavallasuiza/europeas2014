define(['jquery', 'selectize'], function ($) {
	var selector = {
		init: function ($element) {
			$element.selectize({
			});
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
		}
	};

	return selector;
});