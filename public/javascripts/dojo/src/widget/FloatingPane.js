/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

dojo.provide("dojo.widget.FloatingPane");

//
// this widget provides a window-like floating pane
//

dojo.require("dojo.widget.*");
dojo.require("dojo.widget.Manager");
dojo.require("dojo.html.*");
dojo.require("dojo.html.layout");
dojo.require("dojo.html.shadow");
dojo.require("dojo.html.iframe");
dojo.require("dojo.html.selection");
dojo.require("dojo.widget.html.layout");
dojo.require("dojo.widget.ContentPane");
dojo.require("dojo.dnd.HtmlDragMove");
dojo.require("dojo.dnd.HtmlDragMoveSource");
dojo.require("dojo.dnd.HtmlDragMoveObject");
dojo.require("dojo.widget.ResizeHandle");

dojo.widget.defineWidget(
	"dojo.widget.FloatingPane",
	dojo.widget.ContentPane,
	{
		// Constructor arguments
		title: '',
		iconSrc: '',
		hasShadow: false,
		constrainToContainer: false,
		taskBarId: "",
		resizable: true,
		titleBarDisplay: "fancy",

		windowState: "normal",
		displayCloseAction: false,
		displayMinimizeAction: false,
		displayMaximizeAction: false,

		maxTaskBarConnectAttempts: 5,
		taskBarConnectAttempts: 0,

		templatePath: dojo.uri.dojoUri("src/widget/templates/HtmlFloatingPane.html"),
		templateCssPath: dojo.uri.dojoUri("src/widget/templates/HtmlFloatingPane.css"),

		drag: null,

		fillInTemplate: function(args, frag){
			// Copy style info from input node to output node
			var source = this.getFragNodeRef(frag);
			dojo.html.copyStyle(this.domNode, source);
	
			// necessary for safari, khtml (for computing width/height)
			dojo.body().appendChild(this.domNode);
	
			// if display:none then state=minimized, otherwise state=normal
			if(!this.isShowing()){
				this.windowState="minimized";
			}
	
			// <img src=""> can hang IE!  better get rid of it
			if(this.iconSrc==""){
				dojo.html.removeNode(this.titleBarIcon);
			}else{
				this.titleBarIcon.src = this.iconSrc.toString();// dojo.uri.Uri obj req. toString()
			}
	
			if(this.titleBarDisplay!="none"){	
				this.titleBar.style.display="";
				dojo.html.disableSelection(this.titleBar);
	
				this.titleBarIcon.style.display = (this.iconSrc=="" ? "none" : "");
	
				this.minimizeAction.style.display = (this.displayMinimizeAction ? "" : "none");
				this.maximizeAction.style.display= 
					(this.displayMaximizeAction && this.windowState!="maximized" ? "" : "none");
				this.restoreAction.style.display= 
					(this.displayMaximizeAction && this.windowState=="maximized" ? "" : "none");
				this.closeAction.style.display= (this.displayCloseAction ? "" : "none");
	
				this.drag = new dojo.dnd.HtmlDragMoveSource(this.domNode);	
				if (this.constrainToContainer) {
					this.drag.constrainTo();
				}
				this.drag.setDragHandle(this.titleBar);
	
				var self = this;
	
				dojo.event.topic.subscribe("dragMove",
					function (info){
						if (info.source.domNode == self.domNode){
							dojo.event.topic.publish('floatingPaneMove', { source: self } );
						}
					}
				);
			}
	
			if(this.resizable){
				this.resizeBar.style.display="";
				this.resizeHandle = dojo.widget.createWidget("ResizeHandle", {targetElmId: this.widgetId, id:this.widgetId+"_resize"});
				this.resizeBar.appendChild(this.resizeHandle.domNode);
			}
	
			// add a drop shadow
			if(this.hasShadow){
				this.shadow=new dojo.html.shadow(this.domNode);
			}
	
			// Prevent IE bleed-through problem
			this.bgIframe = new dojo.html.BackgroundIframe(this.domNode);
	
			if( this.taskBarId ){
				this.taskBarSetup();
			}
	
			if (dojo.hostenv.post_load_) {
				this.setInitialWindowState();
			} else {
				dojo.addOnLoad(this, "setInitialWindowState");
			}
	
			// counteract body.appendChild above
			dojo.body().removeChild(this.domNode);
	
			dojo.widget.FloatingPane.superclass.fillInTemplate.call(this, args, frag);
		},
	
		postCreate: function(){
			if(this.isShowing()){
				this.width=-1;	// force resize
				var mb = dojo.html.getMarginBox(this.domNode);
				this.resizeTo(mb.width, mb.height);
			}
		},
	
		maximizeWindow: function(evt) {
			var mb = dojo.html.getMarginBox(this.domNode);
			this.previous={
				width: mb.width || this.width,
				height: mb.height || this.height,
				left: this.domNode.style.left,
				top: this.domNode.style.top,
				bottom: this.domNode.style.bottom,
				right: this.domNode.style.right
			};
			if(this.domNode.parentNode.style.overflow.toLowerCase() != 'hidden'){
				this.parentPrevious={
					overflow: this.domNode.parentNode.style.overflow
				};
				dojo.debug(this.domNode.parentNode.style.overflow);
				this.domNode.parentNode.style.overflow = 'hidden';
			}

			this.domNode.style.left =
				dojo.html.getPixelValue(this.domNode.parentNode, "padding-left", true) + "px";
			this.domNode.style.top =
				dojo.html.getPixelValue(this.domNode.parentNode, "padding-top", true) + "px";

			if ((this.domNode.parentNode.nodeName.toLowerCase() == 'body')) {
				var viewport = dojo.html.getViewport();
				var padding = dojo.html.getPadding(dojo.body());
				this.resizeTo(viewport.width-padding.width, viewport.height-padding.height);
			} else {
				var content = dojo.html.getContentBox(this.domNode.parentNode);
				this.resizeTo(content.width, content.height);
			}
			this.maximizeAction.style.display="none";
			this.restoreAction.style.display="";

			//disable resize and drag
			if(this.resizeHandle){
				this.resizeHandle.domNode.style.display="none";
			}
			this.drag.setDragHandle(null);

			this.windowState="maximized";
		},
	
		minimizeWindow: function(evt) {
			this.hide();
			for(var attr in this.parentPrevious){
				this.domNode.parentNode.style[attr] = this.parentPrevious[attr];
			}
			this.lastWindowState = this.windowState;
			this.windowState = "minimized";
		},
	
		restoreWindow: function(evt) {
			if (this.windowState=="minimized") {
				this.show();
				if(this.lastWindowState == "maximized"){
					this.domNode.parentNode.style.overflow = 'hidden';
					this.windowState="maximized";
				}else{ //normal
					this.windowState="normal";
				}
			} else if (this.windowState=="maximized"){
				for(var attr in this.previous){
					this.domNode.style[attr] = this.previous[attr];
				}
				for(var attr in this.parentPrevious){
					this.domNode.parentNode.style[attr] = this.parentPrevious[attr];
				}
				this.resizeTo(this.previous.width, this.previous.height);
				this.previous=null;
				this.parentPrevious=null;

				this.restoreAction.style.display="none";
				this.maximizeAction.style.display=this.displayMaximizeAction ? "" : "none";

				if(this.resizeHandle){
					this.resizeHandle.domNode.style.display="";
				}
				this.drag.setDragHandle(this.titleBar);
				this.windowState="normal";
			} else { //normal
				// do nothing
			}
		},

		toggleDisplay: function(){
			if(this.windowState=="minimized"){
				this.restoreWindow();
			}else{
				this.minimizeWindow();
			}
		},

		closeWindow: function(evt) {
			dojo.html.removeNode(this.domNode);
			this.destroy();
		},
	
		onMouseDown: function(evt) {
			this.bringToTop();
		},
	
		bringToTop: function() {
			var floatingPanes= dojo.widget.manager.getWidgetsByType(this.widgetType);
			var windows = [];
			for (var x=0; x<floatingPanes.length; x++) {
				if (this.widgetId != floatingPanes[x].widgetId) {
						windows.push(floatingPanes[x]);
				}
			}
	
			windows.sort(function(a,b) {
				return a.domNode.style.zIndex - b.domNode.style.zIndex;
			});
			
			windows.push(this);
	
			var floatingPaneStartingZ = 100;
			for (x=0; x<windows.length;x++) {
				windows[x].domNode.style.zIndex = floatingPaneStartingZ + x;
			}
		},
	
		setInitialWindowState: function() {
			dojo.debug(" setInitialWindowState "+this.windowState);
			if (this.windowState == "maximized") {
				this.maximizeWindow();
				this.show();
				return;
			}
	
			if (this.windowState=="normal") {
				this.show();
				return;
			}
	
			if (this.windowState=="minimized") {
				this.hide();
				return;
			}
	
			this.windowState="minimized";
		},
	
		// add icon to task bar, connected to me
		taskBarSetup: function() {
			var taskbar = dojo.widget.getWidgetById(this.taskBarId);
			if (!taskbar){
				if (this.taskBarConnectAttempts <  this.maxTaskBarConnectAttempts) {
					dojo.lang.setTimeout(this, this.taskBarSetup, 50);
					this.taskBarConnectAttempts++;
				} else {
					dojo.debug("Unable to connect to the taskBar");
				}
				return;
			}
			taskbar.addChild(this);
		},
	
		show: function(){
			dojo.widget.FloatingPane.superclass.show.apply(this, arguments);
			this.bringToTop();
		},
	
		onShow: function(){
			dojo.widget.FloatingPane.superclass.onShow.call(this);
			var mb = dojo.html.getMarginBox(this.domNode);
			this.resizeTo(mb.width, mb.height);
		},
	
		// This is called when the user adjusts the size of the floating pane
		resizeTo: function(w, h){
			dojo.html.setMarginBox(this.domNode, { width: w, height: h });
	
			dojo.widget.html.layout(this.domNode,
				[
				  {domNode: this.titleBar, layoutAlign: "top"},
				  {domNode: this.resizeBar, layoutAlign: "bottom"},
				  {domNode: this.containerNode, layoutAlign: "client"}
				] );
	
			// If any of the children have layoutAlign specified, obey it
			dojo.widget.html.layout(this.containerNode, this.children, "top-bottom");
			
			this.bgIframe.onResized();
			if(this.shadow){ this.shadow.size(w, h); }
			this.onResized();
		},
	
		checkSize: function() {
			// checkSize() is called when the user has resized the browser window,
			// but that doesn't affect this widget (or this widget's children)
			// so it can be safely ignored...
			// TODO: unless we are maximized.  then we should resize ourself.
		}
	}
);
