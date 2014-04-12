define([
	'backbone.app',
	'app/layers/boxes',
	'app/objects/player'
], function( APP, Boxes, Player ){

// variables
var controls, clock;
var loaded = false;

	// Routers
	APP.Views.Main = APP.Views.Main3D.extend({
		options: {
			url: "/assets/html/scene.html"
		},

		preRender: function(){

		},

		postRender: function(){
			//this.$3d.addScene().addCamera().addPlane({ id : "plane-name" }).addClass("blue");

			this.objects.set({
				player: new Player({
					el: $(this.el).find("player")
				})
			});

			this.layers.set({
				boxes: new Boxes( new APP.Collection( new Array(100) ), {
					el: $(this.el).find("objects")
				})
			});

		},

		start: function(){

		},

		update: function( e ){

		}

	});

	return APP.Views.Main;

});
