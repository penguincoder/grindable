/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(typeof dojo=="undefined"){
var dj_global=this;
function dj_undef(_1,_2){
if(_2==null){
_2=dojo.global();
}
return (typeof _2[_1]=="undefined");
}
if(dj_undef("djConfig",this)){
var djConfig={};
}
if(dj_undef("dojo",this)){
var dojo={};
}
dojo._currentContext=this;
if(!dj_undef("document",dojo._currentContext)){
dojo._currentDocument=this.document;
}
dojo.locale=djConfig.locale;
dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:Number("$Rev: 4898 $".match(/[0-9]+/)[0]),toString:function(){
with(dojo.version){
return major+"."+minor+"."+patch+flag+" ("+revision+")";
}
}};
dojo.evalProp=function(_3,_4,_5){
return (_4&&!dj_undef(_3,_4)?_4[_3]:(_5?(_4[_3]={}):undefined));
};
dojo.parseObjPath=function(_6,_7,_8){
var _9=(_7!=null?_7:dj_global);
var _a=_6.split(".");
var _b=_a.pop();
for(var i=0,l=_a.length;i<l&&_9;i++){
_9=dojo.evalProp(_a[i],_9,_8);
}
return {obj:_9,prop:_b};
};
dojo.evalObjPath=function(_d,_e){
if(typeof _d!="string"){
return dj_global;
}
if(_d.indexOf(".")==-1){
return dojo.evalProp(_d,dj_global,_e);
}
var _f=dojo.parseObjPath(_d,dj_global,_e);
if(_f){
return dojo.evalProp(_f.prop,_f.obj,_e);
}
return null;
};
dojo.global=function(){
return dojo._currentContext;
};
dojo.doc=function(){
return dojo._currentDocument;
};
dojo.body=function(){
return dojo.doc().body||dojo.doc().getElementsByTagName("body")[0];
};
dojo.withGlobal=function(_10,_11,_12){
var _13=dojo._currentDocument;
var _14=dojo._currentContext;
var _15;
try{
dojo._currentContext=_10;
dojo._currentDocument=_10.document;
if(_12){
_15=dojo.lang.curryArguments(_12,_11,arguments,3);
}else{
_15=_11();
}
}
catch(e){
dojo._currentContext=_14;
dojo._currentDocument=_13;
throw e;
}
dojo._currentContext=_14;
dojo._currentDocument=_13;
return _15;
};
dojo.withDoc=function(_16,_17,_18){
var _19=this._currentDocument;
var _1a;
try{
dojo._currentDocument=_16;
if(_18){
_1a=dojo.lang.curryArguments(_18,_17,arguments,3);
}else{
_1a=_17();
}
}
catch(e){
dojo._currentDocument=_19;
throw e;
}
dojo._currentDocument=_19;
return _1a;
};
dojo.errorToString=function(_1b){
if(!dj_undef("message",_1b)){
return _1b.message;
}else{
if(!dj_undef("description",_1b)){
return _1b.description;
}else{
return _1b;
}
}
};
dojo.raise=function(_1c,_1d){
if(_1d){
_1c=_1c+": "+dojo.errorToString(_1d);
}
try{
dojo.hostenv.println("FATAL: "+_1c);
}
catch(e){
}
throw Error(_1c);
};
dojo.debug=function(){
};
dojo.debugShallow=function(obj){
};
dojo.profile={start:function(){
},end:function(){
},stop:function(){
},dump:function(){
}};
function dj_eval(_1f){
return dj_global.eval?dj_global.eval(_1f):eval(_1f);
}
dojo.unimplemented=function(_20,_21){
var _22="'"+_20+"' not implemented";
if(_21!=null){
_22+=" "+_21;
}
dojo.raise(_22);
};
dojo.deprecated=function(_23,_24,_25){
var _26="DEPRECATED: "+_23;
if(_24){
_26+=" "+_24;
}
if(_25){
_26+=" -- will be removed in version: "+_25;
}
dojo.debug(_26);
};
dojo.inherits=function(_27,_28){
if(typeof _28!="function"){
dojo.raise("dojo.inherits: superclass argument ["+_28+"] must be a function (subclass: ["+_27+"']");
}
_27.prototype=new _28();
_27.prototype.constructor=_27;
_27.superclass=_28.prototype;
_27["super"]=_28.prototype;
};
dojo._mixin=function(obj,_2a){
var _2b={};
for(var x in _2a){
if(typeof _2b[x]=="undefined"||_2b[x]!=_2a[x]){
obj[x]=_2a[x];
}
}
if(dojo.render.html.ie&&dojo.lang.isFunction(_2a["toString"])&&_2a["toString"]!=obj["toString"]){
obj.toString=_2a.toString;
}
return obj;
};
dojo.mixin=function(obj,_2e){
for(var i=1,l=arguments.length;i<l;i++){
dojo._mixin(obj,arguments[i]);
}
return obj;
};
dojo.extend=function(_30,_31){
for(var i=1,l=arguments.length;i<l;i++){
dojo._mixin(_30.prototype,arguments[i]);
}
return _30;
};
dojo.render=(function(){
function vscaffold(_33,_34){
var tmp={capable:false,support:{builtin:false,plugin:false},prefixes:_33};
for(var i=0;i<_34.length;i++){
tmp[_34[i]]=false;
}
return tmp;
}
return {name:"",ver:dojo.version,os:{win:false,linux:false,osx:false},html:vscaffold(["html"],["ie","opera","khtml","safari","moz"]),svg:vscaffold(["svg"],["corel","adobe","batik"]),vml:vscaffold(["vml"],["ie"]),swf:vscaffold(["Swf","Flash","Mm"],["mm"]),swt:vscaffold(["Swt"],["ibm"])};
})();
dojo.hostenv=(function(){
var _37={isDebug:false,allowQueryConfig:false,baseScriptUri:"",baseRelativePath:"",libraryScriptUri:"",iePreventClobber:false,ieClobberMinimal:true,preventBackButtonFix:true,searchIds:[],parseWidgets:true};
if(typeof djConfig=="undefined"){
djConfig=_37;
}else{
for(var _38 in _37){
if(typeof djConfig[_38]=="undefined"){
djConfig[_38]=_37[_38];
}
}
}
return {name_:"(unset)",version_:"(unset)",getName:function(){
return this.name_;
},getVersion:function(){
return this.version_;
},getText:function(uri){
dojo.unimplemented("getText","uri="+uri);
}};
})();
dojo.hostenv.getBaseScriptUri=function(){
if(djConfig.baseScriptUri.length){
return djConfig.baseScriptUri;
}
var uri=new String(djConfig.libraryScriptUri||djConfig.baseRelativePath);
if(!uri){
dojo.raise("Nothing returned by getLibraryScriptUri(): "+uri);
}
var _3b=uri.lastIndexOf("/");
djConfig.baseScriptUri=djConfig.baseRelativePath;
return djConfig.baseScriptUri;
};
(function(){
var _3c={pkgFileName:"__package__",loading_modules_:{},loaded_modules_:{},addedToLoadingCount:[],removedFromLoadingCount:[],inFlightCount:0,modulePrefixes_:{dojo:{name:"dojo",value:"src"}},setModulePrefix:function(_3d,_3e){
this.modulePrefixes_[_3d]={name:_3d,value:_3e};
},getModulePrefix:function(_3f){
var mp=this.modulePrefixes_;
if((mp[_3f])&&(mp[_3f]["name"])){
return mp[_3f].value;
}
return _3f;
},getTextStack:[],loadUriStack:[],loadedUris:[],post_load_:false,modulesLoadedListeners:[],unloadListeners:[],loadNotifying:false};
for(var _41 in _3c){
dojo.hostenv[_41]=_3c[_41];
}
})();
dojo.hostenv.loadPath=function(_42,_43,cb){
var uri;
if((_42.charAt(0)=="/")||(_42.match(/^\w+:/))){
uri=_42;
}else{
uri=this.getBaseScriptUri()+_42;
}
if(djConfig.cacheBust&&dojo.render.html.capable){
uri+="?"+String(djConfig.cacheBust).replace(/\W+/g,"");
}
try{
return ((!_43)?this.loadUri(uri,cb):this.loadUriAndCheck(uri,_43,cb));
}
catch(e){
dojo.debug(e);
return false;
}
};
dojo.hostenv.loadUri=function(uri,cb){
if(this.loadedUris[uri]){
return 1;
}
var _48=this.getText(uri,null,true);
if(_48==null){
return 0;
}
this.loadedUris[uri]=true;
if(cb){
_48="("+_48+")";
}
var _49=dj_eval(_48);
if(cb){
cb(_49);
}
return 1;
};
dojo.hostenv.loadUriAndCheck=function(uri,_4b,cb){
var ok=true;
try{
ok=this.loadUri(uri,cb);
}
catch(e){
dojo.debug("failed loading ",uri," with error: ",e);
}
return ((ok)&&(this.findModule(_4b,false)))?true:false;
};
dojo.loaded=function(){
};
dojo.unloaded=function(){
};
dojo.hostenv.loaded=function(){
this.loadNotifying=true;
this.post_load_=true;
var mll=this.modulesLoadedListeners;
for(var x=0;x<mll.length;x++){
mll[x]();
}
this.modulesLoadedListeners=[];
this.loadNotifying=false;
dojo.loaded();
};
dojo.hostenv.unloaded=function(){
var mll=this.unloadListeners;
while(mll.length){
(mll.pop())();
}
dojo.unloaded();
};
dojo.addOnLoad=function(obj,_52){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.modulesLoadedListeners.push(obj);
}else{
if(arguments.length>1){
dh.modulesLoadedListeners.push(function(){
obj[_52]();
});
}
}
if(dh.post_load_&&dh.inFlightCount==0&&!dh.loadNotifying){
dh.callLoaded();
}
};
dojo.addOnUnload=function(obj,_55){
var dh=dojo.hostenv;
if(arguments.length==1){
dh.unloadListeners.push(obj);
}else{
if(arguments.length>1){
dh.unloadListeners.push(function(){
obj[_55]();
});
}
}
};
dojo.hostenv.modulesLoaded=function(){
if(this.post_load_){
return;
}
if((this.loadUriStack.length==0)&&(this.getTextStack.length==0)){
if(this.inFlightCount>0){
dojo.debug("files still in flight!");
return;
}
dojo.hostenv.callLoaded();
}
};
dojo.hostenv.callLoaded=function(){
if(typeof setTimeout=="object"){
setTimeout("dojo.hostenv.loaded();",0);
}else{
dojo.hostenv.loaded();
}
};
dojo.hostenv.getModuleSymbols=function(_57){
var _58=_57.split(".");
for(var i=_58.length-1;i>0;i--){
var _5a=_58.slice(0,i).join(".");
var _5b=this.getModulePrefix(_5a);
if(_5b!=_5a){
_58.splice(0,i,_5b);
break;
}
}
return _58;
};
dojo._namespaces={};
(function(){
var _5c={};
var _5d={};
dojo.getNamespace=function(_5e){
if(!dojo._namespaces[_5e]&&!_5d[_5e]){
var req=dojo.require;
var _60="dojo.namespaces."+_5e;
if(!_5c[_60]){
_5c[_60]=true;
req(_60,false,true);
_5c[_60]=false;
if(!dojo._namespaces[_5e]){
_5d[_5e]=true;
}
}
}
return dojo._namespaces[_5e];
};
})();
dojo.hostenv._global_omit_module_check=false;
dojo.hostenv.loadModule=function(_61,_62,_63){
if(!_61){
return;
}
_63=this._global_omit_module_check||_63;
var _64=this.findModule(_61,false);
if(_64){
return _64;
}
if(dj_undef(_61,this.loading_modules_)){
this.addedToLoadingCount.push(_61);
}
this.loading_modules_[_61]=1;
var _65=_61.replace(/\./g,"/")+".js";
var _66=_61.split(".");
if(djConfig.autoLoadNamespace){
dojo.getNamespace(_66[0]);
}
var _67=this.getModuleSymbols(_61);
var _68=((_67[0].charAt(0)!="/")&&(!_67[0].match(/^\w+:/)));
var _69=_67[_67.length-1];
if(_69=="*"){
_61=(_66.slice(0,-1)).join(".");
while(_67.length){
_67.pop();
_67.push(this.pkgFileName);
_65=_67.join("/")+".js";
if(_68&&(_65.charAt(0)=="/")){
_65=_65.slice(1);
}
ok=this.loadPath(_65,((!_63)?_61:null));
if(ok){
break;
}
_67.pop();
}
}else{
_65=_67.join("/")+".js";
_61=_66.join(".");
var ok=this.loadPath(_65,((!_63)?_61:null));
if((!ok)&&(!_62)){
_67.pop();
while(_67.length){
_65=_67.join("/")+".js";
ok=this.loadPath(_65,((!_63)?_61:null));
if(ok){
break;
}
_67.pop();
_65=_67.join("/")+"/"+this.pkgFileName+".js";
if(_68&&(_65.charAt(0)=="/")){
_65=_65.slice(1);
}
ok=this.loadPath(_65,((!_63)?_61:null));
if(ok){
break;
}
}
}
if((!ok)&&(!_63)){
dojo.raise("Could not load '"+_61+"'; last tried '"+_65+"'");
}
}
if(!_63&&!this["isXDomain"]){
_64=this.findModule(_61,false);
if(!_64){
dojo.raise("symbol '"+_61+"' is not defined after loading '"+_65+"'");
}
}
return _64;
};
dojo.hostenv.startPackage=function(_6b){
var _6c=dojo.evalObjPath((_6b.split(".").slice(0,-1)).join("."));
this.loaded_modules_[(new String(_6b)).toLowerCase()]=_6c;
var _6d=_6b.split(/\./);
if(_6d[_6d.length-1]=="*"){
_6d.pop();
}
return dojo.evalObjPath(_6d.join("."),true);
};
dojo.hostenv.findModule=function(_6e,_6f){
var lmn=(new String(_6e)).toLowerCase();
if(this.loaded_modules_[lmn]){
return this.loaded_modules_[lmn];
}
var _71=dojo.evalObjPath(_6e);
if((_6e)&&(typeof _71!="undefined")&&(_71)){
this.loaded_modules_[lmn]=_71;
return _71;
}
if(_6f){
dojo.raise("no loaded module named '"+_6e+"'");
}
return null;
};
dojo.kwCompoundRequire=function(_72){
var _73=_72["common"]||[];
var _74=(_72[dojo.hostenv.name_])?_73.concat(_72[dojo.hostenv.name_]||[]):_73.concat(_72["default"]||[]);
for(var x=0;x<_74.length;x++){
var _76=_74[x];
if(_76.constructor==Array){
dojo.hostenv.loadModule.apply(dojo.hostenv,_76);
}else{
dojo.hostenv.loadModule(_76);
}
}
};
dojo.require=function(){
dojo.hostenv.loadModule.apply(dojo.hostenv,arguments);
};
dojo.requireIf=function(){
if((arguments[0]===true)||(arguments[0]=="common")||(arguments[0]&&dojo.render[arguments[0]].capable)){
var _77=[];
for(var i=1;i<arguments.length;i++){
_77.push(arguments[i]);
}
dojo.require.apply(dojo,_77);
}
};
dojo.requireAfterIf=dojo.requireIf;
dojo.provide=function(){
return dojo.hostenv.startPackage.apply(dojo.hostenv,arguments);
};
dojo.setModulePrefix=function(_79,_7a){
return dojo.hostenv.setModulePrefix(_79,_7a);
};
dojo.exists=function(obj,_7c){
var p=_7c.split(".");
for(var i=0;i<p.length;i++){
if(!(obj[p[i]])){
return false;
}
obj=obj[p[i]];
}
return true;
};
}
if(typeof window=="undefined"){
dojo.raise("no window object");
}
(function(){
if(djConfig.allowQueryConfig){
var _7f=document.location.toString();
var _80=_7f.split("?",2);
if(_80.length>1){
var _81=_80[1];
var _82=_81.split("&");
for(var x in _82){
var sp=_82[x].split("=");
if((sp[0].length>9)&&(sp[0].substr(0,9)=="djConfig.")){
var opt=sp[0].substr(9);
try{
djConfig[opt]=eval(sp[1]);
}
catch(e){
djConfig[opt]=sp[1];
}
}
}
}
}
if(((djConfig["baseScriptUri"]=="")||(djConfig["baseRelativePath"]==""))&&(document&&document.getElementsByTagName)){
var _86=document.getElementsByTagName("script");
var _87=/(__package__|dojo|bootstrap1)\.js([\?\.]|$)/i;
for(var i=0;i<_86.length;i++){
var src=_86[i].getAttribute("src");
if(!src){
continue;
}
var m=src.match(_87);
if(m){
var _8b=src.substring(0,m.index);
if(src.indexOf("bootstrap1")>-1){
_8b+="../";
}
if(!this["djConfig"]){
djConfig={};
}
if(djConfig["baseScriptUri"]==""){
djConfig["baseScriptUri"]=_8b;
}
if(djConfig["baseRelativePath"]==""){
djConfig["baseRelativePath"]=_8b;
}
break;
}
}
}
var dr=dojo.render;
var drh=dojo.render.html;
var drs=dojo.render.svg;
var dua=(drh.UA=navigator.userAgent);
var dav=(drh.AV=navigator.appVersion);
var t=true;
var f=false;
drh.capable=t;
drh.support.builtin=t;
dr.ver=parseFloat(drh.AV);
dr.os.mac=dav.indexOf("Macintosh")>=0;
dr.os.win=dav.indexOf("Windows")>=0;
dr.os.linux=dav.indexOf("X11")>=0;
drh.opera=dua.indexOf("Opera")>=0;
drh.khtml=(dav.indexOf("Konqueror")>=0)||(dav.indexOf("Safari")>=0);
drh.safari=dav.indexOf("Safari")>=0;
var _93=dua.indexOf("Gecko");
drh.mozilla=drh.moz=(_93>=0)&&(!drh.khtml);
if(drh.mozilla){
drh.geckoVersion=dua.substring(_93+6,_93+14);
}
drh.ie=(document.all)&&(!drh.opera);
drh.ie50=drh.ie&&dav.indexOf("MSIE 5.0")>=0;
drh.ie55=drh.ie&&dav.indexOf("MSIE 5.5")>=0;
drh.ie60=drh.ie&&dav.indexOf("MSIE 6.0")>=0;
drh.ie70=drh.ie&&dav.indexOf("MSIE 7.0")>=0;
dojo.locale=dojo.locale||(drh.ie?navigator.userLanguage:navigator.language).toLowerCase();
dr.vml.capable=drh.ie;
drs.capable=f;
drs.support.plugin=f;
drs.support.builtin=f;
var _94=window["document"];
var tdi=_94["implementation"];
if((tdi)&&(tdi["hasFeature"])&&(tdi.hasFeature("org.w3c.dom.svg","1.0"))){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
if(drh.safari){
var tmp=dua.split("AppleWebKit/")[1];
var ver=parseFloat(tmp.split(" ")[0]);
if(ver>=420){
drs.capable=t;
drs.support.builtin=t;
drs.support.plugin=f;
}
}
})();
dojo.hostenv.startPackage("dojo.hostenv");
dojo.render.name=dojo.hostenv.name_="browser";
dojo.hostenv.searchIds=[];
dojo.hostenv._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];
dojo.hostenv.getXmlhttpObject=function(){
var _98=null;
var _99=null;
try{
_98=new XMLHttpRequest();
}
catch(e){
}
if(!_98){
for(var i=0;i<3;++i){
var _9b=dojo.hostenv._XMLHTTP_PROGIDS[i];
try{
_98=new ActiveXObject(_9b);
}
catch(e){
_99=e;
}
if(_98){
dojo.hostenv._XMLHTTP_PROGIDS=[_9b];
break;
}
}
}
if(!_98){
return dojo.raise("XMLHTTP not available",_99);
}
return _98;
};
dojo.hostenv._blockAsync=false;
dojo.hostenv.getText=function(uri,_9d,_9e){
if(!_9d){
this._blockAsync=true;
}
var _9f=this.getXmlhttpObject();
function isDocumentOk(_a0){
var _a1=_a0["status"];
return Boolean((!_a1)||((200<=_a1)&&(300>_a1))||(_a1==304));
}
if(_9d){
var _a2=this,timer=null,gbl=dojo.global();
var xhr=dojo.evalObjPath("dojo.io.XMLHTTPTransport");
_9f.onreadystatechange=function(){
if(timer){
gbl.clearTimeout(timer);
timer=null;
}
if(_a2._blockAsync||(xhr&&xhr._blockAsync)){
timer=gbl.setTimeout(function(){
_9f.onreadystatechange.apply(this);
},10);
}else{
if(4==_9f.readyState){
if(isDocumentOk(_9f)){
_9d(_9f.responseText);
}
}
}
};
}
_9f.open("GET",uri,_9d?true:false);
try{
_9f.send(null);
if(_9d){
return null;
}
if(!isDocumentOk(_9f)){
var err=Error("Unable to load "+uri+" status:"+_9f.status);
err.status=_9f.status;
err.responseText=_9f.responseText;
throw err;
}
}
catch(e){
this._blockAsync=false;
if((_9e)&&(!_9d)){
return null;
}else{
throw e;
}
}
this._blockAsync=false;
return _9f.responseText;
};
dojo.hostenv.defaultDebugContainerId="dojoDebug";
dojo.hostenv._println_buffer=[];
dojo.hostenv._println_safe=false;
dojo.hostenv.println=function(_a5){
if(!dojo.hostenv._println_safe){
dojo.hostenv._println_buffer.push(_a5);
}else{
try{
var _a6=document.getElementById(djConfig.debugContainerId?djConfig.debugContainerId:dojo.hostenv.defaultDebugContainerId);
if(!_a6){
_a6=dojo.body();
}
var div=document.createElement("div");
div.appendChild(document.createTextNode(_a5));
_a6.appendChild(div);
}
catch(e){
try{
document.write("<div>"+_a5+"</div>");
}
catch(e2){
window.status=_a5;
}
}
}
};
dojo.addOnLoad(function(){
dojo.hostenv._println_safe=true;
while(dojo.hostenv._println_buffer.length>0){
dojo.hostenv.println(dojo.hostenv._println_buffer.shift());
}
});
function dj_addNodeEvtHdlr(_a8,_a9,fp,_ab){
var _ac=_a8["on"+_a9]||function(){
};
_a8["on"+_a9]=function(){
fp.apply(_a8,arguments);
_ac.apply(_a8,arguments);
};
return true;
}
dj_addNodeEvtHdlr(window,"load",function(){
if(arguments.callee.initialized){
return;
}
arguments.callee.initialized=true;
var _ad=function(){
if(dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
};
if(dojo.hostenv.inFlightCount==0){
_ad();
dojo.hostenv.modulesLoaded();
}else{
dojo.addOnLoad(_ad);
}
});
dj_addNodeEvtHdlr(window,"unload",function(){
dojo.hostenv.unloaded();
});
dojo.hostenv.makeWidgets=function(){
var _ae=[];
if(djConfig.searchIds&&djConfig.searchIds.length>0){
_ae=_ae.concat(djConfig.searchIds);
}
if(dojo.hostenv.searchIds&&dojo.hostenv.searchIds.length>0){
_ae=_ae.concat(dojo.hostenv.searchIds);
}
if((djConfig.parseWidgets)||(_ae.length>0)){
if(dojo.evalObjPath("dojo.widget.Parse")){
var _af=new dojo.xml.Parse();
if(_ae.length>0){
for(var x=0;x<_ae.length;x++){
var _b1=document.getElementById(_ae[x]);
if(!_b1){
continue;
}
var _b2=_af.parseElement(_b1,null,true);
dojo.widget.getParser().createComponents(_b2);
}
}else{
if(djConfig.parseWidgets){
var _b2=_af.parseElement(dojo.body(),null,true);
dojo.widget.getParser().createComponents(_b2);
}
}
}
}
};
dojo.addOnLoad(function(){
if(!dojo.render.html.ie){
dojo.hostenv.makeWidgets();
}
});
try{
if(dojo.render.html.ie){
document.namespaces.add("v","urn:schemas-microsoft-com:vml");
document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML)");
}
}
catch(e){
}
dojo.hostenv.writeIncludes=function(){
};
dojo.byId=function(id,doc){
if(id&&(typeof id=="string"||id instanceof String)){
if(!doc){
doc=dojo.doc();
}
return doc.getElementById(id);
}
return id;
};
(function(){
if(typeof dj_usingBootstrap!="undefined"){
return;
}
var _b5=false;
var _b6=false;
var _b7=false;
if((typeof this["load"]=="function")&&((typeof this["Packages"]=="function")||(typeof this["Packages"]=="object"))){
_b5=true;
}else{
if(typeof this["load"]=="function"){
_b6=true;
}else{
if(window.widget){
_b7=true;
}
}
}
var _b8=[];
if((this["djConfig"])&&((djConfig["isDebug"])||(djConfig["debugAtAllCosts"]))){
_b8.push("debug.js");
}
if((this["djConfig"])&&(djConfig["debugAtAllCosts"])&&(!_b5)&&(!_b7)){
_b8.push("browser_debug.js");
}
if((this["djConfig"])&&(djConfig["compat"])){
_b8.push("compat/"+djConfig["compat"]+".js");
}
var _b9=djConfig["baseScriptUri"];
if((this["djConfig"])&&(djConfig["baseLoaderUri"])){
_b9=djConfig["baseLoaderUri"];
}
for(var x=0;x<_b8.length;x++){
var _bb=_b9+"src/"+_b8[x];
if(_b5||_b6){
load(_bb);
}else{
try{
document.write("<scr"+"ipt type='text/javascript' src='"+_bb+"'></scr"+"ipt>");
}
catch(e){
var _bc=document.createElement("script");
_bc.src=_bb;
document.getElementsByTagName("head")[0].appendChild(_bc);
}
}
}
})();
dojo.normalizeLocale=function(_bd){
return _bd?_bd.toLowerCase():dojo.locale;
};
dojo.searchLocalePath=function(_be,_bf,_c0){
_be=dojo.normalizeLocale(_be);
var _c1=_be.split("-");
var _c2=[];
for(var i=_c1.length;i>0;i--){
_c2.push(_c1.slice(0,i).join("-"));
}
_c2.push(false);
if(_bf){
_c2.reverse();
}
for(var j=_c2.length-1;j>=0;j--){
var loc=_c2[j]||"ROOT";
var _c6=_c0(loc);
if(_c6){
break;
}
}
};
dojo.requireLocalization=function(_c7,_c8,_c9){
var _ca=[_c7,"_nls",_c8].join(".");
var _cb=dojo.hostenv.startPackage(_ca);
dojo.hostenv.loaded_modules_[_ca]=_cb;
if(!dj_undef("dj_localesBuilt",dj_global)&&dojo.hostenv.loaded_modules_[_ca]){
_c9=dojo.normalizeLocale(_c9);
for(var i=0;i<dj_localesBuilt.length;i++){
if(dj_localesBuilt[i]==_c9){
return;
}
}
}
var _cd=dojo.hostenv.getModuleSymbols(_c7);
var _ce=_cd.concat("nls").join("/");
var _cf=false;
dojo.searchLocalePath(_c9,false,function(loc){
var pkg=_ca+"."+loc;
var _d2=false;
if(!dojo.hostenv.findModule(pkg)){
dojo.hostenv.loaded_modules_[pkg]=null;
var _d3=[_ce];
if(loc!="ROOT"){
_d3.push(loc);
}
_d3.push(_c8);
var _d4=_d3.join("/")+".js";
_d2=dojo.hostenv.loadPath(_d4,null,function(_d5){
var _d6=function(){
};
_d6.prototype=_cf;
_cb[loc]=new _d6();
for(var j in _d5){
_cb[loc][j]=_d5[j];
}
});
}else{
_d2=true;
}
if(_d2&&_cb[loc]){
_cf=_cb[loc];
}
});
};
(function(){
function preload(_d8){
if(!dj_undef("dj_localesGenerated",dj_global)){
dojo.setModulePrefix("nls","nls");
_d8=dojo.normalizeLocale(_d8);
dojo.searchLocalePath(_d8,true,function(loc){
for(var i=0;i<dj_localesGenerated.length;i++){
if(dj_localesGenerated[i]==loc){
dojo.require("nls.dojo_"+loc);
return true;
}
}
return false;
});
}
}
preload(dojo.locale);
var _db=djConfig.extraLocale;
if(_db){
if(!_db instanceof Array){
_db=[_db];
}
for(var i=0;i<_db.length;i++){
preload(_db[i]);
}
var req=dojo.requireLocalization;
dojo.requireLocalization=function(m,b,_e0){
req(m,b,_e0);
if(_e0){
return;
}
for(var i=0;i<_db.length;i++){
req(m,b,_db[i]);
}
};
}
})();
dojo.provide("dojo.string.common");
dojo.string.trim=function(str,wh){
if(!str.replace){
return str;
}
if(!str.length){
return str;
}
var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
return str.replace(re,"");
};
dojo.string.trimStart=function(str){
return dojo.string.trim(str,1);
};
dojo.string.trimEnd=function(str){
return dojo.string.trim(str,-1);
};
dojo.string.repeat=function(str,_e8,_e9){
var out="";
for(var i=0;i<_e8;i++){
out+=str;
if(_e9&&i<_e8-1){
out+=_e9;
}
}
return out;
};
dojo.string.pad=function(str,len,c,dir){
var out=String(str);
if(!c){
c="0";
}
if(!dir){
dir=1;
}
while(out.length<len){
if(dir>0){
out=c+out;
}else{
out+=c;
}
}
return out;
};
dojo.string.padLeft=function(str,len,c){
return dojo.string.pad(str,len,c,1);
};
dojo.string.padRight=function(str,len,c){
return dojo.string.pad(str,len,c,-1);
};
dojo.provide("dojo.string");
dojo.provide("dojo.lang.common");
dojo.lang._mixin=dojo._mixin;
dojo.lang.mixin=dojo.mixin;
dojo.lang.extend=dojo.extend;
dojo.lang.find=function(_f7,_f8,_f9,_fa){
if(!dojo.lang.isArrayLike(_f7)&&dojo.lang.isArrayLike(_f8)){
dojo.deprecated("dojo.lang.find(value, array)","use dojo.lang.find(array, value) instead","0.5");
var _fb=_f7;
_f7=_f8;
_f8=_fb;
}
var _fc=dojo.lang.isString(_f7);
if(_fc){
_f7=_f7.split("");
}
if(_fa){
var _fd=-1;
var i=_f7.length-1;
var end=-1;
}else{
var _fd=1;
var i=0;
var end=_f7.length;
}
if(_f9){
while(i!=end){
if(_f7[i]===_f8){
return i;
}
i+=_fd;
}
}else{
while(i!=end){
if(_f7[i]==_f8){
return i;
}
i+=_fd;
}
}
return -1;
};
dojo.lang.indexOf=dojo.lang.find;
dojo.lang.findLast=function(_100,_101,_102){
return dojo.lang.find(_100,_101,_102,true);
};
dojo.lang.lastIndexOf=dojo.lang.findLast;
dojo.lang.inArray=function(_103,_104){
return dojo.lang.find(_103,_104)>-1;
};
dojo.lang.isObject=function(it){
if(typeof it=="undefined"){
return false;
}
return (typeof it=="object"||it===null||dojo.lang.isArray(it)||dojo.lang.isFunction(it));
};
dojo.lang.isArray=function(it){
return (it instanceof Array||typeof it=="array");
};
dojo.lang.isArrayLike=function(it){
if((!it)||(dojo.lang.isUndefined(it))){
return false;
}
if(dojo.lang.isString(it)){
return false;
}
if(dojo.lang.isFunction(it)){
return false;
}
if(dojo.lang.isArray(it)){
return true;
}
if((it.tagName)&&(it.tagName.toLowerCase()=="form")){
return false;
}
if(dojo.lang.isNumber(it.length)&&isFinite(it.length)){
return true;
}
return false;
};
dojo.lang.isFunction=function(it){
if(!it){
return false;
}
return (it instanceof Function||typeof it=="function");
};
dojo.lang.isString=function(it){
return (it instanceof String||typeof it=="string");
};
dojo.lang.isAlien=function(it){
if(!it){
return false;
}
return !dojo.lang.isFunction()&&/\{\s*\[native code\]\s*\}/.test(String(it));
};
dojo.lang.isBoolean=function(it){
return (it instanceof Boolean||typeof it=="boolean");
};
dojo.lang.isNumber=function(it){
return (it instanceof Number||typeof it=="number");
};
dojo.lang.isUndefined=function(it){
return ((it==undefined)&&(typeof it=="undefined"));
};
dojo.provide("dojo.lang.extras");
dojo.lang.setTimeout=function(func,_10f){
var _110=window,argsStart=2;
if(!dojo.lang.isFunction(func)){
_110=func;
func=_10f;
_10f=arguments[2];
argsStart++;
}
if(dojo.lang.isString(func)){
func=_110[func];
}
var args=[];
for(var i=argsStart;i<arguments.length;i++){
args.push(arguments[i]);
}
return dojo.global().setTimeout(function(){
func.apply(_110,args);
},_10f);
};
dojo.lang.clearTimeout=function(_113){
dojo.global().clearTimeout(_113);
};
dojo.lang.getNameInObj=function(ns,item){
if(!ns){
ns=dj_global;
}
for(var x in ns){
if(ns[x]===item){
return new String(x);
}
}
return null;
};
dojo.lang.shallowCopy=function(obj,deep){
var i,ret;
if(obj===null){
return null;
}
if(dojo.lang.isObject(obj)){
ret=new obj.constructor();
for(i in obj){
if(dojo.lang.isUndefined(ret[i])){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}
}else{
if(dojo.lang.isArray(obj)){
ret=[];
for(i=0;i<obj.length;i++){
ret[i]=deep?dojo.lang.shallowCopy(obj[i],deep):obj[i];
}
}else{
ret=obj;
}
}
return ret;
};
dojo.lang.firstValued=function(){
for(var i=0;i<arguments.length;i++){
if(typeof arguments[i]!="undefined"){
return arguments[i];
}
}
return undefined;
};
dojo.lang.getObjPathValue=function(_11b,_11c,_11d){
with(dojo.parseObjPath(_11b,_11c,_11d)){
return dojo.evalProp(prop,obj,_11d);
}
};
dojo.lang.setObjPathValue=function(_11e,_11f,_120,_121){
if(arguments.length<4){
_121=true;
}
with(dojo.parseObjPath(_11e,_120,_121)){
if(obj&&(_121||(prop in obj))){
obj[prop]=_11f;
}
}
};
dojo.provide("dojo.io.IO");
dojo.io.transports=[];
dojo.io.hdlrFuncNames=["load","error","timeout"];
dojo.io.Request=function(url,_123,_124,_125){
if((arguments.length==1)&&(arguments[0].constructor==Object)){
this.fromKwArgs(arguments[0]);
}else{
this.url=url;
if(_123){
this.mimetype=_123;
}
if(_124){
this.transport=_124;
}
if(arguments.length>=4){
this.changeUrl=_125;
}
}
};
dojo.lang.extend(dojo.io.Request,{url:"",mimetype:"text/plain",method:"GET",content:undefined,transport:undefined,changeUrl:undefined,formNode:undefined,sync:false,bindSuccess:false,useCache:false,preventCache:false,load:function(type,data,evt){
},error:function(type,_12a){
},timeout:function(type){
},handle:function(){
},timeoutSeconds:0,abort:function(){
},fromKwArgs:function(_12c){
if(_12c["url"]){
_12c.url=_12c.url.toString();
}
if(_12c["formNode"]){
_12c.formNode=dojo.byId(_12c.formNode);
}
if(!_12c["method"]&&_12c["formNode"]&&_12c["formNode"].method){
_12c.method=_12c["formNode"].method;
}
if(!_12c["handle"]&&_12c["handler"]){
_12c.handle=_12c.handler;
}
if(!_12c["load"]&&_12c["loaded"]){
_12c.load=_12c.loaded;
}
if(!_12c["changeUrl"]&&_12c["changeURL"]){
_12c.changeUrl=_12c.changeURL;
}
_12c.encoding=dojo.lang.firstValued(_12c["encoding"],djConfig["bindEncoding"],"");
_12c.sendTransport=dojo.lang.firstValued(_12c["sendTransport"],djConfig["ioSendTransport"],false);
var _12d=dojo.lang.isFunction;
for(var x=0;x<dojo.io.hdlrFuncNames.length;x++){
var fn=dojo.io.hdlrFuncNames[x];
if(_12c[fn]&&_12d(_12c[fn])){
continue;
}
if(_12c["handle"]&&_12d(_12c["handle"])){
_12c[fn]=_12c.handle;
}
}
dojo.lang.mixin(this,_12c);
}});
dojo.io.Error=function(msg,type,num){
this.message=msg;
this.type=type||"unknown";
this.number=num||0;
};
dojo.io.transports.addTransport=function(name){
this.push(name);
this[name]=dojo.io[name];
};
dojo.io.bind=function(_134){
if(!(_134 instanceof dojo.io.Request)){
try{
_134=new dojo.io.Request(_134);
}
catch(e){
dojo.debug(e);
}
}
var _135="";
if(_134["transport"]){
_135=_134["transport"];
if(!this[_135]){
return _134;
}
}else{
for(var x=0;x<dojo.io.transports.length;x++){
var tmp=dojo.io.transports[x];
if((this[tmp])&&(this[tmp].canHandle(_134))){
_135=tmp;
}
}
if(_135==""){
return _134;
}
}
this[_135].bind(_134);
_134.bindSuccess=true;
return _134;
};
dojo.io.queueBind=function(_138){
if(!(_138 instanceof dojo.io.Request)){
try{
_138=new dojo.io.Request(_138);
}
catch(e){
dojo.debug(e);
}
}
var _139=_138.load;
_138.load=function(){
dojo.io._queueBindInFlight=false;
var ret=_139.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
var _13b=_138.error;
_138.error=function(){
dojo.io._queueBindInFlight=false;
var ret=_13b.apply(this,arguments);
dojo.io._dispatchNextQueueBind();
return ret;
};
dojo.io._bindQueue.push(_138);
dojo.io._dispatchNextQueueBind();
return _138;
};
dojo.io._dispatchNextQueueBind=function(){
if(!dojo.io._queueBindInFlight){
dojo.io._queueBindInFlight=true;
if(dojo.io._bindQueue.length>0){
dojo.io.bind(dojo.io._bindQueue.shift());
}else{
dojo.io._queueBindInFlight=false;
}
}
};
dojo.io._bindQueue=[];
dojo.io._queueBindInFlight=false;
dojo.io.argsFromMap=function(map,_13e,last){
var enc=/utf/i.test(_13e||"")?encodeURIComponent:dojo.string.encodeAscii;
var _141=[];
var _142=new Object();
for(var name in map){
var _144=function(elt){
var val=enc(name)+"="+enc(elt);
_141[(last==name)?"push":"unshift"](val);
};
if(!_142[name]){
var _147=map[name];
if(dojo.lang.isArray(_147)){
dojo.lang.forEach(_147,_144);
}else{
_144(_147);
}
}
}
return _141.join("&");
};
dojo.io.setIFrameSrc=function(_148,src,_14a){
try{
var r=dojo.render.html;
if(!_14a){
if(r.safari){
_148.location=src;
}else{
frames[_148.name].location=src;
}
}else{
var idoc;
if(r.ie){
idoc=_148.contentWindow.document;
}else{
if(r.safari){
idoc=_148.document;
}else{
idoc=_148.contentWindow;
}
}
if(!idoc){
_148.location=src;
return;
}else{
idoc.location.replace(src);
}
}
}
catch(e){
dojo.debug(e);
dojo.debug("setIFrameSrc: "+e);
}
};
dojo.provide("dojo.lang.array");
dojo.lang.has=function(obj,name){
try{
return (typeof obj[name]!="undefined");
}
catch(e){
return false;
}
};
dojo.lang.isEmpty=function(obj){
if(dojo.lang.isObject(obj)){
var tmp={};
var _151=0;
for(var x in obj){
if(obj[x]&&(!tmp[x])){
_151++;
break;
}
}
return (_151==0);
}else{
if(dojo.lang.isArrayLike(obj)||dojo.lang.isString(obj)){
return obj.length==0;
}
}
};
dojo.lang.map=function(arr,obj,_155){
var _156=dojo.lang.isString(arr);
if(_156){
arr=arr.split("");
}
if(dojo.lang.isFunction(obj)&&(!_155)){
_155=obj;
obj=dj_global;
}else{
if(dojo.lang.isFunction(obj)&&_155){
var _157=obj;
obj=_155;
_155=_157;
}
}
if(Array.map){
var _158=Array.map(arr,_155,obj);
}else{
var _158=[];
for(var i=0;i<arr.length;++i){
_158.push(_155.call(obj,arr[i]));
}
}
if(_156){
return _158.join("");
}else{
return _158;
}
};
dojo.lang.forEach=function(_15a,_15b,_15c){
if(dojo.lang.isString(_15a)){
_15a=_15a.split("");
}
if(Array.forEach){
Array.forEach(_15a,_15b,_15c);
}else{
if(!_15c){
_15c=dj_global;
}
for(var i=0,l=_15a.length;i<l;i++){
_15b.call(_15c,_15a[i],i,_15a);
}
}
};
dojo.lang._everyOrSome=function(_15e,arr,_160,_161){
if(dojo.lang.isString(arr)){
arr=arr.split("");
}
if(Array.every){
return Array[(_15e)?"every":"some"](arr,_160,_161);
}else{
if(!_161){
_161=dj_global;
}
for(var i=0,l=arr.length;i<l;i++){
var _163=_160.call(_161,arr[i],i,arr);
if((_15e)&&(!_163)){
return false;
}else{
if((!_15e)&&(_163)){
return true;
}
}
}
return (_15e)?true:false;
}
};
dojo.lang.every=function(arr,_165,_166){
return this._everyOrSome(true,arr,_165,_166);
};
dojo.lang.some=function(arr,_168,_169){
return this._everyOrSome(false,arr,_168,_169);
};
dojo.lang.filter=function(arr,_16b,_16c){
var _16d=dojo.lang.isString(arr);
if(_16d){
arr=arr.split("");
}
if(Array.filter){
var _16e=Array.filter(arr,_16b,_16c);
}else{
if(!_16c){
if(arguments.length>=3){
dojo.raise("thisObject doesn't exist!");
}
_16c=dj_global;
}
var _16e=[];
for(var i=0;i<arr.length;i++){
if(_16b.call(_16c,arr[i],i,arr)){
_16e.push(arr[i]);
}
}
}
if(_16d){
return _16e.join("");
}else{
return _16e;
}
};
dojo.lang.unnest=function(){
var out=[];
for(var i=0;i<arguments.length;i++){
if(dojo.lang.isArrayLike(arguments[i])){
var add=dojo.lang.unnest.apply(this,arguments[i]);
out=out.concat(add);
}else{
out.push(arguments[i]);
}
}
return out;
};
dojo.lang.toArray=function(_173,_174){
var _175=[];
for(var i=_174||0;i<_173.length;i++){
_175.push(_173[i]);
}
return _175;
};
dojo.provide("dojo.lang.func");
dojo.lang.hitch=function(_177,_178){
var fcn=(dojo.lang.isString(_178)?_177[_178]:_178)||function(){
};
return function(){
return fcn.apply(_177,arguments);
};
};
dojo.lang.anonCtr=0;
dojo.lang.anon={};
dojo.lang.nameAnonFunc=function(_17a,_17b,_17c){
var nso=(_17b||dojo.lang.anon);
if((_17c)||((dj_global["djConfig"])&&(djConfig["slowAnonFuncLookups"]==true))){
for(var x in nso){
try{
if(nso[x]===_17a){
return x;
}
}
catch(e){
}
}
}
var ret="__"+dojo.lang.anonCtr++;
while(typeof nso[ret]!="undefined"){
ret="__"+dojo.lang.anonCtr++;
}
nso[ret]=_17a;
return ret;
};
dojo.lang.forward=function(_180){
return function(){
return this[_180].apply(this,arguments);
};
};
dojo.lang.curry=function(ns,func){
var _183=[];
ns=ns||dj_global;
if(dojo.lang.isString(func)){
func=ns[func];
}
for(var x=2;x<arguments.length;x++){
_183.push(arguments[x]);
}
var _185=(func["__preJoinArity"]||func.length)-_183.length;
function gather(_186,_187,_188){
var _189=_188;
var _18a=_187.slice(0);
for(var x=0;x<_186.length;x++){
_18a.push(_186[x]);
}
_188=_188-_186.length;
if(_188<=0){
var res=func.apply(ns,_18a);
_188=_189;
return res;
}else{
return function(){
return gather(arguments,_18a,_188);
};
}
}
return gather([],_183,_185);
};
dojo.lang.curryArguments=function(ns,func,args,_190){
var _191=[];
var x=_190||0;
for(x=_190;x<args.length;x++){
_191.push(args[x]);
}
return dojo.lang.curry.apply(dojo.lang,[ns,func].concat(_191));
};
dojo.lang.tryThese=function(){
for(var x=0;x<arguments.length;x++){
try{
if(typeof arguments[x]=="function"){
var ret=(arguments[x]());
if(ret){
return ret;
}
}
}
catch(e){
dojo.debug(e);
}
}
};
dojo.lang.delayThese=function(farr,cb,_197,_198){
if(!farr.length){
if(typeof _198=="function"){
_198();
}
return;
}
if((typeof _197=="undefined")&&(typeof cb=="number")){
_197=cb;
cb=function(){
};
}else{
if(!cb){
cb=function(){
};
if(!_197){
_197=0;
}
}
}
setTimeout(function(){
(farr.shift())();
cb();
dojo.lang.delayThese(farr,cb,_197,_198);
},_197);
};
dojo.provide("dojo.string.extras");
dojo.string.substituteParams=function(_199,hash){
var map=(typeof hash=="object")?hash:dojo.lang.toArray(arguments,1);
return _199.replace(/\%\{(\w+)\}/g,function(_19c,key){
return map[key]||dojo.raise("Substitution not found: "+key);
});
};
dojo.string.capitalize=function(str){
if(!dojo.lang.isString(str)){
return "";
}
if(arguments.length==0){
str=this;
}
var _19f=str.split(" ");
for(var i=0;i<_19f.length;i++){
_19f[i]=_19f[i].charAt(0).toUpperCase()+_19f[i].substring(1);
}
return _19f.join(" ");
};
dojo.string.isBlank=function(str){
if(!dojo.lang.isString(str)){
return true;
}
return (dojo.string.trim(str).length==0);
};
dojo.string.encodeAscii=function(str){
if(!dojo.lang.isString(str)){
return str;
}
var ret="";
var _1a4=escape(str);
var _1a5,re=/%u([0-9A-F]{4})/i;
while((_1a5=_1a4.match(re))){
var num=Number("0x"+_1a5[1]);
var _1a7=escape("&#"+num+";");
ret+=_1a4.substring(0,_1a5.index)+_1a7;
_1a4=_1a4.substring(_1a5.index+_1a5[0].length);
}
ret+=_1a4.replace(/\+/g,"%2B");
return ret;
};
dojo.string.escape=function(type,str){
var args=dojo.lang.toArray(arguments,1);
switch(type.toLowerCase()){
case "xml":
case "html":
case "xhtml":
return dojo.string.escapeXml.apply(this,args);
case "sql":
return dojo.string.escapeSql.apply(this,args);
case "regexp":
case "regex":
return dojo.string.escapeRegExp.apply(this,args);
case "javascript":
case "jscript":
case "js":
return dojo.string.escapeJavaScript.apply(this,args);
case "ascii":
return dojo.string.encodeAscii.apply(this,args);
default:
return str;
}
};
dojo.string.escapeXml=function(str,_1ac){
str=str.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").replace(/"/gm,"&quot;");
if(!_1ac){
str=str.replace(/'/gm,"&#39;");
}
return str;
};
dojo.string.escapeSql=function(str){
return str.replace(/'/gm,"''");
};
dojo.string.escapeRegExp=function(str){
return str.replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
};
dojo.string.escapeJavaScript=function(str){
return str.replace(/(["'\f\b\n\t\r])/gm,"\\$1");
};
dojo.string.escapeString=function(str){
return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");
};
dojo.string.summary=function(str,len){
if(!len||str.length<=len){
return str;
}else{
return str.substring(0,len).replace(/\.+$/,"")+"...";
}
};
dojo.string.endsWith=function(str,end,_1b5){
if(_1b5){
str=str.toLowerCase();
end=end.toLowerCase();
}
if((str.length-end.length)<0){
return false;
}
return str.lastIndexOf(end)==str.length-end.length;
};
dojo.string.endsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.endsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.startsWith=function(str,_1b9,_1ba){
if(_1ba){
str=str.toLowerCase();
_1b9=_1b9.toLowerCase();
}
return str.indexOf(_1b9)==0;
};
dojo.string.startsWithAny=function(str){
for(var i=1;i<arguments.length;i++){
if(dojo.string.startsWith(str,arguments[i])){
return true;
}
}
return false;
};
dojo.string.has=function(str){
for(var i=1;i<arguments.length;i++){
if(str.indexOf(arguments[i])>-1){
return true;
}
}
return false;
};
dojo.string.normalizeNewlines=function(text,_1c0){
if(_1c0=="\n"){
text=text.replace(/\r\n/g,"\n");
text=text.replace(/\r/g,"\n");
}else{
if(_1c0=="\r"){
text=text.replace(/\r\n/g,"\r");
text=text.replace(/\n/g,"\r");
}else{
text=text.replace(/([^\r])\n/g,"$1\r\n");
text=text.replace(/\r([^\n])/g,"\r\n$1");
}
}
return text;
};
dojo.string.splitEscaped=function(str,_1c2){
var _1c3=[];
for(var i=0,prevcomma=0;i<str.length;i++){
if(str.charAt(i)=="\\"){
i++;
continue;
}
if(str.charAt(i)==_1c2){
_1c3.push(str.substring(prevcomma,i));
prevcomma=i+1;
}
}
_1c3.push(str.substr(prevcomma));
return _1c3;
};
dojo.provide("dojo.dom");
dojo.dom.ELEMENT_NODE=1;
dojo.dom.ATTRIBUTE_NODE=2;
dojo.dom.TEXT_NODE=3;
dojo.dom.CDATA_SECTION_NODE=4;
dojo.dom.ENTITY_REFERENCE_NODE=5;
dojo.dom.ENTITY_NODE=6;
dojo.dom.PROCESSING_INSTRUCTION_NODE=7;
dojo.dom.COMMENT_NODE=8;
dojo.dom.DOCUMENT_NODE=9;
dojo.dom.DOCUMENT_TYPE_NODE=10;
dojo.dom.DOCUMENT_FRAGMENT_NODE=11;
dojo.dom.NOTATION_NODE=12;
dojo.dom.dojoml="http://www.dojotoolkit.org/2004/dojoml";
dojo.dom.xmlns={svg:"http://www.w3.org/2000/svg",smil:"http://www.w3.org/2001/SMIL20/",mml:"http://www.w3.org/1998/Math/MathML",cml:"http://www.xml-cml.org",xlink:"http://www.w3.org/1999/xlink",xhtml:"http://www.w3.org/1999/xhtml",xul:"http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",xbl:"http://www.mozilla.org/xbl",fo:"http://www.w3.org/1999/XSL/Format",xsl:"http://www.w3.org/1999/XSL/Transform",xslt:"http://www.w3.org/1999/XSL/Transform",xi:"http://www.w3.org/2001/XInclude",xforms:"http://www.w3.org/2002/01/xforms",saxon:"http://icl.com/saxon",xalan:"http://xml.apache.org/xslt",xsd:"http://www.w3.org/2001/XMLSchema",dt:"http://www.w3.org/2001/XMLSchema-datatypes",xsi:"http://www.w3.org/2001/XMLSchema-instance",rdf:"http://www.w3.org/1999/02/22-rdf-syntax-ns#",rdfs:"http://www.w3.org/2000/01/rdf-schema#",dc:"http://purl.org/dc/elements/1.1/",dcq:"http://purl.org/dc/qualifiers/1.0","soap-env":"http://schemas.xmlsoap.org/soap/envelope/",wsdl:"http://schemas.xmlsoap.org/wsdl/",AdobeExtensions:"http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"};
dojo.dom.isNode=function(wh){
if(typeof Element=="function"){
try{
return wh instanceof Element;
}
catch(E){
}
}else{
return wh&&!isNaN(wh.nodeType);
}
};
dojo.dom.getUniqueId=function(){
var _1c6=dojo.doc();
do{
var id="dj_unique_"+(++arguments.callee._idIncrement);
}while(_1c6.getElementById(id));
return id;
};
dojo.dom.getUniqueId._idIncrement=0;
dojo.dom.firstElement=dojo.dom.getFirstChildElement=function(_1c8,_1c9){
var node=_1c8.firstChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.nextSibling;
}
if(_1c9&&node&&node.tagName&&node.tagName.toLowerCase()!=_1c9.toLowerCase()){
node=dojo.dom.nextElement(node,_1c9);
}
return node;
};
dojo.dom.lastElement=dojo.dom.getLastChildElement=function(_1cb,_1cc){
var node=_1cb.lastChild;
while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE){
node=node.previousSibling;
}
if(_1cc&&node&&node.tagName&&node.tagName.toLowerCase()!=_1cc.toLowerCase()){
node=dojo.dom.prevElement(node,_1cc);
}
return node;
};
dojo.dom.nextElement=dojo.dom.getNextSiblingElement=function(node,_1cf){
if(!node){
return null;
}
do{
node=node.nextSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_1cf&&_1cf.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.nextElement(node,_1cf);
}
return node;
};
dojo.dom.prevElement=dojo.dom.getPreviousSiblingElement=function(node,_1d1){
if(!node){
return null;
}
if(_1d1){
_1d1=_1d1.toLowerCase();
}
do{
node=node.previousSibling;
}while(node&&node.nodeType!=dojo.dom.ELEMENT_NODE);
if(node&&_1d1&&_1d1.toLowerCase()!=node.tagName.toLowerCase()){
return dojo.dom.prevElement(node,_1d1);
}
return node;
};
dojo.dom.moveChildren=function(_1d2,_1d3,trim){
var _1d5=0;
if(trim){
while(_1d2.hasChildNodes()&&_1d2.firstChild.nodeType==dojo.dom.TEXT_NODE){
_1d2.removeChild(_1d2.firstChild);
}
while(_1d2.hasChildNodes()&&_1d2.lastChild.nodeType==dojo.dom.TEXT_NODE){
_1d2.removeChild(_1d2.lastChild);
}
}
while(_1d2.hasChildNodes()){
_1d3.appendChild(_1d2.firstChild);
_1d5++;
}
return _1d5;
};
dojo.dom.copyChildren=function(_1d6,_1d7,trim){
var _1d9=_1d6.cloneNode(true);
return this.moveChildren(_1d9,_1d7,trim);
};
dojo.dom.removeChildren=function(node){
var _1db=node.childNodes.length;
while(node.hasChildNodes()){
node.removeChild(node.firstChild);
}
return _1db;
};
dojo.dom.replaceChildren=function(node,_1dd){
dojo.dom.removeChildren(node);
node.appendChild(_1dd);
};
dojo.dom.removeNode=function(node){
if(node&&node.parentNode){
return node.parentNode.removeChild(node);
}
};
dojo.dom.getAncestors=function(node,_1e0,_1e1){
var _1e2=[];
var _1e3=(_1e0&&(_1e0 instanceof Function||typeof _1e0=="function"));
while(node){
if(!_1e3||_1e0(node)){
_1e2.push(node);
}
if(_1e1&&_1e2.length>0){
return _1e2[0];
}
node=node.parentNode;
}
if(_1e1){
return null;
}
return _1e2;
};
dojo.dom.getAncestorsByTag=function(node,tag,_1e6){
tag=tag.toLowerCase();
return dojo.dom.getAncestors(node,function(el){
return ((el.tagName)&&(el.tagName.toLowerCase()==tag));
},_1e6);
};
dojo.dom.getFirstAncestorByTag=function(node,tag){
return dojo.dom.getAncestorsByTag(node,tag,true);
};
dojo.dom.isDescendantOf=function(node,_1eb,_1ec){
if(_1ec&&node){
node=node.parentNode;
}
while(node){
if(node==_1eb){
return true;
}
node=node.parentNode;
}
return false;
};
dojo.dom.innerXML=function(node){
if(node.innerXML){
return node.innerXML;
}else{
if(node.xml){
return node.xml;
}else{
if(typeof XMLSerializer!="undefined"){
return (new XMLSerializer()).serializeToString(node);
}
}
}
};
dojo.dom.createDocument=function(){
var doc=null;
var _1ef=dojo.doc();
if(!dj_undef("ActiveXObject")){
var _1f0=["MSXML2","Microsoft","MSXML","MSXML3"];
for(var i=0;i<_1f0.length;i++){
try{
doc=new ActiveXObject(_1f0[i]+".XMLDOM");
}
catch(e){
}
if(doc){
break;
}
}
}else{
if((_1ef.implementation)&&(_1ef.implementation.createDocument)){
doc=_1ef.implementation.createDocument("","",null);
}
}
return doc;
};
dojo.dom.createDocumentFromText=function(str,_1f3){
if(!_1f3){
_1f3="text/xml";
}
if(!dj_undef("DOMParser")){
var _1f4=new DOMParser();
return _1f4.parseFromString(str,_1f3);
}else{
if(!dj_undef("ActiveXObject")){
var _1f5=dojo.dom.createDocument();
if(_1f5){
_1f5.async=false;
_1f5.loadXML(str);
return _1f5;
}else{
dojo.debug("toXml didn't work?");
}
}else{
var _1f6=dojo.doc();
if(_1f6.createElement){
var tmp=_1f6.createElement("xml");
tmp.innerHTML=str;
if(_1f6.implementation&&_1f6.implementation.createDocument){
var _1f8=_1f6.implementation.createDocument("foo","",null);
for(var i=0;i<tmp.childNodes.length;i++){
_1f8.importNode(tmp.childNodes.item(i),true);
}
return _1f8;
}
return ((tmp.document)&&(tmp.document.firstChild?tmp.document.firstChild:tmp));
}
}
}
return null;
};
dojo.dom.prependChild=function(node,_1fb){
if(_1fb.firstChild){
_1fb.insertBefore(node,_1fb.firstChild);
}else{
_1fb.appendChild(node);
}
return true;
};
dojo.dom.insertBefore=function(node,ref,_1fe){
if(_1fe!=true&&(node===ref||node.nextSibling===ref)){
return false;
}
var _1ff=ref.parentNode;
_1ff.insertBefore(node,ref);
return true;
};
dojo.dom.insertAfter=function(node,ref,_202){
var pn=ref.parentNode;
if(ref==pn.lastChild){
if((_202!=true)&&(node===ref)){
return false;
}
pn.appendChild(node);
}else{
return this.insertBefore(node,ref.nextSibling,_202);
}
return true;
};
dojo.dom.insertAtPosition=function(node,ref,_206){
if((!node)||(!ref)||(!_206)){
return false;
}
switch(_206.toLowerCase()){
case "before":
return dojo.dom.insertBefore(node,ref);
case "after":
return dojo.dom.insertAfter(node,ref);
case "first":
if(ref.firstChild){
return dojo.dom.insertBefore(node,ref.firstChild);
}else{
ref.appendChild(node);
return true;
}
break;
default:
ref.appendChild(node);
return true;
}
};
dojo.dom.insertAtIndex=function(node,_208,_209){
var _20a=_208.childNodes;
if(!_20a.length){
_208.appendChild(node);
return true;
}
var _20b=null;
for(var i=0;i<_20a.length;i++){
var _20d=_20a.item(i)["getAttribute"]?parseInt(_20a.item(i).getAttribute("dojoinsertionindex")):-1;
if(_20d<_209){
_20b=_20a.item(i);
}
}
if(_20b){
return dojo.dom.insertAfter(node,_20b);
}else{
return dojo.dom.insertBefore(node,_20a.item(0));
}
};
dojo.dom.textContent=function(node,text){
if(arguments.length>1){
var _210=dojo.doc();
dojo.dom.replaceChildren(node,_210.createTextNode(text));
return text;
}else{
if(node.textContent!=undefined){
return node.textContent;
}
var _211="";
if(node==null){
return _211;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
_211+=dojo.dom.textContent(node.childNodes[i]);
break;
case 3:
case 2:
case 4:
_211+=node.childNodes[i].nodeValue;
break;
default:
break;
}
}
return _211;
}
};
dojo.dom.hasParent=function(node){
return node&&node.parentNode&&dojo.dom.isNode(node.parentNode);
};
dojo.dom.isTag=function(node){
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName==String(arguments[i])){
return String(arguments[i]);
}
}
}
return "";
};
dojo.dom.setAttributeNS=function(elem,_217,_218,_219){
if(elem==null||((elem==undefined)&&(typeof elem=="undefined"))){
dojo.raise("No element given to dojo.dom.setAttributeNS");
}
if(!((elem.setAttributeNS==undefined)&&(typeof elem.setAttributeNS=="undefined"))){
elem.setAttributeNS(_217,_218,_219);
}else{
var _21a=elem.ownerDocument;
var _21b=_21a.createNode(2,_218,_217);
_21b.nodeValue=_219;
elem.setAttributeNode(_21b);
}
};
dojo.provide("dojo.undo.browser");
try{
if((!djConfig["preventBackButtonFix"])&&(!dojo.hostenv.post_load_)){
document.write("<iframe style='border: 0px; width: 1px; height: 1px; position: absolute; bottom: 0px; right: 0px; visibility: visible;' name='djhistory' id='djhistory' src='"+(dojo.hostenv.getBaseScriptUri()+"iframe_history.html")+"'></iframe>");
}
}
catch(e){
}
if(dojo.render.html.opera){
dojo.debug("Opera is not supported with dojo.undo.browser, so back/forward detection will not work.");
}
dojo.undo.browser={initialHref:window.location.href,initialHash:window.location.hash,moveForward:false,historyStack:[],forwardStack:[],historyIframe:null,bookmarkAnchor:null,locationTimer:null,setInitialState:function(args){
this.initialState={"url":this.initialHref,"kwArgs":args,"urlHash":this.initialHash};
},addToHistory:function(args){
var hash=null;
if(!this.historyIframe){
this.historyIframe=window.frames["djhistory"];
}
if(!this.bookmarkAnchor){
this.bookmarkAnchor=document.createElement("a");
dojo.body().appendChild(this.bookmarkAnchor);
this.bookmarkAnchor.style.display="none";
}
if((!args["changeUrl"])||(dojo.render.html.ie)){
var url=dojo.hostenv.getBaseScriptUri()+"iframe_history.html?"+(new Date()).getTime();
this.moveForward=true;
dojo.io.setIFrameSrc(this.historyIframe,url,false);
}
if(args["changeUrl"]){
this.changingUrl=true;
hash="#"+((args["changeUrl"]!==true)?args["changeUrl"]:(new Date()).getTime());
setTimeout("window.location.href = '"+hash+"'; dojo.undo.browser.changingUrl = false;",1);
this.bookmarkAnchor.href=hash;
if(dojo.render.html.ie){
var _220=args["back"]||args["backButton"]||args["handle"];
var tcb=function(_222){
if(window.location.hash!=""){
setTimeout("window.location.href = '"+hash+"';",1);
}
_220.apply(this,[_222]);
};
if(args["back"]){
args.back=tcb;
}else{
if(args["backButton"]){
args.backButton=tcb;
}else{
if(args["handle"]){
args.handle=tcb;
}
}
}
this.forwardStack=[];
var _223=args["forward"]||args["forwardButton"]||args["handle"];
var tfw=function(_225){
if(window.location.hash!=""){
window.location.href=hash;
}
if(_223){
_223.apply(this,[_225]);
}
};
if(args["forward"]){
args.forward=tfw;
}else{
if(args["forwardButton"]){
args.forwardButton=tfw;
}else{
if(args["handle"]){
args.handle=tfw;
}
}
}
}else{
if(dojo.render.html.moz){
if(!this.locationTimer){
this.locationTimer=setInterval("dojo.undo.browser.checkLocation();",200);
}
}
}
}
this.historyStack.push({"url":url,"kwArgs":args,"urlHash":hash});
},checkLocation:function(){
if(!this.changingUrl){
var hsl=this.historyStack.length;
if((window.location.hash==this.initialHash||window.location.href==this.initialHref)&&(hsl==1)){
this.handleBackButton();
return;
}
if(this.forwardStack.length>0){
if(this.forwardStack[this.forwardStack.length-1].urlHash==window.location.hash){
this.handleForwardButton();
return;
}
}
if((hsl>=2)&&(this.historyStack[hsl-2])){
if(this.historyStack[hsl-2].urlHash==window.location.hash){
this.handleBackButton();
return;
}
}
}
},iframeLoaded:function(evt,_228){
if(!dojo.render.html.opera){
var _229=this._getUrlQuery(_228.href);
if(_229==null){
if(this.historyStack.length==1){
this.handleBackButton();
}
return;
}
if(this.moveForward){
this.moveForward=false;
return;
}
if(this.historyStack.length>=2&&_229==this._getUrlQuery(this.historyStack[this.historyStack.length-2].url)){
this.handleBackButton();
}else{
if(this.forwardStack.length>0&&_229==this._getUrlQuery(this.forwardStack[this.forwardStack.length-1].url)){
this.handleForwardButton();
}
}
}
},handleBackButton:function(){
var _22a=this.historyStack.pop();
if(!_22a){
return;
}
var last=this.historyStack[this.historyStack.length-1];
if(!last&&this.historyStack.length==0){
last=this.initialState;
}
if(last){
if(last.kwArgs["back"]){
last.kwArgs["back"]();
}else{
if(last.kwArgs["backButton"]){
last.kwArgs["backButton"]();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("back");
}
}
}
}
this.forwardStack.push(_22a);
},handleForwardButton:function(){
var last=this.forwardStack.pop();
if(!last){
return;
}
if(last.kwArgs["forward"]){
last.kwArgs.forward();
}else{
if(last.kwArgs["forwardButton"]){
last.kwArgs.forwardButton();
}else{
if(last.kwArgs["handle"]){
last.kwArgs.handle("forward");
}
}
}
this.historyStack.push(last);
},_getUrlQuery:function(url){
var _22e=url.split("?");
if(_22e.length<2){
return null;
}else{
return _22e[1];
}
}};
dojo.provide("dojo.io.BrowserIO");
dojo.io.checkChildrenForFile=function(node){
var _230=false;
var _231=node.getElementsByTagName("input");
dojo.lang.forEach(_231,function(_232){
if(_230){
return;
}
if(_232.getAttribute("type")=="file"){
_230=true;
}
});
return _230;
};
dojo.io.formHasFile=function(_233){
return dojo.io.checkChildrenForFile(_233);
};
dojo.io.updateNode=function(node,_235){
node=dojo.byId(node);
var args=_235;
if(dojo.lang.isString(_235)){
args={url:_235};
}
args.mimetype="text/html";
args.load=function(t,d,e){
while(node.firstChild){
if(dojo["event"]){
try{
dojo.event.browser.clean(node.firstChild);
}
catch(e){
}
}
node.removeChild(node.firstChild);
}
node.innerHTML=d;
};
dojo.io.bind(args);
};
dojo.io.formFilter=function(node){
var type=(node.type||"").toLowerCase();
return !node.disabled&&node.name&&!dojo.lang.inArray(["file","submit","image","reset","button"],type);
};
dojo.io.encodeForm=function(_23c,_23d,_23e){
if((!_23c)||(!_23c.tagName)||(!_23c.tagName.toLowerCase()=="form")){
dojo.raise("Attempted to encode a non-form element.");
}
if(!_23e){
_23e=dojo.io.formFilter;
}
var enc=/utf/i.test(_23d||"")?encodeURIComponent:dojo.string.encodeAscii;
var _240=[];
for(var i=0;i<_23c.elements.length;i++){
var elm=_23c.elements[i];
if(!elm||elm.tagName.toLowerCase()=="fieldset"||!_23e(elm)){
continue;
}
var name=enc(elm.name);
var type=elm.type.toLowerCase();
if(type=="select-multiple"){
for(var j=0;j<elm.options.length;j++){
if(elm.options[j].selected){
_240.push(name+"="+enc(elm.options[j].value));
}
}
}else{
if(dojo.lang.inArray(["radio","checkbox"],type)){
if(elm.checked){
_240.push(name+"="+enc(elm.value));
}
}else{
_240.push(name+"="+enc(elm.value));
}
}
}
var _246=_23c.getElementsByTagName("input");
for(var i=0;i<_246.length;i++){
var _247=_246[i];
if(_247.type.toLowerCase()=="image"&&_247.form==_23c&&_23e(_247)){
var name=enc(_247.name);
_240.push(name+"="+enc(_247.value));
_240.push(name+".x=0");
_240.push(name+".y=0");
}
}
return _240.join("&")+"&";
};
dojo.io.FormBind=function(args){
this.bindArgs={};
if(args&&args.formNode){
this.init(args);
}else{
if(args){
this.init({formNode:args});
}
}
};
dojo.lang.extend(dojo.io.FormBind,{form:null,bindArgs:null,clickedButton:null,init:function(args){
var form=dojo.byId(args.formNode);
if(!form||!form.tagName||form.tagName.toLowerCase()!="form"){
throw new Error("FormBind: Couldn't apply, invalid form");
}else{
if(this.form==form){
return;
}else{
if(this.form){
throw new Error("FormBind: Already applied to a form");
}
}
}
dojo.lang.mixin(this.bindArgs,args);
this.form=form;
this.connect(form,"onsubmit","submit");
for(var i=0;i<form.elements.length;i++){
var node=form.elements[i];
if(node&&node.type&&dojo.lang.inArray(["submit","button"],node.type.toLowerCase())){
this.connect(node,"onclick","click");
}
}
var _24d=form.getElementsByTagName("input");
for(var i=0;i<_24d.length;i++){
var _24e=_24d[i];
if(_24e.type.toLowerCase()=="image"&&_24e.form==form){
this.connect(_24e,"onclick","click");
}
}
},onSubmit:function(form){
return true;
},submit:function(e){
e.preventDefault();
if(this.onSubmit(this.form)){
dojo.io.bind(dojo.lang.mixin(this.bindArgs,{formFilter:dojo.lang.hitch(this,"formFilter")}));
}
},click:function(e){
var node=e.currentTarget;
if(node.disabled){
return;
}
this.clickedButton=node;
},formFilter:function(node){
var type=(node.type||"").toLowerCase();
var _255=false;
if(node.disabled||!node.name){
_255=false;
}else{
if(dojo.lang.inArray(["submit","button","image"],type)){
if(!this.clickedButton){
this.clickedButton=node;
}
_255=node==this.clickedButton;
}else{
_255=!dojo.lang.inArray(["file","submit","reset","button"],type);
}
}
return _255;
},connect:function(_256,_257,_258){
if(dojo.evalObjPath("dojo.event.connect")){
dojo.event.connect(_256,_257,this,_258);
}else{
var fcn=dojo.lang.hitch(this,_258);
_256[_257]=function(e){
if(!e){
e=window.event;
}
if(!e.currentTarget){
e.currentTarget=e.srcElement;
}
if(!e.preventDefault){
e.preventDefault=function(){
window.event.returnValue=false;
};
}
fcn(e);
};
}
}});
dojo.io.XMLHTTPTransport=new function(){
var _25b=this;
var _25c={};
this.useCache=false;
this.preventCache=false;
function getCacheKey(url,_25e,_25f){
return url+"|"+_25e+"|"+_25f.toLowerCase();
}
function addToCache(url,_261,_262,http){
_25c[getCacheKey(url,_261,_262)]=http;
}
function getFromCache(url,_265,_266){
return _25c[getCacheKey(url,_265,_266)];
}
this.clearCache=function(){
_25c={};
};
function doLoad(_267,http,url,_26a,_26b){
if(((http.status>=200)&&(http.status<300))||(http.status==304)||(location.protocol=="file:"&&(http.status==0||http.status==undefined))||(location.protocol=="chrome:"&&(http.status==0||http.status==undefined))){
var ret;
if(_267.method.toLowerCase()=="head"){
var _26d=http.getAllResponseHeaders();
ret={};
ret.toString=function(){
return _26d;
};
var _26e=_26d.split(/[\r\n]+/g);
for(var i=0;i<_26e.length;i++){
var pair=_26e[i].match(/^([^:]+)\s*:\s*(.+)$/i);
if(pair){
ret[pair[1]]=pair[2];
}
}
}else{
if(_267.mimetype=="text/javascript"){
try{
ret=dj_eval(http.responseText);
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=null;
}
}else{
if(_267.mimetype=="text/json"){
try{
ret=dj_eval("("+http.responseText+")");
}
catch(e){
dojo.debug(e);
dojo.debug(http.responseText);
ret=false;
}
}else{
if((_267.mimetype=="application/xml")||(_267.mimetype=="text/xml")){
ret=http.responseXML;
if(!ret||typeof ret=="string"||!http.getResponseHeader("Content-Type")){
ret=dojo.dom.createDocumentFromText(http.responseText);
}
}else{
ret=http.responseText;
}
}
}
}
if(_26b){
addToCache(url,_26a,_267.method,http);
}
_267[(typeof _267.load=="function")?"load":"handle"]("load",ret,http,_267);
}else{
var _271=new dojo.io.Error("XMLHttpTransport Error: "+http.status+" "+http.statusText);
_267[(typeof _267.error=="function")?"error":"handle"]("error",_271,http,_267);
}
}
function setHeaders(http,_273){
if(_273["headers"]){
for(var _274 in _273["headers"]){
if(_274.toLowerCase()=="content-type"&&!_273["contentType"]){
_273["contentType"]=_273["headers"][_274];
}else{
http.setRequestHeader(_274,_273["headers"][_274]);
}
}
}
}
this.inFlight=[];
this.inFlightTimer=null;
this.startWatchingInFlight=function(){
if(!this.inFlightTimer){
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
}
};
this.watchInFlight=function(){
var now=null;
if(!dojo.hostenv._blockAsync&&!_25b._blockAsync){
for(var x=this.inFlight.length-1;x>=0;x--){
var tif=this.inFlight[x];
if(!tif||tif.http._aborted||!tif.http.readyState){
this.inFlight.splice(x,1);
continue;
}
if(4==tif.http.readyState){
this.inFlight.splice(x,1);
doLoad(tif.req,tif.http,tif.url,tif.query,tif.useCache);
}else{
if(tif.startTime){
if(!now){
now=(new Date()).getTime();
}
if(tif.startTime+(tif.req.timeoutSeconds*1000)<now){
if(typeof tif.http.abort=="function"){
tif.http.abort();
}
this.inFlight.splice(x,1);
tif.req[(typeof tif.req.timeout=="function")?"timeout":"handle"]("timeout",null,tif.http,tif.req);
}
}
}
}
}
clearTimeout(this.inFlightTimer);
if(this.inFlight.length==0){
this.inFlightTimer=null;
return;
}
this.inFlightTimer=setTimeout("dojo.io.XMLHTTPTransport.watchInFlight();",10);
};
var _278=dojo.hostenv.getXmlhttpObject()?true:false;
this.canHandle=function(_279){
return _278&&dojo.lang.inArray(["text/plain","text/html","application/xml","text/xml","text/javascript","text/json"],(_279["mimetype"].toLowerCase()||""))&&!(_279["formNode"]&&dojo.io.formHasFile(_279["formNode"]));
};
this.multipartBoundary="45309FFF-BD65-4d50-99C9-36986896A96F";
this.bind=function(_27a){
if(!_27a["url"]){
if(!_27a["formNode"]&&(_27a["backButton"]||_27a["back"]||_27a["changeUrl"]||_27a["watchForURL"])&&(!djConfig.preventBackButtonFix)){
dojo.deprecated("Using dojo.io.XMLHTTPTransport.bind() to add to browser history without doing an IO request","Use dojo.undo.browser.addToHistory() instead.","0.4");
dojo.undo.browser.addToHistory(_27a);
return true;
}
}
var url=_27a.url;
var _27c="";
if(_27a["formNode"]){
var ta=_27a.formNode.getAttribute("action");
if((ta)&&(!_27a["url"])){
url=ta;
}
var tp=_27a.formNode.getAttribute("method");
if((tp)&&(!_27a["method"])){
_27a.method=tp;
}
_27c+=dojo.io.encodeForm(_27a.formNode,_27a.encoding,_27a["formFilter"]);
}
if(url.indexOf("#")>-1){
dojo.debug("Warning: dojo.io.bind: stripping hash values from url:",url);
url=url.split("#")[0];
}
if(_27a["file"]){
_27a.method="post";
}
if(!_27a["method"]){
_27a.method="get";
}
if(_27a.method.toLowerCase()=="get"){
_27a.multipart=false;
}else{
if(_27a["file"]){
_27a.multipart=true;
}else{
if(!_27a["multipart"]){
_27a.multipart=false;
}
}
}
if(_27a["backButton"]||_27a["back"]||_27a["changeUrl"]){
dojo.undo.browser.addToHistory(_27a);
}
var _27f=_27a["content"]||{};
if(_27a.sendTransport){
_27f["dojo.transport"]="xmlhttp";
}
do{
if(_27a.postContent){
_27c=_27a.postContent;
break;
}
if(_27f){
_27c+=dojo.io.argsFromMap(_27f,_27a.encoding);
}
if(_27a.method.toLowerCase()=="get"||!_27a.multipart){
break;
}
var t=[];
if(_27c.length){
var q=_27c.split("&");
for(var i=0;i<q.length;++i){
if(q[i].length){
var p=q[i].split("=");
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+p[0]+"\"","",p[1]);
}
}
}
if(_27a.file){
if(dojo.lang.isArray(_27a.file)){
for(var i=0;i<_27a.file.length;++i){
var o=_27a.file[i];
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}else{
var o=_27a.file;
t.push("--"+this.multipartBoundary,"Content-Disposition: form-data; name=\""+o.name+"\"; filename=\""+("fileName" in o?o.fileName:o.name)+"\"","Content-Type: "+("contentType" in o?o.contentType:"application/octet-stream"),"",o.content);
}
}
if(t.length){
t.push("--"+this.multipartBoundary+"--","");
_27c=t.join("\r\n");
}
}while(false);
var _285=_27a["sync"]?false:true;
var _286=_27a["preventCache"]||(this.preventCache==true&&_27a["preventCache"]!=false);
var _287=_27a["useCache"]==true||(this.useCache==true&&_27a["useCache"]!=false);
if(!_286&&_287){
var _288=getFromCache(url,_27c,_27a.method);
if(_288){
doLoad(_27a,_288,url,_27c,false);
return;
}
}
var http=dojo.hostenv.getXmlhttpObject(_27a);
var _28a=false;
if(_285){
var _28b=this.inFlight.push({"req":_27a,"http":http,"url":url,"query":_27c,"useCache":_287,"startTime":_27a.timeoutSeconds?(new Date()).getTime():0});
this.startWatchingInFlight();
}else{
_25b._blockAsync=true;
}
if(_27a.method.toLowerCase()=="post"){
http.open("POST",url,_285);
setHeaders(http,_27a);
http.setRequestHeader("Content-Type",_27a.multipart?("multipart/form-data; boundary="+this.multipartBoundary):(_27a.contentType||"application/x-www-form-urlencoded"));
try{
http.send(_27c);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_27a,{status:404},url,_27c,_287);
}
}else{
var _28c=url;
if(_27c!=""){
_28c+=(_28c.indexOf("?")>-1?"&":"?")+_27c;
}
if(_286){
_28c+=(dojo.string.endsWithAny(_28c,"?","&")?"":(_28c.indexOf("?")>-1?"&":"?"))+"dojo.preventCache="+new Date().valueOf();
}
http.open(_27a.method.toUpperCase(),_28c,_285);
setHeaders(http,_27a);
try{
http.send(null);
}
catch(e){
if(typeof http.abort=="function"){
http.abort();
}
doLoad(_27a,{status:404},url,_27c,_287);
}
}
if(!_285){
doLoad(_27a,http,url,_27c,_287);
_25b._blockAsync=false;
}
_27a.abort=function(){
try{
http._aborted=true;
}
catch(e){
}
return http.abort();
};
return;
};
dojo.io.transports.addTransport("XMLHTTPTransport");
};
dojo.provide("dojo.io.cookie");
dojo.io.cookie.setCookie=function(name,_28e,days,path,_291,_292){
var _293=-1;
if(typeof days=="number"&&days>=0){
var d=new Date();
d.setTime(d.getTime()+(days*24*60*60*1000));
_293=d.toGMTString();
}
_28e=escape(_28e);
document.cookie=name+"="+_28e+";"+(_293!=-1?" expires="+_293+";":"")+(path?"path="+path:"")+(_291?"; domain="+_291:"")+(_292?"; secure":"");
};
dojo.io.cookie.set=dojo.io.cookie.setCookie;
dojo.io.cookie.getCookie=function(name){
var idx=document.cookie.lastIndexOf(name+"=");
if(idx==-1){
return null;
}
var _297=document.cookie.substring(idx+name.length+1);
var end=_297.indexOf(";");
if(end==-1){
end=_297.length;
}
_297=_297.substring(0,end);
_297=unescape(_297);
return _297;
};
dojo.io.cookie.get=dojo.io.cookie.getCookie;
dojo.io.cookie.deleteCookie=function(name){
dojo.io.cookie.setCookie(name,"-",0);
};
dojo.io.cookie.setObjectCookie=function(name,obj,days,path,_29e,_29f,_2a0){
if(arguments.length==5){
_2a0=_29e;
_29e=null;
_29f=null;
}
var _2a1=[],cookie,value="";
if(!_2a0){
cookie=dojo.io.cookie.getObjectCookie(name);
}
if(days>=0){
if(!cookie){
cookie={};
}
for(var prop in obj){
if(prop==null){
delete cookie[prop];
}else{
if(typeof obj[prop]=="string"||typeof obj[prop]=="number"){
cookie[prop]=obj[prop];
}
}
}
prop=null;
for(var prop in cookie){
_2a1.push(escape(prop)+"="+escape(cookie[prop]));
}
value=_2a1.join("&");
}
dojo.io.cookie.setCookie(name,value,days,path,_29e,_29f);
};
dojo.io.cookie.getObjectCookie=function(name){
var _2a4=null,cookie=dojo.io.cookie.getCookie(name);
if(cookie){
_2a4={};
var _2a5=cookie.split("&");
for(var i=0;i<_2a5.length;i++){
var pair=_2a5[i].split("=");
var _2a8=pair[1];
if(isNaN(_2a8)){
_2a8=unescape(pair[1]);
}
_2a4[unescape(pair[0])]=_2a8;
}
}
return _2a4;
};
dojo.io.cookie.isSupported=function(){
if(typeof navigator.cookieEnabled!="boolean"){
dojo.io.cookie.setCookie("__TestingYourBrowserForCookieSupport__","CookiesAllowed",90,null);
var _2a9=dojo.io.cookie.getCookie("__TestingYourBrowserForCookieSupport__");
navigator.cookieEnabled=(_2a9=="CookiesAllowed");
if(navigator.cookieEnabled){
this.deleteCookie("__TestingYourBrowserForCookieSupport__");
}
}
return navigator.cookieEnabled;
};
if(!dojo.io.cookies){
dojo.io.cookies=dojo.io.cookie;
}
dojo.provide("dojo.io.*");
dojo.provide("dojo.event");
dojo.event=new function(){
this.canTimeout=dojo.lang.isFunction(dj_global["setTimeout"])||dojo.lang.isAlien(dj_global["setTimeout"]);
function interpolateArgs(args,_2ab){
var dl=dojo.lang;
var ao={srcObj:dj_global,srcFunc:null,adviceObj:dj_global,adviceFunc:null,aroundObj:null,aroundFunc:null,adviceType:(args.length>2)?args[0]:"after",precedence:"last",once:false,delay:null,rate:0,adviceMsg:false};
switch(args.length){
case 0:
return;
case 1:
return;
case 2:
ao.srcFunc=args[0];
ao.adviceFunc=args[1];
break;
case 3:
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isString(args[1]))&&(dl.isString(args[2]))){
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
}else{
if((dl.isObject(args[0]))&&(dl.isString(args[1]))&&(dl.isFunction(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
var _2ae=dl.nameAnonFunc(args[2],ao.adviceObj,_2ab);
ao.adviceFunc=_2ae;
}else{
if((dl.isFunction(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))){
ao.adviceType="after";
ao.srcObj=dj_global;
var _2ae=dl.nameAnonFunc(args[0],ao.srcObj,_2ab);
ao.srcFunc=_2ae;
ao.adviceObj=args[1];
ao.adviceFunc=args[2];
}
}
}
}
break;
case 4:
if((dl.isObject(args[0]))&&(dl.isObject(args[2]))){
ao.adviceType="after";
ao.srcObj=args[0];
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isString(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isFunction(args[1]))&&(dl.isObject(args[2]))){
ao.adviceType=args[0];
ao.srcObj=dj_global;
var _2ae=dl.nameAnonFunc(args[1],dj_global,_2ab);
ao.srcFunc=_2ae;
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
if((dl.isString(args[0]))&&(dl.isObject(args[1]))&&(dl.isString(args[2]))&&(dl.isFunction(args[3]))){
ao.srcObj=args[1];
ao.srcFunc=args[2];
var _2ae=dl.nameAnonFunc(args[3],dj_global,_2ab);
ao.adviceObj=dj_global;
ao.adviceFunc=_2ae;
}else{
if(dl.isObject(args[1])){
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=dj_global;
ao.adviceFunc=args[3];
}else{
if(dl.isObject(args[2])){
ao.srcObj=dj_global;
ao.srcFunc=args[1];
ao.adviceObj=args[2];
ao.adviceFunc=args[3];
}else{
ao.srcObj=ao.adviceObj=ao.aroundObj=dj_global;
ao.srcFunc=args[1];
ao.adviceFunc=args[2];
ao.aroundFunc=args[3];
}
}
}
}
}
}
break;
case 6:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundFunc=args[5];
ao.aroundObj=dj_global;
break;
default:
ao.srcObj=args[1];
ao.srcFunc=args[2];
ao.adviceObj=args[3];
ao.adviceFunc=args[4];
ao.aroundObj=args[5];
ao.aroundFunc=args[6];
ao.once=args[7];
ao.delay=args[8];
ao.rate=args[9];
ao.adviceMsg=args[10];
break;
}
if(dl.isFunction(ao.aroundFunc)){
var _2ae=dl.nameAnonFunc(ao.aroundFunc,ao.aroundObj,_2ab);
ao.aroundFunc=_2ae;
}
if(dl.isFunction(ao.srcFunc)){
ao.srcFunc=dl.getNameInObj(ao.srcObj,ao.srcFunc);
}
if(dl.isFunction(ao.adviceFunc)){
ao.adviceFunc=dl.getNameInObj(ao.adviceObj,ao.adviceFunc);
}
if((ao.aroundObj)&&(dl.isFunction(ao.aroundFunc))){
ao.aroundFunc=dl.getNameInObj(ao.aroundObj,ao.aroundFunc);
}
if(!ao.srcObj){
dojo.raise("bad srcObj for srcFunc: "+ao.srcFunc);
}
if(!ao.adviceObj){
dojo.raise("bad adviceObj for adviceFunc: "+ao.adviceFunc);
}
if(!ao.adviceFunc){
dojo.debug("bad adviceFunc for srcFunc: "+ao.srcFunc);
dojo.debugShallow(ao);
}
return ao;
}
this.connect=function(){
if(arguments.length==1){
var ao=arguments[0];
}else{
var ao=interpolateArgs(arguments,true);
}
if(dojo.lang.isArray(ao.srcObj)&&ao.srcObj!=""){
var _2b0={};
for(var x in ao){
_2b0[x]=ao[x];
}
var mjps=[];
dojo.lang.forEach(ao.srcObj,function(src){
if((dojo.render.html.capable)&&(dojo.lang.isString(src))){
src=dojo.byId(src);
}
_2b0.srcObj=src;
mjps.push(dojo.event.connect.call(dojo.event,_2b0));
});
return mjps;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
if(ao.adviceFunc){
var mjp2=dojo.event.MethodJoinPoint.getForMethod(ao.adviceObj,ao.adviceFunc);
}
mjp.kwAddAdvice(ao);
return mjp;
};
this.log=function(a1,a2){
var _2b8;
if((arguments.length==1)&&(typeof a1=="object")){
_2b8=a1;
}else{
_2b8={srcObj:a1,srcFunc:a2};
}
_2b8.adviceFunc=function(){
var _2b9=[];
for(var x=0;x<arguments.length;x++){
_2b9.push(arguments[x]);
}
dojo.debug("("+_2b8.srcObj+")."+_2b8.srcFunc,":",_2b9.join(", "));
};
this.kwConnect(_2b8);
};
this.connectBefore=function(){
var args=["before"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectAround=function(){
var args=["around"];
for(var i=0;i<arguments.length;i++){
args.push(arguments[i]);
}
return this.connect.apply(this,args);
};
this.connectOnce=function(){
var ao=interpolateArgs(arguments,true);
ao.once=true;
return this.connect(ao);
};
this._kwConnectImpl=function(_2c0,_2c1){
var fn=(_2c1)?"disconnect":"connect";
if(typeof _2c0["srcFunc"]=="function"){
_2c0.srcObj=_2c0["srcObj"]||dj_global;
var _2c3=dojo.lang.nameAnonFunc(_2c0.srcFunc,_2c0.srcObj,true);
_2c0.srcFunc=_2c3;
}
if(typeof _2c0["adviceFunc"]=="function"){
_2c0.adviceObj=_2c0["adviceObj"]||dj_global;
var _2c3=dojo.lang.nameAnonFunc(_2c0.adviceFunc,_2c0.adviceObj,true);
_2c0.adviceFunc=_2c3;
}
return dojo.event[fn]((_2c0["type"]||_2c0["adviceType"]||"after"),_2c0["srcObj"]||dj_global,_2c0["srcFunc"],_2c0["adviceObj"]||_2c0["targetObj"]||dj_global,_2c0["adviceFunc"]||_2c0["targetFunc"],_2c0["aroundObj"],_2c0["aroundFunc"],_2c0["once"],_2c0["delay"],_2c0["rate"],_2c0["adviceMsg"]||false);
};
this.kwConnect=function(_2c4){
return this._kwConnectImpl(_2c4,false);
};
this.disconnect=function(){
var ao=interpolateArgs(arguments,true);
if(!ao.adviceFunc){
return;
}
var mjp=dojo.event.MethodJoinPoint.getForMethod(ao.srcObj,ao.srcFunc);
return mjp.removeAdvice(ao.adviceObj,ao.adviceFunc,ao.adviceType,ao.once);
};
this.kwDisconnect=function(_2c7){
return this._kwConnectImpl(_2c7,true);
};
};
dojo.event.MethodInvocation=function(_2c8,obj,args){
this.jp_=_2c8;
this.object=obj;
this.args=[];
for(var x=0;x<args.length;x++){
this.args[x]=args[x];
}
this.around_index=-1;
};
dojo.event.MethodInvocation.prototype.proceed=function(){
this.around_index++;
if(this.around_index>=this.jp_.around.length){
return this.jp_.object[this.jp_.methodname].apply(this.jp_.object,this.args);
}else{
var ti=this.jp_.around[this.around_index];
var mobj=ti[0]||dj_global;
var meth=ti[1];
return mobj[meth].call(mobj,this);
}
};
dojo.event.MethodJoinPoint=function(obj,_2d0){
this.object=obj||dj_global;
this.methodname=_2d0;
this.methodfunc=this.object[_2d0];
this.before=[];
this.after=[];
this.around=[];
};
dojo.event.MethodJoinPoint.getForMethod=function(obj,_2d2){
if(!obj){
obj=dj_global;
}
if(!obj[_2d2]){
obj[_2d2]=function(){
};
if(!obj[_2d2]){
dojo.raise("Cannot set do-nothing method on that object "+_2d2);
}
}else{
if((!dojo.lang.isFunction(obj[_2d2]))&&(!dojo.lang.isAlien(obj[_2d2]))){
return null;
}
}
var _2d3=_2d2+"$joinpoint";
var _2d4=_2d2+"$joinpoint$method";
var _2d5=obj[_2d3];
if(!_2d5){
var _2d6=false;
if(dojo.event["browser"]){
if((obj["attachEvent"])||(obj["nodeType"])||(obj["addEventListener"])){
_2d6=true;
dojo.event.browser.addClobberNodeAttrs(obj,[_2d3,_2d4,_2d2]);
}
}
var _2d7=obj[_2d2].length;
obj[_2d4]=obj[_2d2];
_2d5=obj[_2d3]=new dojo.event.MethodJoinPoint(obj,_2d4);
obj[_2d2]=function(){
var args=[];
if((_2d6)&&(!arguments.length)){
var evt=null;
try{
if(obj.ownerDocument){
evt=obj.ownerDocument.parentWindow.event;
}else{
if(obj.documentElement){
evt=obj.documentElement.ownerDocument.parentWindow.event;
}else{
if(obj.event){
evt=obj.event;
}else{
evt=window.event;
}
}
}
}
catch(e){
evt=window.event;
}
if(evt){
args.push(dojo.event.browser.fixEvent(evt,this));
}
}else{
for(var x=0;x<arguments.length;x++){
if((x==0)&&(_2d6)&&(dojo.event.browser.isEvent(arguments[x]))){
args.push(dojo.event.browser.fixEvent(arguments[x],this));
}else{
args.push(arguments[x]);
}
}
}
return _2d5.run.apply(_2d5,args);
};
obj[_2d2].__preJoinArity=_2d7;
}
return _2d5;
};
dojo.lang.extend(dojo.event.MethodJoinPoint,{unintercept:function(){
this.object[this.methodname]=this.methodfunc;
this.before=[];
this.after=[];
this.around=[];
},disconnect:dojo.lang.forward("unintercept"),run:function(){
var obj=this.object||dj_global;
var args=arguments;
var _2dd=[];
for(var x=0;x<args.length;x++){
_2dd[x]=args[x];
}
var _2df=function(marr){
if(!marr){
dojo.debug("Null argument to unrollAdvice()");
return;
}
var _2e1=marr[0]||dj_global;
var _2e2=marr[1];
if(!_2e1[_2e2]){
dojo.raise("function \""+_2e2+"\" does not exist on \""+_2e1+"\"");
}
var _2e3=marr[2]||dj_global;
var _2e4=marr[3];
var msg=marr[6];
var _2e6;
var to={args:[],jp_:this,object:obj,proceed:function(){
return _2e1[_2e2].apply(_2e1,to.args);
}};
to.args=_2dd;
var _2e8=parseInt(marr[4]);
var _2e9=((!isNaN(_2e8))&&(marr[4]!==null)&&(typeof marr[4]!="undefined"));
if(marr[5]){
var rate=parseInt(marr[5]);
var cur=new Date();
var _2ec=false;
if((marr["last"])&&((cur-marr.last)<=rate)){
if(dojo.event.canTimeout){
if(marr["delayTimer"]){
clearTimeout(marr.delayTimer);
}
var tod=parseInt(rate*2);
var mcpy=dojo.lang.shallowCopy(marr);
marr.delayTimer=setTimeout(function(){
mcpy[5]=0;
_2df(mcpy);
},tod);
}
return;
}else{
marr.last=cur;
}
}
if(_2e4){
_2e3[_2e4].call(_2e3,to);
}else{
if((_2e9)&&((dojo.render.html)||(dojo.render.svg))){
dj_global["setTimeout"](function(){
if(msg){
_2e1[_2e2].call(_2e1,to);
}else{
_2e1[_2e2].apply(_2e1,args);
}
},_2e8);
}else{
if(msg){
_2e1[_2e2].call(_2e1,to);
}else{
_2e1[_2e2].apply(_2e1,args);
}
}
}
};
if(this.before.length>0){
dojo.lang.forEach(this.before.concat(new Array()),_2df);
}
var _2ef;
if(this.around.length>0){
var mi=new dojo.event.MethodInvocation(this,obj,args);
_2ef=mi.proceed();
}else{
if(this.methodfunc){
_2ef=this.object[this.methodname].apply(this.object,args);
}
}
if(this.after.length>0){
dojo.lang.forEach(this.after.concat(new Array()),_2df);
}
return (this.methodfunc)?_2ef:null;
},getArr:function(kind){
var arr=this.after;
if((typeof kind=="string")&&(kind.indexOf("before")!=-1)){
arr=this.before;
}else{
if(kind=="around"){
arr=this.around;
}
}
return arr;
},kwAddAdvice:function(args){
this.addAdvice(args["adviceObj"],args["adviceFunc"],args["aroundObj"],args["aroundFunc"],args["adviceType"],args["precedence"],args["once"],args["delay"],args["rate"],args["adviceMsg"]);
},addAdvice:function(_2f4,_2f5,_2f6,_2f7,_2f8,_2f9,once,_2fb,rate,_2fd){
var arr=this.getArr(_2f8);
if(!arr){
dojo.raise("bad this: "+this);
}
var ao=[_2f4,_2f5,_2f6,_2f7,_2fb,rate,_2fd];
if(once){
if(this.hasAdvice(_2f4,_2f5,_2f8,arr)>=0){
return;
}
}
if(_2f9=="first"){
arr.unshift(ao);
}else{
arr.push(ao);
}
},hasAdvice:function(_300,_301,_302,arr){
if(!arr){
arr=this.getArr(_302);
}
var ind=-1;
for(var x=0;x<arr.length;x++){
var aao=(typeof _301=="object")?(new String(_301)).toString():_301;
var a1o=(typeof arr[x][1]=="object")?(new String(arr[x][1])).toString():arr[x][1];
if((arr[x][0]==_300)&&(a1o==aao)){
ind=x;
}
}
return ind;
},removeAdvice:function(_308,_309,_30a,once){
var arr=this.getArr(_30a);
var ind=this.hasAdvice(_308,_309,_30a,arr);
if(ind==-1){
return false;
}
while(ind!=-1){
arr.splice(ind,1);
if(once){
break;
}
ind=this.hasAdvice(_308,_309,_30a,arr);
}
return true;
}});
dojo.provide("dojo.event.topic");
dojo.event.topic=new function(){
this.topics={};
this.getTopic=function(_30e){
if(!this.topics[_30e]){
this.topics[_30e]=new this.TopicImpl(_30e);
}
return this.topics[_30e];
};
this.registerPublisher=function(_30f,obj,_311){
var _30f=this.getTopic(_30f);
_30f.registerPublisher(obj,_311);
};
this.subscribe=function(_312,obj,_314){
var _312=this.getTopic(_312);
_312.subscribe(obj,_314);
};
this.unsubscribe=function(_315,obj,_317){
var _315=this.getTopic(_315);
_315.unsubscribe(obj,_317);
};
this.destroy=function(_318){
this.getTopic(_318).destroy();
delete this.topics[_318];
};
this.publishApply=function(_319,args){
var _319=this.getTopic(_319);
_319.sendMessage.apply(_319,args);
};
this.publish=function(_31b,_31c){
var _31b=this.getTopic(_31b);
var args=[];
for(var x=1;x<arguments.length;x++){
args.push(arguments[x]);
}
_31b.sendMessage.apply(_31b,args);
};
};
dojo.event.topic.TopicImpl=function(_31f){
this.topicName=_31f;
this.subscribe=function(_320,_321){
var tf=_321||_320;
var to=(!_321)?dj_global:_320;
dojo.event.kwConnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.unsubscribe=function(_324,_325){
var tf=(!_325)?_324:_325;
var to=(!_325)?null:_324;
dojo.event.kwDisconnect({srcObj:this,srcFunc:"sendMessage",adviceObj:to,adviceFunc:tf});
};
this.destroy=function(){
dojo.event.MethodJoinPoint.getForMethod(this,"sendMessage").disconnect();
};
this.registerPublisher=function(_328,_329){
dojo.event.connect(_328,_329,this,"sendMessage");
};
this.sendMessage=function(_32a){
};
};
dojo.provide("dojo.event.browser");
dojo._ie_clobber=new function(){
this.clobberNodes=[];
function nukeProp(node,prop){
try{
node[prop]=null;
}
catch(e){
}
try{
delete node[prop];
}
catch(e){
}
try{
node.removeAttribute(prop);
}
catch(e){
}
}
this.clobber=function(_32d){
var na;
var tna;
if(_32d){
tna=_32d.all||_32d.getElementsByTagName("*");
na=[_32d];
for(var x=0;x<tna.length;x++){
if(tna[x]["__doClobber__"]){
na.push(tna[x]);
}
}
}else{
try{
window.onload=null;
}
catch(e){
}
na=(this.clobberNodes.length)?this.clobberNodes:document.all;
}
tna=null;
var _331={};
for(var i=na.length-1;i>=0;i=i-1){
var el=na[i];
if(el["__clobberAttrs__"]){
for(var j=0;j<el.__clobberAttrs__.length;j++){
nukeProp(el,el.__clobberAttrs__[j]);
}
nukeProp(el,"__clobberAttrs__");
nukeProp(el,"__doClobber__");
}
}
na=null;
};
};
if(dojo.render.html.ie){
dojo.addOnUnload(function(){
dojo._ie_clobber.clobber();
try{
if((dojo["widget"])&&(dojo.widget["manager"])){
dojo.widget.manager.destroyAll();
}
}
catch(e){
}
try{
window.onload=null;
}
catch(e){
}
try{
window.onunload=null;
}
catch(e){
}
dojo._ie_clobber.clobberNodes=[];
});
}
dojo.event.browser=new function(){
var _335=0;
this.clean=function(node){
if(dojo.render.html.ie){
dojo._ie_clobber.clobber(node);
}
};
this.addClobberNode=function(node){
if(!dojo.render.html.ie){
return;
}
if(!node["__doClobber__"]){
node.__doClobber__=true;
dojo._ie_clobber.clobberNodes.push(node);
node.__clobberAttrs__=[];
}
};
this.addClobberNodeAttrs=function(node,_339){
if(!dojo.render.html.ie){
return;
}
this.addClobberNode(node);
for(var x=0;x<_339.length;x++){
node.__clobberAttrs__.push(_339[x]);
}
};
this.removeListener=function(node,_33c,fp,_33e){
if(!_33e){
var _33e=false;
}
_33c=_33c.toLowerCase();
if(_33c.substr(0,2)=="on"){
_33c=_33c.substr(2);
}
if(node.removeEventListener){
node.removeEventListener(_33c,fp,_33e);
}
};
this.addListener=function(node,_340,fp,_342,_343){
if(!node){
return;
}
if(!_342){
var _342=false;
}
_340=_340.toLowerCase();
if(_340.substr(0,2)!="on"){
_340="on"+_340;
}
if(!_343){
var _344=function(evt){
if(!evt){
evt=window.event;
}
var ret=fp(dojo.event.browser.fixEvent(evt,this));
if(_342){
dojo.event.browser.stopEvent(evt);
}
return ret;
};
}else{
_344=fp;
}
if(node.addEventListener){
node.addEventListener(_340.substr(2),_344,_342);
return _344;
}else{
if(typeof node[_340]=="function"){
var _347=node[_340];
node[_340]=function(e){
_347(e);
return _344(e);
};
}else{
node[_340]=_344;
}
if(dojo.render.html.ie){
this.addClobberNodeAttrs(node,[_340]);
}
return _344;
}
};
this.isEvent=function(obj){
return (typeof obj!="undefined")&&(typeof Event!="undefined")&&(obj.eventPhase);
};
this.currentEvent=null;
this.callListener=function(_34a,_34b){
if(typeof _34a!="function"){
dojo.raise("listener not a function: "+_34a);
}
dojo.event.browser.currentEvent.currentTarget=_34b;
return _34a.call(_34b,dojo.event.browser.currentEvent);
};
this.stopPropagation=function(){
dojo.event.browser.currentEvent.cancelBubble=true;
};
this.preventDefault=function(){
dojo.event.browser.currentEvent.returnValue=false;
};
this.keys={KEY_BACKSPACE:8,KEY_TAB:9,KEY_ENTER:13,KEY_SHIFT:16,KEY_CTRL:17,KEY_ALT:18,KEY_PAUSE:19,KEY_CAPS_LOCK:20,KEY_ESCAPE:27,KEY_SPACE:32,KEY_PAGE_UP:33,KEY_PAGE_DOWN:34,KEY_END:35,KEY_HOME:36,KEY_LEFT_ARROW:37,KEY_UP_ARROW:38,KEY_RIGHT_ARROW:39,KEY_DOWN_ARROW:40,KEY_INSERT:45,KEY_DELETE:46,KEY_LEFT_WINDOW:91,KEY_RIGHT_WINDOW:92,KEY_SELECT:93,KEY_F1:112,KEY_F2:113,KEY_F3:114,KEY_F4:115,KEY_F5:116,KEY_F6:117,KEY_F7:118,KEY_F8:119,KEY_F9:120,KEY_F10:121,KEY_F11:122,KEY_F12:123,KEY_NUM_LOCK:144,KEY_SCROLL_LOCK:145};
this.revKeys=[];
for(var key in this.keys){
this.revKeys[this.keys[key]]=key;
}
this.fixEvent=function(evt,_34e){
if(!evt){
if(window["event"]){
evt=window.event;
}
}
if((evt["type"])&&(evt["type"].indexOf("key")==0)){
evt.keys=this.revKeys;
for(var key in this.keys){
evt[key]=this.keys[key];
}
if((dojo.render.html.ie)&&(evt["type"]=="keypress")){
evt.charCode=evt.keyCode;
}
}
if(dojo.render.html.ie){
if(!evt.target){
evt.target=evt.srcElement;
}
if(!evt.currentTarget){
evt.currentTarget=(_34e?_34e:evt.srcElement);
}
if(!evt.layerX){
evt.layerX=evt.offsetX;
}
if(!evt.layerY){
evt.layerY=evt.offsetY;
}
var doc=(evt.srcElement&&evt.srcElement.ownerDocument)?evt.srcElement.ownerDocument:document;
var _351=((dojo.render.html.ie55)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;
if(!evt.pageX){
evt.pageX=evt.clientX+(_351.scrollLeft||0);
}
if(!evt.pageY){
evt.pageY=evt.clientY+(_351.scrollTop||0);
}
if(evt.type=="mouseover"){
evt.relatedTarget=evt.fromElement;
}
if(evt.type=="mouseout"){
evt.relatedTarget=evt.toElement;
}
this.currentEvent=evt;
evt.callListener=this.callListener;
evt.stopPropagation=this.stopPropagation;
evt.preventDefault=this.preventDefault;
}
return evt;
};
this.stopEvent=function(ev){
if(window.event){
ev.returnValue=false;
ev.cancelBubble=true;
}else{
ev.preventDefault();
ev.stopPropagation();
}
};
};
dojo.provide("dojo.event.*");
dojo.provide("dojo.xml.Parse");
dojo.xml.Parse=function(){
function getDojoTagName(node){
var _354=node.tagName;
if(dojo.render.html.capable&&dojo.render.html.ie&&node.scopeName!="HTML"){
_354=node.scopeName+":"+_354;
}
if(_354.substr(0,5).toLowerCase()=="dojo:"){
return _354.toLowerCase();
}
if(_354.substr(0,4).toLowerCase()=="dojo"){
return "dojo:"+_354.substring(4).toLowerCase();
}
var djt=node.getAttribute("dojoType")||node.getAttribute("dojotype");
if(djt){
if(djt.indexOf(":")<0){
djt="dojo:"+djt;
}
return djt.toLowerCase();
}
if(node.getAttributeNS&&node.getAttributeNS(dojo.dom.dojoml,"type")){
return "dojo:"+node.getAttributeNS(dojo.dom.dojoml,"type").toLowerCase();
}
try{
djt=node.getAttribute("dojo:type");
}
catch(e){
}
if(djt){
return "dojo:"+djt.toLowerCase();
}
if(!dj_global["djConfig"]||!djConfig["ignoreClassNames"]){
var _356=node.className||node.getAttribute("class");
if(_356&&_356.indexOf&&_356.indexOf("dojo-")!=-1){
var _357=_356.split(" ");
for(var x=0;x<_357.length;x++){
if(_357[x].length>5&&_357[x].indexOf("dojo-")>=0){
return "dojo:"+_357[x].substr(5).toLowerCase();
}
}
}
}
return _354.toLowerCase();
}
this.parseElement=function(node,_35a,_35b,_35c){
var _35d={};
if(node.tagName&&node.tagName.indexOf("/")==0){
return null;
}
var _35e=getDojoTagName(node);
_35d[_35e]=[];
if(_35e.substr(0,4).toLowerCase()=="dojo"){
_35d.namespace="dojo";
}else{
var pos=_35e.indexOf(":");
if(pos>0){
_35d.namespace=_35e.substring(0,pos);
}
}
var _360=false;
if(!_35b){
_360=true;
}else{
if(_35d.namespace&&dojo.getNamespace(_35d.namespace)){
_360=true;
}else{
if(dojo.widget.tags[_35e]){
dojo.deprecated("dojo.xml.Parse.parseElement","Widgets should be placed in a defined namespace","0.5");
_360=true;
}
}
}
if(_360){
var _361=this.parseAttributes(node);
for(var attr in _361){
if((!_35d[_35e][attr])||(typeof _35d[_35e][attr]!="array")){
_35d[_35e][attr]=[];
}
_35d[_35e][attr].push(_361[attr]);
}
_35d[_35e].nodeRef=node;
_35d.tagName=_35e;
_35d.index=_35c||0;
}
var _363=0;
for(var i=0;i<node.childNodes.length;i++){
var tcn=node.childNodes.item(i);
switch(tcn.nodeType){
case dojo.dom.ELEMENT_NODE:
_363++;
var ctn=getDojoTagName(tcn);
if(!_35d[ctn]){
_35d[ctn]=[];
}
_35d[ctn].push(this.parseElement(tcn,true,_35b,_363));
if((tcn.childNodes.length==1)&&(tcn.childNodes.item(0).nodeType==dojo.dom.TEXT_NODE)){
_35d[ctn][_35d[ctn].length-1].value=tcn.childNodes.item(0).nodeValue;
}
break;
case dojo.dom.TEXT_NODE:
if(node.childNodes.length==1){
_35d[_35e].push({value:node.childNodes.item(0).nodeValue});
}
break;
default:
break;
}
}
return _35d;
};
this.parseAttributes=function(node){
var _368={};
var atts=node.attributes;
var _36a,i=0;
while((_36a=atts[i++])){
if((dojo.render.html.capable)&&(dojo.render.html.ie)){
if(!_36a){
continue;
}
if((typeof _36a=="object")&&(typeof _36a.nodeValue=="undefined")||(_36a.nodeValue==null)||(_36a.nodeValue=="")){
continue;
}
}
var nn=_36a.nodeName.split(":");
nn=(nn.length==2)?nn[1]:_36a.nodeName;
_368[nn]={value:_36a.nodeValue};
}
return _368;
};
};
dojo.provide("dojo.lang.declare");
dojo.lang.declare=function(_36c,_36d,init,_36f){
if((dojo.lang.isFunction(_36f))||((!_36f)&&(!dojo.lang.isFunction(init)))){
var temp=_36f;
_36f=init;
init=temp;
}
var _371=[];
if(dojo.lang.isArray(_36d)){
_371=_36d;
_36d=_371.shift();
}
if(!init){
init=dojo.evalObjPath(_36c,false);
if((init)&&(!dojo.lang.isFunction(init))){
init=null;
}
}
var ctor=dojo.lang.declare._makeConstructor();
var scp=(_36d?_36d.prototype:null);
if(scp){
scp.prototyping=true;
ctor.prototype=new _36d();
scp.prototyping=false;
}
ctor.superclass=scp;
ctor.mixins=_371;
for(var i=0,l=_371.length;i<l;i++){
dojo.lang.extend(ctor,_371[i].prototype);
}
ctor.prototype.initializer=null;
ctor.prototype.declaredClass=_36c;
if(dojo.lang.isArray(_36f)){
dojo.lang.extend.apply(dojo.lang,[ctor].concat(_36f));
}else{
dojo.lang.extend(ctor,(_36f)||{});
}
dojo.lang.extend(ctor,dojo.lang.declare.base);
ctor.prototype.constructor=ctor;
ctor.prototype.initializer=(ctor.prototype.initializer)||(init)||(function(){
});
dojo.lang.setObjPathValue(_36c,ctor,null,true);
return ctor;
};
dojo.lang.declare._makeConstructor=function(){
return function(){
var self=this._getPropContext();
var s=self.constructor.superclass;
if((s)&&(s.constructor)){
if(s.constructor==arguments.callee){
this.inherited("constructor",arguments);
}else{
this._inherited(s,"constructor",arguments);
}
}
var m=(self.constructor.mixins)||([]);
for(var i=0,l=m.length;i<l;i++){
(((m[i].prototype)&&(m[i].prototype.initializer))||(m[i])).apply(this,arguments);
}
if((!this.prototyping)&&(self.initializer)){
self.initializer.apply(this,arguments);
}
};
};
dojo.lang.declare.base={_getPropContext:function(){
return (this.___proto||this);
},_inherited:function(_379,_37a,args){
var _37c=this.___proto;
this.___proto=_379;
var _37d=_379[_37a].apply(this,(args||[]));
this.___proto=_37c;
return _37d;
},inheritedFrom:function(ctor,prop,args){
var p=((ctor)&&(ctor.prototype)&&(ctor.prototype[prop]));
return (dojo.lang.isFunction(p)?p.apply(this,(args||[])):p);
},inherited:function(prop,args){
var p=this._getPropContext();
do{
if((!p.constructor)||(!p.constructor.superclass)){
return;
}
p=p.constructor.superclass;
}while(!(prop in p));
return (dojo.lang.isFunction(p[prop])?this._inherited(p,prop,args):p[prop]);
}};
dojo.declare=dojo.lang.declare;
dojo.provide("dojo.widget.Manager");
dojo.widget.manager=new function(){
this.widgets=[];
this.widgetIds=[];
this.topWidgets={};
var _385={};
var _386=[];
this.getUniqueId=function(_387){
return _387+"_"+(_385[_387]!=undefined?++_385[_387]:_385[_387]=0);
};
this.add=function(_388){
this.widgets.push(_388);
if(!_388.extraArgs["id"]){
_388.extraArgs["id"]=_388.extraArgs["ID"];
}
if(_388.widgetId==""){
if(_388["id"]){
_388.widgetId=_388["id"];
}else{
if(_388.extraArgs["id"]){
_388.widgetId=_388.extraArgs["id"];
}else{
_388.widgetId=this.getUniqueId(_388.widgetType);
}
}
}
if(this.widgetIds[_388.widgetId]){
dojo.debug("widget ID collision on ID: "+_388.widgetId);
}
this.widgetIds[_388.widgetId]=_388;
};
this.destroyAll=function(){
for(var x=this.widgets.length-1;x>=0;x--){
try{
this.widgets[x].destroy(true);
delete this.widgets[x];
}
catch(e){
}
}
};
this.remove=function(_38a){
if(dojo.lang.isNumber(_38a)){
var tw=this.widgets[_38a].widgetId;
delete this.widgetIds[tw];
this.widgets.splice(_38a,1);
}else{
this.removeById(_38a);
}
};
this.removeById=function(id){
if(!dojo.lang.isString(id)){
id=id["widgetId"];
if(!id){
dojo.debug("invalid widget or id passed to removeById");
return;
}
}
for(var i=0;i<this.widgets.length;i++){
if(this.widgets[i].widgetId==id){
this.remove(i);
break;
}
}
};
this.getWidgetById=function(id){
if(dojo.lang.isString(id)){
return this.widgetIds[id];
}
return id;
};
this.getWidgetsByType=function(type){
var lt=type.toLowerCase();
var ret=[];
dojo.lang.forEach(this.widgets,function(x){
if(x.widgetType.toLowerCase()==lt){
ret.push(x);
}
});
return ret;
};
this.getWidgetsByFilter=function(_393,_394){
var ret=[];
dojo.lang.every(this.widgets,function(x){
if(_393(x)){
ret.push(x);
if(_394){
return false;
}
}
return true;
});
return (_394?ret[0]:ret);
};
this.getAllWidgets=function(){
return this.widgets.concat();
};
this.getWidgetByNode=function(node){
var w=this.getAllWidgets();
node=dojo.byId(node);
for(var i=0;i<w.length;i++){
if(w[i].domNode==node){
return w[i];
}
}
return null;
};
this.byId=this.getWidgetById;
this.byType=this.getWidgetsByType;
this.byFilter=this.getWidgetsByFilter;
this.byNode=this.getWidgetByNode;
var _39a={};
var _39b=["dojo.widget"];
for(var i=0;i<_39b.length;i++){
_39b[_39b[i]]=true;
}
this.registerWidgetPackage=function(_39d){
if(!_39b[_39d]){
_39b[_39d]=true;
_39b.push(_39d);
}
};
this.getWidgetPackageList=function(){
return dojo.lang.map(_39b,function(elt){
return (elt!==true?elt:undefined);
});
};
this.getImplementation=function(_39f,_3a0,_3a1,_3a2){
var impl=this.getImplementationName(_39f,_3a2);
if(impl){
var ret;
if(_3a0){
ret=new impl(ctor);
}else{
ret=new impl();
}
return ret;
}
};
this.getImplementationName=function(_3a5,_3a6){
if(!_3a6){
_3a6="dojo";
}
var _3a7=_3a5.toLowerCase();
if(!_39a[_3a6]){
_39a[_3a6]={};
}
var impl=_39a[_3a6][_3a7];
if(impl){
return impl;
}
var ns=dojo.getNamespace(_3a6);
if(ns){
ns.load(_3a5);
}
if(!_386.length){
for(var _3aa in dojo.render){
if(dojo.render[_3aa]["capable"]===true){
var _3ab=dojo.render[_3aa].prefixes;
for(var i=0;i<_3ab.length;i++){
_386.push(_3ab[i].toLowerCase());
}
}
}
_386.push("");
}
var _3ad=null;
var _3ae=false;
for(var _3af=0;_3af<2;_3af++){
for(var i=0;i<_39b.length;i++){
var _3b0=dojo.evalObjPath(_39b[i]);
if(!_3b0){
continue;
}
var pos=_39b[i].indexOf(".");
if(pos>-1){
var n=_39b[i].substring(0,pos);
if(n!=_3a6){
if(_3af==0){
continue;
}
if(!_3ae){
_3ae=true;
dojo.deprecated("dojo.widget.Manager.getImplementationName","Wrong namespace ("+_3a6+") specified. Developers should specify correct namespaces for all non-Dojo widgets","0.5");
}
}
}
for(var j=0;j<_386.length;j++){
if(!_3b0[_386[j]]){
continue;
}
for(var _3b4 in _3b0[_386[j]]){
if(_3b4.toLowerCase()!=_3a7){
continue;
}
_39a[_3a6][_3a7]=_3b0[_386[j]][_3b4];
return _39a[_3a6][_3a7];
}
}
for(var j=0;j<_386.length;j++){
for(var _3b4 in _3b0){
if(_3b4.toLowerCase()!=(_386[j]+_3a7)&&_3b4.toLowerCase()!=_3a7){
continue;
}
_39a[_3a6][_3a7]=_3b0[_3b4];
return _39a[_3a6][_3a7];
}
}
}
var _3b5=dojo.findNamespaceForWidget(_3a7);
if(_3b5){
_3a6=_3b5.nsPrefix;
}
}
throw new Error("Could not locate \""+_3a5+"\" class");
};
this.resizing=false;
this.onWindowResized=function(){
if(this.resizing){
return;
}
try{
this.resizing=true;
for(var id in this.topWidgets){
var _3b7=this.topWidgets[id];
if(_3b7.checkSize){
_3b7.checkSize();
}
}
}
catch(e){
}
finally{
this.resizing=false;
}
};
if(typeof window!="undefined"){
dojo.addOnLoad(this,"onWindowResized");
dojo.event.connect(window,"onresize",this,"onWindowResized");
}
};
(function(){
var dw=dojo.widget;
var dwm=dw.manager;
var h=dojo.lang.curry(dojo.lang,"hitch",dwm);
var g=function(_3bc,_3bd){
dw[(_3bd||_3bc)]=h(_3bc);
};
g("add","addWidget");
g("destroyAll","destroyAllWidgets");
g("remove","removeWidget");
g("removeById","removeWidgetById");
g("getWidgetById");
g("getWidgetById","byId");
g("getWidgetsByType");
g("getWidgetsByFilter");
g("getWidgetsByType","byType");
g("getWidgetsByFilter","byFilter");
g("getWidgetByNode","byNode");
dw.all=function(n){
var _3bf=dwm.getAllWidgets.apply(dwm,arguments);
if(arguments.length>0){
return _3bf[n];
}
return _3bf;
};
g("registerWidgetPackage");
g("getImplementation","getWidgetImplementation");
g("getImplementationName","getWidgetImplementationName");
dw.widgets=dwm.widgets;
dw.widgetIds=dwm.widgetIds;
dw.root=dwm.root;
})();
dojo.provide("dojo.widget.Widget");
dojo.provide("dojo.widget.tags");
dojo.declare("dojo.widget.Widget",null,function(){
this.children=[];
this.extraArgs={};
},{parent:null,isTopLevel:false,isModal:false,isEnabled:true,isHidden:false,isContainer:false,widgetId:"",widgetType:"Widget",namespace:"dojo",toString:function(){
return "[Widget "+this.widgetType+", "+(this.widgetId||"NO ID")+"]";
},repr:function(){
return this.toString();
},enable:function(){
this.isEnabled=true;
},disable:function(){
this.isEnabled=false;
},hide:function(){
this.isHidden=true;
},show:function(){
this.isHidden=false;
},onResized:function(){
this.notifyChildrenOfResize();
},notifyChildrenOfResize:function(){
for(var i=0;i<this.children.length;i++){
var _3c1=this.children[i];
if(_3c1.onResized){
_3c1.onResized();
}
}
},create:function(args,_3c3,_3c4,_3c5){
if(_3c5){
this.namespace=_3c5;
}
this.satisfyPropertySets(args,_3c3,_3c4);
this.mixInProperties(args,_3c3,_3c4);
this.postMixInProperties(args,_3c3,_3c4);
dojo.widget.manager.add(this);
this.buildRendering(args,_3c3,_3c4);
this.initialize(args,_3c3,_3c4);
this.postInitialize(args,_3c3,_3c4);
this.postCreate(args,_3c3,_3c4);
return this;
},destroy:function(_3c6){
this.destroyChildren();
this.uninitialize();
this.destroyRendering(_3c6);
dojo.widget.manager.removeById(this.widgetId);
},destroyChildren:function(){
while(this.children.length>0){
var tc=this.children[0];
this.removeChild(tc);
tc.destroy();
}
},getChildrenOfType:function(type,_3c9){
var ret=[];
var _3cb=dojo.lang.isFunction(type);
if(!_3cb){
type=type.toLowerCase();
}
for(var x=0;x<this.children.length;x++){
if(_3cb){
if(this.children[x] instanceof type){
ret.push(this.children[x]);
}
}else{
if(this.children[x].widgetType.toLowerCase()==type){
ret.push(this.children[x]);
}
}
if(_3c9){
ret=ret.concat(this.children[x].getChildrenOfType(type,_3c9));
}
}
return ret;
},getDescendants:function(){
var _3cd=[];
var _3ce=[this];
var elem;
while((elem=_3ce.pop())){
_3cd.push(elem);
if(elem.children){
dojo.lang.forEach(elem.children,function(elem){
_3ce.push(elem);
});
}
}
return _3cd;
},isFirstNode:function(){
return this===this.parent.children[0];
},isLastNode:function(){
return this===this.parent.children[this.parent.children.length-1];
},satisfyPropertySets:function(args){
return args;
},mixInProperties:function(args,frag){
if((args["fastMixIn"])||(frag["fastMixIn"])){
for(var x in args){
this[x]=args[x];
}
return;
}
var _3d5;
var _3d6=dojo.widget.lcArgsCache[this.widgetType];
if(_3d6==null){
_3d6={};
for(var y in this){
_3d6[((new String(y)).toLowerCase())]=y;
}
dojo.widget.lcArgsCache[this.widgetType]=_3d6;
}
var _3d8={};
for(var x in args){
if(!this[x]){
var y=_3d6[(new String(x)).toLowerCase()];
if(y){
args[y]=args[x];
x=y;
}
}
if(_3d8[x]){
continue;
}
_3d8[x]=true;
if((typeof this[x])!=(typeof _3d5)){
if(typeof args[x]!="string"){
this[x]=args[x];
}else{
if(dojo.lang.isString(this[x])){
this[x]=args[x];
}else{
if(dojo.lang.isNumber(this[x])){
this[x]=new Number(args[x]);
}else{
if(dojo.lang.isBoolean(this[x])){
this[x]=(args[x].toLowerCase()=="false")?false:true;
}else{
if(dojo.lang.isFunction(this[x])){
if(args[x].search(/[^\w\.]+/i)==-1){
this[x]=dojo.evalObjPath(args[x],false);
}else{
var tn=dojo.lang.nameAnonFunc(new Function(args[x]),this);
dojo.event.connect(this,x,this,tn);
}
}else{
if(dojo.lang.isArray(this[x])){
this[x]=args[x].split(";");
}else{
if(this[x] instanceof Date){
this[x]=new Date(Number(args[x]));
}else{
if(typeof this[x]=="object"){
if(this[x] instanceof dojo.uri.Uri){
this[x]=args[x];
}else{
var _3da=args[x].split(";");
for(var y=0;y<_3da.length;y++){
var si=_3da[y].indexOf(":");
if((si!=-1)&&(_3da[y].length>si)){
this[x][_3da[y].substr(0,si).replace(/^\s+|\s+$/g,"")]=_3da[y].substr(si+1);
}
}
}
}else{
this[x]=args[x];
}
}
}
}
}
}
}
}
}else{
this.extraArgs[x.toLowerCase()]=args[x];
}
}
},postMixInProperties:function(){
},initialize:function(args,frag){
return false;
},postInitialize:function(args,frag){
return false;
},postCreate:function(args,frag){
return false;
},uninitialize:function(){
return false;
},buildRendering:function(){
dojo.unimplemented("dojo.widget.Widget.buildRendering, on "+this.toString()+", ");
return false;
},destroyRendering:function(){
dojo.unimplemented("dojo.widget.Widget.destroyRendering");
return false;
},cleanUp:function(){
dojo.unimplemented("dojo.widget.Widget.cleanUp");
return false;
},addedTo:function(_3e2){
},addChild:function(_3e3){
dojo.unimplemented("dojo.widget.Widget.addChild");
return false;
},removeChild:function(_3e4){
for(var x=0;x<this.children.length;x++){
if(this.children[x]===_3e4){
this.children.splice(x,1);
break;
}
}
return _3e4;
},resize:function(_3e6,_3e7){
this.setWidth(_3e6);
this.setHeight(_3e7);
},setWidth:function(_3e8){
if((typeof _3e8=="string")&&(_3e8.substr(-1)=="%")){
this.setPercentageWidth(_3e8);
}else{
this.setNativeWidth(_3e8);
}
},setHeight:function(_3e9){
if((typeof _3e9=="string")&&(_3e9.substr(-1)=="%")){
this.setPercentageHeight(_3e9);
}else{
this.setNativeHeight(_3e9);
}
},setPercentageHeight:function(_3ea){
return false;
},setNativeHeight:function(_3eb){
return false;
},setPercentageWidth:function(_3ec){
return false;
},setNativeWidth:function(_3ed){
return false;
},getPreviousSibling:function(){
var idx=this.getParentIndex();
if(idx<=0){
return null;
}
return this.parent.children[idx-1];
},getSiblings:function(){
return this.parent.children;
},getParentIndex:function(){
return dojo.lang.indexOf(this.parent.children,this,true);
},getNextSibling:function(){
var idx=this.getParentIndex();
if(idx==this.parent.children.length-1){
return null;
}
if(idx<0){
return null;
}
return this.parent.children[idx+1];
}});
dojo.widget.lcArgsCache={};
dojo.widget.tags={};
dojo.widget.tags.addParseTreeHandler=function(type){
var _3f1=type.toLowerCase();
this[_3f1]=function(_3f2,_3f3,_3f4,_3f5,_3f6){
var _3f7=_3f1;
dojo.profile.start(_3f7);
var n=dojo.widget.buildWidgetFromParseTree(_3f1,_3f2,_3f3,_3f4,_3f5,_3f6);
dojo.profile.end(_3f7);
return n;
};
};
dojo.widget.tags.addParseTreeHandler("dojo:widget");
dojo.widget.tags["dojo:propertyset"]=function(_3f9,_3fa,_3fb){
var _3fc=_3fa.parseProperties(_3f9["dojo:propertyset"]);
};
dojo.widget.tags["dojo:connect"]=function(_3fd,_3fe,_3ff){
var _400=_3fe.parseProperties(_3fd["dojo:connect"]);
};
dojo.widget.buildWidgetFromParseTree=function(type,frag,_403,_404,_405,_406){
var _407=type.split(":");
_407=(_407.length==2)?_407[1]:type;
var _408=_406||_403.parseProperties(frag[frag.namespace+":"+_407]);
var _409=dojo.widget.manager.getImplementation(_407,null,null,frag.namespace);
if(!_409){
throw new Error("cannot find \""+_407+"\" widget");
}else{
if(!_409.create){
throw new Error("\""+_407+"\" widget object does not appear to implement *Widget");
}
}
_408["dojoinsertionindex"]=_405;
var ret=_409.create(_408,frag,_404,frag.namespace);
return ret;
};
dojo.widget.defineWidget=function(_40b,_40c,_40d,init,_40f){
if(dojo.lang.isString(arguments[3])){
dojo.widget._defineWidget(arguments[0],arguments[3],arguments[1],arguments[4],arguments[2]);
}else{
var args=[arguments[0]],p=3;
if(dojo.lang.isString(arguments[1])){
args.push(arguments[1],arguments[2]);
}else{
args.push("",arguments[1]);
p=2;
}
if(dojo.lang.isFunction(arguments[p])){
args.push(arguments[p],arguments[p+1]);
}else{
args.push(null,arguments[p]);
}
dojo.widget._defineWidget.apply(this,args);
}
};
dojo.widget.defineWidget.renderers="html|svg|vml";
dojo.widget._defineWidget=function(_411,_412,_413,init,_415){
var _416=_411.split(".");
var type=_416.pop();
var regx="\\.("+(_412?_412+"|":"")+dojo.widget.defineWidget.renderers+")\\.";
var r=_411.search(new RegExp(regx));
_416=(r<0?_416.join("."):_411.substr(0,r));
dojo.widget.manager.registerWidgetPackage(_416);
var pos=_416.indexOf(".");
var _41b=(pos>-1)?_416.substring(0,pos):_416;
dojo.widget.tags.addParseTreeHandler(_41b+":"+type.toLowerCase());
if(_41b!="dojo"){
dojo.widget.tags.addParseTreeHandler("dojo:"+type.toLowerCase());
}
_415=(_415)||{};
_415.widgetType=type;
if((!init)&&(_415["classConstructor"])){
init=_415.classConstructor;
delete _415.classConstructor;
}
dojo.declare(_411,_413,init,_415);
};
dojo.provide("dojo.namespace");
dojo.Namespace=function(_41c,_41d,_41e,_41f){
this.root=_41c;
this.location=_41d;
this.nsPrefix=_41e;
this.resolver=_41f;
dojo.setModulePrefix(_41e,_41d);
};
dojo.Namespace.prototype._loaded={};
dojo.Namespace.prototype.load=function(name,_421){
if(this.resolver){
var _422=this.resolver(name,_421);
if(_422&&!this._loaded[_422]){
var req=dojo.require;
req(_422);
this._loaded[_422]=true;
}
if(this._loaded[_422]){
return true;
}
}
return false;
};
dojo.defineNamespace=function(_424,_425,_426,_427,_428){
if(dojo._namespaces[_424]){
return;
}
var ns=new dojo.Namespace(_424,_425,_426,_427);
dojo._namespaces[_424]=ns;
if(_426){
dojo._namespaces[_426]=ns;
}
if(_428){
dojo.widget.manager.registerWidgetPackage(_428);
}
};
dojo.findNamespaceForWidget=function(_42a){
dojo.deprecated("dojo.findNamespaceForWidget","Widget ["+_42a+"] not defined for a namespace"+", so searching all namespaces. Developers should specify namespaces for all non-Dojo widgets","0.5");
_42a=_42a.toLowerCase();
for(x in dojo._namespaces){
if(dojo._namespaces[x].load(_42a)){
return dojo._namespaces[x];
}
}
};
dojo.provide("dojo.widget.Parse");
dojo.widget.Parse=function(_42b){
this.propertySetsList=[];
this.fragment=_42b;
this.createComponents=function(frag,_42d){
var _42e=[];
var _42f=false;
try{
if((frag)&&(frag["tagName"])&&(frag!=frag["nodeRef"])){
var _430=dojo.widget.tags;
var tna=String(frag["tagName"]).split(";");
for(var x=0;x<tna.length;x++){
var ltn=(tna[x].replace(/^\s+|\s+$/g,"")).toLowerCase();
var pos=ltn.indexOf(":");
var _435=(pos>0)?ltn.substring(0,pos):null;
if(!_430[ltn]&&dojo.getNamespace&&dojo.lang.isString(ltn)&&pos>0){
var ns=dojo.getNamespace(_435);
var _437=ltn.substring(pos+1,ltn.length);
var _438=null;
var _439=frag[ltn]["dojoDomain"]||frag[ltn]["dojodomain"];
if(_439){
_438=_439[0].value;
}
if(ns){
ns.load(_437,_438);
}
}
if(!_430[ltn]){
dojo.deprecated("dojo.widget.Parse.createComponents","Widget not defined for  namespace"+_435+", so searching all namespaces. Developers should specify namespaces for all non-Dojo widgets","0.5");
var _43a=dojo.findNamespaceForWidget(_437);
if(_43a){
ltn=_43a.nsPrefix+":"+(ltn.indexOf(":")>0?ltn.substring(ltn.indexOf(":")+1):ltn);
}
}
if(_430[ltn]){
_42f=true;
frag.tagName=ltn;
var ret=_430[ltn](frag,this,_42d,frag["index"]);
_42e.push(ret);
}else{
if(dojo.lang.isString(ltn)&&_435&&dojo._namespaces[_435]){
dojo.debug("no tag handler registered for type: ",ltn);
}
}
}
}
}
catch(e){
dojo.debug("dojo.widget.Parse: error:",e);
}
if(!_42f){
_42e=_42e.concat(this.createSubComponents(frag,_42d));
}
return _42e;
};
this.createSubComponents=function(_43c,_43d){
var frag,comps=[];
for(var item in _43c){
frag=_43c[item];
if((frag)&&(typeof frag=="object")&&(frag!=_43c.nodeRef)&&(frag!=_43c["tagName"])){
comps=comps.concat(this.createComponents(frag,_43d));
}
}
return comps;
};
this.parsePropertySets=function(_440){
return [];
var _441=[];
for(var item in _440){
if((_440[item]["tagName"]=="dojo:propertyset")){
_441.push(_440[item]);
}
}
this.propertySetsList.push(_441);
return _441;
};
this.parseProperties=function(_443){
var _444={};
for(var item in _443){
if((_443[item]==_443["tagName"])||(_443[item]==_443.nodeRef)){
}else{
if((_443[item]["tagName"])&&(dojo.widget.tags[_443[item].tagName.toLowerCase()])){
}else{
if((_443[item][0])&&(_443[item][0].value!="")&&(_443[item][0].value!=null)){
try{
if(item.toLowerCase()=="dataprovider"){
var _446=this;
this.getDataProvider(_446,_443[item][0].value);
_444.dataProvider=this.dataProvider;
}
_444[item]=_443[item][0].value;
var _447=this.parseProperties(_443[item]);
for(var _448 in _447){
_444[_448]=_447[_448];
}
}
catch(e){
dojo.debug(e);
}
}
}
}
}
return _444;
};
this.getDataProvider=function(_449,_44a){
dojo.io.bind({url:_44a,load:function(type,_44c){
if(type=="load"){
_449.dataProvider=_44c;
}
},mimetype:"text/javascript",sync:true});
};
this.getPropertySetById=function(_44d){
for(var x=0;x<this.propertySetsList.length;x++){
if(_44d==this.propertySetsList[x]["id"][0].value){
return this.propertySetsList[x];
}
}
return "";
};
this.getPropertySetsByType=function(_44f){
var _450=[];
for(var x=0;x<this.propertySetsList.length;x++){
var cpl=this.propertySetsList[x];
var cpcc=cpl["componentClass"]||cpl["componentType"]||null;
var _454=this.propertySetsList[x]["id"][0].value;
if((cpcc)&&(_454==cpcc[0].value)){
_450.push(cpl);
}
}
return _450;
};
this.getPropertySets=function(_455){
var ppl="dojo:propertyproviderlist";
var _457=[];
var _458=_455["tagName"];
if(_455[ppl]){
var _459=_455[ppl].value.split(" ");
for(var _45a in _459){
if((_45a.indexOf("..")==-1)&&(_45a.indexOf("://")==-1)){
var _45b=this.getPropertySetById(_45a);
if(_45b!=""){
_457.push(_45b);
}
}else{
}
}
}
return (this.getPropertySetsByType(_458)).concat(_457);
};
this.createComponentFromScript=function(_45c,_45d,_45e,_45f){
if(!_45f){
_45f="dojo";
}
var ltn=_45f+":"+_45d.toLowerCase();
var _461=dojo.widget.tags;
if(!_461[ltn]&&dojo.getNamespace&&dojo.lang.isString(ltn)){
var ns=dojo.getNamespace(_45f);
if(ns){
ns.load(_45d);
}
}
if(!_461[ltn]){
dojo.deprecated("dojo.widget.Parse.createComponentFromScript","Widget not defined for namespace"+_45f+", so searching all namespaces. Developers should specify namespaces for all non-Dojo widgets","0.5");
var _463=dojo.findNamespaceForWidget(_45d.toLowerCase());
if(_463){
var _464=_463.nsPrefix+":"+(ltn.indexOf(":")>0?ltn.substring(ltn.indexOf(":")+1):ltn);
_45e[_464]=_45e[ltn];
_45e.namespace=_463.nsPrefix;
ltn=_464;
}
}
if(_461[ltn]){
_45e.fastMixIn=true;
var ret=[dojo.widget.buildWidgetFromParseTree(ltn,_45e,this,null,null,_45e)];
return ret;
}else{
dojo.debug("no tag handler registered for type: ",ltn);
}
};
};
dojo.widget._parser_collection={"dojo":new dojo.widget.Parse()};
dojo.widget.getParser=function(name){
if(!name){
name="dojo";
}
if(!this._parser_collection[name]){
this._parser_collection[name]=new dojo.widget.Parse();
}
return this._parser_collection[name];
};
dojo.widget.createWidget=function(name,_468,_469,_46a){
var _46b=false;
var _46c=(typeof name=="string");
if(_46c){
var pos=name.indexOf(":");
var _46e=(pos>-1)?name.substring(0,pos):"dojo";
if(pos>-1){
name=name.substring(pos+1);
}
var _46f=name.toLowerCase();
var _470=_46e+":"+_46f;
_46b=(dojo.byId(name)&&(!dojo.widget.tags[_470]));
}
if((arguments.length==1)&&((_46b)||(!_46c))){
var xp=new dojo.xml.Parse();
var tn=(_46b)?dojo.byId(name):name;
return dojo.widget.getParser().createComponents(xp.parseElement(tn,null,true))[0];
}
function fromScript(_473,name,_475,_476){
_475[_470]={dojotype:[{value:_46f}],nodeRef:_473,fastMixIn:true};
_475.namespace=_476;
return dojo.widget.getParser().createComponentFromScript(_473,name,_475,_476);
}
_468=_468||{};
var _477=false;
var tn=null;
var h=dojo.render.html.capable;
if(h){
tn=document.createElement("span");
}
if(!_469){
_477=true;
_469=tn;
if(h){
dojo.body().appendChild(_469);
}
}else{
if(_46a){
dojo.dom.insertAtPosition(tn,_469,_46a);
}else{
tn=_469;
}
}
var _479=fromScript(tn,name.toLowerCase(),_468,_46e);
if(!_479||!_479[0]||typeof _479[0].widgetType=="undefined"){
throw new Error("createWidget: Creation of \""+name+"\" widget failed.");
}
if(_477){
if(_479[0].domNode.parentNode){
_479[0].domNode.parentNode.removeChild(_479[0].domNode);
}
}
return _479[0];
};
dojo.provide("dojo.namespaces.dojo");
(function(){
var map={html:{"accordioncontainer":"dojo.widget.AccordionContainer","treerpccontroller":"dojo.widget.TreeRPCController","accordionpane":"dojo.widget.AccordionPane","button":"dojo.widget.Button","chart":"dojo.widget.Chart","checkbox":"dojo.widget.Checkbox","civicrmdatepicker":"dojo.widget.CiviCrmDatePicker","colorpalette":"dojo.widget.ColorPalette","combobox":"dojo.widget.ComboBox","contentpane":"dojo.widget.ContentPane","contextmenu":"dojo.widget.ContextMenu","datepicker":"dojo.widget.DatePicker","debugconsole":"dojo.widget.DebugConsole","dialog":"dojo.widget.Dialog","docpane":"dojo.widget.DocPane","dropdownbutton":"dojo.widget.DropdownButton","dropdowndatepicker":"dojo.widget.DropdownDatePicker","editor2":"dojo.widget.Editor2","editor2toolbar":"dojo.widget.Editor2Toolbar","editor":"dojo.widget.Editor","editortree":"dojo.widget.EditorTree","editortreecontextmenu":"dojo.widget.EditorTreeContextMenu","editortreenode":"dojo.widget.EditorTreeNode","fisheyelist":"dojo.widget.FisheyeList","editortreecontroller":"dojo.widget.EditorTreeController","googlemap":"dojo.widget.GoogleMap","editortreeselector":"dojo.widget.EditorTreeSelector","floatingpane":"dojo.widget.FloatingPane","hslcolorpicker":"dojo.widget.HslColorPicker","inlineeditbox":"dojo.widget.InlineEditBox","layoutcontainer":"dojo.widget.LayoutContainer","linkpane":"dojo.widget.LinkPane","manager":"dojo.widget.Manager","popupcontainer":"dojo.widget.Menu2","popupmenu2":"dojo.widget.Menu2","menuitem2":"dojo.widget.Menu2","menuseparator2":"dojo.widget.Menu2","menubar2":"dojo.widget.Menu2","menubaritem2":"dojo.widget.Menu2","monthlyCalendar":"dojo.widget.MonthlyCalendar","popupbutton":"dojo.widget.PopUpButton","richtext":"dojo.widget.RichText","remotetabcontroller":"dojo.widget.RemoteTabController","resizehandle":"dojo.widget.ResizeHandle","resizabletextarea":"dojo.widget.ResizableTextarea","select":"dojo.widget.Select","slideshow":"dojo.widget.SlideShow","sortabletable":"dojo.widget.SortableTable","simpledropdownbuttons":"dojo.widget.SimpleDropdownButtons","splitcontainer":"dojo.widget.SplitContainer","svgbutton":"dojo.widget.SvgButton","tabcontainer":"dojo.widget.TabContainer","taskbar":"dojo.widget.TaskBar","timepicker":"dojo.widget.TimePicker","titlepane":"dojo.widget.TitlePane","toaster":"dojo.widget.Toaster","toggler":"dojo.widget.Toggler","toolbar":"dojo.widget.Toolbar","tooltip":"dojo.widget.Tooltip","tree":"dojo.widget.Tree","treebasiccontroller":"dojo.widget.TreeBasicController","treecontextmenu":"dojo.widget.TreeContextMenu","treeselector":"dojo.widget.TreeSelector","treecontrollerextension":"dojo.widget.TreeControllerExtension","treenode":"dojo.widget.TreeNode","validate":"dojo.widget.validate","treeloadingcontroller":"dojo.widget.TreeLoadingController","widget":"dojo.widget.Widget","wizard":"dojo.widget.Wizard","yahoomap":"dojo.widget.YahooMap"},svg:{"chart":"dojo.widget.svg.Chart","hslcolorpicker":"dojo.widget.svg.HslColorPicker"},vml:{"chart":"dojo.widget.vml.Chart"}};
function dojoNamespaceResolver(name,_47c){
if(!_47c){
_47c="html";
}
if(!map[_47c]){
return null;
}
return map[_47c][name];
}
dojo.defineNamespace("dojo","src","dojo",dojoNamespaceResolver);
dojo.addDojoNamespaceMapping=function(_47d,_47e){
map[_47d]=_47e;
};
})();
dojo.provide("dojo.html.style");
dojo.html.getClass=function(node){
node=dojo.byId(node);
if(!node){
return "";
}
var cs="";
if(node.className){
cs=node.className;
}else{
if(dojo.html.hasAttribute(node,"class")){
cs=dojo.html.getAttribute(node,"class");
}
}
return cs.replace(/^\s+|\s+$/g,"");
};
dojo.html.getClasses=function(node){
var c=dojo.html.getClass(node);
return (c=="")?[]:c.split(/\s+/g);
};
dojo.html.hasClass=function(node,_484){
return (new RegExp("(^|\\s+)"+_484+"(\\s+|$)")).test(dojo.html.getClass(node));
};
dojo.html.prependClass=function(node,_486){
_486+=" "+dojo.html.getClass(node);
return dojo.html.setClass(node,_486);
};
dojo.html.addClass=function(node,_488){
if(dojo.html.hasClass(node,_488)){
return false;
}
_488=(dojo.html.getClass(node)+" "+_488).replace(/^\s+|\s+$/g,"");
return dojo.html.setClass(node,_488);
};
dojo.html.setClass=function(node,_48a){
node=dojo.byId(node);
var cs=new String(_48a);
try{
if(typeof node.className=="string"){
node.className=cs;
}else{
if(node.setAttribute){
node.setAttribute("class",_48a);
node.className=cs;
}else{
return false;
}
}
}
catch(e){
dojo.debug("dojo.html.setClass() failed",e);
}
return true;
};
dojo.html.removeClass=function(node,_48d,_48e){
try{
if(!_48e){
var _48f=dojo.html.getClass(node).replace(new RegExp("(^|\\s+)"+_48d+"(\\s+|$)"),"$1$2");
}else{
var _48f=dojo.html.getClass(node).replace(_48d,"");
}
dojo.html.setClass(node,_48f);
}
catch(e){
dojo.debug("dojo.html.removeClass() failed",e);
}
return true;
};
dojo.html.replaceClass=function(node,_491,_492){
dojo.html.removeClass(node,_492);
dojo.html.addClass(node,_491);
};
dojo.html.classMatchType={ContainsAll:0,ContainsAny:1,IsOnly:2};
dojo.html.getElementsByClass=function(_493,_494,_495,_496,_497){
var _498=dojo.doc();
_494=dojo.byId(_494)||_498;
var _499=_493.split(/\s+/g);
var _49a=[];
if(_496!=1&&_496!=2){
_496=0;
}
var _49b=new RegExp("(\\s|^)(("+_499.join(")|(")+"))(\\s|$)");
var _49c=_499.join(" ").length;
var _49d=[];
if(!_497&&_498.evaluate){
var _49e=".//"+(_495||"*")+"[contains(";
if(_496!=dojo.html.classMatchType.ContainsAny){
_49e+="concat(' ',@class,' '), ' "+_499.join(" ') and contains(concat(' ',@class,' '), ' ")+" ')";
if(_496==2){
_49e+=" and string-length(@class)="+_49c+"]";
}else{
_49e+="]";
}
}else{
_49e+="concat(' ',@class,' '), ' "+_499.join(" ')) or contains(concat(' ',@class,' '), ' ")+" ')]";
}
var _49f=_498.evaluate(_49e,_494,null,XPathResult.ANY_TYPE,null);
var _4a0=_49f.iterateNext();
while(_4a0){
try{
_49d.push(_4a0);
_4a0=_49f.iterateNext();
}
catch(e){
break;
}
}
return _49d;
}else{
if(!_495){
_495="*";
}
_49d=_494.getElementsByTagName(_495);
var node,i=0;
outer:
while(node=_49d[i++]){
var _4a2=dojo.html.getClasses(node);
if(_4a2.length==0){
continue outer;
}
var _4a3=0;
for(var j=0;j<_4a2.length;j++){
if(_49b.test(_4a2[j])){
if(_496==dojo.html.classMatchType.ContainsAny){
_49a.push(node);
continue outer;
}else{
_4a3++;
}
}else{
if(_496==dojo.html.classMatchType.IsOnly){
continue outer;
}
}
}
if(_4a3==_499.length){
if((_496==dojo.html.classMatchType.IsOnly)&&(_4a3==_4a2.length)){
_49a.push(node);
}else{
if(_496==dojo.html.classMatchType.ContainsAll){
_49a.push(node);
}
}
}
}
return _49a;
}
};
dojo.html.getElementsByClassName=dojo.html.getElementsByClass;
dojo.html.toCamelCase=function(_4a5){
var arr=_4a5.split("-"),cc=arr[0];
for(var i=1;i<arr.length;i++){
cc+=arr[i].charAt(0).toUpperCase()+arr[i].substring(1);
}
return cc;
};
dojo.html.toSelectorCase=function(_4a8){
return _4a8.replace(/([A-Z])/g,"-$1").toLowerCase();
};
dojo.html.getComputedStyle=function(node,_4aa,_4ab){
node=dojo.byId(node);
var _4aa=dojo.html.toSelectorCase(_4aa);
var _4ac=dojo.html.toCamelCase(_4aa);
if(!node||!node.style){
return _4ab;
}else{
if(document.defaultView&&dojo.dom.isDescendantOf(node,node.ownerDocument)){
try{
var cs=document.defaultView.getComputedStyle(node,"");
if(cs){
return cs.getPropertyValue(_4aa);
}
}
catch(e){
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_4aa);
}else{
return _4ab;
}
}
}else{
if(node.currentStyle){
return node.currentStyle[_4ac];
}
}
}
if(node.style.getPropertyValue){
return node.style.getPropertyValue(_4aa);
}else{
return _4ab;
}
};
dojo.html.getStyleProperty=function(node,_4af){
node=dojo.byId(node);
return (node&&node.style?node.style[dojo.html.toCamelCase(_4af)]:undefined);
};
dojo.html.getStyle=function(node,_4b1){
var _4b2=dojo.html.getStyleProperty(node,_4b1);
return (_4b2?_4b2:dojo.html.getComputedStyle(node,_4b1));
};
dojo.html.setStyle=function(node,_4b4,_4b5){
node=dojo.byId(node);
if(node&&node.style){
var _4b6=dojo.html.toCamelCase(_4b4);
node.style[_4b6]=_4b5;
}
};
dojo.html.copyStyle=function(_4b7,_4b8){
if(!_4b8.style.cssText){
_4b7.setAttribute("style",_4b8.getAttribute("style"));
}else{
_4b7.style.cssText=_4b8.style.cssText;
}
dojo.html.addClass(_4b7,dojo.html.getClass(_4b8));
};
dojo.html.getUnitValue=function(node,_4ba,_4bb){
var s=dojo.html.getComputedStyle(node,_4ba);
if((!s)||((s=="auto")&&(_4bb))){
return {value:0,units:"px"};
}
var _4bd=s.match(/(\-?[\d.]+)([a-z%]*)/i);
if(!_4bd){
return dojo.html.getUnitValue.bad;
}
return {value:Number(_4bd[1]),units:_4bd[2].toLowerCase()};
};
dojo.html.getUnitValue.bad={value:NaN,units:""};
dojo.html.getPixelValue=function(node,_4bf,_4c0){
var _4c1=dojo.html.getUnitValue(node,_4bf,_4c0);
if(isNaN(_4c1.value)){
return 0;
}
if((_4c1.value)&&(_4c1.units!="px")){
return NaN;
}
return _4c1.value;
};
dojo.html.setPositivePixelValue=function(node,_4c3,_4c4){
if(isNaN(_4c4)){
return false;
}
node.style[_4c3]=Math.max(0,_4c4)+"px";
return true;
};
dojo.html.styleSheet=null;
dojo.html.insertCssRule=function(_4c5,_4c6,_4c7){
if(!dojo.html.styleSheet){
if(document.createStyleSheet){
dojo.html.styleSheet=document.createStyleSheet();
}else{
if(document.styleSheets[0]){
dojo.html.styleSheet=document.styleSheets[0];
}else{
return null;
}
}
}
if(arguments.length<3){
if(dojo.html.styleSheet.cssRules){
_4c7=dojo.html.styleSheet.cssRules.length;
}else{
if(dojo.html.styleSheet.rules){
_4c7=dojo.html.styleSheet.rules.length;
}else{
return null;
}
}
}
if(dojo.html.styleSheet.insertRule){
var rule=_4c5+" { "+_4c6+" }";
return dojo.html.styleSheet.insertRule(rule,_4c7);
}else{
if(dojo.html.styleSheet.addRule){
return dojo.html.styleSheet.addRule(_4c5,_4c6,_4c7);
}else{
return null;
}
}
};
dojo.html.removeCssRule=function(_4c9){
if(!dojo.html.styleSheet){
dojo.debug("no stylesheet defined for removing rules");
return false;
}
if(dojo.html.render.ie){
if(!_4c9){
_4c9=dojo.html.styleSheet.rules.length;
dojo.html.styleSheet.removeRule(_4c9);
}
}else{
if(document.styleSheets[0]){
if(!_4c9){
_4c9=dojo.html.styleSheet.cssRules.length;
}
dojo.html.styleSheet.deleteRule(_4c9);
}
}
return true;
};
dojo.html._insertedCssFiles=[];
dojo.html.insertCssFile=function(URI,doc,_4cc){
if(!URI){
return;
}
if(!doc){
doc=document;
}
var _4cd=dojo.hostenv.getText(URI);
_4cd=dojo.html.fixPathsInCssText(_4cd,URI);
if(_4cc){
var idx=-1,node,ent=dojo.html._insertedCssFiles;
for(var i=0;i<ent.length;i++){
if((ent[i].doc==doc)&&(ent[i].cssText==_4cd)){
idx=i;
node=ent[i].nodeRef;
break;
}
}
if(node){
var _4d0=doc.getElementsByTagName("style");
for(var i=0;i<_4d0.length;i++){
if(_4d0[i]==node){
return;
}
}
dojo.html._insertedCssFiles.shift(idx,1);
}
}
var _4d1=dojo.html.insertCssText(_4cd);
dojo.html._insertedCssFiles.push({"doc":doc,"cssText":_4cd,"nodeRef":_4d1});
if(_4d1&&djConfig.isDebug){
_4d1.setAttribute("dbgHref",URI);
}
return _4d1;
};
dojo.html.insertCssText=function(_4d2,doc,URI){
if(!_4d2){
return;
}
if(!doc){
doc=document;
}
if(URI){
_4d2=dojo.html.fixPathsInCssText(_4d2,URI);
}
var _4d5=doc.createElement("style");
_4d5.setAttribute("type","text/css");
var head=doc.getElementsByTagName("head")[0];
if(!head){
dojo.debug("No head tag in document, aborting styles");
return;
}else{
head.appendChild(_4d5);
}
if(_4d5.styleSheet){
_4d5.styleSheet.cssText=_4d2;
}else{
var _4d7=doc.createTextNode(_4d2);
_4d5.appendChild(_4d7);
}
return _4d5;
};
dojo.html.fixPathsInCssText=function(_4d8,URI){
if(!_4d8||!URI){
return;
}
var _4da,str="",url="";
var _4db=/url\(\s*([\t\s\w()\/.\\'"-:#=&?]+)\s*\)/;
var _4dc=/(file|https?|ftps?):\/\//;
var _4dd=/^[\s]*(['"]?)([\w()\/.\\'"-:#=&?]*)\1[\s]*?$/;
while(_4da=_4db.exec(_4d8)){
url=_4da[1].replace(_4dd,"$2");
if(!_4dc.exec(url)){
url=(new dojo.uri.Uri(URI,url).toString());
}
str+=_4d8.substring(0,_4da.index)+"url("+url+")";
_4d8=_4d8.substr(_4da.index+_4da[0].length);
}
return str+_4d8;
};
dojo.html.setActiveStyleSheet=function(_4de){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")){
a.disabled=true;
if(a.getAttribute("title")==_4de){
a.disabled=false;
}
}
}
};
dojo.html.getActiveStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("title")&&!a.disabled){
return a.getAttribute("title");
}
}
return null;
};
dojo.html.getPreferredStyleSheet=function(){
var i=0,a,els=dojo.doc().getElementsByTagName("link");
while(a=els[i++]){
if(a.getAttribute("rel").indexOf("style")!=-1&&a.getAttribute("rel").indexOf("alt")==-1&&a.getAttribute("title")){
return a.getAttribute("title");
}
}
return null;
};
dojo.provide("dojo.uri.Uri");
dojo.uri=new function(){
this.dojoUri=function(uri){
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri(),uri);
};
this.nsUri=function(_4e3,uri){
var ns=dojo.getNamespace(_4e3);
if(!ns){
return null;
}
var loc=ns.location;
if(loc.lastIndexOf("/")!=loc.length-1){
loc+="/";
}
return new dojo.uri.Uri(dojo.hostenv.getBaseScriptUri()+loc,uri);
};
this.Uri=function(){
var uri=arguments[0];
for(var i=1;i<arguments.length;i++){
if(!arguments[i]){
continue;
}
var _4e9=new dojo.uri.Uri(arguments[i].toString());
var _4ea=new dojo.uri.Uri(uri.toString());
if(_4e9.path==""&&_4e9.scheme==null&&_4e9.authority==null&&_4e9.query==null){
if(_4e9.fragment!=null){
_4ea.fragment=_4e9.fragment;
}
_4e9=_4ea;
}else{
if(_4e9.scheme==null){
_4e9.scheme=_4ea.scheme;
if(_4e9.authority==null){
_4e9.authority=_4ea.authority;
if(_4e9.path.charAt(0)!="/"){
var path=_4ea.path.substring(0,_4ea.path.lastIndexOf("/")+1)+_4e9.path;
var segs=path.split("/");
for(var j=0;j<segs.length;j++){
if(segs[j]=="."){
if(j==segs.length-1){
segs[j]="";
}else{
segs.splice(j,1);
j--;
}
}else{
if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){
if(j==segs.length-1){
segs.splice(j,1);
segs[j-1]="";
}else{
segs.splice(j-1,2);
j-=2;
}
}
}
}
_4e9.path=segs.join("/");
}
}
}
}
uri="";
if(_4e9.scheme!=null){
uri+=_4e9.scheme+":";
}
if(_4e9.authority!=null){
uri+="//"+_4e9.authority;
}
uri+=_4e9.path;
if(_4e9.query!=null){
uri+="?"+_4e9.query;
}
if(_4e9.fragment!=null){
uri+="#"+_4e9.fragment;
}
}
this.uri=uri.toString();
var _4ee="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$";
var r=this.uri.match(new RegExp(_4ee));
this.scheme=r[2]||(r[1]?"":null);
this.authority=r[4]||(r[3]?"":null);
this.path=r[5];
this.query=r[7]||(r[6]?"":null);
this.fragment=r[9]||(r[8]?"":null);
if(this.authority!=null){
_4ee="^((([^:]+:)?([^@]+))@)?([^:]*)(:([0-9]+))?$";
r=this.authority.match(new RegExp(_4ee));
this.user=r[3]||null;
this.password=r[4]||null;
this.host=r[5];
this.port=r[7]||null;
}
this.toString=function(){
return this.uri;
};
};
};
dojo.provide("dojo.uri.*");
dojo.provide("dojo.widget.DomWidget");
dojo.widget._cssFiles={};
dojo.widget._cssStrings={};
dojo.widget._templateCache={};
dojo.widget.defaultStrings={dojoRoot:dojo.hostenv.getBaseScriptUri(),baseScriptUri:dojo.hostenv.getBaseScriptUri()};
dojo.widget.buildFromTemplate=function(){
dojo.lang.forward("fillFromTemplateCache");
};
dojo.widget.fillFromTemplateCache=function(obj,_4f1,_4f2,_4f3){
var _4f4=_4f1||obj.templatePath;
if(_4f4&&!(_4f4 instanceof dojo.uri.Uri)){
_4f4=dojo.uri.dojoUri(_4f4);
dojo.deprecated("templatePath should be of type dojo.uri.Uri",null,"0.4");
}
var _4f5=dojo.widget._templateCache;
if(!obj["widgetType"]){
do{
var _4f6="__dummyTemplate__"+dojo.widget._templateCache.dummyCount++;
}while(_4f5[_4f6]);
obj.widgetType=_4f6;
}
var wt=obj.widgetType;
var ts=_4f5[wt];
if(!ts){
_4f5[wt]={"string":null,"node":null};
if(_4f3){
ts={};
}else{
ts=_4f5[wt];
}
}
if((!obj.templateString)&&(!_4f3)){
obj.templateString=_4f2||ts["string"];
}
if((!obj.templateNode)&&(!_4f3)){
obj.templateNode=ts["node"];
}
if((!obj.templateNode)&&(!obj.templateString)&&(_4f4)){
var _4f9=dojo.hostenv.getText(_4f4);
if(_4f9){
_4f9=_4f9.replace(/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,"");
var _4fa=_4f9.match(/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im);
if(_4fa){
_4f9=_4fa[1];
}
}else{
_4f9="";
}
obj.templateString=_4f9;
if(!_4f3){
_4f5[wt]["string"]=_4f9;
}
}
if((!ts["string"])&&(!_4f3)){
ts.string=obj.templateString;
}
};
dojo.widget._templateCache.dummyCount=0;
dojo.widget.attachProperties=["dojoAttachPoint","id"];
dojo.widget.eventAttachProperty="dojoAttachEvent";
dojo.widget.onBuildProperty="dojoOnBuild";
dojo.widget.waiNames=["waiRole","waiState"];
dojo.widget.wai={waiRole:{name:"waiRole",namespace:"http://www.w3.org/TR/xhtml2",alias:"x2",prefix:"wairole:"},waiState:{name:"waiState",namespace:"http://www.w3.org/2005/07/aaa",alias:"aaa",prefix:""},setAttr:function(node,ns,attr,_4fe){
if(dojo.render.html.ie){
node.setAttribute(this[ns].alias+":"+attr,this[ns].prefix+_4fe);
}else{
node.setAttributeNS(this[ns].namespace,attr,this[ns].prefix+_4fe);
}
},getAttr:function(node,ns,attr){
if(dojo.render.html.ie){
return node.getAttribute(this[ns].alias+":"+attr);
}else{
return node.getAttributeNS(this[ns].namespace,attr);
}
}};
dojo.widget.attachTemplateNodes=function(_502,_503,_504){
var _505=dojo.dom.ELEMENT_NODE;
function trim(str){
return str.replace(/^\s+|\s+$/g,"");
}
if(!_502){
_502=_503.domNode;
}
if(_502.nodeType!=_505){
return;
}
var _507=_502.all||_502.getElementsByTagName("*");
var _508=_503;
for(var x=-1;x<_507.length;x++){
var _50a=(x==-1)?_502:_507[x];
var _50b=[];
for(var y=0;y<this.attachProperties.length;y++){
var _50d=_50a.getAttribute(this.attachProperties[y]);
if(_50d){
_50b=_50d.split(";");
for(var z=0;z<_50b.length;z++){
if(dojo.lang.isArray(_503[_50b[z]])){
_503[_50b[z]].push(_50a);
}else{
_503[_50b[z]]=_50a;
}
}
break;
}
}
var _50f=_50a.getAttribute(this.templateProperty);
if(_50f){
_503[_50f]=_50a;
}
dojo.lang.forEach(dojo.widget.waiNames,function(name){
var wai=dojo.widget.wai[name];
var val=_50a.getAttribute(wai.name);
if(val){
if(val.indexOf("-")==-1){
dojo.widget.wai.setAttr(_50a,wai.name,"role",val);
}else{
var _513=val.split("-");
dojo.widget.wai.setAttr(_50a,wai.name,_513[0],_513[1]);
}
}
},this);
var _514=_50a.getAttribute(this.eventAttachProperty);
if(_514){
var evts=_514.split(";");
for(var y=0;y<evts.length;y++){
if((!evts[y])||(!evts[y].length)){
continue;
}
var _516=null;
var tevt=trim(evts[y]);
if(evts[y].indexOf(":")>=0){
var _518=tevt.split(":");
tevt=trim(_518[0]);
_516=trim(_518[1]);
}
if(!_516){
_516=tevt;
}
var tf=function(){
var ntf=new String(_516);
return function(evt){
if(_508[ntf]){
_508[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_50a,tevt,tf,false,true);
}
}
for(var y=0;y<_504.length;y++){
var _51c=_50a.getAttribute(_504[y]);
if((_51c)&&(_51c.length)){
var _516=null;
var _51d=_504[y].substr(4);
_516=trim(_51c);
var _51e=[_516];
if(_516.indexOf(";")>=0){
_51e=dojo.lang.map(_516.split(";"),trim);
}
for(var z=0;z<_51e.length;z++){
if(!_51e[z].length){
continue;
}
var tf=function(){
var ntf=new String(_51e[z]);
return function(evt){
if(_508[ntf]){
_508[ntf](dojo.event.browser.fixEvent(evt,this));
}
};
}();
dojo.event.browser.addListener(_50a,_51d,tf,false,true);
}
}
}
var _521=_50a.getAttribute(this.onBuildProperty);
if(_521){
eval("var node = baseNode; var widget = targetObj; "+_521);
}
}
};
dojo.widget.getDojoEventsFromStr=function(str){
var re=/(dojoOn([a-z]+)(\s?))=/gi;
var evts=str?str.match(re)||[]:[];
var ret=[];
var lem={};
for(var x=0;x<evts.length;x++){
if(evts[x].legth<1){
continue;
}
var cm=evts[x].replace(/\s/,"");
cm=(cm.slice(0,cm.length-1));
if(!lem[cm]){
lem[cm]=true;
ret.push(cm);
}
}
return ret;
};
dojo.declare("dojo.widget.DomWidget",dojo.widget.Widget,function(){
if((arguments.length>0)&&(typeof arguments[0]=="object")){
this.create(arguments[0]);
}
},{templateNode:null,templateString:null,templateCssString:null,preventClobber:false,domNode:null,containerNode:null,addChild:function(_529,_52a,pos,ref,_52d){
if(!this.isContainer){
dojo.debug("dojo.widget.DomWidget.addChild() attempted on non-container widget");
return null;
}else{
if(_52d==undefined){
_52d=this.children.length;
}
this.addWidgetAsDirectChild(_529,_52a,pos,ref,_52d);
this.registerChild(_529,_52d);
}
return _529;
},addWidgetAsDirectChild:function(_52e,_52f,pos,ref,_532){
if((!this.containerNode)&&(!_52f)){
this.containerNode=this.domNode;
}
var cn=(_52f)?_52f:this.containerNode;
if(!pos){
pos="after";
}
if(!ref){
if(!cn){
cn=dojo.body();
}
ref=cn.lastChild;
}
if(!_532){
_532=0;
}
_52e.domNode.setAttribute("dojoinsertionindex",_532);
if(!ref){
cn.appendChild(_52e.domNode);
}else{
if(pos=="insertAtIndex"){
dojo.dom.insertAtIndex(_52e.domNode,ref.parentNode,_532);
}else{
if((pos=="after")&&(ref===cn.lastChild)){
cn.appendChild(_52e.domNode);
}else{
dojo.dom.insertAtPosition(_52e.domNode,cn,pos);
}
}
}
},registerChild:function(_534,_535){
_534.dojoInsertionIndex=_535;
var idx=-1;
for(var i=0;i<this.children.length;i++){
if(this.children[i].dojoInsertionIndex<_535){
idx=i;
}
}
this.children.splice(idx+1,0,_534);
_534.parent=this;
_534.addedTo(this,idx+1);
delete dojo.widget.manager.topWidgets[_534.widgetId];
},removeChild:function(_538){
dojo.dom.removeNode(_538.domNode);
return dojo.widget.DomWidget.superclass.removeChild.call(this,_538);
},getFragNodeRef:function(frag){
if(!frag||!frag[this.namespace+":"+this.widgetType.toLowerCase()]){
dojo.raise("Error: no frag for widget type "+this.widgetType+" with namespace "+this.namespace+", id "+this.widgetId+" (maybe a widget has set it's type incorrectly)");
}
return frag?frag[this.namespace+":"+this.widgetType.toLowerCase()]["nodeRef"]:null;
},postInitialize:function(args,frag,_53c){
var _53d=this.getFragNodeRef(frag);
if(_53c&&(_53c.snarfChildDomOutput||!_53d)){
_53c.addWidgetAsDirectChild(this,"","insertAtIndex","",args["dojoinsertionindex"],_53d);
}else{
if(_53d){
if(this.domNode&&(this.domNode!==_53d)){
var _53e=_53d.parentNode.replaceChild(this.domNode,_53d);
}
}
}
if(_53c){
_53c.registerChild(this,args.dojoinsertionindex);
}else{
dojo.widget.manager.topWidgets[this.widgetId]=this;
}
if(this.isContainer&&!frag["dojoDontFollow"]){
var _53f=dojo.widget.getParser();
_53f.createSubComponents(frag,this);
}
},buildRendering:function(args,frag){
var ts=dojo.widget._templateCache[this.widgetType];
if(args["templatecsspath"]){
args["templateCssPath"]=args["templatecsspath"];
}
var _543=args["templateCssPath"]||this.templateCssPath;
if(_543&&!(_543 instanceof dojo.uri.Uri)){
_543=dojo.uri.dojoUri(_543);
dojo.deprecated("templateCssPath should be of type dojo.uri.Uri",null,"0.4");
}
if(_543&&!dojo.widget._cssFiles[_543.toString()]){
if((!this.templateCssString)&&(_543)){
this.templateCssString=dojo.hostenv.getText(_543);
this.templateCssPath=null;
}
dojo.widget._cssFiles[_543.toString()]=true;
}
if((this["templateCssString"])&&(!this.templateCssString["loaded"])){
dojo.html.insertCssText(this.templateCssString,null,_543);
if(!this.templateCssString){
this.templateCssString="";
}
this.templateCssString.loaded=true;
}
if((!this.preventClobber)&&((this.templatePath)||(this.templateNode)||((this["templateString"])&&(this.templateString.length))||((typeof ts!="undefined")&&((ts["string"])||(ts["node"]))))){
this.buildFromTemplate(args,frag);
}else{
this.domNode=this.getFragNodeRef(frag);
}
this.fillInTemplate(args,frag);
},buildFromTemplate:function(args,frag){
var _546=false;
if(args["templatepath"]){
_546=true;
args["templatePath"]=args["templatepath"];
}
dojo.widget.fillFromTemplateCache(this,args["templatePath"],null,_546);
var ts=dojo.widget._templateCache[this.widgetType];
if((ts)&&(!_546)){
if(!this.templateString.length){
this.templateString=ts["string"];
}
if(!this.templateNode){
this.templateNode=ts["node"];
}
}
var _548=false;
var node=null;
var tstr=this.templateString;
if((!this.templateNode)&&(this.templateString)){
_548=this.templateString.match(/\$\{([^\}]+)\}/g);
if(_548){
var hash=this.strings||{};
for(var key in dojo.widget.defaultStrings){
if(dojo.lang.isUndefined(hash[key])){
hash[key]=dojo.widget.defaultStrings[key];
}
}
for(var i=0;i<_548.length;i++){
var key=_548[i];
key=key.substring(2,key.length-1);
var kval=(key.substring(0,5)=="this.")?dojo.lang.getObjPathValue(key.substring(5),this):hash[key];
var _54f;
if((kval)||(dojo.lang.isString(kval))){
_54f=(dojo.lang.isFunction(kval))?kval.call(this,key,this.templateString):kval;
tstr=tstr.replace(_548[i],_54f);
}
}
}else{
this.templateNode=this.createNodesFromText(this.templateString,true)[0];
if(!_546){
ts.node=this.templateNode;
}
}
}
if((!this.templateNode)&&(!_548)){
dojo.debug("DomWidget.buildFromTemplate: could not create template");
return false;
}else{
if(!_548){
node=this.templateNode.cloneNode(true);
if(!node){
return false;
}
}else{
node=this.createNodesFromText(tstr,true)[0];
}
}
this.domNode=node;
this.attachTemplateNodes(this.domNode,this);
if(this.isContainer&&this.containerNode){
var src=this.getFragNodeRef(frag);
if(src){
dojo.dom.moveChildren(src,this.containerNode);
}
}
},attachTemplateNodes:function(_551,_552){
if(!_552){
_552=this;
}
return dojo.widget.attachTemplateNodes(_551,_552,dojo.widget.getDojoEventsFromStr(this.templateString));
},fillInTemplate:function(){
},destroyRendering:function(){
try{
delete this.domNode;
}
catch(e){
}
},cleanUp:function(){
},getContainerHeight:function(){
dojo.unimplemented("dojo.widget.DomWidget.getContainerHeight");
},getContainerWidth:function(){
dojo.unimplemented("dojo.widget.DomWidget.getContainerWidth");
},createNodesFromText:function(){
dojo.unimplemented("dojo.widget.DomWidget.createNodesFromText");
}});
dojo.provide("dojo.html.common");
dojo.lang.mixin(dojo.html,dojo.dom);
dojo.html.body=function(){
dojo.deprecated("dojo.html.body() moved to dojo.body()","0.5");
return dojo.body();
};
dojo.html.getEventTarget=function(evt){
if(!evt){
evt=dojo.global().event||{};
}
var t=(evt.srcElement?evt.srcElement:(evt.target?evt.target:null));
while((t)&&(t.nodeType!=1)){
t=t.parentNode;
}
return t;
};
dojo.html.getViewport=function(){
var _555=dojo.global();
var _556=dojo.doc();
var w=0;
var h=0;
if(dojo.render.html.mozilla){
w=_556.documentElement.clientWidth;
h=_555.innerHeight;
}else{
if(!dojo.render.html.opera&&_555.innerWidth){
w=_555.innerWidth;
h=_555.innerHeight;
}else{
if(!dojo.render.html.opera&&dojo.exists(_556,"documentElement.clientWidth")){
var w2=_556.documentElement.clientWidth;
if(!w||w2&&w2<w){
w=w2;
}
h=_556.documentElement.clientHeight;
}else{
if(dojo.body().clientWidth){
w=dojo.body().clientWidth;
h=dojo.body().clientHeight;
}
}
}
}
return {width:w,height:h};
};
dojo.html.getScroll=function(){
var _55a=dojo.global();
var _55b=dojo.doc();
var top=_55a.pageYOffset||_55b.documentElement.scrollTop||dojo.body().scrollTop||0;
var left=_55a.pageXOffset||_55b.documentElement.scrollLeft||dojo.body().scrollLeft||0;
return {top:top,left:left,offset:{x:left,y:top}};
};
dojo.html.getParentByType=function(node,type){
var _560=dojo.doc();
var _561=dojo.byId(node);
type=type.toLowerCase();
while((_561)&&(_561.nodeName.toLowerCase()!=type)){
if(_561==(_560["body"]||_560["documentElement"])){
return null;
}
_561=_561.parentNode;
}
return _561;
};
dojo.html.getAttribute=function(node,attr){
node=dojo.byId(node);
if((!node)||(!node.getAttribute)){
return null;
}
var ta=typeof attr=="string"?attr:new String(attr);
var v=node.getAttribute(ta.toUpperCase());
if((v)&&(typeof v=="string")&&(v!="")){
return v;
}
if(v&&v.value){
return v.value;
}
if((node.getAttributeNode)&&(node.getAttributeNode(ta))){
return (node.getAttributeNode(ta)).value;
}else{
if(node.getAttribute(ta)){
return node.getAttribute(ta);
}else{
if(node.getAttribute(ta.toLowerCase())){
return node.getAttribute(ta.toLowerCase());
}
}
}
return null;
};
dojo.html.hasAttribute=function(node,attr){
return dojo.html.getAttribute(dojo.byId(node),attr)?true:false;
};
dojo.html.getCursorPosition=function(e){
e=e||dojo.global().event;
var _569={x:0,y:0};
if(e.pageX||e.pageY){
_569.x=e.pageX;
_569.y=e.pageY;
}else{
var de=dojo.doc().documentElement;
var db=dojo.body();
_569.x=e.clientX+((de||db)["scrollLeft"])-((de||db)["clientLeft"]);
_569.y=e.clientY+((de||db)["scrollTop"])-((de||db)["clientTop"]);
}
return _569;
};
dojo.html.isTag=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
for(var i=1;i<arguments.length;i++){
if(node.tagName.toLowerCase()==String(arguments[i]).toLowerCase()){
return String(arguments[i]).toLowerCase();
}
}
}
return "";
};
if(dojo.render.html.ie){
if(window.location.href.substr(0,6).toLowerCase()!="https:"){
(function(){
var _56e=dojo.doc().createElement("script");
_56e.src="javascript:'dojo.html.createExternalElement=function(doc, tag){return doc.createElement(tag);}'";
dojo.doc().getElementsByTagName("head")[0].appendChild(_56e);
})();
}
}else{
dojo.html.createExternalElement=function(doc,tag){
return doc.createElement(tag);
};
}
dojo.html._callDeprecated=function(_571,_572,args,_574,_575){
dojo.deprecated("dojo.html."+_571,"replaced by dojo.html."+_572+"("+(_574?"node, {"+_574+": "+_574+"}":"")+")"+(_575?"."+_575:""),"0.5");
var _576=[];
if(_574){
var _577={};
_577[_574]=args[1];
_576.push(args[0]);
_576.push(_577);
}else{
_576=args;
}
var ret=dojo.html[_572].apply(dojo.html,args);
if(_575){
return ret[_575];
}else{
return ret;
}
};
dojo.html.getViewportWidth=function(){
return dojo.html._callDeprecated("getViewportWidth","getViewport",arguments,null,"width");
};
dojo.html.getViewportHeight=function(){
return dojo.html._callDeprecated("getViewportHeight","getViewport",arguments,null,"height");
};
dojo.html.getViewportSize=function(){
return dojo.html._callDeprecated("getViewportSize","getViewport",arguments);
};
dojo.html.getScrollTop=function(){
return dojo.html._callDeprecated("getScrollTop","getScroll",arguments,null,"top");
};
dojo.html.getScrollLeft=function(){
return dojo.html._callDeprecated("getScrollLeft","getScroll",arguments,null,"left");
};
dojo.html.getScrollOffset=function(){
return dojo.html._callDeprecated("getScrollOffset","getScroll",arguments,null,"offset");
};
dojo.provide("dojo.html.layout");
dojo.html.sumAncestorProperties=function(node,prop){
node=dojo.byId(node);
if(!node){
return 0;
}
var _57b=0;
while(node){
if(dojo.html.getComputedStyle(node,"position")=="fixed"){
return 0;
}
var val=node[prop];
if(val){
_57b+=val-0;
if(node==dojo.body()){
break;
}
}
node=node.parentNode;
}
return _57b;
};
dojo.html.setStyleAttributes=function(node,_57e){
node=dojo.byId(node);
var _57f=_57e.replace(/(;)?\s*$/,"").split(";");
for(var i=0;i<_57f.length;i++){
var _581=_57f[i].split(":");
var name=_581[0].replace(/\s*$/,"").replace(/^\s*/,"").toLowerCase();
var _583=_581[1].replace(/\s*$/,"").replace(/^\s*/,"");
switch(name){
case "opacity":
dojo.html.setOpacity(node,_583);
break;
case "content-height":
dojo.html.setContentBox(node,{height:_583});
break;
case "content-width":
dojo.html.setContentBox(node,{width:_583});
break;
case "outer-height":
dojo.html.setMarginBox(node,{height:_583});
break;
case "outer-width":
dojo.html.setMarginBox(node,{width:_583});
break;
default:
node.style[dojo.html.toCamelCase(name)]=_583;
}
}
};
dojo.html.boxSizing={MARGIN_BOX:"margin-box",BORDER_BOX:"border-box",PADDING_BOX:"padding-box",CONTENT_BOX:"content-box"};
dojo.html.getAbsolutePosition=dojo.html.abs=function(node,_585,_586){
node=dojo.byId(node,node.ownerDocument);
var ret={x:0,y:0};
var bs=dojo.html.boxSizing;
if(!_586){
_586=bs.CONTENT_BOX;
}
var _589=2;
var _58a;
switch(_586){
case bs.MARGIN_BOX:
_58a=3;
break;
case bs.BORDER_BOX:
_58a=2;
break;
case bs.PADDING_BOX:
default:
_58a=1;
break;
case bs.CONTENT_BOX:
_58a=0;
break;
}
var h=dojo.render.html;
var db=document["body"]||document["documentElement"];
if(h.ie){
with(node.getBoundingClientRect()){
ret.x=left-2;
ret.y=top-2;
}
}else{
if(document.getBoxObjectFor){
_589=1;
try{
var bo=document.getBoxObjectFor(node);
ret.x=bo.x-dojo.html.sumAncestorProperties(node,"scrollLeft");
ret.y=bo.y-dojo.html.sumAncestorProperties(node,"scrollTop");
}
catch(e){
}
}else{
if(node["offsetParent"]){
var _58e;
if((h.safari)&&(node.style.getPropertyValue("position")=="absolute")&&(node.parentNode==db)){
_58e=db;
}else{
_58e=db.parentNode;
}
if(node.parentNode!=db){
var nd=node;
if(dojo.render.html.opera){
nd=db;
}
ret.x-=dojo.html.sumAncestorProperties(nd,"scrollLeft");
ret.y-=dojo.html.sumAncestorProperties(nd,"scrollTop");
}
var _590=node;
do{
var n=_590["offsetLeft"];
if(!h.opera||n>0){
ret.x+=isNaN(n)?0:n;
}
var m=_590["offsetTop"];
ret.y+=isNaN(m)?0:m;
_590=_590.offsetParent;
}while((_590!=_58e)&&(_590!=null));
}else{
if(node["x"]&&node["y"]){
ret.x+=isNaN(node.x)?0:node.x;
ret.y+=isNaN(node.y)?0:node.y;
}
}
}
}
if(_585){
var _593=dojo.html.getScroll();
ret.y+=_593.top;
ret.x+=_593.left;
}
var _594=[dojo.html.getPaddingExtent,dojo.html.getBorderExtent,dojo.html.getMarginExtent];
if(_589>_58a){
for(var i=_58a;i<_589;++i){
ret.y+=_594[i](node,"top");
ret.x+=_594[i](node,"left");
}
}else{
if(_589<_58a){
for(var i=_58a;i>_589;--i){
ret.y-=_594[i-1](node,"top");
ret.x-=_594[i-1](node,"left");
}
}
}
ret.top=ret.y;
ret.left=ret.x;
return ret;
};
dojo.html.isPositionAbsolute=function(node){
return (dojo.html.getComputedStyle(node,"position")=="absolute");
};
dojo.html._sumPixelValues=function(node,_598,_599){
var _59a=0;
for(var x=0;x<_598.length;x++){
_59a+=dojo.html.getPixelValue(node,_598[x],_599);
}
return _59a;
};
dojo.html.getMargin=function(node){
return {width:dojo.html._sumPixelValues(node,["margin-left","margin-right"],(dojo.html.getComputedStyle(node,"position")=="absolute")),height:dojo.html._sumPixelValues(node,["margin-top","margin-bottom"],(dojo.html.getComputedStyle(node,"position")=="absolute"))};
};
dojo.html.getBorder=function(node){
return {width:dojo.html.getBorderExtent(node,"left")+dojo.html.getBorderExtent(node,"right"),height:dojo.html.getBorderExtent(node,"top")+dojo.html.getBorderExtent(node,"bottom")};
};
dojo.html.getBorderExtent=function(node,side){
return (dojo.html.getStyle(node,"border-"+side+"-style")=="none"?0:dojo.html.getPixelValue(node,"border-"+side+"-width"));
};
dojo.html.getMarginExtent=function(node,side){
return dojo.html._sumPixelValues(node,["margin-"+side],dojo.html.isPositionAbsolute(node));
};
dojo.html.getPaddingExtent=function(node,side){
return dojo.html._sumPixelValues(node,["padding-"+side],true);
};
dojo.html.getPadding=function(node){
return {width:dojo.html._sumPixelValues(node,["padding-left","padding-right"],true),height:dojo.html._sumPixelValues(node,["padding-top","padding-bottom"],true)};
};
dojo.html.getPadBorder=function(node){
var pad=dojo.html.getPadding(node);
var _5a7=dojo.html.getBorder(node);
return {width:pad.width+_5a7.width,height:pad.height+_5a7.height};
};
dojo.html.getBoxSizing=function(node){
var h=dojo.render.html;
var bs=dojo.html.boxSizing;
if((h.ie)||(h.opera)){
var cm=document["compatMode"];
if((cm=="BackCompat")||(cm=="QuirksMode")){
return bs.BORDER_BOX;
}else{
return bs.CONTENT_BOX;
}
}else{
if(arguments.length==0){
node=document.documentElement;
}
var _5ac=dojo.html.getStyle(node,"-moz-box-sizing");
if(!_5ac){
_5ac=dojo.html.getStyle(node,"box-sizing");
}
return (_5ac?_5ac:bs.CONTENT_BOX);
}
};
dojo.html.isBorderBox=function(node){
return (dojo.html.getBoxSizing(node)==dojo.html.boxSizing.BORDER_BOX);
};
dojo.html.getBorderBox=function(node){
node=dojo.byId(node);
return {width:node.offsetWidth,height:node.offsetHeight};
};
dojo.html.getPaddingBox=function(node){
var box=dojo.html.getBorderBox(node);
var _5b1=dojo.html.getBorder(node);
return {width:box.width-_5b1.width,height:box.height-_5b1.height};
};
dojo.html.getContentBox=function(node){
node=dojo.byId(node);
var _5b3=dojo.html.getPadBorder(node);
return {width:node.offsetWidth-_5b3.width,height:node.offsetHeight-_5b3.height};
};
dojo.html.setContentBox=function(node,args){
node=dojo.byId(node);
var _5b6=0;
var _5b7=0;
var isbb=dojo.html.isBorderBox(node);
var _5b9=(isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var ret={};
if(typeof args.width!=undefined){
_5b6=args.width+_5b9.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_5b6);
}
if(typeof args.height!=undefined){
_5b7=args.height+_5b9.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_5b7);
}
return ret;
};
dojo.html.getMarginBox=function(node){
var _5bc=dojo.html.getBorderBox(node);
var _5bd=dojo.html.getMargin(node);
return {width:_5bc.width+_5bd.width,height:_5bc.height+_5bd.height};
};
dojo.html.setMarginBox=function(node,args){
node=dojo.byId(node);
var _5c0=0;
var _5c1=0;
var isbb=dojo.html.isBorderBox(node);
var _5c3=(!isbb?dojo.html.getPadBorder(node):{width:0,height:0});
var _5c4=dojo.html.getMargin(node);
var ret={};
if(typeof args.width!=undefined){
_5c0=args.width-_5c3.width;
_5c0-=_5c4.width;
ret.width=dojo.html.setPositivePixelValue(node,"width",_5c0);
}
if(typeof args.height!=undefined){
_5c1=args.height-_5c3.height;
_5c1-=_5c4.height;
ret.height=dojo.html.setPositivePixelValue(node,"height",_5c1);
}
return ret;
};
dojo.html.getElementBox=function(node,type){
var bs=dojo.html.boxSizing;
switch(type){
case bs.MARGIN_BOX:
return dojo.html.getMarginBox(node);
case bs.BORDER_BOX:
return dojo.html.getBorderBox(node);
case bs.PADDING_BOX:
return dojo.html.getPaddingBox(node);
case bs.CONTENT_BOX:
default:
return dojo.html.getContentBox(node);
}
};
dojo.html.toCoordinateObject=dojo.html.toCoordinateArray=function(_5c9,_5ca){
if(_5c9 instanceof Array||typeof _5c9=="array"){
dojo.deprecated("dojo.html.toCoordinateArray","use dojo.html.toCoordinateObject({left: , top: , width: , height: }) instead","0.5");
while(_5c9.length<4){
_5c9.push(0);
}
while(_5c9.length>4){
_5c9.pop();
}
var ret={left:_5c9[0],top:_5c9[1],width:_5c9[2],height:_5c9[3]};
}else{
if(!_5c9.nodeType&&!(_5c9 instanceof String||typeof _5c9=="string")&&("width" in _5c9||"height" in _5c9||"left" in _5c9||"x" in _5c9||"top" in _5c9||"y" in _5c9)){
var ret={left:_5c9.left||_5c9.x||0,top:_5c9.top||_5c9.y||0,width:_5c9.width||0,height:_5c9.height||0};
}else{
var node=dojo.byId(_5c9);
var pos=dojo.html.abs(node,_5ca);
var _5ce=dojo.html.getMarginBox(node);
var ret={left:pos.left,top:pos.top,width:_5ce.width,height:_5ce.height};
}
}
ret.x=ret.left;
ret.y=ret.top;
return ret;
};
dojo.html.setMarginBoxWidth=dojo.html.setOuterWidth=function(node,_5d0){
return dojo.html._callDeprecated("setMarginBoxWidth","setMarginBox",arguments,"width");
};
dojo.html.setMarginBoxHeight=dojo.html.setOuterHeight=function(){
return dojo.html._callDeprecated("setMarginBoxHeight","setMarginBox",arguments,"height");
};
dojo.html.getMarginBoxWidth=dojo.html.getOuterWidth=function(){
return dojo.html._callDeprecated("getMarginBoxWidth","getMarginBox",arguments,null,"width");
};
dojo.html.getMarginBoxHeight=dojo.html.getOuterHeight=function(){
return dojo.html._callDeprecated("getMarginBoxHeight","getMarginBox",arguments,null,"height");
};
dojo.html.getTotalOffset=function(node,type,_5d3){
return dojo.html._callDeprecated("getTotalOffset","getAbsolutePosition",arguments,null,type);
};
dojo.html.getAbsoluteX=function(node,_5d5){
return dojo.html._callDeprecated("getAbsoluteX","getAbsolutePosition",arguments,null,"x");
};
dojo.html.getAbsoluteY=function(node,_5d7){
return dojo.html._callDeprecated("getAbsoluteY","getAbsolutePosition",arguments,null,"y");
};
dojo.html.totalOffsetLeft=function(node,_5d9){
return dojo.html._callDeprecated("totalOffsetLeft","getAbsolutePosition",arguments,null,"left");
};
dojo.html.totalOffsetTop=function(node,_5db){
return dojo.html._callDeprecated("totalOffsetTop","getAbsolutePosition",arguments,null,"top");
};
dojo.html.getMarginWidth=function(node){
return dojo.html._callDeprecated("getMarginWidth","getMargin",arguments,null,"width");
};
dojo.html.getMarginHeight=function(node){
return dojo.html._callDeprecated("getMarginHeight","getMargin",arguments,null,"height");
};
dojo.html.getBorderWidth=function(node){
return dojo.html._callDeprecated("getBorderWidth","getBorder",arguments,null,"width");
};
dojo.html.getBorderHeight=function(node){
return dojo.html._callDeprecated("getBorderHeight","getBorder",arguments,null,"height");
};
dojo.html.getPaddingWidth=function(node){
return dojo.html._callDeprecated("getPaddingWidth","getPadding",arguments,null,"width");
};
dojo.html.getPaddingHeight=function(node){
return dojo.html._callDeprecated("getPaddingHeight","getPadding",arguments,null,"height");
};
dojo.html.getPadBorderWidth=function(node){
return dojo.html._callDeprecated("getPadBorderWidth","getPadBorder",arguments,null,"width");
};
dojo.html.getPadBorderHeight=function(node){
return dojo.html._callDeprecated("getPadBorderHeight","getPadBorder",arguments,null,"height");
};
dojo.html.getBorderBoxWidth=dojo.html.getInnerWidth=function(){
return dojo.html._callDeprecated("getBorderBoxWidth","getBorderBox",arguments,null,"width");
};
dojo.html.getBorderBoxHeight=dojo.html.getInnerHeight=function(){
return dojo.html._callDeprecated("getBorderBoxHeight","getBorderBox",arguments,null,"height");
};
dojo.html.getContentBoxWidth=dojo.html.getContentWidth=function(){
return dojo.html._callDeprecated("getContentBoxWidth","getContentBox",arguments,null,"width");
};
dojo.html.getContentBoxHeight=dojo.html.getContentHeight=function(){
return dojo.html._callDeprecated("getContentBoxHeight","getContentBox",arguments,null,"height");
};
dojo.html.setContentBoxWidth=dojo.html.setContentWidth=function(node,_5e5){
return dojo.html._callDeprecated("setContentBoxWidth","setContentBox",arguments,"width");
};
dojo.html.setContentBoxHeight=dojo.html.setContentHeight=function(node,_5e7){
return dojo.html._callDeprecated("setContentBoxHeight","setContentBox",arguments,"height");
};
dojo.provide("dojo.html.util");
dojo.html.getElementWindow=function(_5e8){
return dojo.html.getDocumentWindow(_5e8.ownerDocument);
};
dojo.html.getDocumentWindow=function(doc){
if(dojo.render.html.safari&&!doc._parentWindow){
var fix=function(win){
win.document._parentWindow=win;
for(var i=0;i<win.frames.length;i++){
fix(win.frames[i]);
}
};
fix(window.top);
}
if(dojo.render.html.ie&&window!==document.parentWindow&&!doc._parentWindow){
doc.parentWindow.execScript("document._parentWindow = window;","Javascript");
}
return doc._parentWindow||doc.parentWindow||doc.defaultView;
};
dojo.html.gravity=function(node,e){
node=dojo.byId(node);
var _5ef=dojo.html.getCursorPosition(e);
with(dojo.html){
var _5f0=getAbsolutePosition(node,true);
var bb=getBorderBox(node);
var _5f2=_5f0.x+(bb.width/2);
var _5f3=_5f0.y+(bb.height/2);
}
with(dojo.html.gravity){
return ((_5ef.x<_5f2?WEST:EAST)|(_5ef.y<_5f3?NORTH:SOUTH));
}
};
dojo.html.gravity.NORTH=1;
dojo.html.gravity.SOUTH=1<<1;
dojo.html.gravity.EAST=1<<2;
dojo.html.gravity.WEST=1<<3;
dojo.html.overElement=function(_5f4,e){
_5f4=dojo.byId(_5f4);
var _5f6=dojo.html.getCursorPosition(e);
with(dojo.html){
var bb=getBorderBox(_5f4);
var _5f8=getAbsolutePosition(_5f4,true);
var top=_5f8.y;
var _5fa=top+bb.height;
var left=_5f8.x;
var _5fc=left+bb.width;
}
return (_5f6.x>=left&&_5f6.x<=_5fc&&_5f6.y>=top&&_5f6.y<=_5fa);
};
dojo.html.renderedTextContent=function(node){
node=dojo.byId(node);
var _5fe="";
if(node==null){
return _5fe;
}
for(var i=0;i<node.childNodes.length;i++){
switch(node.childNodes[i].nodeType){
case 1:
case 5:
var _600="unknown";
try{
_600=dojo.html.getStyle(node.childNodes[i],"display");
}
catch(E){
}
switch(_600){
case "block":
case "list-item":
case "run-in":
case "table":
case "table-row-group":
case "table-header-group":
case "table-footer-group":
case "table-row":
case "table-column-group":
case "table-column":
case "table-cell":
case "table-caption":
_5fe+="\n";
_5fe+=dojo.html.renderedTextContent(node.childNodes[i]);
_5fe+="\n";
break;
case "none":
break;
default:
if(node.childNodes[i].tagName&&node.childNodes[i].tagName.toLowerCase()=="br"){
_5fe+="\n";
}else{
_5fe+=dojo.html.renderedTextContent(node.childNodes[i]);
}
break;
}
break;
case 3:
case 2:
case 4:
var text=node.childNodes[i].nodeValue;
var _602="unknown";
try{
_602=dojo.html.getStyle(node,"text-transform");
}
catch(E){
}
switch(_602){
case "capitalize":
var _603=text.split(" ");
for(var i=0;i<_603.length;i++){
_603[i]=_603[i].charAt(0).toUpperCase()+_603[i].substring(1);
}
text=_603.join(" ");
break;
case "uppercase":
text=text.toUpperCase();
break;
case "lowercase":
text=text.toLowerCase();
break;
default:
break;
}
switch(_602){
case "nowrap":
break;
case "pre-wrap":
break;
case "pre-line":
break;
case "pre":
break;
default:
text=text.replace(/\s+/," ");
if(/\s$/.test(_5fe)){
text.replace(/^\s/,"");
}
break;
}
_5fe+=text;
break;
default:
break;
}
}
return _5fe;
};
dojo.html.createNodesFromText=function(txt,trim){
if(trim){
txt=txt.replace(/^\s+|\s+$/g,"");
}
var tn=dojo.doc().createElement("div");
tn.style.visibility="hidden";
dojo.body().appendChild(tn);
var _607="none";
if((/^<t[dh][\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody><tr>"+txt+"</tr></tbody></table>";
_607="cell";
}else{
if((/^<tr[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table><tbody>"+txt+"</tbody></table>";
_607="row";
}else{
if((/^<(thead|tbody|tfoot)[\s\r\n>]/i).test(txt.replace(/^\s+/))){
txt="<table>"+txt+"</table>";
_607="section";
}
}
}
tn.innerHTML=txt;
if(tn["normalize"]){
tn.normalize();
}
var _608=null;
switch(_607){
case "cell":
_608=tn.getElementsByTagName("tr")[0];
break;
case "row":
_608=tn.getElementsByTagName("tbody")[0];
break;
case "section":
_608=tn.getElementsByTagName("table")[0];
break;
default:
_608=tn;
break;
}
var _609=[];
for(var x=0;x<_608.childNodes.length;x++){
_609.push(_608.childNodes[x].cloneNode(true));
}
tn.style.display="none";
dojo.body().removeChild(tn);
return _609;
};
dojo.html.placeOnScreen=function(node,_60c,_60d,_60e,_60f,_610,_611){
if(_60c instanceof Array||typeof _60c=="array"){
_611=_610;
_610=_60f;
_60f=_60e;
_60e=_60d;
_60d=_60c[1];
_60c=_60c[0];
}
if(_610 instanceof String||typeof _610=="string"){
_610=_610.split(",");
}
if(!isNaN(_60e)){
_60e=[Number(_60e),Number(_60e)];
}else{
if(!(_60e instanceof Array||typeof _60e=="array")){
_60e=[0,0];
}
}
var _612=dojo.html.getScroll().offset;
var view=dojo.html.getViewport();
node=dojo.byId(node);
var _614=node.style.display;
node.style.display="";
var bb=dojo.html.getBorderBox(node);
var w=bb.width;
var h=bb.height;
node.style.display=_614;
if(!(_610 instanceof Array||typeof _610=="array")){
_610=["TL"];
}
var _618,besty,bestDistance=Infinity;
for(var _619=0;_619<_610.length;++_619){
var _61a=_610[_619];
var _61b=true;
var tryX=_60c-(_61a.charAt(1)=="L"?0:w)+_60e[0]*(_61a.charAt(1)=="L"?1:-1);
var tryY=_60d-(_61a.charAt(0)=="T"?0:h)+_60e[1]*(_61a.charAt(0)=="T"?1:-1);
if(_60f){
tryX-=_612.x;
tryY-=_612.y;
}
var x=tryX+w;
if(x>view.width){
x=view.width-w;
_61b=false;
}else{
x=tryX;
}
x=Math.max(_60e[0],x)+_612.x;
var y=tryY+h;
if(y>view.height){
y=view.height-h;
_61b=false;
}else{
y=tryY;
}
y=Math.max(_60e[1],y)+_612.y;
if(_61b){
_618=x;
besty=y;
bestDistance=0;
break;
}else{
var dist=Math.pow(x-tryX-_612.x,2)+Math.pow(y-tryY-_612.y,2);
if(bestDistance>dist){
bestDistance=dist;
_618=x;
besty=y;
}
}
}
if(!_611){
node.style.left=_618+"px";
node.style.top=besty+"px";
}
return {left:_618,top:besty,x:_618,y:besty,dist:bestDistance};
};
dojo.html.placeOnScreenPoint=function(node,_622,_623,_624,_625){
dojo.deprecated("dojo.html.placeOnScreenPoint","use dojo.html.placeOnScreen() instead","0.5");
return dojo.html.placeOnScreen(node,_622,_623,_624,_625,["TL","TR","BL","BR"]);
};
dojo.html.placeOnScreenAroundElement=function(node,_627,_628,_629,_62a,_62b){
var best,bestDistance=Infinity;
_627=dojo.byId(_627);
var _62d=_627.style.display;
_627.style.display="";
var mb=dojo.html.getElementBox(_627,_629);
var _62f=mb.width;
var _630=mb.height;
var _631=dojo.html.getAbsolutePosition(_627,true,_629);
_627.style.display=_62d;
for(var _632 in _62a){
var pos,desiredX,desiredY;
var _634=_62a[_632];
desiredX=_631.x+(_632.charAt(1)=="L"?0:_62f);
desiredY=_631.y+(_632.charAt(0)=="T"?0:_630);
pos=dojo.html.placeOnScreen(node,desiredX,desiredY,_628,true,_634,true);
if(pos.dist==0){
best=pos;
break;
}else{
if(bestDistance>pos.dist){
bestDistance=pos.dist;
best=pos;
}
}
}
if(!_62b){
node.style.left=best.left+"px";
node.style.top=best.top+"px";
}
return best;
};
dojo.html.scrollIntoView=function(node){
if(!node){
return;
}
if(dojo.render.html.ie){
if(dojo.html.getBorderBox(node.parentNode).height<node.parentNode.scrollHeight){
node.scrollIntoView(false);
}
}else{
if(dojo.render.html.mozilla){
node.scrollIntoView(false);
}else{
var _636=node.parentNode;
var _637=_636.scrollTop+dojo.html.getBorderBox(_636).height;
var _638=node.offsetTop+dojo.html.getMarginBox(node).height;
if(_637<_638){
_636.scrollTop+=(_638-_637);
}else{
if(_636.scrollTop>node.offsetTop){
_636.scrollTop-=(_636.scrollTop-node.offsetTop);
}
}
}
}
};
dojo.provide("dojo.html.display");
dojo.html._toggle=function(node,_63a,_63b){
node=dojo.byId(node);
_63b(node,!_63a(node));
return _63a(node);
};
dojo.html.show=function(node){
node=dojo.byId(node);
if(dojo.html.getStyleProperty(node,"display")=="none"){
dojo.html.setStyle(node,"display",(node.dojoDisplayCache||""));
node.dojoDisplayCache=undefined;
}
};
dojo.html.hide=function(node){
node=dojo.byId(node);
if(typeof node["dojoDisplayCache"]=="undefined"){
var d=dojo.html.getStyleProperty(node,"display");
if(d!="none"){
node.dojoDisplayCache=d;
}
}
dojo.html.setStyle(node,"display","none");
};
dojo.html.setShowing=function(node,_640){
dojo.html[(_640?"show":"hide")](node);
};
dojo.html.isShowing=function(node){
return (dojo.html.getStyleProperty(node,"display")!="none");
};
dojo.html.toggleShowing=function(node){
return dojo.html._toggle(node,dojo.html.isShowing,dojo.html.setShowing);
};
dojo.html.displayMap={tr:"",td:"",th:"",img:"inline",span:"inline",input:"inline",button:"inline"};
dojo.html.suggestDisplayByTagName=function(node){
node=dojo.byId(node);
if(node&&node.tagName){
var tag=node.tagName.toLowerCase();
return (tag in dojo.html.displayMap?dojo.html.displayMap[tag]:"block");
}
};
dojo.html.setDisplay=function(node,_646){
dojo.html.setStyle(node,"display",((_646 instanceof String||typeof _646=="string")?_646:(_646?dojo.html.suggestDisplayByTagName(node):"none")));
};
dojo.html.isDisplayed=function(node){
return (dojo.html.getComputedStyle(node,"display")!="none");
};
dojo.html.toggleDisplay=function(node){
return dojo.html._toggle(node,dojo.html.isDisplayed,dojo.html.setDisplay);
};
dojo.html.setVisibility=function(node,_64a){
dojo.html.setStyle(node,"visibility",((_64a instanceof String||typeof _64a=="string")?_64a:(_64a?"visible":"hidden")));
};
dojo.html.isVisible=function(node){
return (dojo.html.getComputedStyle(node,"visibility")!="hidden");
};
dojo.html.toggleVisibility=function(node){
return dojo.html._toggle(node,dojo.html.isVisible,dojo.html.setVisibility);
};
dojo.html.setOpacity=function(node,_64e,_64f){
node=dojo.byId(node);
var h=dojo.render.html;
if(!_64f){
if(_64e>=1){
if(h.ie){
dojo.html.clearOpacity(node);
return;
}else{
_64e=0.999999;
}
}else{
if(_64e<0){
_64e=0;
}
}
}
if(h.ie){
if(node.nodeName.toLowerCase()=="tr"){
var tds=node.getElementsByTagName("td");
for(var x=0;x<tds.length;x++){
tds[x].style.filter="Alpha(Opacity="+_64e*100+")";
}
}
node.style.filter="Alpha(Opacity="+_64e*100+")";
}else{
if(h.moz){
node.style.opacity=_64e;
node.style.MozOpacity=_64e;
}else{
if(h.safari){
node.style.opacity=_64e;
node.style.KhtmlOpacity=_64e;
}else{
node.style.opacity=_64e;
}
}
}
};
dojo.html.clearOpacity=function clearOpacity(node){
node=dojo.byId(node);
var ns=node.style;
var h=dojo.render.html;
if(h.ie){
try{
if(node.filters&&node.filters.alpha){
ns.filter="";
}
}
catch(e){
}
}else{
if(h.moz){
ns.opacity=1;
ns.MozOpacity=1;
}else{
if(h.safari){
ns.opacity=1;
ns.KhtmlOpacity=1;
}else{
ns.opacity=1;
}
}
}
};
dojo.html.getOpacity=function getOpacity(node){
node=dojo.byId(node);
var h=dojo.render.html;
if(h.ie){
var opac=(node.filters&&node.filters.alpha&&typeof node.filters.alpha.opacity=="number"?node.filters.alpha.opacity:100)/100;
}else{
var opac=node.style.opacity||node.style.MozOpacity||node.style.KhtmlOpacity||1;
}
return opac>=0.999999?1:Number(opac);
};
dojo.provide("dojo.lfx.Animation");
dojo.provide("dojo.lfx.Line");
dojo.lfx.Line=function(_659,end){
this.start=_659;
this.end=end;
if(dojo.lang.isArray(_659)){
var diff=[];
dojo.lang.forEach(this.start,function(s,i){
diff[i]=this.end[i]-s;
},this);
this.getValue=function(n){
var res=[];
dojo.lang.forEach(this.start,function(s,i){
res[i]=(diff[i]*n)+s;
},this);
return res;
};
}else{
var diff=end-_659;
this.getValue=function(n){
return (diff*n)+this.start;
};
}
};
dojo.lfx.easeDefault=function(n){
return (0.5+((Math.sin((n+1.5)*Math.PI))/2));
};
dojo.lfx.easeIn=function(n){
return Math.pow(n,3);
};
dojo.lfx.easeOut=function(n){
return (1-Math.pow(1-n,3));
};
dojo.lfx.easeInOut=function(n){
return ((3*Math.pow(n,2))-(2*Math.pow(n,3)));
};
dojo.lfx.IAnimation=function(){
};
dojo.lang.extend(dojo.lfx.IAnimation,{curve:null,duration:1000,easing:null,repeatCount:0,rate:25,handler:null,beforeBegin:null,onBegin:null,onAnimate:null,onEnd:null,onPlay:null,onPause:null,onStop:null,play:null,pause:null,stop:null,connect:function(evt,_668,_669){
if(!_669){
_669=_668;
_668=this;
}
_669=dojo.lang.hitch(_668,_669);
var _66a=this[evt]||function(){
};
this[evt]=function(){
var ret=_66a.apply(this,arguments);
_669.apply(this,arguments);
return ret;
};
return this;
},fire:function(evt,args){
if(this[evt]){
this[evt].apply(this,(args||[]));
}
return this;
},repeat:function(_66e){
this.repeatCount=_66e;
return this;
},_active:false,_paused:false});
dojo.lfx.Animation=function(_66f,_670,_671,_672,_673,rate){
dojo.lfx.IAnimation.call(this);
if(dojo.lang.isNumber(_66f)||(!_66f&&_670.getValue)){
rate=_673;
_673=_672;
_672=_671;
_671=_670;
_670=_66f;
_66f=null;
}else{
if(_66f.getValue||dojo.lang.isArray(_66f)){
rate=_672;
_673=_671;
_672=_670;
_671=_66f;
_670=null;
_66f=null;
}
}
if(dojo.lang.isArray(_671)){
this.curve=new dojo.lfx.Line(_671[0],_671[1]);
}else{
this.curve=_671;
}
if(_670!=null&&_670>0){
this.duration=_670;
}
if(_673){
this.repeatCount=_673;
}
if(rate){
this.rate=rate;
}
if(_66f){
dojo.lang.forEach(["handler","beforeBegin","onBegin","onEnd","onPlay","onStop","onAnimate"],function(item){
if(_66f[item]){
this.connect(item,_66f[item]);
}
},this);
}
if(_672&&dojo.lang.isFunction(_672)){
this.easing=_672;
}
};
dojo.inherits(dojo.lfx.Animation,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Animation,{_startTime:null,_endTime:null,_timer:null,_percent:0,_startRepeatCount:0,play:function(_676,_677){
if(_677){
clearTimeout(this._timer);
this._active=false;
this._paused=false;
this._percent=0;
}else{
if(this._active&&!this._paused){
return this;
}
}
this.fire("handler",["beforeBegin"]);
this.fire("beforeBegin");
if(_676>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_677);
}),_676);
return this;
}
this._startTime=new Date().valueOf();
if(this._paused){
this._startTime-=(this.duration*this._percent/100);
}
this._endTime=this._startTime+this.duration;
this._active=true;
this._paused=false;
var step=this._percent/100;
var _679=this.curve.getValue(step);
if(this._percent==0){
if(!this._startRepeatCount){
this._startRepeatCount=this.repeatCount;
}
this.fire("handler",["begin",_679]);
this.fire("onBegin",[_679]);
}
this.fire("handler",["play",_679]);
this.fire("onPlay",[_679]);
this._cycle();
return this;
},pause:function(){
clearTimeout(this._timer);
if(!this._active){
return this;
}
this._paused=true;
var _67a=this.curve.getValue(this._percent/100);
this.fire("handler",["pause",_67a]);
this.fire("onPause",[_67a]);
return this;
},gotoPercent:function(pct,_67c){
clearTimeout(this._timer);
this._active=true;
this._paused=true;
this._percent=pct;
if(_67c){
this.play();
}
return this;
},stop:function(_67d){
clearTimeout(this._timer);
var step=this._percent/100;
if(_67d){
step=1;
}
var _67f=this.curve.getValue(step);
this.fire("handler",["stop",_67f]);
this.fire("onStop",[_67f]);
this._active=false;
this._paused=false;
return this;
},status:function(){
if(this._active){
return this._paused?"paused":"playing";
}else{
return "stopped";
}
return this;
},_cycle:function(){
clearTimeout(this._timer);
if(this._active){
var curr=new Date().valueOf();
var step=(curr-this._startTime)/(this._endTime-this._startTime);
if(step>=1){
step=1;
this._percent=100;
}else{
this._percent=step*100;
}
if((this.easing)&&(dojo.lang.isFunction(this.easing))){
step=this.easing(step);
}
var _682=this.curve.getValue(step);
this.fire("handler",["animate",_682]);
this.fire("onAnimate",[_682]);
if(step<1){
this._timer=setTimeout(dojo.lang.hitch(this,"_cycle"),this.rate);
}else{
this._active=false;
this.fire("handler",["end"]);
this.fire("onEnd");
if(this.repeatCount>0){
this.repeatCount--;
this.play(null,true);
}else{
if(this.repeatCount==-1){
this.play(null,true);
}else{
if(this._startRepeatCount){
this.repeatCount=this._startRepeatCount;
this._startRepeatCount=0;
}
}
}
}
}
return this;
}});
dojo.lfx.Combine=function(){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._animsEnded=0;
var _683=arguments;
if(_683.length==1&&(dojo.lang.isArray(_683[0])||dojo.lang.isArrayLike(_683[0]))){
_683=_683[0];
}
dojo.lang.forEach(_683,function(anim){
this._anims.push(anim);
anim.connect("onEnd",dojo.lang.hitch(this,"_onAnimsEnded"));
},this);
};
dojo.inherits(dojo.lfx.Combine,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Combine,{_animsEnded:0,play:function(_685,_686){
if(!this._anims.length){
return this;
}
this.fire("beforeBegin");
if(_685>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_686);
}),_685);
return this;
}
if(_686||this._anims[0].percent==0){
this.fire("onBegin");
}
this.fire("onPlay");
this._animsCall("play",null,_686);
return this;
},pause:function(){
this.fire("onPause");
this._animsCall("pause");
return this;
},stop:function(_687){
this.fire("onStop");
this._animsCall("stop",_687);
return this;
},_onAnimsEnded:function(){
this._animsEnded++;
if(this._animsEnded>=this._anims.length){
this.fire("onEnd");
}
return this;
},_animsCall:function(_688){
var args=[];
if(arguments.length>1){
for(var i=1;i<arguments.length;i++){
args.push(arguments[i]);
}
}
var _68b=this;
dojo.lang.forEach(this._anims,function(anim){
anim[_688](args);
},_68b);
return this;
}});
dojo.lfx.Chain=function(){
dojo.lfx.IAnimation.call(this);
this._anims=[];
this._currAnim=-1;
var _68d=arguments;
if(_68d.length==1&&(dojo.lang.isArray(_68d[0])||dojo.lang.isArrayLike(_68d[0]))){
_68d=_68d[0];
}
var _68e=this;
dojo.lang.forEach(_68d,function(anim,i,_691){
this._anims.push(anim);
if(i<_691.length-1){
anim.connect("onEnd",dojo.lang.hitch(this,"_playNext"));
}else{
anim.connect("onEnd",dojo.lang.hitch(this,function(){
this.fire("onEnd");
}));
}
},this);
};
dojo.inherits(dojo.lfx.Chain,dojo.lfx.IAnimation);
dojo.lang.extend(dojo.lfx.Chain,{_currAnim:-1,play:function(_692,_693){
if(!this._anims.length){
return this;
}
if(_693||!this._anims[this._currAnim]){
this._currAnim=0;
}
var _694=this._anims[this._currAnim];
this.fire("beforeBegin");
if(_692>0){
setTimeout(dojo.lang.hitch(this,function(){
this.play(null,_693);
}),_692);
return this;
}
if(_694){
if(this._currAnim==0){
this.fire("handler",["begin",this._currAnim]);
this.fire("onBegin",[this._currAnim]);
}
this.fire("onPlay",[this._currAnim]);
_694.play(null,_693);
}
return this;
},pause:function(){
if(this._anims[this._currAnim]){
this._anims[this._currAnim].pause();
this.fire("onPause",[this._currAnim]);
}
return this;
},playPause:function(){
if(this._anims.length==0){
return this;
}
if(this._currAnim==-1){
this._currAnim=0;
}
var _695=this._anims[this._currAnim];
if(_695){
if(!_695._active||_695._paused){
this.play();
}else{
this.pause();
}
}
return this;
},stop:function(){
var _696=this._anims[this._currAnim];
if(_696){
_696.stop();
this.fire("onStop",[this._currAnim]);
}
return _696;
},_playNext:function(){
if(this._currAnim==-1||this._anims.length==0){
return this;
}
this._currAnim++;
if(this._anims[this._currAnim]){
this._anims[this._currAnim].play(null,true);
}
return this;
}});
dojo.lfx.combine=function(){
var _697=arguments;
if(dojo.lang.isArray(arguments[0])){
_697=arguments[0];
}
if(_697.length==1){
return _697[0];
}
return new dojo.lfx.Combine(_697);
};
dojo.lfx.chain=function(){
var _698=arguments;
if(dojo.lang.isArray(arguments[0])){
_698=arguments[0];
}
if(_698.length==1){
return _698[0];
}
return new dojo.lfx.Chain(_698);
};
dojo.provide("dojo.graphics.color");
dojo.graphics.color.Color=function(r,g,b,a){
if(dojo.lang.isArray(r)){
this.r=r[0];
this.g=r[1];
this.b=r[2];
this.a=r[3]||1;
}else{
if(dojo.lang.isString(r)){
var rgb=dojo.graphics.color.extractRGB(r);
this.r=rgb[0];
this.g=rgb[1];
this.b=rgb[2];
this.a=g||1;
}else{
if(r instanceof dojo.graphics.color.Color){
this.r=r.r;
this.b=r.b;
this.g=r.g;
this.a=r.a;
}else{
this.r=r;
this.g=g;
this.b=b;
this.a=a;
}
}
}
};
dojo.graphics.color.Color.fromArray=function(arr){
return new dojo.graphics.color.Color(arr[0],arr[1],arr[2],arr[3]);
};
dojo.lang.extend(dojo.graphics.color.Color,{toRgb:function(_69f){
if(_69f){
return this.toRgba();
}else{
return [this.r,this.g,this.b];
}
},toRgba:function(){
return [this.r,this.g,this.b,this.a];
},toHex:function(){
return dojo.graphics.color.rgb2hex(this.toRgb());
},toCss:function(){
return "rgb("+this.toRgb().join()+")";
},toString:function(){
return this.toHex();
},blend:function(_6a0,_6a1){
return dojo.graphics.color.blend(this.toRgb(),new dojo.graphics.color.Color(_6a0).toRgb(),_6a1);
}});
dojo.graphics.color.named={white:[255,255,255],black:[0,0,0],red:[255,0,0],green:[0,255,0],blue:[0,0,255],navy:[0,0,128],gray:[128,128,128],silver:[192,192,192]};
dojo.graphics.color.blend=function(a,b,_6a4){
if(typeof a=="string"){
return dojo.graphics.color.blendHex(a,b,_6a4);
}
if(!_6a4){
_6a4=0;
}else{
if(_6a4>1){
_6a4=1;
}else{
if(_6a4<-1){
_6a4=-1;
}
}
}
var c=new Array(3);
for(var i=0;i<3;i++){
var half=Math.abs(a[i]-b[i])/2;
c[i]=Math.floor(Math.min(a[i],b[i])+half+(half*_6a4));
}
return c;
};
dojo.graphics.color.blendHex=function(a,b,_6aa){
return dojo.graphics.color.rgb2hex(dojo.graphics.color.blend(dojo.graphics.color.hex2rgb(a),dojo.graphics.color.hex2rgb(b),_6aa));
};
dojo.graphics.color.extractRGB=function(_6ab){
var hex="0123456789abcdef";
_6ab=_6ab.toLowerCase();
if(_6ab.indexOf("rgb")==0){
var _6ad=_6ab.match(/rgba*\((\d+), *(\d+), *(\d+)/i);
var ret=_6ad.splice(1,3);
return ret;
}else{
var _6af=dojo.graphics.color.hex2rgb(_6ab);
if(_6af){
return _6af;
}else{
return dojo.graphics.color.named[_6ab]||[255,255,255];
}
}
};
dojo.graphics.color.hex2rgb=function(hex){
var _6b1="0123456789ABCDEF";
var rgb=new Array(3);
if(hex.indexOf("#")==0){
hex=hex.substring(1);
}
hex=hex.toUpperCase();
if(hex.replace(new RegExp("["+_6b1+"]","g"),"")!=""){
return null;
}
if(hex.length==3){
rgb[0]=hex.charAt(0)+hex.charAt(0);
rgb[1]=hex.charAt(1)+hex.charAt(1);
rgb[2]=hex.charAt(2)+hex.charAt(2);
}else{
rgb[0]=hex.substring(0,2);
rgb[1]=hex.substring(2,4);
rgb[2]=hex.substring(4);
}
for(var i=0;i<rgb.length;i++){
rgb[i]=_6b1.indexOf(rgb[i].charAt(0))*16+_6b1.indexOf(rgb[i].charAt(1));
}
return rgb;
};
dojo.graphics.color.rgb2hex=function(r,g,b){
if(dojo.lang.isArray(r)){
g=r[1]||0;
b=r[2]||0;
r=r[0]||0;
}
var ret=dojo.lang.map([r,g,b],function(x){
x=new Number(x);
var s=x.toString(16);
while(s.length<2){
s="0"+s;
}
return s;
});
ret.unshift("#");
return ret.join("");
};
dojo.provide("dojo.html.color");
dojo.html.getBackgroundColor=function(node){
node=dojo.byId(node);
var _6bb;
do{
_6bb=dojo.html.getStyle(node,"background-color");
if(_6bb.toLowerCase()=="rgba(0, 0, 0, 0)"){
_6bb="transparent";
}
if(node==document.getElementsByTagName("body")[0]){
node=null;
break;
}
node=node.parentNode;
}while(node&&dojo.lang.inArray(["transparent",""],_6bb));
if(_6bb=="transparent"){
_6bb=[255,255,255,0];
}else{
_6bb=dojo.graphics.color.extractRGB(_6bb);
}
return _6bb;
};
dojo.provide("dojo.lfx.html");
dojo.lfx.html._byId=function(_6bc){
if(!_6bc){
return [];
}
if(dojo.lang.isArrayLike(_6bc)){
if(!_6bc.alreadyChecked){
var n=[];
dojo.lang.forEach(_6bc,function(node){
n.push(dojo.byId(node));
});
n.alreadyChecked=true;
return n;
}else{
return _6bc;
}
}else{
var n=[];
n.push(dojo.byId(_6bc));
n.alreadyChecked=true;
return n;
}
};
dojo.lfx.html.propertyAnimation=function(_6bf,_6c0,_6c1,_6c2,_6c3){
_6bf=dojo.lfx.html._byId(_6bf);
var _6c4={"propertyMap":_6c0,"nodes":_6bf,"duration":_6c1,"easing":_6c2||dojo.lfx.easeDefault};
var _6c5=function(args){
if(args.nodes.length==1){
var pm=args.propertyMap;
if(!dojo.lang.isArray(args.propertyMap)){
var parr=[];
for(var _6c9 in pm){
pm[_6c9].property=_6c9;
parr.push(pm[_6c9]);
}
pm=args.propertyMap=parr;
}
dojo.lang.forEach(pm,function(prop){
if(dj_undef("start",prop)){
if(prop.property!="opacity"){
prop.start=parseInt(dojo.html.getComputedStyle(args.nodes[0],prop.property));
}else{
prop.start=dojo.html.getOpacity(args.nodes[0]);
}
}
});
}
};
var _6cb=function(_6cc){
var _6cd=[];
dojo.lang.forEach(_6cc,function(c){
_6cd.push(Math.round(c));
});
return _6cd;
};
var _6cf=function(n,_6d1){
n=dojo.byId(n);
if(!n||!n.style){
return;
}
for(var s in _6d1){
if(s=="opacity"){
dojo.html.setOpacity(n,_6d1[s]);
}else{
n.style[s]=_6d1[s];
}
}
};
var _6d3=function(_6d4){
this._properties=_6d4;
this.diffs=new Array(_6d4.length);
dojo.lang.forEach(_6d4,function(prop,i){
if(dojo.lang.isFunction(prop.start)){
prop.start=prop.start(prop,i);
}
if(dojo.lang.isFunction(prop.end)){
prop.end=prop.end(prop,i);
}
if(dojo.lang.isArray(prop.start)){
this.diffs[i]=null;
}else{
if(prop.start instanceof dojo.graphics.color.Color){
prop.startRgb=prop.start.toRgb();
prop.endRgb=prop.end.toRgb();
}else{
this.diffs[i]=prop.end-prop.start;
}
}
},this);
this.getValue=function(n){
var ret={};
dojo.lang.forEach(this._properties,function(prop,i){
var _6db=null;
if(dojo.lang.isArray(prop.start)){
}else{
if(prop.start instanceof dojo.graphics.color.Color){
_6db=(prop.units||"rgb")+"(";
for(var j=0;j<prop.startRgb.length;j++){
_6db+=Math.round(((prop.endRgb[j]-prop.startRgb[j])*n)+prop.startRgb[j])+(j<prop.startRgb.length-1?",":"");
}
_6db+=")";
}else{
_6db=((this.diffs[i])*n)+prop.start+(prop.property!="opacity"?prop.units||"px":"");
}
}
ret[dojo.html.toCamelCase(prop.property)]=_6db;
},this);
return ret;
};
};
var anim=new dojo.lfx.Animation({beforeBegin:function(){
_6c5(_6c4);
anim.curve=new _6d3(_6c4.propertyMap);
},onAnimate:function(_6de){
dojo.lang.forEach(_6c4.nodes,function(node){
_6cf(node,_6de);
});
}},_6c4.duration,null,_6c4.easing);
if(_6c3){
for(var x in _6c3){
if(dojo.lang.isFunction(_6c3[x])){
anim.connect(x,anim,_6c3[x]);
}
}
}
return anim;
};
dojo.lfx.html._makeFadeable=function(_6e1){
var _6e2=function(node){
if(dojo.render.html.ie){
if((node.style.zoom.length==0)&&(dojo.html.getStyle(node,"zoom")=="normal")){
node.style.zoom="1";
}
if((node.style.width.length==0)&&(dojo.html.getStyle(node,"width")=="auto")){
node.style.width="auto";
}
}
};
if(dojo.lang.isArrayLike(_6e1)){
dojo.lang.forEach(_6e1,_6e2);
}else{
_6e2(_6e1);
}
};
dojo.lfx.html.fade=function(_6e4,_6e5,_6e6,_6e7,_6e8){
_6e4=dojo.lfx.html._byId(_6e4);
var _6e9={property:"opacity"};
if(!dj_undef("start",_6e5)){
_6e9.start=_6e5.start;
}else{
_6e9.start=function(){
return dojo.html.getOpacity(_6e4[0]);
};
}
if(!dj_undef("end",_6e5)){
_6e9.end=_6e5.end;
}else{
dojo.raise("dojo.lfx.html.fade needs an end value");
}
var anim=dojo.lfx.propertyAnimation(_6e4,[_6e9],_6e6,_6e7);
anim.connect("beforeBegin",function(){
dojo.lfx.html._makeFadeable(_6e4);
});
if(_6e8){
anim.connect("onEnd",function(){
_6e8(_6e4,anim);
});
}
return anim;
};
dojo.lfx.html.fadeIn=function(_6eb,_6ec,_6ed,_6ee){
return dojo.lfx.html.fade(_6eb,{end:1},_6ec,_6ed,_6ee);
};
dojo.lfx.html.fadeOut=function(_6ef,_6f0,_6f1,_6f2){
return dojo.lfx.html.fade(_6ef,{end:0},_6f0,_6f1,_6f2);
};
dojo.lfx.html.fadeShow=function(_6f3,_6f4,_6f5,_6f6){
_6f3=dojo.lfx.html._byId(_6f3);
dojo.lang.forEach(_6f3,function(node){
dojo.html.setOpacity(node,0);
});
var anim=dojo.lfx.html.fadeIn(_6f3,_6f4,_6f5,_6f6);
anim.connect("beforeBegin",function(){
if(dojo.lang.isArrayLike(_6f3)){
dojo.lang.forEach(_6f3,dojo.html.show);
}else{
dojo.html.show(_6f3);
}
});
return anim;
};
dojo.lfx.html.fadeHide=function(_6f9,_6fa,_6fb,_6fc){
var anim=dojo.lfx.html.fadeOut(_6f9,_6fa,_6fb,function(){
if(dojo.lang.isArrayLike(_6f9)){
dojo.lang.forEach(_6f9,dojo.html.hide);
}else{
dojo.html.hide(_6f9);
}
if(_6fc){
_6fc(_6f9,anim);
}
});
return anim;
};
dojo.lfx.html.wipeIn=function(_6fe,_6ff,_700,_701){
_6fe=dojo.lfx.html._byId(_6fe);
var _702=[];
dojo.lang.forEach(_6fe,function(node){
var _704={overflow:null};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:0,end:function(){
return node.scrollHeight;
}}},_6ff,_700);
anim.connect("beforeBegin",function(){
_704.overflow=dojo.html.getStyle(node,"overflow");
with(node.style){
if(_704.overflow=="visible"){
overflow="hidden";
}
visibility="visible";
height="0px";
}
dojo.html.show(node);
});
anim.connect("onEnd",function(){
with(node.style){
overflow=_704.overflow;
height="";
visibility="visible";
}
if(_701){
_701(node,anim);
}
});
_702.push(anim);
});
return dojo.lfx.combine(_702);
};
dojo.lfx.html.wipeOut=function(_706,_707,_708,_709){
_706=dojo.lfx.html._byId(_706);
var _70a=[];
dojo.lang.forEach(_706,function(node){
var _70c={overflow:null};
var anim=dojo.lfx.propertyAnimation(node,{"height":{start:function(){
return dojo.html.getContentBox(node).height;
},end:0}},_707,_708,{"beforeBegin":function(){
_70c.overflow=dojo.html.getStyle(node,"overflow");
if(_70c.overflow=="visible"){
node.style.overflow="hidden";
}
node.style.visibility="visible";
dojo.html.show(node);
},"onEnd":function(){
with(node.style){
overflow=_70c.overflow;
visibility="hidden";
height="";
}
if(_709){
_709(node,anim);
}
}});
_70a.push(anim);
});
return dojo.lfx.combine(_70a);
};
dojo.lfx.html.slideTo=function(_70e,_70f,_710,_711,_712){
_70e=dojo.lfx.html._byId(_70e);
var _713=[];
var _714=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_70f)){
dojo.deprecated("dojo.lfx.html.slideTo(node, array)","use dojo.lfx.html.slideTo(node, {top: value, left: value});","0.5");
_70f={top:_70f[0],left:_70f[1]};
}
dojo.lang.forEach(_70e,function(node){
var top=null;
var left=null;
var init=(function(){
var _719=node;
return function(){
var pos=_714(_719,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_714(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_714(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_719,true);
dojo.html.setStyleAttributes(_719,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:(_70f.top||0)},"left":{start:left,end:(_70f.left||0)}},_710,_711,{"beforeBegin":init});
if(_712){
anim.connect("onEnd",function(){
_712(_70e,anim);
});
}
_713.push(anim);
});
return dojo.lfx.combine(_713);
};
dojo.lfx.html.slideBy=function(_71d,_71e,_71f,_720,_721){
_71d=dojo.lfx.html._byId(_71d);
var _722=[];
var _723=dojo.html.getComputedStyle;
if(dojo.lang.isArray(_71e)){
dojo.deprecated("dojo.lfx.html.slideBy(node, array)","use dojo.lfx.html.slideBy(node, {top: value, left: value});","0.5");
_71e={top:_71e[0],left:_71e[1]};
}
dojo.lang.forEach(_71d,function(node){
var top=null;
var left=null;
var init=(function(){
var _728=node;
return function(){
var pos=_723(_728,"position");
top=(pos=="absolute"?node.offsetTop:parseInt(_723(node,"top"))||0);
left=(pos=="absolute"?node.offsetLeft:parseInt(_723(node,"left"))||0);
if(!dojo.lang.inArray(["absolute","relative"],pos)){
var ret=dojo.html.abs(_728,true);
dojo.html.setStyleAttributes(_728,"position:absolute;top:"+ret.y+"px;left:"+ret.x+"px;");
top=ret.y;
left=ret.x;
}
};
})();
init();
var anim=dojo.lfx.propertyAnimation(node,{"top":{start:top,end:top+(_71e.top||0)},"left":{start:left,end:left+(_71e.left||0)}},_71f,_720).connect("beforeBegin",init);
if(_721){
anim.connect("onEnd",function(){
_721(_71d,anim);
});
}
_722.push(anim);
});
return dojo.lfx.combine(_722);
};
dojo.lfx.html.explode=function(_72c,_72d,_72e,_72f,_730){
var h=dojo.html;
_72c=dojo.byId(_72c);
_72d=dojo.byId(_72d);
var _732=h.toCoordinateObject(_72c,true);
var _733=document.createElement("div");
h.copyStyle(_733,_72d);
with(_733.style){
position="absolute";
display="none";
}
dojo.body().appendChild(_733);
with(_72d.style){
visibility="hidden";
display="block";
}
var _734=h.toCoordinateObject(_72d,true);
_733.style.backgroundColor=h.getStyle(_72d,"background-color").toLowerCase();
with(_72d.style){
display="none";
visibility="visible";
}
var _735={opacity:{start:0.3,end:1}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_735[type]={start:_732[type],end:_734[type]};
});
var anim=new dojo.lfx.propertyAnimation(_733,_735,_72e,_72f,{"beforeBegin":function(){
h.setDisplay(_733,"block");
},"onEnd":function(){
h.setDisplay(_72d,"block");
_733.parentNode.removeChild(_733);
}});
if(_730){
anim.connect("onEnd",function(){
_730(_72d,anim);
});
}
return anim;
};
dojo.lfx.html.implode=function(_738,end,_73a,_73b,_73c){
var h=dojo.html;
_738=dojo.byId(_738);
end=dojo.byId(end);
var _73e=dojo.html.toCoordinateObject(_738,true);
var _73f=dojo.html.toCoordinateObject(end,true);
var _740=document.createElement("div");
dojo.html.copyStyle(_740,_738);
dojo.html.setOpacity(_740,0.3);
with(_740.style){
position="absolute";
display="none";
backgroundColor=h.getStyle(_738,"background-color").toLowerCase();
}
dojo.body().appendChild(_740);
var _741={opacity:{start:1,end:0.3}};
dojo.lang.forEach(["height","width","top","left"],function(type){
_741[type]={start:_73e[type],end:_73f[type]};
});
var anim=new dojo.lfx.propertyAnimation(_740,_741,_73a,_73b,{"beforeBegin":function(){
dojo.html.hide(_738);
dojo.html.show(_740);
},"onEnd":function(){
_740.parentNode.removeChild(_740);
}});
if(_73c){
anim.connect("onEnd",function(){
_73c(_738,anim);
});
}
return anim;
};
dojo.lfx.html.highlight=function(_744,_745,_746,_747,_748){
_744=dojo.lfx.html._byId(_744);
var _749=[];
dojo.lang.forEach(_744,function(node){
var _74b=dojo.html.getBackgroundColor(node);
var bg=dojo.html.getStyle(node,"background-color").toLowerCase();
var _74d=dojo.html.getStyle(node,"background-image");
var _74e=(bg=="transparent"||bg=="rgba(0, 0, 0, 0)");
while(_74b.length>3){
_74b.pop();
}
var rgb=new dojo.graphics.color.Color(_745);
var _750=new dojo.graphics.color.Color(_74b);
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:rgb,end:_750}},_746,_747,{"beforeBegin":function(){
if(_74d){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+rgb.toRgb().join(",")+")";
},"onEnd":function(){
if(_74d){
node.style.backgroundImage=_74d;
}
if(_74e){
node.style.backgroundColor="transparent";
}
if(_748){
_748(node,anim);
}
}});
_749.push(anim);
});
return dojo.lfx.combine(_749);
};
dojo.lfx.html.unhighlight=function(_752,_753,_754,_755,_756){
_752=dojo.lfx.html._byId(_752);
var _757=[];
dojo.lang.forEach(_752,function(node){
var _759=new dojo.graphics.color.Color(dojo.html.getBackgroundColor(node));
var rgb=new dojo.graphics.color.Color(_753);
var _75b=dojo.html.getStyle(node,"background-image");
var anim=dojo.lfx.propertyAnimation(node,{"background-color":{start:_759,end:rgb}},_754,_755,{"beforeBegin":function(){
if(_75b){
node.style.backgroundImage="none";
}
node.style.backgroundColor="rgb("+_759.toRgb().join(",")+")";
},"onEnd":function(){
if(_756){
_756(node,anim);
}
}});
_757.push(anim);
});
return dojo.lfx.combine(_757);
};
dojo.lang.mixin(dojo.lfx,dojo.lfx.html);
dojo.provide("dojo.lfx.*");
dojo.provide("dojo.lfx.toggle");
dojo.lfx.toggle.plain={show:function(node,_75e,_75f,_760){
dojo.html.show(node);
if(dojo.lang.isFunction(_760)){
_760();
}
},hide:function(node,_762,_763,_764){
dojo.html.hide(node);
if(dojo.lang.isFunction(_764)){
_764();
}
}};
dojo.lfx.toggle.fade={show:function(node,_766,_767,_768){
dojo.lfx.fadeShow(node,_766,_767,_768).play();
},hide:function(node,_76a,_76b,_76c){
dojo.lfx.fadeHide(node,_76a,_76b,_76c).play();
}};
dojo.lfx.toggle.wipe={show:function(node,_76e,_76f,_770){
dojo.lfx.wipeIn(node,_76e,_76f,_770).play();
},hide:function(node,_772,_773,_774){
dojo.lfx.wipeOut(node,_772,_773,_774).play();
}};
dojo.lfx.toggle.explode={show:function(node,_776,_777,_778,_779){
dojo.lfx.explode(_779||{x:0,y:0,width:0,height:0},node,_776,_777,_778).play();
},hide:function(node,_77b,_77c,_77d,_77e){
dojo.lfx.implode(node,_77e||{x:0,y:0,width:0,height:0},_77b,_77c,_77d).play();
}};
dojo.provide("dojo.widget.HtmlWidget");
dojo.declare("dojo.widget.HtmlWidget",dojo.widget.DomWidget,{widgetType:"HtmlWidget",templateCssPath:null,templatePath:null,toggle:"plain",toggleDuration:150,animationInProgress:false,initialize:function(args,frag){
},postMixInProperties:function(args,frag){
this.toggleObj=dojo.lfx.toggle[this.toggle.toLowerCase()]||dojo.lfx.toggle.plain;
},getContainerHeight:function(){
dojo.unimplemented("dojo.widget.HtmlWidget.getContainerHeight");
},getContainerWidth:function(){
return this.parent.domNode.offsetWidth;
},setNativeHeight:function(_783){
var ch=this.getContainerHeight();
},createNodesFromText:function(txt,wrap){
return dojo.html.createNodesFromText(txt,wrap);
},destroyRendering:function(_787){
try{
if(!_787&&this.domNode){
dojo.event.browser.clean(this.domNode);
}
this.domNode.parentNode.removeChild(this.domNode);
delete this.domNode;
}
catch(e){
}
},isShowing:function(){
return dojo.html.isShowing(this.domNode);
},toggleShowing:function(){
if(this.isHidden){
this.show();
}else{
this.hide();
}
},show:function(){
this.animationInProgress=true;
this.isHidden=false;
this.toggleObj.show(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onShow),this.explodeSrc);
},onShow:function(){
this.animationInProgress=false;
this.checkSize();
},hide:function(){
this.animationInProgress=true;
this.isHidden=true;
this.toggleObj.hide(this.domNode,this.toggleDuration,null,dojo.lang.hitch(this,this.onHide),this.explodeSrc);
},onHide:function(){
this.animationInProgress=false;
},_isResized:function(w,h){
if(!this.isShowing()){
return false;
}
var wh=dojo.html.getMarginBox(this.domNode);
var _78b=w||wh.width;
var _78c=h||wh.height;
if(this.width==_78b&&this.height==_78c){
return false;
}
this.width=_78b;
this.height=_78c;
return true;
},checkSize:function(){
if(!this._isResized()){
return;
}
this.onResized();
},resizeTo:function(w,h){
if(!this._isResized(w,h)){
return;
}
dojo.html.setMarginBox(this.domNode,{width:w,height:h});
this.onResized();
},resizeSoon:function(){
if(this.isShowing()){
dojo.lang.setTimeout(this,this.onResized,0);
}
},onResized:function(){
dojo.lang.forEach(this.children,function(_78f){
if(_78f["checkSize"]){
_78f.checkSize();
}
});
}});
dojo.provide("dojo.widget.*");

