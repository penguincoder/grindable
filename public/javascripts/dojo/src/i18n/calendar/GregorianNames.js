/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

dojo.provide("dojo.i18n.calendar.GregorianNames");

dojo.require("dojo.i18n.common");
dojo.requireLocalization("dojo.i18n.calendar", "gregorian");

dojo.i18n.calendar.GregorianNames.getNames = function(item, type, use, locale){
// item = 'months' || 'days'
// type = 'wide' || 'narrow' || 'abbr'
// use = 'standAlone' || 'format' (default)
// locale (optional)
// returns an array
	var label;
	var lookup = dojo.i18n.getLocalization("dojo.i18n.calendar", "gregorian", locale);
	var props = [item, use, type];
	if (use == 'standAlone') {
		label = lookup[props.join('-')];
	}
	props[1] = 'format';
	return label || lookup[props.join('-')];	
};
