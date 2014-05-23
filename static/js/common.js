define([], function() {
	'use strict';

	var path = '/static/img/';

	var helpers = {
		percent: function(total, value) {
			return Math.floor((value * 100) / total);
		},
		logos: {
			'pp': {
				logo: path + 'pp.png',
				color: '#333333'
			},
			'psoe': {
				logo: path + 'psoe.png',
				color: '#666666'
			},
			'iu': {
				logo: path + 'iu.png',
				color: '#999999'
			},
			'upyd': {
				logo: path + 'upyd.png',
				color: '#999999'
			},
			'podemos': {
				logo: path + 'podemos.png',
				color: '#666888'
			},
			'nulos': {
				logo: path + 'nulos.png',
				color: '#CCCCCC'
			}
		}
	};

	return helpers;

});
