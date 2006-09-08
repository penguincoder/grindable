/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/


dojo.provide("dojo.widget.TreeLoadingControllerV3");

dojo.require("dojo.widget.TreeBasicControllerV3");
dojo.require("dojo.event.*");
dojo.require("dojo.json")
dojo.require("dojo.io.*");
dojo.require("dojo.Deferred");

dojo.widget.tags.addParseTreeHandler("dojo:TreeLoadingControllerV3");

dojo.Error = function(message, extra) {
	this.message = message;
	this.extra = extra;
	this.stack = (new Error()).stack;	
}

dojo.Error.prototype = new Error();

dojo.CommunicationError = function() {
	dojo.Error.apply(this, arguments);
	this.name="CommunicationError"
}
dojo.inherits(dojo.CommunicationError, dojo.Error);


dojo.LockedError = function() {
	dojo.Error.apply(this, arguments);
	this.name="LockedError"
}
dojo.inherits(dojo.LockedError, dojo.Error);

dojo.FormatError = function() {
	dojo.Error.apply(this, arguments);
	this.name="FormatError"
}
dojo.inherits(dojo.FormatError, dojo.Error);


dojo.RpcError = function() {
	dojo.Error.apply(this, arguments);
	this.name="RpcError"
}
dojo.inherits(dojo.RpcError, dojo.Error);



dojo.widget.TreeLoadingControllerV3 = function() {
	dojo.widget.TreeBasicControllerV3.call(this);
}

dojo.inherits(dojo.widget.TreeLoadingControllerV3, dojo.widget.TreeBasicControllerV3);

