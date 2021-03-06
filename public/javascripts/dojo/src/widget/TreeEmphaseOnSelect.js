/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/


dojo.provide("dojo.widget.TreeEmphaseOnSelect");

dojo.require("dojo.widget.HtmlWidget");
dojo.require("dojo.widget.TreeSelectorV3");

// selector extension to emphase node


dojo.widget.tags.addParseTreeHandler("dojo:TreeEmphaseOnSelect");


dojo.widget.TreeEmphaseOnSelect = function() {
	dojo.widget.HtmlWidget.call(this);
	this.saveSelected = {}
}

dojo.inherits(dojo.widget.TreeEmphaseOnSelect, dojo.widget.HtmlWidget);


dojo.lang.extend(dojo.widget.TreeEmphaseOnSelect, {
	widgetType: "TreeEmphaseOnSelect",
	
	selector: "",
	
	initialize: function() {
		this.selector = dojo.widget.byId(this.selector);
		
		dojo.event.topic.subscribe(this.selector.eventNames.select, this, "onSelect");
		//dojo.event.topic.subscribe(this.selector.eventNames.listenNode, this, "onDeselect");
		//dojo.event.topic.subscribe(this.selector.eventNames.unlistenNode, this, "onDeselect");
		dojo.event.topic.subscribe(this.selector.eventNames.deselect, this, "onDeselect");	
	},

	
	onSelect: function(message) {
		var domNode = message.node.labelNode;
		
		dojo.html.clearSelection(domNode);
		

		dojo.html.addClass(domNode, message.node.tree.classPrefix+'NodeEmphased');
		//dojo.debug("after select "+dojo.html.getClass(message.node.labelNode))
		
	},
	
	onDeselect: function(message) {
		var domNode = message.node.labelNode;
		
		//dojo.debug(dojo.html.getClass(message.node.labelNode))		
		dojo.html.removeClass(domNode, message.node.tree.classPrefix+'NodeEmphased');
	}
	

});
