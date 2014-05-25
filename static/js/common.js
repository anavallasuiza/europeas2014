define([], function() {
	'use strict';

	var helpers = {
		percent: function(total, value) {
			return Math.floor((value * 100) / total);
		},
		getRandomColor: function(str) {
			for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));

			for (var i = 0, colour = "#"; i < 3; colour += ("00" + ((hash >> i++ * 8) & 0xFF).toString(16)).slice(-2));

			return colour;
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
