/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

dojo.require("dojo.widget.*");
dojo.require("dojo.widget.HtmlWidget");
dojo.require("dojo.widget.RichText");

dojo.provide("dojo.widget.TreeEditor");

dojo.widget.defineWidget(
	"dojo.widget.TreeEditor",
	dojo.widget.HtmlWidget,
{
		
	editLabelStart: function( node ) {
		this.editor_close();
		
		this.editor = dojo.widget.createWidget( "RichText", {}, node.labelNode ) ;
		dojo.event.connect( "around", this.editor, "onKeyDown", this, "editor_keyDownHandler" );
		dojo.event.connect( this.editor, "onBlur", this, "editor_close" );
		dojo.event.connect( "before", this.editor, "close", this, "editor_closeHandler" );
	},
	
	editor_keyDownHandler: function( invocation ) {
		var e = invocation.args[0];
		if((!e)&&(this.object)) {
			e = dojo.event.browser.fixEvent( this.editor.window.event );
		}
		
		switch( e.keyCode ) {
			case e.KEY_ESCAPE:
				this.editor.close(false);
				break;
			case e.KEY_ENTER:
				if( e.ctrlKey ) {
					this.editor.execCommand( "inserthtml", "<br/>" );
				}
				else {
					this.editor.close( true );
				}
				break;
			default:
				return invocation.proceed();
		}
	},
	
	editor_close: function() {
		if( this.editor ) {
			this.editor.close();
		}
	},
	
	editor_closeHandler: function() {
		dojo.event.disconnect( "around", this.editor, "onKeyDown", this, "editor_keyDownHandler" );
		dojo.event.disconnect( this.editor, "onBlur", this, "editor_close" );
		dojo.event.disconnect( "before", this.editor, "close", this, "editor_closeHandler" );
	}
});
