if (!Function.prototype.binder) {
	Function.prototype.binder = function(object) {
	  var toArray = function(args){
		  if (!args) return [];
		  if ('toArray' in Object(args)) return args.toArray();
		  var length = args.length || 0, results = new Array(length);
		  while (length--) results[length] = args[length];
		  return results;
	  };
	  
	  var __method = this, args = toArray(arguments), object = args.shift();
	  return function(event) {
	    return __method.apply(object, [event || window.event].concat(args));
	  };
	};
};			

var util = {};

util.Observer = function() {
	this._observer = [];
};
util.Observer.prototype = {
	dispatch: function(data) {
		this._observer.forEach(function(observer) {
			observer.func.call(observer.scope, data);
		});
	},
	add: function(func, scope) {
		var observers = this._observer;
		observers.push({ func: func, scope: scope });
	},
	remove: function(func, scope) {
		var observers = this._observer;
		for (var i = observers.length - 1; i >= 0; --i) {
			if (observers[i].func === func && observers[i].scope === scope) {
				observers.splice(i, 1);
				break;
			}
		}
	},
	removeAll: function(){
		this._observer = [];
	}
};

util.Jsonp = function(url, callback){
	this._url = url;
	this._callback = callback;
};
util.Jsonp.Seek = 0;
util.Jsonp.prototype = {
	_complete: false,
	load: function(){
		var script = this._script = document.createElement('script'), url
			head = document.head || 
				   document.getElementsByTagName( "head" )[0] ||
				   document.documentElement;
		
		util.Jsonp.Seek++;
		
		window['_Jsonp_' + util.Jsonp.Seek] = function(data){
			this._callback(data);
		}.binder(this);
		
		url = this._url + (this._url.indexOf('?') < 0 ? '?' : '&') + '=_Jsonp_' + util.Jsonp.Seek;

		script.src = url;
		script.async = true;	
		
		head.insertBefore(script, head.firstChild);
	}
};			