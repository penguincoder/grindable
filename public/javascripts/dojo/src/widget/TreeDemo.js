/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/


dojo.provide("dojo.widget.TreeDemo");
dojo.require("dojo.Deferred");

dojo.widget.TreeDemo = {
	
	reportIfDefered: function(res) {
		if (res instanceof dojo.Deferred) {			
			res.addCallbacks(
				function(res) { dojo.debug("OK " + (res ? res: '')); },
				function(err) { dojo.debug("Error"); dojo.debugShallow(err); }
			);
		}		
	},
							 
	
	bindDemoMenu: function(controller) {
		var _t = this;
		
		dojo.event.topic.subscribe('treeContextMenuDestroy/engage',
			function (menuItem) { 
				var node = menuItem.getTreeNode();
				//if (confirm("Delete node with descendants: "+node.title.replace(/(<([^>]+)>)/ig," ") +" ?")) {
				_t.reportIfDefered(controller.destroy(node)); 
				
			}
		);


		dojo.event.topic.subscribe('treeContextMenuCreate/engage',
			function (menuItem) {
               _t.reportIfDefered(controller.createChild(menuItem.getTreeNode(), 0, {title:"New node"}));
            }
		);


		dojo.event.topic.subscribe('treeContextMenuUp/engage',
			function (menuItem) {
                var node = menuItem.getTreeNode();
                if (node.isFirstNode()) return;
                _t.reportIfDefered(controller.move(node, node.parent, node.getParentIndex()-1));
            }
		);


		dojo.event.topic.subscribe('treeContextMenuDown/engage',
			function (menuItem) {
                var node = menuItem.getTreeNode();
                if (node.isLastNode()) return;
                _t.reportIfDefered(controller.move(node, node.parent, node.getParentIndex()+1));
            }
		);

		//TODO: implement this
		dojo.event.topic.subscribe('treeContextMenuEdit/engage',
			function (menuItem) {
                var node = menuItem.getTreeNode();
                _t.reportIfDefered(controller.editLabelStart(node));
			}
		);

	}
	
	
	
}
