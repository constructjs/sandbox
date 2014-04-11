
var config = {
	baseUrl: "/assets/js/",
	callback: function(){
		window.init();
	},
	"paths": {
		"jquery": [
			"//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min"
		],
		"json3": [
			"//cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min"
		],
		"underscore": [
			"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min"
		],
		"handlebars": [
			"//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0/handlebars.min"
		],
		"backbone": [
			"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"
		],
		"backbone": [
			"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"
		],
		"three-js": [
			"//cdnjs.cloudflare.com/ajax/libs/three.js/r61/three"
		],
		"backbone.session": [
			"/assets/js/libs/backbone.session"
		],
		// local construct deps
		"construct": [
			"/assets/js/libs/construct"
		],
		"construct.input": [
			"/assets/js/libs/construct.input"
		],
		"jquery.three": [
			"/assets/js/libs/jquery.three"
		],
		"backbone.app": [
			"/assets/js/libs/backbone.app"
		],
		"backbone.input.mouse": [
			"/assets/js/libs/backbone.input.mouse"
		],
		"backbone.input.keys": [
			"/assets/js/libs/backbone.input.keys"
		],
		"backbone.input.gamepad": [
			"/assets/js/libs/backbone.input.gamepad"
		],
	},
	"shim": {
		"construct.input": {
			"deps": [
				"construct",
				"underscore"
			]
		},
		"backbone": {
			"deps": [
				"underscore",
				"jquery"
			],
			"exports": "Backbone"
		},
		"underscore": {
			"exports": "_"
		},
		"three-js": {
			"exports": "THREE"
		},
		"helpers/underscore": {
			"deps": [
				"underscore"
			]
		},
		"helpers/handlebars": {
			"deps": [
				"handlebars"
			]
		},
		"helpers/construct": {
			"deps": [
				"construct",
				"construct.input"
			]
		}
	},
	"deps": [
		"jquery",
		"underscore",
		"backbone",
		"json3",
		"handlebars",
		"construct",
		"construct.input",
		"helpers/underscore",
		"helpers/handlebars",
		"helpers/construct"
	]
};


/*
<script type="text/javascript" src="<?=url('/assets/js/libs/jquery.three.js')?>" data-type="require" data-path="" data-deps="jquery,three-js"></script>
<script type="text/javascript" src="<?=url('/assets/js/libs/backbone.app.js')?>" data-type="require" data-path="" data-deps="backbone,underscore,jquery"></script>

<script type="text/javascript" src="<?=url('/assets/js/libs/backbone.input.mouse.js')?>" data-type="require" data-path="backbone.input.mouse" data-deps="backbone.app"></script>
<script type="text/javascript" src="<?=url('/assets/js/libs/backbone.input.keys.js')?>" data-type="require" data-path="backbone.input.keys" data-deps="backbone.app"></script>
<script type="text/javascript" src="<?=url('/assets/js/libs/backbone.input.gamepad.js')?>" data-type="require" data-path="backbone.input.gamepad" data-deps="backbone.app"></script>


<script type="text/javascript" src="<?=url('assets/js/libs/backbone.session.js')?>" data-type="minify/require" data-group="libs" data-deps="backbone.app"></script>
<script type="text/javascript" src="<?=url('assets/js/libs/backbone.api.facebook.js')?>" data-type="minify/require" data-group="libs" data-deps="backbone.app,facebook"></script>
<!-- script type="text/javascript" src="<?=url('assets/js/libs/jquery.three.js')?>" data-type="minify/require" data-path="jquery.three" data-group="libs" data-deps="jquery,three-js"></script -->
<script type="text/javascript" src="<?=url('assets/js/libs/construct.js')?>" data-type="minify/require" data-path="construct" data-group="libs" data-deps="backbone.app"></script>
<script type="text/javascript" src="<?=url('assets/js/libs/construct.input.js')?>" data-type="minify/require" data-path="construct.input" data-group="libs" data-deps="construct"></script>

<script type="text/javascript" src="<?=url('assets/js/helpers/underscore.js')?>" data-type="minify/require" data-group="helpers" data-deps="underscore"></script>
<script type="text/javascript" src="<?=url('assets/js/helpers/handlebars.js')?>" data-type="minify/require" data-group="helpers" data-deps="handlebars"></script>
<script type="text/javascript" src="<?=url('assets/js/helpers/construct.js')?>" data-type="minify/require" data-group="helpers" data-deps="construct,construct.input"></script>

<!-- script type="text/javascript" src="<?=url('assets/js/app/models.js')?>" data-type="minify/require" data-group="app" data-deps="backbone.app"></script>
<script type="text/javascript" src="<?=url('assets/js/app/views.js')?>" data-type="minify/require" data-group="app" data-deps="backbone.app"></script>
<script type="text/javascript" src="<?=url('assets/js/app/controllers.js')?>" data-type="minify/require" data-group="app" data-deps="backbone.app"></script -->
*/