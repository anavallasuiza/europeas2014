require.config({
	baseUrl: '/static/js',
	paths: {
		'd3': '../libs/d3/d3.min',
		'jquery': '../libs/jquery/dist/jquery',
		'selectize': '../libs/selectize/dist/js/selectize',
		'sifter': '../libs/sifter/sifter',
		'microplugin': '../libs/microplugin/src/microplugin',
		'qtip': '../libs/qtip2/jquery.qtip.min',
		'helpers': 'common'
	}
});

require(['jquery'], function ($) {

	$('.button-escoller .button').on('click', function () {
		var $this = $(this);

		$this.parents('.button-escoller').find('.button-activo').removeClass('button-activo');
		$this.addClass('button-activo');
	});

	$('textarea.embed').on('click', function () {
		$(this).focus().select();
	});
});