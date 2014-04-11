define([
	'backbone.app',
	'app/objects/box1m'
], function( APP, Model ){

	APP.Layers.Boxes = APP.Layer.extend({
		model: Model,
		refresh: function(){
			// preserve population
			if( this.objects.length < 100){
				this.add();
			}
		}
	});

	return APP.Layers.Boxes;
});