dojo.lang.extend(dojo.widget.TreeLoadingControllerV3, {
	widgetType: "TreeLoadingControllerV3",

	

	RpcUrl: "",

	RpcActionParam: "action", // used for GET for RpcUrl

	preventCache: true,

	getDeferredBindHandler: function(/* dojo.rpc.Deferred */ deferred){
		// summary
		// create callback that calls the Deferred's callback method
		return dojo.lang.hitch(this, 
			function(type, obj /*,...*/){
				for(var i=0;i<arguments.length;i++) {
					//dojo.debug("ARG "+i+" \n"+arguments[i]);
				}
				
				if (type=="load" ) {
				//dojo.debug("GO "+deferred);
					
					if(!dojo.lang.isUndefined(obj.error)){
						deferred.errback(new RpcError(obj.error, obj));
						return;
					}
	
					deferred.callback(obj);
					return;
				}
				
				var extra = {}				
				for(var i=1; i<arguments.length;i++) {
					dojo.lang.mixin(extra, arguments[i]);					
				}
				var result = new dojo.CommunicationError(arguments[1], extra);				
				
				
				deferred.errback(result);
				
			}
		);
		
	},

	getRpcUrl: function(action) {

		// RpcUrl=local meant SOLELY for DEMO and LOCAL TESTS.
		// May lead to widgetId collisions
		if (this.RpcUrl == "local") {
			var dir = document.location.href.substr(0, document.location.href.lastIndexOf('/'));
			var localUrl = dir+"/local/"+action;
			//dojo.debug(localUrl);
			return localUrl;	
		}

		if (!this.RpcUrl) {
			dojo.raise("Empty RpcUrl: can't load");
		}

		return this.RpcUrl + ( this.RpcUrl.indexOf("?") > -1 ? "&" : "?") + this.RpcActionParam+"="+action;
	},


	/**
	 * Add all loaded nodes from array obj as node children and expand it
	*/
	loadProcessResponse: function(node, result) {
		//dojo.debug("Process response "+node);
				
		if (!dojo.lang.isArray(result)) {
			throw new dojo.FormatError('loadProcessResponse: Not array loaded: '+result);
		}

		node.setChildren(result);
		
	},

	/**
	 * kw = { url, sync, params }
	 */
	runRpc: function(kw) {
		var _this = this;
		
		var deferred = new dojo.Deferred();
		
		dojo.io.bind({
			url: kw.url,			
			handle: this.getDeferredBindHandler(deferred),
			mimetype: "text/json",
			preventCache: this.preventCache,
			sync: kw.sync,
			content: { data: dojo.json.serialize(kw.params) }
		});
		
		return deferred;

	},



	/**
	 * Load children of the node from server
	 * Synchroneous loading doesn't break control flow
	 * I need sync mode for DnD
	*/
	loadRemote: function(node, sync){
		var _this = this;

		var params = {
			node: this.getInfo(node),
			tree: this.getInfo(node.tree)
		};

		
		var deferred = this.runRpc({
			url: this.getRpcUrl('getChildren'),
			sync: sync,
			params: params
		});
		
		deferred.addCallback(function(res) { return _this.loadProcessResponse(node,res) });
		
				
		
		return deferred;

	},

	batchExpandTimeout: 0,
/*
	expandToLevel: function(node, level, sync) {
		if (level == 0) return;

		var children = node.children;
		var _this = this;

		
		if (node.isTreeNode) {
			var deferred = this.expand(node, sync);
		} else {
			var deferred = new dojo.Deferred();
			deferred.callback();
		}
		
		deferred.addCallback(function() {
			for(var i=0; i<node.children.length; i++) {
				var child = node.children[i];
				
				_this.expandToLevel(child, level-1, sync);
			}
		}
		
		var handler = function(node, expandLevel) {
			this.node = node;
			this.expandLevel = expandLevel;
			// recursively expand opened node
			this.process = function() {
			};
		}

		var h = new handler(node, level-1);


		var deferred = this.expand(node);
		deferred.addCallback(function() { h.process() });

		return deferred;
	},*/
	
	expand: function(node, sync) {		
		// widget which children are data objects, is UNCHECKED, but has children and shouldn't be loaded
		// so I put children check here too
		
		var _this = this;
		
		var deferred = this.startProcessing(node);
		
		deferred.addCallback(function() {
			return _this.loadIfNeeded(node, sync);
		});
				
		deferred.addCallback(function(res) {
			//dojo.debug("Activated callback dojo.widget.TreeBasicControllerV3.prototype.expand(node); "+res);
			dojo.widget.TreeBasicControllerV3.prototype.expand(node);
			return res;
		});
		
		deferred.addBoth(function(res) {
			_this.finishProcessing(node);
			return res;
		});
		
		
		
		return deferred;
	},

	
	loadIfNeeded: function(node, sync) {
		if (node.state == node.loadStates.UNCHECKED && node.isFolder && !node.children.length) {
			// populate deferred with other things to pre-do
			deferred = this.loadRemote(node, sync);			
		} else {
			/* "fake action" here */
			deferred = new dojo.Deferred();
			deferred.callback();
		}
		
		return deferred;
	},
	
	
	runStages: function(check, prepare, make, finalize, expose, args) {
		var _this = this;
		
		if (check && !check.apply(this, args)) {
			return false;
		}
		
		var deferred = new dojo.Deferred();
		
		if (prepare) {
			deferred.addCallback(function() {
				return prepare.apply(_this, args);
			});
		}
		
		deferred.callback();
		
		
		//deferred.addCallback(function(res) { dojo.debug("Prepare fired "+res); return res});
		
		var _this = this;
		deferred.addCallback(function() {			
			return make.apply(_this, args);
		});
		
		//deferred.addCallback(function(res) { dojo.debug("Main fired "+res); return res});
		
		if (finalize) {
			deferred.addBoth(function(res) {
				finalize.apply(_this, args);
				return res;
			});
		}
			
				
		// exposer does not affect result
		if (expose) {
			deferred.addCallback(function(res) {
				expose.apply(_this, args);
				return res;
			});
		}
		
		return deferred;
	},
		
	startProcessing: function() {
		var deferred = new dojo.Deferred();
		
		for(var i=0;i<arguments.length;i++) {
			if (arguments[i].isLocked()) {
				deferred.errback(new dojo.LockedError("item locked "+arguments[i], arguments[i]));
				//dojo.debug("startProcessing errback "+arguments[i]);
				return deferred;
			}
			if (arguments[i].isTreeNode) {
				arguments[i].markProcessing();
			}
			arguments[i].lock();
		}
				
		//dojo.debug("startProcessing callback");
				
		deferred.callback();
		
		return deferred;
	},
	
	finishProcessing: function() {
		for(var i=0;i<arguments.length;i++) {
			if (!arguments[i].hasLock()) {
				// is not processed. probably we locked it and then met bad node in startProcessing
				continue; 
			}
			//dojo.debug("has lock");	
			arguments[i].unlock();
			if (arguments[i].isTreeNode) {
				arguments[i].unmarkProcessing();
			}
		}
	}
	
		
	
});


// ----------------- move -----------------
dojo.lang.extend(dojo.widget.TreeLoadingControllerV3, {
	
	prepareMove: function(child, newParent, index, sync) {
		var deferred = this.startProcessing(parent);
		deferred.addCallback(dojo.lang.hitch(this, function() {
			return this.loadIfNeeded(newParent, sync);
		}));
		return deferred;
	},
	
	finalizeMove: function(child, newParent) {
		this.finishProcessing(child, newParent);
	}
		
	
});

// -------------------- createChild ------------
dojo.lang.extend(dojo.widget.TreeLoadingControllerV3, {	
	

	prepareCreateChild: function(parent, index, data, sync) {
		var deferred = this.startProcessing(parent);
		deferred.addCallback(dojo.lang.hitch(this, function() {
			return this.loadIfNeeded(parent, sync);
		}));
		return deferred;
	},
	
	finalizeCreateChild: function(parent) {
		this.finishProcessing(parent);
	}

});

// ---------------- clone ---------------
dojo.lang.extend(dojo.widget.TreeLoadingControllerV3, {	
	
	prepareClone: function(child, newParent, index, deep, sync) {
		var deferred = this.startProcessing(child, newParent);
		deferred.addCallback(dojo.lang.hitch(this, function() {
			return this.loadIfNeeded(newParent, sync);
		}));		
		return deferred;	
	},	
	
	finalizeClone: function(child, newParent) {
		this.finishProcessing(child, newParent);
	}

});
