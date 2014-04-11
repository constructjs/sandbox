define([
	'backbone.app'
], function( APP ){

	var Tree = APP.Meshes.Dynamic.extend({
		options: {
			url: "/assets/html/objects/box1m.html",
			//speed: { x: -0.01 }
		},

		preRender: function(){
			// set a random position
			/*
			var x = Math.random()* 160;
			var y = 30 - Math.random()* 60;
			var s = 1 + Math.random()*3;
			// set a random size/rotation
			var r = Math.random()*360;
			this.data.set({
				position: [x,y,0],
				scale: [s,s,s],
				rotation: [r,r,r]
			});
			*/
		},

		update: function( e ){
			// remove when the object is no longer visible
			if( this.object.position.x < -100){
				//
				this.remove();
			}
		}

	});

	return Tree;

});