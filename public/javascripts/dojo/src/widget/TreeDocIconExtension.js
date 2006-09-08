/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/


dojo.provide("dojo.widget.TreeDocIconExtension");

dojo.require("dojo.widget.HtmlWidget");
dojo.require("dojo.widget.TreeExtension");

// selector extension to emphase node


dojo.widget.tags.addParseTreeHandler("dojo:TreeDocIconExtension");


dojo.widget.TreeDocIconExtension = function() {
	dojo.widget.TreeExtension.call(this);	
}

dojo.inherits(dojo.widget.TreeDocIconExtension, dojo.widget.TreeExtension);

/**
 * can't unlisten
 */
dojo.lang.extend(dojo.widget.TreeDocIconExtension, {
	widgetType: "TreeDocIconExtension",
	
	templateCssPath: dojo.uri.dojoUri("src/widget/templates/TreeDocIcon.css"),

	templateString: '<div class="dojoTree"></div>',

	
	listenTreeEvents: ["afterChangeTree","afterSetFolder","afterUnsetFolder"],
	
	listenNodeFilter: function(elem) { return elem instanceof dojo.widget.Widget },
	
		
	setNodeTypeClass: function(node) {
		//dojo.debug("setNodeTypeClass in "+node+" type "+node.getNodeType());
		//dojo.debug(node.iconNode)
		
		var reg = new RegExp("(^|\\s)"+node.tree.classPrefix+"Icon\\w+",'g');			
		
		var clazz = dojo.html.getClass(node.iconNode).replace(reg,'') + ' ' + node.tree.classPrefix+'Icon'+node.getNodeType();
		dojo.html.setClass(node.iconNode, clazz);		
	},
		
		
	onAfterSetFolder: function(message) {
		//dojo.debug("FOLDER");
		if (message.source.iconNode) {
			// on node-initialize time when folder is set there is no iconNode
			// this case will be processed in treeChange anyway			
			this.setNodeTypeClass(message.source);
		}
	},
	
	
	onAfterUnsetFolder: function(message) {
		this.setNodeTypeClass(message.source);
	},
	
	
	listenNode: function(node) {
		/**
		 * add node with document type icon to node template and Tree.iconNodeTemplate
		 * it will be set to TreeNode.iconNode on node creation
		 * we do not assign document type yet, its node specific
		 */
		//dojo.debug("listenNode in "+node);
		node.iconNode = document.createElement("div");
		dojo.html.setClass(node.iconNode, node.tree.classPrefix+"Icon"+' '+node.tree.classPrefix+'Icon'+node.getNodeType());
		
		node.domNode.insertBefore(node.iconNode, node.contentNode);
		
		//dojo.html.insertAfter(node.iconNode, node.expandNode);
		
		//dojo.debug("listenNode out "+node);
		
	},
			
	
	onAfterChangeTree: function(message) {
		var _this = this;
		
		//dojo.debug(message.node)
		
		if (!message.oldTree || !this.listenedTrees[message.oldTree.widgetId]) {			
			// moving from old tree to our tree
			this.processDescendants(message.node,
				this.listenNodeFilter,
				this.listenNode
			);
		}
		
	}
	

});
