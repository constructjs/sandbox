var app;

require.config( config );

function init( ) {

	var site = new Site();

}

var Site = function(){
	var self = this;

	construct({
		require: { paths : config.paths },
		router: "app/controllers/default"
	}, function( response ){ self.initialize( response) });
};


Site.prototype = {
	backend : function( response ){
		var self = this;
		// initialize the construct
		construct({ }, function( response ){ self.initialize( response ) });
	},

	initialize : function( router ){
		// save the app...
		window.app = router;
	}

}
