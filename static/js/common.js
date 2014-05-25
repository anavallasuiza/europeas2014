define(['jquery'], function($) {
	'use strict';

	var helpers = {
		percent: function(total, value) {
			return Math.floor((value * 100) / total);
		},
		getInfoPartido: function (id, nome, valorDefault) {
			var partido = helpers.info[id];

			if (partido) {
				return partido[nome] || valorDefault;
			}

			return valorDefault;
		},
		info: {}
	};

    $.getJSON( "/json/grupos.json", function( json ) {
            helpers.info = json;
    });

	return helpers;

});
