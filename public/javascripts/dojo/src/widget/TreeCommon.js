/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/


dojo.provide("dojo.widget.TreeCommon");
dojo.require("dojo.widget.*"); // for dojo.widget.manager

dojo.widget.TreeCommon = function() {	
}

dojo.lang.extend(dojo.widget.TreeCommon, {
	
	
	listenTreeEvents: [],
	listenedTrees: {},
	
	/**
	 * evaluates to false => skip unlistening nodes
	 * provided => use it
	 */	
	listenNodeFilter: null,
	
	listenTree: function(tree) {
		
		//dojo.debug("listenTree in "+this+" tree "+tree);
		
		var _this = this;
		
		if (this.listenedTrees[tree.widgetId]) {
			return; // already listening
		}
		
		dojo.lang.forEach(this.listenTreeEvents, function(event) {
			var eventHandler =  "on" + event.charAt(0).toUpperCase() + event.substr(1);
			//dojo.debug("subscribe "+tree.eventNames[event]+" "+eventHandler);
			dojo.event.topic.subscribe(tree.eventNames[event], _this, eventHandler);
		});
		
		
		var filter;
		
		if (this.listenNodeFilter) {			
			this.processDescendants(tree, this.listenNodeFilter, this.listenNode, true);
		}
		
		/**
		 * remember that I listen to this tree. No unbinding/binding/deselection
		 * needed when transfer between listened trees
		 */
		this.listenedTrees[tree.widgetId] = true;
		
	},			
	
	// interface functions
	listenNode: function() {},	
	unlistenNode: function() {},
			
	unlistenTree: function(tree, nodeFilter) {
		
		var _this = this;
	
		if (!this.listenedTrees[tree.widgetId]) {
			return; 
		}
		
		dojo.lang.forEach(this.listenTreeEvents, function(event) {
			var eventHandler =  "on" + event.charAt(0).toUpperCase() + event.substr(1);
			dojo.event.topic.unsubscribe(tree.eventNames[event], _this, eventHandler);
		});
		
		
		if (this.listenNodeFilter) {
			this.processDescendants(tree, this.listenNodeFilter, this.unlistenNode, true);
		}
		
		delete this.listenedTrees[tree.widgetId];
		
	},
	
	
	domElement2TreeNode: function(domElement) {
		while (domElement && !domElement.widgetId) {
			domElement = domElement.parentNode;
		}
		
		if (!domElement) {
			dojo.raise("domElement2TreeNode couldnt detect widget");
		}
		
		return dojo.widget.byId(domElement.widgetId);
	},
	
	/**
	 * it is here, not in Widget, because mostly tree needs it
	 */
	processDescendants: function(elem, filter, func, skipFirst) {
		
		var _this = this;
		
		if (!skipFirst) {
			if (!filter.call(_this,elem)) {
				return;
			}
			func.call(_this,elem);	        
		}
		
		
		var stack = [elem]
		while (elem = stack.pop()) {
			dojo.lang.forEach(elem.children, function(elem) {
				if (filter.call(_this, elem)) {		
					func.call(_this, elem);
					stack.push(elem);
				}
			});
		}
    }	
	
	
		
		
	
	
});