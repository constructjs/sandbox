define([
	'backbone.app',
	'jquery'
], function( APP, $ ){

	var Object = APP.Meshes.Player.extend({

		options: {
			url: "/assets/html/player.html",
			//speed: { x: -0.01 },
			//monitor: ["keys", "mouse", "gamepad"],
			monitor: ["motion"],
			controls: "fly"
		},

		preRender: function(){
			// set a random position
			var x = Math.random()* 10;
			var z = Math.random()* 10;
			//var s = 1 + Math.random()*3;
			// set a random size/rotation
			//var r = Math.random()*360;
			this.data.set({
				position: [x,1,z],
				//scale: [s,s,s],
				//rotation: [r,r,r]
			});

		}

	});

	return Object;

});