define([
	'backbone.app',
	'app/views/main',
	'app/views/menu'
], function( APP, Main, Menu ){

	// Routers
	APP.Layouts.Main = APP.Layout.extend({

		initialize: function( options ) {

			this.set({
				"main": new Main(),
				"menu": new Menu()
			})

			return APP.Layout.prototype.initialize.call(this, options);
		}

	});

	return APP.Layouts.Main;

});