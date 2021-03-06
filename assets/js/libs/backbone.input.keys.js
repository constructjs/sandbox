/**
 * @name backbone.input.keys
 * Key event bindings for Backbone views
 *
 * Version: 0.4.0 (Sun, 06 Apr 2014 04:26:50 GMT)
 * Homepage: https://github.com/backbone-input/keys
 *
 * @author makesites
 * Created by: Makis Tracend (@tracend)
 *
 * @cc_on Copyright © Makesites.org
 * @license Dual-licensed: MIT license
 */

(function(w, _, Backbone, APP) {
	//"use strict";

	// Alias the libraries from the global object
	var oldDelegateEvents = Backbone.View.prototype.delegateEvents;
	var oldUndelegateEvents = Backbone.View.prototype.undelegateEvents;

	var isAPP = ( typeof APP !== "undefined" && typeof APP.View !== "undefined" );
	var View = ( isAPP ) ? APP.View : Backbone.View;



	// Map keyname to keycode
	var BackboneKeysMap = {
		backspace: 8,
		tab: 9,
		enter: 13,
		space: 32,

		// Temporal modifiers
		shift: 16,
		ctrl: 17,
		alt: 18,
		meta: 91,

		// Modal
		caps_lock: 20,
		esc: 27,
		num_lock: 144,

		// Navigation
		page_up: 33,
		page_down: 34,
		end: 35,
		home: 36,
		left: 37,
		up: 38,
		right: 39,
		down: 40,

		// Insert/delete
		insert: 45,
		'delete': 46,

		// Alphabet
		a: 65,
		b: 66,
		c: 67,
		d: 68,
		e: 69,
		f: 70,
		g: 71,
		h: 72,
		i: 73,
		j: 74,
		k: 75,
		l: 76,
		m: 77,
		n: 78,
		o: 79,
		p: 80,
		q: 81,
		r: 82,
		s: 83,
		t: 84,
		u: 85,
		v: 86,
		w: 87,
		x: 88,
		y: 89,
		z: 90,

		// Numbers
		0: 48,
		1: 49,
		2: 50,
		3: 51,
		4: 52,
		5: 53,
		6: 54,
		7: 55,
		8: 56,
		9: 57,

		// F keys
		f1: 112,
		f2: 113,
		f3: 114,
		f4: 115,
		f5: 116,
		f6: 117,
		f7: 118,
		f8: 119,
		f9: 120,
		f10: 121,
		f11: 122,
		f12: 123
	};

	// Aliased names to make sense on several platforms
	_.each({
		'options' : 'alt',
		'return': 'enter'
	}, function(real, alias) {
		BackboneKeysMap[alias] = BackboneKeysMap[real];
	});

// extend existing params
var params = View.prototype.params || new Backbone.Model();

// defaults
params.set({
	keys: {} // a list of all the keys pressed
});


	var Keys = View.extend({

		params: params,

		// Allow pr view what specific event to use
		// Keydown is defaulted as it allows for press-and-hold
		bindKeysOn : ['keydown', 'keyup'],

		// The Backbone-y way would be to have
		// keys scoped to `this.el` as default,
		// however it would be a bigger surprise
		// considering how you'd expect keyboard
		// events to work
		// But users should be able to choose themselves
		bindKeysScoped : false,

		// The actual element to bind events to
		bindTo : null,

		// Hash of bound listeners
		_keyEventBindings : null,

		// internal container for keys
		_keys: {},

		// Override delegate events
		delegateEvents : function() {
			oldDelegateEvents.apply(this, Array.prototype.slice.apply(arguments));
			this.delegateKeys();
			return this;
		},

		// Clears all callbacks previously bound to the view with `delegateEvents`.
		// You usually don't need to use this, but may wish to if you have multiple
		// Backbone views attached to the same DOM element.
		undelegateEvents: function() {
			this.undelegateKeys();
			oldUndelegateEvents.apply(this, arguments);
			return this;
		},

		// Actual delegate keys
		delegateKeys : function(keys) {
			var self = this;

			this.undelegateKeys();

			if (!this.bindTo) {
				this.bindTo = (this.bindKeysScoped || typeof $ === "undefined") ? this.$el : $(document);
			}
			_.each( this.bindKeysOn, function( bind ){
				self.bindTo.on(bind + '.delegateKeys' + self.cid, _.bind(self.triggerKey, self));
			});

			keys = keys || (this.keys);
			if (keys) {
				this._keys = parseKeys( keys );
				_.each(keys, function(method, key) {
					this.keyOn(key, method);
				}, this);
			}
			return this;
		},

		// Undelegate keys
		undelegateKeys : function() {
			var self = this;

			this._keyEventBindings = {};
			if (this.bindTo) {
				_.each( this.bindKeysOn, function( bind ){
					self.bindTo.off(bind + '.delegateKeys' + self.cid);
				});
			}
			return this;
		},

		// Utility to get the name of a key
		// based on its keyCode
		keyName : function(keyCode) {
			var keyName;
			for (keyName in BackboneKeysMap)
				if (BackboneKeysMap[keyName] === keyCode) return keyName;
			return String.fromCharCode(keyCode);
		},

		// Internal real listener for key events that
		// forwards any relevant key presses
		triggerKey : function(e) {
			var key;
			if (_.isObject(e)) key = e.which;
			else if (_.isString(e)) key = getKeyCode(e);
			else if (_.isNumber(e)) key = e;

			_(this._keyEventBindings[key]).each(function(listener) {
				var trigger = true;
				if (listener.modifiers) {
					trigger = _(listener.modifiers).all(function(modifier) {
						return e[modifier + 'Key'] === true;
					});
				}
				if (trigger) listener.method(e, listener.key);
			});
			return this;
		},

		// Doing the real work of binding key events
		keyOn : function(key, method) {
			key = key.split(' ');
			if (key.length > 1) {
				var l = key.length;
				while (l--)
					this.keyOn(key[l], method);
				return;
			}
			else key = key.pop().toLowerCase();

			// Subtract modifiers
			var components = key.split('+');
			key = components.shift();

			// add the key in the params
			var params = this.params.get("keys");
			params[key] = true;
			this.params.set({ keys: params });
			//
			var keyCode = getKeyCode(key);

			if (!this._keyEventBindings.hasOwnProperty(keyCode)) {
				this._keyEventBindings[keyCode] = [];
			}

			if (!_.isFunction(method)) method = this[method];

			this._keyEventBindings[keyCode].push({
				key : key,
				modifiers : (components || false),
				method: _.bind(method, this)
			});
			return this;
		},

		keyOff : function(key, method) {
			method = (method || false);
			if (key === null) {
				this._keyEventBindings = {};
				return this;
			}
			// remove the key from the params
			var params = this.params.get("keys");
			delete params[key];
			this.params.set({ keys: params });
			//
			var keyCode = getKeyCode(key);
			if (!_.isFunction(method)) method = this[method];
			if (!method) {
				this._keyEventBindings[keyCode] = [];
				return this;
			}
			this._keyEventBindings[keyCode] = _.filter(
				this._keyEventBindings[keyCode],
				function(data, index) {
					return data.method === method;
				}
			);
			return this;
		}
	});

	// Private helpers
	var getKeyCode = function(key) {
		return (key.length === 1) ?
			key.toUpperCase().charCodeAt(0) : BackboneKeysMap[key];
	};

	var parseKeys = function(keyset) {
		var data = {};
		_.each(keyset, function(method, keys) {
			// convert to lowercase
			keys = keys.toLowerCase();
			// convert to array
			keys = keys.split(' ');
			// save with method as the key
			data[method] = keys;
		}, this);

		return data;
	};


	// fallbacks
	if( _.isUndefined( Backbone.Input ) ) Backbone.Input = {};
	Backbone.Input.Keys = Keys;

	// Support module loaders
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose as module.exports in loaders that implement CommonJS module pattern.
		module.exports = Keys;
	} else {
		// Register as a named AMD module, used in Require.js
		if ( typeof define === "function" && define.amd ) {
			define( [], function () { return Keys; } );
		}
	}
	// If there is a window object, that at least has a document property
	if ( typeof window === "object" && typeof window.document === "object" ) {
		// update APP namespace
		if( isAPP ){
			APP.View = Keys;
			APP.Input = APP.Input || {};
			APP.Input.Keys = Backbone.Input.Keys;
			// save namespace
			window.APP = APP;
		} else {
			// update Backbone namespace
			Backbone.View = Keys;
		}
		// save Backbone namespace either way
		window.Backbone = Backbone;
	}


})(this.window, this._, this.Backbone, this.APP);
