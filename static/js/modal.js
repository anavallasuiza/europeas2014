define(['jquery', 'magnific-popup'], function ($) {
	var modal = {
		abrirHtml: function (html) {
			$.magnificPopup.open({
				items: {
					src: '<div class="white-popup">' + html + '</div>',
					type: 'inline'
				}
			});
		}
	};

	return modal;
});
