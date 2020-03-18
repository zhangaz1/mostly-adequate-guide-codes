requirejs.config({
	paths: {
		ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
		jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
	}
});

require([
	'ramda',
	'jquery',
], function(_, $) {

	const tags = ['cat', 'cats', 'bird', 'birds'];

	/*-----------------------------------------------------------------------------
	 *  utils:
	 *---------------------------------------------------------------------------*/
	const trace = _.curry((tag, x) => {
		console.log(tag, x);
		return x;
	});

	const img = url => $('<img/>').attr('src', url);
	const btn = _.curry((handler, text) => $('<button/>').text(text).click(() => handler(text)));

	const Impure = {
		getJSON: _.curry((callback, url) => {
			$.getJSON(url, callback);
		}),

		setHtml: _.curry((sel, html) => {
			$(sel).html(html);
		}),
	};

	/*=============================================================================
	 *  Pure:
	 *===========================================================================*/

	const url = function(term) {
		return `https://api.flickr.com/services/feeds/photos_public.gne?tags=${term}&format=json&jsoncallback=?`;
	};

	const path = _.curry((pathArr, obj) => {
		return _.reduce((acc, key) => acc[key], obj, pathArr);
	});
	const mediaUrl = path(['media', 'm']);

	const mediaToImage = _.compose(img, mediaUrl);
	const images = _.compose(_.map(mediaToImage), _.prop('items'));


	/*#############################################################################
	 *  Main:
	 *###########################################################################*/
	const renderImages = _.compose(Impure.setHtml('#main'), images);
	const app = _.compose(Impure.getJSON(renderImages), url);

	const search = () => app($('#key').val());
	const bindSearch = () => $('#search').click(search);

	const bindTags = _.compose(Impure.setHtml('#tags'), _.map(btn(app)));

	const start = _.compose(bindSearch, bindTags);
	start(tags);

});