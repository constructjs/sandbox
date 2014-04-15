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
/*
		start: function(){

			// Here is the effect for the Oculus Rift
			// worldScale 100 means that 1 Units == 1m
			this.effect = new THREE.OculusRiftEffect( this.$3d.renderer, {worldScale: 1} );
			this.effect.setSize( window.innerWidth, window.innerHeight );

		},

		update: function( e ){
			// prerequisite
			if( !this.effect ) return;
			// Oculus Rift effect
			var scene = this.$3d.active.scene;
			var camera = this.$3d.active.camera;

			if( !scene || !camera ) return;

			this.effect.render( scene, camera );
		}
*/
	});

	return APP.Views.Main;

});
