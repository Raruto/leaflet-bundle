(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

  (function(root, factory) {

  	if (root === null) {
  		throw new Error('Google-maps package can be used only in browser');
  	}

  	if (typeof define === 'function' && define.amd) {
  		define(factory);
  	} else if (typeof exports === 'object') {
  		module.exports = factory();
  	} else {
  		root.GoogleMapsLoader = factory();
  	}

  })(typeof window !== 'undefined' ? window : null, function() {


  	var googleVersion = '3.31';

  	var script = null;

  	var google = null;

  	var loading = false;

  	var callbacks = [];

  	var onLoadEvents = [];

  	var originalCreateLoaderMethod = null;


  	var GoogleMapsLoader = {};


  	GoogleMapsLoader.URL = 'https://maps.googleapis.com/maps/api/js';

  	GoogleMapsLoader.KEY = null;

  	GoogleMapsLoader.LIBRARIES = [];

  	GoogleMapsLoader.CLIENT = null;

  	GoogleMapsLoader.CHANNEL = null;

  	GoogleMapsLoader.LANGUAGE = null;

  	GoogleMapsLoader.REGION = null;

  	GoogleMapsLoader.VERSION = googleVersion;

  	GoogleMapsLoader.WINDOW_CALLBACK_NAME = '__google_maps_api_provider_initializator__';


  	GoogleMapsLoader._googleMockApiObject = {};


  	GoogleMapsLoader.load = function(fn) {
  		if (google === null) {
  			if (loading === true) {
  				if (fn) {
  					callbacks.push(fn);
  				}
  			} else {
  				loading = true;

  				window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] = function() {
  					ready(fn);
  				};

  				GoogleMapsLoader.createLoader();
  			}
  		} else if (fn) {
  			fn(google);
  		}
  	};


  	GoogleMapsLoader.createLoader = function() {
  		script = document.createElement('script');
  		script.type = 'text/javascript';
  		script.src = GoogleMapsLoader.createUrl();

  		document.body.appendChild(script);
  	};


  	GoogleMapsLoader.isLoaded = function() {
  		return google !== null;
  	};


  	GoogleMapsLoader.createUrl = function() {
  		var url = GoogleMapsLoader.URL;

  		url += '?callback=' + GoogleMapsLoader.WINDOW_CALLBACK_NAME;

  		if (GoogleMapsLoader.KEY) {
  			url += '&key=' + GoogleMapsLoader.KEY;
  		}

  		if (GoogleMapsLoader.LIBRARIES.length > 0) {
  			url += '&libraries=' + GoogleMapsLoader.LIBRARIES.join(',');
  		}

  		if (GoogleMapsLoader.CLIENT) {
  			url += '&client=' + GoogleMapsLoader.CLIENT;
  		}

  		if (GoogleMapsLoader.CHANNEL) {
  			url += '&channel=' + GoogleMapsLoader.CHANNEL;
  		}

  		if (GoogleMapsLoader.LANGUAGE) {
  			url += '&language=' + GoogleMapsLoader.LANGUAGE;
  		}

  		if (GoogleMapsLoader.REGION) {
  			url += '&region=' + GoogleMapsLoader.REGION;
  		}

  		if (GoogleMapsLoader.VERSION) {
  			url += '&v=' + GoogleMapsLoader.VERSION;
  		}

  		return url;
  	};


  	GoogleMapsLoader.release = function(fn) {
  		var release = function() {
  			GoogleMapsLoader.KEY = null;
  			GoogleMapsLoader.LIBRARIES = [];
  			GoogleMapsLoader.CLIENT = null;
  			GoogleMapsLoader.CHANNEL = null;
  			GoogleMapsLoader.LANGUAGE = null;
  			GoogleMapsLoader.REGION = null;
  			GoogleMapsLoader.VERSION = googleVersion;

  			google = null;
  			loading = false;
  			callbacks = [];
  			onLoadEvents = [];

  			if (typeof window.google !== 'undefined') {
  				delete window.google;
  			}

  			if (typeof window[GoogleMapsLoader.WINDOW_CALLBACK_NAME] !== 'undefined') {
  				delete window[GoogleMapsLoader.WINDOW_CALLBACK_NAME];
  			}

  			if (originalCreateLoaderMethod !== null) {
  				GoogleMapsLoader.createLoader = originalCreateLoaderMethod;
  				originalCreateLoaderMethod = null;
  			}

  			if (script !== null) {
  				script.parentElement.removeChild(script);
  				script = null;
  			}

  			if (fn) {
  				fn();
  			}
  		};

  		if (loading) {
  			GoogleMapsLoader.load(function() {
  				release();
  			});
  		} else {
  			release();
  		}
  	};


  	GoogleMapsLoader.onLoad = function(fn) {
  		onLoadEvents.push(fn);
  	};


  	GoogleMapsLoader.makeMock = function() {
  		originalCreateLoaderMethod = GoogleMapsLoader.createLoader;

  		GoogleMapsLoader.createLoader = function() {
  			window.google = GoogleMapsLoader._googleMockApiObject;
  			window[GoogleMapsLoader.WINDOW_CALLBACK_NAME]();
  		};
  	};


  	var ready = function(fn) {
  		var i;

  		loading = false;

  		if (google === null) {
  			google = window.google;
  		}

  		for (i = 0; i < onLoadEvents.length; i++) {
  			onLoadEvents[i](google);
  		}

  		if (fn) {
  			fn(google);
  		}

  		for (i = 0; i < callbacks.length; i++) {
  			callbacks[i](google);
  		}

  		callbacks = [];
  	};


  	return GoogleMapsLoader;

  });

  /*!

  JSZip v3.2.1 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>

  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/master/LICENSE
  */
  !function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.JSZip=a();}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d);}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){var d=a("./utils"),e=a("./support"),f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";c.encode=function(a){for(var b,c,e,g,h,i,j,k=[],l=0,m=a.length,n=m,o="string"!==d.getTypeOf(a);l<a.length;)n=m-l,o?(b=a[l++],c=l<m?a[l++]:0,e=l<m?a[l++]:0):(b=a.charCodeAt(l++),c=l<m?a.charCodeAt(l++):0,e=l<m?a.charCodeAt(l++):0),g=b>>2,h=(3&b)<<4|c>>4,i=n>1?(15&c)<<2|e>>6:64,j=n>2?63&e:64,k.push(f.charAt(g)+f.charAt(h)+f.charAt(i)+f.charAt(j));return k.join("")},c.decode=function(a){var b,c,d,g,h,i,j,k=0,l=0,m="data:";if(a.substr(0,m.length)===m)throw new Error("Invalid base64 input, it looks like a data url.");a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");var n=3*a.length/4;if(a.charAt(a.length-1)===f.charAt(64)&&n--,a.charAt(a.length-2)===f.charAt(64)&&n--,n%1!==0)throw new Error("Invalid base64 input, bad content length.");var o;for(o=e.uint8array?new Uint8Array(0|n):new Array(0|n);k<a.length;)g=f.indexOf(a.charAt(k++)),h=f.indexOf(a.charAt(k++)),i=f.indexOf(a.charAt(k++)),j=f.indexOf(a.charAt(k++)),b=g<<2|h>>4,c=(15&h)<<4|i>>2,d=(3&i)<<6|j,o[l++]=b,64!==i&&(o[l++]=c),64!==j&&(o[l++]=d);return o};},{"./support":30,"./utils":32}],2:[function(a,b,c){function d(a,b,c,d,e){this.compressedSize=a,this.uncompressedSize=b,this.crc32=c,this.compression=d,this.compressedContent=e;}var e=a("./external"),f=a("./stream/DataWorker"),g=a("./stream/DataLengthProbe"),h=a("./stream/Crc32Probe"),g=a("./stream/DataLengthProbe");d.prototype={getContentWorker:function(){var a=new f(e.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new g("data_length")),b=this;return a.on("end",function(){if(this.streamInfo.data_length!==b.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),a},getCompressedWorker:function(){return new f(e.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(a,b,c){return a.pipe(new h).pipe(new g("uncompressedSize")).pipe(b.compressWorker(c)).pipe(new g("compressedSize")).withStreamInfo("compression",b)},b.exports=d;},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(a,b,c){var d=a("./stream/GenericWorker");c.STORE={magic:"\0\0",compressWorker:function(a){return new d("STORE compression")},uncompressWorker:function(){return new d("STORE decompression")}},c.DEFLATE=a("./flate");},{"./flate":7,"./stream/GenericWorker":28}],4:[function(a,b,c){function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a;}return b}function e(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b[g])];return a^-1}function f(a,b,c,d){var e=h,f=d+c;a^=-1;for(var g=d;g<f;g++)a=a>>>8^e[255&(a^b.charCodeAt(g))];return a^-1}var g=a("./utils"),h=d();b.exports=function(a,b){if("undefined"==typeof a||!a.length)return 0;var c="string"!==g.getTypeOf(a);return c?e(0|b,a,a.length,0):f(0|b,a,a.length,0)};},{"./utils":32}],5:[function(a,b,c){c.base64=!1,c.binary=!1,c.dir=!1,c.createFolders=!0,c.date=null,c.compression=null,c.compressionOptions=null,c.comment=null,c.unixPermissions=null,c.dosPermissions=null;},{}],6:[function(a,b,c){var d=null;d="undefined"!=typeof Promise?Promise:a("lie"),b.exports={Promise:d};},{lie:37}],7:[function(a,b,c){function d(a,b){h.call(this,"FlateWorker/"+a),this._pako=null,this._pakoAction=a,this._pakoOptions=b,this.meta={};}var e="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,f=a("pako"),g=a("./utils"),h=a("./stream/GenericWorker"),i=e?"uint8array":"array";c.magic="\b\0",g.inherits(d,h),d.prototype.processChunk=function(a){this.meta=a.meta,null===this._pako&&this._createPako(),this._pako.push(g.transformTo(i,a.data),!1);},d.prototype.flush=function(){h.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0);},d.prototype.cleanUp=function(){h.prototype.cleanUp.call(this),this._pako=null;},d.prototype._createPako=function(){this._pako=new f[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var a=this;this._pako.onData=function(b){a.push({data:b,meta:a.meta});};},c.compressWorker=function(a){return new d("Deflate",a)},c.uncompressWorker=function(){return new d("Inflate",{})};},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(a,b,c){function d(a,b,c,d){f.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=b,this.zipPlatform=c,this.encodeFileName=d,this.streamFiles=a,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[];}var e=a("../utils"),f=a("../stream/GenericWorker"),g=a("../utf8"),h=a("../crc32"),i=a("../signature"),j=function(a,b){var c,d="";for(c=0;c<b;c++)d+=String.fromCharCode(255&a),a>>>=8;return d},k=function(a,b){var c=a;return a||(c=b?16893:33204),(65535&c)<<16},l=function(a,b){return 63&(a||0)},m=function(a,b,c,d,f,m){var n,o,p=a.file,q=a.compression,r=m!==g.utf8encode,s=e.transformTo("string",m(p.name)),t=e.transformTo("string",g.utf8encode(p.name)),u=p.comment,v=e.transformTo("string",m(u)),w=e.transformTo("string",g.utf8encode(u)),x=t.length!==p.name.length,y=w.length!==u.length,z="",A="",B="",C=p.dir,D=p.date,E={crc32:0,compressedSize:0,uncompressedSize:0};b&&!c||(E.crc32=a.crc32,E.compressedSize=a.compressedSize,E.uncompressedSize=a.uncompressedSize);var F=0;b&&(F|=8),r||!x&&!y||(F|=2048);var G=0,H=0;C&&(G|=16),"UNIX"===f?(H=798,G|=k(p.unixPermissions,C)):(H=20,G|=l(p.dosPermissions)),n=D.getUTCHours(),n<<=6,n|=D.getUTCMinutes(),n<<=5,n|=D.getUTCSeconds()/2,o=D.getUTCFullYear()-1980,o<<=4,o|=D.getUTCMonth()+1,o<<=5,o|=D.getUTCDate(),x&&(A=j(1,1)+j(h(s),4)+t,z+="up"+j(A.length,2)+A),y&&(B=j(1,1)+j(h(v),4)+w,z+="uc"+j(B.length,2)+B);var I="";I+="\n\0",I+=j(F,2),I+=q.magic,I+=j(n,2),I+=j(o,2),I+=j(E.crc32,4),I+=j(E.compressedSize,4),I+=j(E.uncompressedSize,4),I+=j(s.length,2),I+=j(z.length,2);var J=i.LOCAL_FILE_HEADER+I+s+z,K=i.CENTRAL_FILE_HEADER+j(H,2)+I+j(v.length,2)+"\0\0\0\0"+j(G,4)+j(d,4)+s+z+v;return {fileRecord:J,dirRecord:K}},n=function(a,b,c,d,f){var g="",h=e.transformTo("string",f(d));return g=i.CENTRAL_DIRECTORY_END+"\0\0\0\0"+j(a,2)+j(a,2)+j(b,4)+j(c,4)+j(h.length,2)+h},o=function(a){var b="";return b=i.DATA_DESCRIPTOR+j(a.crc32,4)+j(a.compressedSize,4)+j(a.uncompressedSize,4)};e.inherits(d,f),d.prototype.push=function(a){var b=a.meta.percent||0,c=this.entriesCount,d=this._sources.length;this.accumulate?this.contentBuffer.push(a):(this.bytesWritten+=a.data.length,f.prototype.push.call(this,{data:a.data,meta:{currentFile:this.currentFile,percent:c?(b+100*(c-d-1))/c:100}}));},d.prototype.openedSource=function(a){this.currentSourceOffset=this.bytesWritten,this.currentFile=a.file.name;var b=this.streamFiles&&!a.file.dir;if(b){var c=m(a,b,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:c.fileRecord,meta:{percent:0}});}else this.accumulate=!0;},d.prototype.closedSource=function(a){this.accumulate=!1;var b=this.streamFiles&&!a.file.dir,c=m(a,b,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(c.dirRecord),b)this.push({data:o(a),meta:{percent:100}});else for(this.push({data:c.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null;},d.prototype.flush=function(){for(var a=this.bytesWritten,b=0;b<this.dirRecords.length;b++)this.push({data:this.dirRecords[b],meta:{percent:100}});var c=this.bytesWritten-a,d=n(this.dirRecords.length,c,a,this.zipComment,this.encodeFileName);this.push({data:d,meta:{percent:100}});},d.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume();},d.prototype.registerPrevious=function(a){this._sources.push(a);var b=this;return a.on("data",function(a){b.processChunk(a);}),a.on("end",function(){b.closedSource(b.previous.streamInfo),b._sources.length?b.prepareNextSource():b.end();}),a.on("error",function(a){b.error(a);}),this},d.prototype.resume=function(){return !!f.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},d.prototype.error=function(a){var b=this._sources;if(!f.prototype.error.call(this,a))return !1;for(var c=0;c<b.length;c++)try{b[c].error(a);}catch(a){}return !0},d.prototype.lock=function(){f.prototype.lock.call(this);for(var a=this._sources,b=0;b<a.length;b++)a[b].lock();},b.exports=d;},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(a,b,c){var d=a("../compressions"),e=a("./ZipFileWorker"),f=function(a,b){var c=a||b,e=d[c];if(!e)throw new Error(c+" is not a valid compression method !");return e};c.generateWorker=function(a,b,c){var d=new e(b.streamFiles,c,b.platform,b.encodeFileName),g=0;try{a.forEach(function(a,c){g++;var e=f(c.options.compression,b.compression),h=c.options.compressionOptions||b.compressionOptions||{},i=c.dir,j=c.date;c._compressWorker(e,h).withStreamInfo("file",{name:a,dir:i,date:j,comment:c.comment||"",unixPermissions:c.unixPermissions,dosPermissions:c.dosPermissions}).pipe(d);}),d.entriesCount=g;}catch(h){d.error(h);}return d};},{"../compressions":3,"./ZipFileWorker":8}],10:[function(a,b,c){function d(){if(!(this instanceof d))return new d;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var a=new d;for(var b in this)"function"!=typeof this[b]&&(a[b]=this[b]);return a};}d.prototype=a("./object"),d.prototype.loadAsync=a("./load"),d.support=a("./support"),d.defaults=a("./defaults"),d.version="3.2.0",d.loadAsync=function(a,b){return (new d).loadAsync(a,b)},d.external=a("./external"),b.exports=d;},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(a,b,c){function d(a){return new f.Promise(function(b,c){var d=a.decompressed.getContentWorker().pipe(new i);d.on("error",function(a){c(a);}).on("end",function(){d.streamInfo.crc32!==a.decompressed.crc32?c(new Error("Corrupted zip : CRC32 mismatch")):b();}).resume();})}var e=a("./utils"),f=a("./external"),g=a("./utf8"),e=a("./utils"),h=a("./zipEntries"),i=a("./stream/Crc32Probe"),j=a("./nodejsUtils");b.exports=function(a,b){var c=this;return b=e.extend(b||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:g.utf8decode}),j.isNode&&j.isStream(a)?f.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):e.prepareContent("the loaded zip file",a,!0,b.optimizedBinaryString,b.base64).then(function(a){var c=new h(b);return c.load(a),c}).then(function(a){var c=[f.Promise.resolve(a)],e=a.files;if(b.checkCRC32)for(var g=0;g<e.length;g++)c.push(d(e[g]));return f.Promise.all(c)}).then(function(a){for(var d=a.shift(),e=d.files,f=0;f<e.length;f++){var g=e[f];c.file(g.fileNameStr,g.decompressed,{binary:!0,optimizedBinaryString:!0,date:g.date,dir:g.dir,comment:g.fileCommentStr.length?g.fileCommentStr:null,unixPermissions:g.unixPermissions,dosPermissions:g.dosPermissions,createFolders:b.createFolders});}return d.zipComment.length&&(c.comment=d.zipComment),c})};},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(a,b,c){function d(a,b){f.call(this,"Nodejs stream input adapter for "+a),this._upstreamEnded=!1,this._bindStream(b);}var e=a("../utils"),f=a("../stream/GenericWorker");e.inherits(d,f),d.prototype._bindStream=function(a){var b=this;this._stream=a,a.pause(),a.on("data",function(a){b.push({data:a,meta:{percent:0}});}).on("error",function(a){b.isPaused?this.generatedError=a:b.error(a);}).on("end",function(){b.isPaused?b._upstreamEnded=!0:b.end();});},d.prototype.pause=function(){return !!f.prototype.pause.call(this)&&(this._stream.pause(),!0)},d.prototype.resume=function(){return !!f.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},b.exports=d;},{"../stream/GenericWorker":28,"../utils":32}],13:[function(a,b,c){function d(a,b,c){e.call(this,b),this._helper=a;var d=this;a.on("data",function(a,b){d.push(a)||d._helper.pause(),c&&c(b);}).on("error",function(a){d.emit("error",a);}).on("end",function(){d.push(null);});}var e=a("readable-stream").Readable,f=a("../utils");f.inherits(d,e),d.prototype._read=function(){this._helper.resume();},b.exports=d;},{"../utils":32,"readable-stream":16}],14:[function(a,b,c){b.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(a,b){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(a,b);if("number"==typeof a)throw new Error('The "data" argument must not be a number');return new Buffer(a,b)},allocBuffer:function(a){if(Buffer.alloc)return Buffer.alloc(a);var b=new Buffer(a);return b.fill(0),b},isBuffer:function(a){return Buffer.isBuffer(a)},isStream:function(a){return a&&"function"==typeof a.on&&"function"==typeof a.pause&&"function"==typeof a.resume}};},{}],15:[function(a,b,c){function d(a){return "[object RegExp]"===Object.prototype.toString.call(a)}var e=a("./utf8"),f=a("./utils"),g=a("./stream/GenericWorker"),h=a("./stream/StreamHelper"),i=a("./defaults"),j=a("./compressedObject"),k=a("./zipObject"),l=a("./generate"),m=a("./nodejsUtils"),n=a("./nodejs/NodejsStreamInputAdapter"),o=function(a,b,c){var d,e=f.getTypeOf(b),h=f.extend(c||{},i);h.date=h.date||new Date,null!==h.compression&&(h.compression=h.compression.toUpperCase()),"string"==typeof h.unixPermissions&&(h.unixPermissions=parseInt(h.unixPermissions,8)),h.unixPermissions&&16384&h.unixPermissions&&(h.dir=!0),h.dosPermissions&&16&h.dosPermissions&&(h.dir=!0),h.dir&&(a=q(a)),h.createFolders&&(d=p(a))&&r.call(this,d,!0);var l="string"===e&&h.binary===!1&&h.base64===!1;c&&"undefined"!=typeof c.binary||(h.binary=!l);var o=b instanceof j&&0===b.uncompressedSize;(o||h.dir||!b||0===b.length)&&(h.base64=!1,h.binary=!0,b="",h.compression="STORE",e="string");var s=null;s=b instanceof j||b instanceof g?b:m.isNode&&m.isStream(b)?new n(a,b):f.prepareContent(a,b,h.binary,h.optimizedBinaryString,h.base64);var t=new k(a,s,h);this.files[a]=t;},p=function(a){"/"===a.slice(-1)&&(a=a.substring(0,a.length-1));var b=a.lastIndexOf("/");return b>0?a.substring(0,b):""},q=function(a){return "/"!==a.slice(-1)&&(a+="/"),a},r=function(a,b){return b="undefined"!=typeof b?b:i.createFolders,a=q(a),this.files[a]||o.call(this,a,null,{dir:!0,createFolders:b}),this.files[a]},s={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(a){var b,c,d;for(b in this.files)this.files.hasOwnProperty(b)&&(d=this.files[b],c=b.slice(this.root.length,b.length),c&&b.slice(0,this.root.length)===this.root&&a(c,d));},filter:function(a){var b=[];return this.forEach(function(c,d){a(c,d)&&b.push(d);}),b},file:function(a,b,c){if(1===arguments.length){if(d(a)){var e=a;return this.filter(function(a,b){return !b.dir&&e.test(a)})}var f=this.files[this.root+a];return f&&!f.dir?f:null}return a=this.root+a,o.call(this,a,b,c),this},folder:function(a){if(!a)return this;if(d(a))return this.filter(function(b,c){return c.dir&&a.test(b)});var b=this.root+a,c=r.call(this,b),e=this.clone();return e.root=c.name,e},remove:function(a){a=this.root+a;var b=this.files[a];if(b||("/"!==a.slice(-1)&&(a+="/"),b=this.files[a]),b&&!b.dir)delete this.files[a];else for(var c=this.filter(function(b,c){return c.name.slice(0,a.length)===a}),d=0;d<c.length;d++)delete this.files[c[d].name];return this},generate:function(a){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(a){var b,c={};try{if(c=f.extend(a||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:e.utf8encode}),c.type=c.type.toLowerCase(),c.compression=c.compression.toUpperCase(),"binarystring"===c.type&&(c.type="string"),!c.type)throw new Error("No output type specified.");f.checkSupport(c.type),"darwin"!==c.platform&&"freebsd"!==c.platform&&"linux"!==c.platform&&"sunos"!==c.platform||(c.platform="UNIX"),"win32"===c.platform&&(c.platform="DOS");var d=c.comment||this.comment||"";b=l.generateWorker(this,c,d);}catch(i){b=new g("error"),b.error(i);}return new h(b,c.type||"string",c.mimeType)},generateAsync:function(a,b){return this.generateInternalStream(a).accumulate(b)},generateNodeStream:function(a,b){return a=a||{},a.type||(a.type="nodebuffer"),this.generateInternalStream(a).toNodejsStream(b)}};b.exports=s;},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(a,b,c){b.exports=a("stream");},{stream:void 0}],17:[function(a,b,c){function d(a){e.call(this,a);for(var b=0;b<this.data.length;b++)a[b]=255&a[b];}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data[this.zero+a]},d.prototype.lastIndexOfSignature=function(a){for(var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.length-4;f>=0;--f)if(this.data[f]===b&&this.data[f+1]===c&&this.data[f+2]===d&&this.data[f+3]===e)return f-this.zero;return -1},d.prototype.readAndCheckSignature=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=this.readData(4);return b===f[0]&&c===f[1]&&d===f[2]&&e===f[3]},d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return [];var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d;},{"../utils":32,"./DataReader":18}],18:[function(a,b,c){function d(a){this.data=a,this.length=a.length,this.index=0,this.zero=0;}var e=a("../utils");d.prototype={checkOffset:function(a){this.checkIndex(this.index+a);},checkIndex:function(a){if(this.length<this.zero+a||a<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+a+"). Corrupted zip ?")},setIndex:function(a){this.checkIndex(a),this.index=a;},skip:function(a){this.setIndex(this.index+a);},byteAt:function(a){},readInt:function(a){var b,c=0;for(this.checkOffset(a),b=this.index+a-1;b>=this.index;b--)c=(c<<8)+this.byteAt(b);return this.index+=a,c},readString:function(a){return e.transformTo("string",this.readData(a))},readData:function(a){},lastIndexOfSignature:function(a){},readAndCheckSignature:function(a){},readDate:function(){var a=this.readInt(4);return new Date(Date.UTC((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&31,a>>5&63,(31&a)<<1))}},b.exports=d;},{"../utils":32}],19:[function(a,b,c){function d(a){e.call(this,a);}var e=a("./Uint8ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d;},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(a,b,c){function d(a){e.call(this,a);}var e=a("./DataReader"),f=a("../utils");f.inherits(d,e),d.prototype.byteAt=function(a){return this.data.charCodeAt(this.zero+a)},d.prototype.lastIndexOfSignature=function(a){return this.data.lastIndexOf(a)-this.zero},d.prototype.readAndCheckSignature=function(a){var b=this.readData(4);return a===b},d.prototype.readData=function(a){this.checkOffset(a);var b=this.data.slice(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d;},{"../utils":32,"./DataReader":18}],21:[function(a,b,c){function d(a){e.call(this,a);}var e=a("./ArrayReader"),f=a("../utils");f.inherits(d,e),d.prototype.readData=function(a){if(this.checkOffset(a),0===a)return new Uint8Array(0);var b=this.data.subarray(this.zero+this.index,this.zero+this.index+a);return this.index+=a,b},b.exports=d;},{"../utils":32,"./ArrayReader":17}],22:[function(a,b,c){var d=a("../utils"),e=a("../support"),f=a("./ArrayReader"),g=a("./StringReader"),h=a("./NodeBufferReader"),i=a("./Uint8ArrayReader");b.exports=function(a){var b=d.getTypeOf(a);return d.checkSupport(b),"string"!==b||e.uint8array?"nodebuffer"===b?new h(a):e.uint8array?new i(d.transformTo("uint8array",a)):new f(d.transformTo("array",a)):new g(a)};},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(a,b,c){c.LOCAL_FILE_HEADER="PK",c.CENTRAL_FILE_HEADER="PK",c.CENTRAL_DIRECTORY_END="PK",c.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",c.ZIP64_CENTRAL_DIRECTORY_END="PK",c.DATA_DESCRIPTOR="PK\b";},{}],24:[function(a,b,c){function d(a){e.call(this,"ConvertWorker to "+a),this.destType=a;}var e=a("./GenericWorker"),f=a("../utils");f.inherits(d,e),d.prototype.processChunk=function(a){this.push({data:f.transformTo(this.destType,a.data),meta:a.meta});},b.exports=d;},{"../utils":32,"./GenericWorker":28}],25:[function(a,b,c){function d(){e.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0);}var e=a("./GenericWorker"),f=a("../crc32"),g=a("../utils");g.inherits(d,e),d.prototype.processChunk=function(a){this.streamInfo.crc32=f(a.data,this.streamInfo.crc32||0),this.push(a);},b.exports=d;},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(a,b,c){function d(a){f.call(this,"DataLengthProbe for "+a),this.propName=a,this.withStreamInfo(a,0);}var e=a("../utils"),f=a("./GenericWorker");e.inherits(d,f),d.prototype.processChunk=function(a){if(a){var b=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=b+a.data.length;}f.prototype.processChunk.call(this,a);},b.exports=d;},{"../utils":32,"./GenericWorker":28}],27:[function(a,b,c){function d(a){f.call(this,"DataWorker");var b=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,a.then(function(a){b.dataIsReady=!0,b.data=a,b.max=a&&a.length||0,b.type=e.getTypeOf(a),b.isPaused||b._tickAndRepeat();},function(a){b.error(a);});}var e=a("../utils"),f=a("./GenericWorker"),g=16384;e.inherits(d,f),d.prototype.cleanUp=function(){f.prototype.cleanUp.call(this),this.data=null;},d.prototype.resume=function(){return !!f.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,e.delay(this._tickAndRepeat,[],this)),!0)},d.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(e.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0));},d.prototype._tick=function(){if(this.isPaused||this.isFinished)return !1;var a=g,b=null,c=Math.min(this.max,this.index+a);if(this.index>=this.max)return this.end();switch(this.type){case"string":b=this.data.substring(this.index,c);break;case"uint8array":b=this.data.subarray(this.index,c);break;case"array":case"nodebuffer":b=this.data.slice(this.index,c);}return this.index=c,this.push({data:b,meta:{percent:this.max?this.index/this.max*100:0}})},b.exports=d;},{"../utils":32,"./GenericWorker":28}],28:[function(a,b,c){function d(a){this.name=a||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null;}d.prototype={push:function(a){this.emit("data",a);},end:function(){if(this.isFinished)return !1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0;}catch(a){this.emit("error",a);}return !0},error:function(a){return !this.isFinished&&(this.isPaused?this.generatedError=a:(this.isFinished=!0,this.emit("error",a),this.previous&&this.previous.error(a),this.cleanUp()),!0)},on:function(a,b){return this._listeners[a].push(b),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[];},emit:function(a,b){if(this._listeners[a])for(var c=0;c<this._listeners[a].length;c++)this._listeners[a][c].call(this,b);},pipe:function(a){return a.registerPrevious(this)},registerPrevious:function(a){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=a.streamInfo,this.mergeStreamInfo(),this.previous=a;var b=this;return a.on("data",function(a){b.processChunk(a);}),a.on("end",function(){b.end();}),a.on("error",function(a){b.error(a);}),this},pause:function(){return !this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return !1;this.isPaused=!1;var a=!1;return this.generatedError&&(this.error(this.generatedError),a=!0),this.previous&&this.previous.resume(),!a},flush:function(){},processChunk:function(a){this.push(a);},withStreamInfo:function(a,b){return this.extraStreamInfo[a]=b,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var a in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(a)&&(this.streamInfo[a]=this.extraStreamInfo[a]);},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock();},toString:function(){var a="Worker "+this.name;return this.previous?this.previous+" -> "+a:a}},b.exports=d;},{}],29:[function(a,b,c){function d(a,b,c){switch(a){case"blob":return h.newBlob(h.transformTo("arraybuffer",b),c);case"base64":return k.encode(b);default:return h.transformTo(a,b)}}function e(a,b){var c,d=0,e=null,f=0;for(c=0;c<b.length;c++)f+=b[c].length;switch(a){case"string":return b.join("");case"array":return Array.prototype.concat.apply([],b);case"uint8array":for(e=new Uint8Array(f),c=0;c<b.length;c++)e.set(b[c],d),d+=b[c].length;return e;case"nodebuffer":return Buffer.concat(b);default:throw new Error("concat : unsupported type '"+a+"'")}}function f(a,b){return new m.Promise(function(c,f){var g=[],h=a._internalType,i=a._outputType,j=a._mimeType;a.on("data",function(a,c){g.push(a),b&&b(c);}).on("error",function(a){g=[],f(a);}).on("end",function(){try{var a=d(i,e(h,g),j);c(a);}catch(b){f(b);}g=[];}).resume();})}function g(a,b,c){var d=b;switch(b){case"blob":case"arraybuffer":d="uint8array";break;case"base64":d="string";}try{this._internalType=d,this._outputType=b,this._mimeType=c,h.checkSupport(d),this._worker=a.pipe(new i(d)),a.lock();}catch(e){this._worker=new j("error"),this._worker.error(e);}}var h=a("../utils"),i=a("./ConvertWorker"),j=a("./GenericWorker"),k=a("../base64"),l=a("../support"),m=a("../external"),n=null;if(l.nodestream)try{n=a("../nodejs/NodejsStreamOutputAdapter");}catch(o){}g.prototype={accumulate:function(a){return f(this,a)},on:function(a,b){var c=this;return "data"===a?this._worker.on(a,function(a){b.call(c,a.data,a.meta);}):this._worker.on(a,function(){h.delay(b,arguments,c);}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(a){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new n(this,{objectMode:"nodebuffer"!==this._outputType},a)}},b.exports=g;},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(a,b,c){if(c.base64=!0,c.array=!0,c.string=!0,c.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,c.nodebuffer="undefined"!=typeof Buffer,c.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)c.blob=!1;else{var d=new ArrayBuffer(0);try{c.blob=0===new Blob([d],{type:"application/zip"}).size;}catch(e){try{var f=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder,g=new f;g.append(d),c.blob=0===g.getBlob("application/zip").size;}catch(e){c.blob=!1;}}}try{c.nodestream=!!a("readable-stream").Readable;}catch(e){c.nodestream=!1;}},{"readable-stream":16}],31:[function(a,b,c){function d(){i.call(this,"utf-8 decode"),this.leftOver=null;}function e(){i.call(this,"utf-8 encode");}for(var f=a("./utils"),g=a("./support"),h=a("./nodejsUtils"),i=a("./stream/GenericWorker"),j=new Array(256),k=0;k<256;k++)j[k]=k>=252?6:k>=248?5:k>=240?4:k>=224?3:k>=192?2:1;j[254]=j[254]=1;var l=function(a){var b,c,d,e,f,h=a.length,i=0;for(e=0;e<h;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=g.uint8array?new Uint8Array(i):new Array(i),f=0,e=0;f<i;e++)c=a.charCodeAt(e),55296===(64512&c)&&e+1<h&&(d=a.charCodeAt(e+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),e++)),c<128?b[f++]=c:c<2048?(b[f++]=192|c>>>6,b[f++]=128|63&c):c<65536?(b[f++]=224|c>>>12,b[f++]=128|c>>>6&63,b[f++]=128|63&c):(b[f++]=240|c>>>18,b[f++]=128|c>>>12&63,b[f++]=128|c>>>6&63,b[f++]=128|63&c);return b},m=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+j[a[c]]>b?c:b},n=function(a){var b,c,d,e,g=a.length,h=new Array(2*g);for(c=0,b=0;b<g;)if(d=a[b++],d<128)h[c++]=d;else if(e=j[d],e>4)h[c++]=65533,b+=e-1;else{for(d&=2===e?31:3===e?15:7;e>1&&b<g;)d=d<<6|63&a[b++],e--;e>1?h[c++]=65533:d<65536?h[c++]=d:(d-=65536,h[c++]=55296|d>>10&1023,h[c++]=56320|1023&d);}return h.length!==c&&(h.subarray?h=h.subarray(0,c):h.length=c),f.applyFromCharCode(h)};c.utf8encode=function(a){return g.nodebuffer?h.newBufferFrom(a,"utf-8"):l(a)},c.utf8decode=function(a){return g.nodebuffer?f.transformTo("nodebuffer",a).toString("utf-8"):(a=f.transformTo(g.uint8array?"uint8array":"array",a),n(a))},f.inherits(d,i),d.prototype.processChunk=function(a){var b=f.transformTo(g.uint8array?"uint8array":"array",a.data);if(this.leftOver&&this.leftOver.length){if(g.uint8array){var d=b;b=new Uint8Array(d.length+this.leftOver.length),b.set(this.leftOver,0),b.set(d,this.leftOver.length);}else b=this.leftOver.concat(b);this.leftOver=null;}var e=m(b),h=b;e!==b.length&&(g.uint8array?(h=b.subarray(0,e),this.leftOver=b.subarray(e,b.length)):(h=b.slice(0,e),this.leftOver=b.slice(e,b.length))),this.push({data:c.utf8decode(h),meta:a.meta});},d.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:c.utf8decode(this.leftOver),meta:{}}),this.leftOver=null);},c.Utf8DecodeWorker=d,f.inherits(e,i),e.prototype.processChunk=function(a){this.push({data:c.utf8encode(a.data),meta:a.meta});},c.Utf8EncodeWorker=e;},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(a,b,c){function d(a){var b=null;return b=i.uint8array?new Uint8Array(a.length):new Array(a.length),f(a,b)}function e(a){return a}function f(a,b){for(var c=0;c<a.length;++c)b[c]=255&a.charCodeAt(c);return b}function g(a){var b=65536,d=c.getTypeOf(a),e=!0;if("uint8array"===d?e=n.applyCanBeUsed.uint8array:"nodebuffer"===d&&(e=n.applyCanBeUsed.nodebuffer),
  e)for(;b>1;)try{return n.stringifyByChunk(a,d,b)}catch(f){b=Math.floor(b/2);}return n.stringifyByChar(a)}function h(a,b){for(var c=0;c<a.length;c++)b[c]=a[c];return b}var i=a("./support"),j=a("./base64"),k=a("./nodejsUtils"),l=a("set-immediate-shim"),m=a("./external");c.newBlob=function(a,b){c.checkSupport("blob");try{return new Blob([a],{type:b})}catch(d){try{var e=self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder,f=new e;return f.append(a),f.getBlob(b)}catch(d){throw new Error("Bug : can't construct the Blob.")}}};var n={stringifyByChunk:function(a,b,c){var d=[],e=0,f=a.length;if(f<=c)return String.fromCharCode.apply(null,a);for(;e<f;)"array"===b||"nodebuffer"===b?d.push(String.fromCharCode.apply(null,a.slice(e,Math.min(e+c,f)))):d.push(String.fromCharCode.apply(null,a.subarray(e,Math.min(e+c,f)))),e+=c;return d.join("")},stringifyByChar:function(a){for(var b="",c=0;c<a.length;c++)b+=String.fromCharCode(a[c]);return b},applyCanBeUsed:{uint8array:function(){try{return i.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(a){return !1}}(),nodebuffer:function(){try{return i.nodebuffer&&1===String.fromCharCode.apply(null,k.allocBuffer(1)).length}catch(a){return !1}}()}};c.applyFromCharCode=g;var o={};o.string={string:e,array:function(a){return f(a,new Array(a.length))},arraybuffer:function(a){return o.string.uint8array(a).buffer},uint8array:function(a){return f(a,new Uint8Array(a.length))},nodebuffer:function(a){return f(a,k.allocBuffer(a.length))}},o.array={string:g,array:e,arraybuffer:function(a){return new Uint8Array(a).buffer},uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBufferFrom(a)}},o.arraybuffer={string:function(a){return g(new Uint8Array(a))},array:function(a){return h(new Uint8Array(a),new Array(a.byteLength))},arraybuffer:e,uint8array:function(a){return new Uint8Array(a)},nodebuffer:function(a){return k.newBufferFrom(new Uint8Array(a))}},o.uint8array={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){return a.buffer},uint8array:e,nodebuffer:function(a){return k.newBufferFrom(a)}},o.nodebuffer={string:g,array:function(a){return h(a,new Array(a.length))},arraybuffer:function(a){return o.nodebuffer.uint8array(a).buffer},uint8array:function(a){return h(a,new Uint8Array(a.length))},nodebuffer:e},c.transformTo=function(a,b){if(b||(b=""),!a)return b;c.checkSupport(a);var d=c.getTypeOf(b),e=o[d][a](b);return e},c.getTypeOf=function(a){return "string"==typeof a?"string":"[object Array]"===Object.prototype.toString.call(a)?"array":i.nodebuffer&&k.isBuffer(a)?"nodebuffer":i.uint8array&&a instanceof Uint8Array?"uint8array":i.arraybuffer&&a instanceof ArrayBuffer?"arraybuffer":void 0},c.checkSupport=function(a){var b=i[a.toLowerCase()];if(!b)throw new Error(a+" is not supported by this platform")},c.MAX_VALUE_16BITS=65535,c.MAX_VALUE_32BITS=-1,c.pretty=function(a){var b,c,d="";for(c=0;c<(a||"").length;c++)b=a.charCodeAt(c),d+="\\x"+(b<16?"0":"")+b.toString(16).toUpperCase();return d},c.delay=function(a,b,c){l(function(){a.apply(c||null,b||[]);});},c.inherits=function(a,b){var c=function(){};c.prototype=b.prototype,a.prototype=new c;},c.extend=function(){var a,b,c={};for(a=0;a<arguments.length;a++)for(b in arguments[a])arguments[a].hasOwnProperty(b)&&"undefined"==typeof c[b]&&(c[b]=arguments[a][b]);return c},c.prepareContent=function(a,b,e,f,g){var h=m.Promise.resolve(b).then(function(a){var b=i.blob&&(a instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(a))!==-1);return b&&"undefined"!=typeof FileReader?new m.Promise(function(b,c){var d=new FileReader;d.onload=function(a){b(a.target.result);},d.onerror=function(a){c(a.target.error);},d.readAsArrayBuffer(a);}):a});return h.then(function(b){var h=c.getTypeOf(b);return h?("arraybuffer"===h?b=c.transformTo("uint8array",b):"string"===h&&(g?b=j.decode(b):e&&f!==!0&&(b=d(b))),b):m.Promise.reject(new Error("Can't read the data of '"+a+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})};},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(a,b,c){function d(a){this.files=[],this.loadOptions=a;}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./signature"),h=a("./zipEntry"),i=(a("./utf8"),a("./support"));d.prototype={checkSignature:function(a){if(!this.reader.readAndCheckSignature(a)){this.reader.index-=4;var b=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+f.pretty(b)+", expected "+f.pretty(a)+")")}},isSignature:function(a,b){var c=this.reader.index;this.reader.setIndex(a);var d=this.reader.readString(4),e=d===b;return this.reader.setIndex(c),e},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var a=this.reader.readData(this.zipCommentLength),b=i.uint8array?"uint8array":"array",c=f.transformTo(b,a);this.zipComment=this.loadOptions.decodeFileName(c);},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var a,b,c,d=this.zip64EndOfCentralSize-44,e=0;e<d;)a=this.reader.readInt(2),b=this.reader.readInt(4),c=this.reader.readData(b),this.zip64ExtensibleData[a]={id:a,length:b,value:c};},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),this.disksCount>1)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var a,b;for(a=0;a<this.files.length;a++)b=this.files[a],this.reader.setIndex(b.localHeaderOffset),this.checkSignature(g.LOCAL_FILE_HEADER),b.readLocalPart(this.reader),b.handleUTF8(),b.processAttributes();},readCentralDir:function(){var a;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(g.CENTRAL_FILE_HEADER);)a=new h({zip64:this.zip64},this.loadOptions),a.readCentralPart(this.reader),this.files.push(a);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var a=this.reader.lastIndexOfSignature(g.CENTRAL_DIRECTORY_END);if(a<0){var b=!this.isSignature(0,g.LOCAL_FILE_HEADER);throw b?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory")}this.reader.setIndex(a);var c=a;if(this.checkSignature(g.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===f.MAX_VALUE_16BITS||this.diskWithCentralDirStart===f.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===f.MAX_VALUE_16BITS||this.centralDirRecords===f.MAX_VALUE_16BITS||this.centralDirSize===f.MAX_VALUE_32BITS||this.centralDirOffset===f.MAX_VALUE_32BITS){if(this.zip64=!0,a=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),a<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(a),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,g.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(g.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral();}var d=this.centralDirOffset+this.centralDirSize;this.zip64&&(d+=20,d+=12+this.zip64EndOfCentralSize);var e=c-d;if(e>0)this.isSignature(c,g.CENTRAL_FILE_HEADER)||(this.reader.zero=e);else if(e<0)throw new Error("Corrupted zip: missing "+Math.abs(e)+" bytes.")},prepareReader:function(a){this.reader=e(a);},load:function(a){this.prepareReader(a),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles();}},b.exports=d;},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(a,b,c){function d(a,b){this.options=a,this.loadOptions=b;}var e=a("./reader/readerFor"),f=a("./utils"),g=a("./compressedObject"),h=a("./crc32"),i=a("./utf8"),j=a("./compressions"),k=a("./support"),l=0,m=3,n=function(a){for(var b in j)if(j.hasOwnProperty(b)&&j[b].magic===a)return j[b];return null};d.prototype={isEncrypted:function(){return 1===(1&this.bitFlag)},useUTF8:function(){return 2048===(2048&this.bitFlag)},readLocalPart:function(a){var b,c;if(a.skip(22),this.fileNameLength=a.readInt(2),c=a.readInt(2),this.fileName=a.readData(this.fileNameLength),a.skip(c),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(b=n(this.compressionMethod),null===b)throw new Error("Corrupted zip : compression "+f.pretty(this.compressionMethod)+" unknown (inner file : "+f.transformTo("string",this.fileName)+")");this.decompressed=new g(this.compressedSize,this.uncompressedSize,this.crc32,b,a.readData(this.compressedSize));},readCentralPart:function(a){this.versionMadeBy=a.readInt(2),a.skip(2),this.bitFlag=a.readInt(2),this.compressionMethod=a.readString(2),this.date=a.readDate(),this.crc32=a.readInt(4),this.compressedSize=a.readInt(4),this.uncompressedSize=a.readInt(4);var b=a.readInt(2);if(this.extraFieldsLength=a.readInt(2),this.fileCommentLength=a.readInt(2),this.diskNumberStart=a.readInt(2),this.internalFileAttributes=a.readInt(2),this.externalFileAttributes=a.readInt(4),this.localHeaderOffset=a.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");a.skip(b),this.readExtraFields(a),this.parseZIP64ExtraField(a),this.fileComment=a.readData(this.fileCommentLength);},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var a=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),a===l&&(this.dosPermissions=63&this.externalFileAttributes),a===m&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0);},parseZIP64ExtraField:function(a){if(this.extraFields[1]){var b=e(this.extraFields[1].value);this.uncompressedSize===f.MAX_VALUE_32BITS&&(this.uncompressedSize=b.readInt(8)),this.compressedSize===f.MAX_VALUE_32BITS&&(this.compressedSize=b.readInt(8)),this.localHeaderOffset===f.MAX_VALUE_32BITS&&(this.localHeaderOffset=b.readInt(8)),this.diskNumberStart===f.MAX_VALUE_32BITS&&(this.diskNumberStart=b.readInt(4));}},readExtraFields:function(a){var b,c,d,e=a.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});a.index<e;)b=a.readInt(2),c=a.readInt(2),d=a.readData(c),this.extraFields[b]={id:b,length:c,value:d};},handleUTF8:function(){var a=k.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=i.utf8decode(this.fileName),this.fileCommentStr=i.utf8decode(this.fileComment);else{var b=this.findExtraFieldUnicodePath();if(null!==b)this.fileNameStr=b;else{var c=f.transformTo(a,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(c);}var d=this.findExtraFieldUnicodeComment();if(null!==d)this.fileCommentStr=d;else{var e=f.transformTo(a,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(e);}}},findExtraFieldUnicodePath:function(){var a=this.extraFields[28789];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileName)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null},findExtraFieldUnicodeComment:function(){var a=this.extraFields[25461];if(a){var b=e(a.value);return 1!==b.readInt(1)?null:h(this.fileComment)!==b.readInt(4)?null:i.utf8decode(b.readData(a.length-5))}return null}},b.exports=d;},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(a,b,c){var d=a("./stream/StreamHelper"),e=a("./stream/DataWorker"),f=a("./utf8"),g=a("./compressedObject"),h=a("./stream/GenericWorker"),i=function(a,b,c){this.name=a,this.dir=c.dir,this.date=c.date,this.comment=c.comment,this.unixPermissions=c.unixPermissions,this.dosPermissions=c.dosPermissions,this._data=b,this._dataBinary=c.binary,this.options={compression:c.compression,compressionOptions:c.compressionOptions};};i.prototype={internalStream:function(a){var b=null,c="string";try{if(!a)throw new Error("No output type specified.");c=a.toLowerCase();var e="string"===c||"text"===c;"binarystring"!==c&&"text"!==c||(c="string"),b=this._decompressWorker();var g=!this._dataBinary;g&&!e&&(b=b.pipe(new f.Utf8EncodeWorker)),!g&&e&&(b=b.pipe(new f.Utf8DecodeWorker));}catch(i){b=new h("error"),b.error(i);}return new d(b,c,"")},async:function(a,b){return this.internalStream(a).accumulate(b)},nodeStream:function(a,b){return this.internalStream(a||"nodebuffer").toNodejsStream(b)},_compressWorker:function(a,b){if(this._data instanceof g&&this._data.compression.magic===a.magic)return this._data.getCompressedWorker();var c=this._decompressWorker();return this._dataBinary||(c=c.pipe(new f.Utf8EncodeWorker)),g.createWorkerFrom(c,a,b)},_decompressWorker:function(){return this._data instanceof g?this._data.getContentWorker():this._data instanceof h?this._data:new e(this._data)}};for(var j=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],k=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},l=0;l<j.length;l++)i.prototype[j[l]]=k;b.exports=i;},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(a,b,c){(function(a){function c(){k=!0;for(var a,b,c=l.length;c;){for(b=l,l=[],a=-1;++a<c;)b[a]();c=l.length;}k=!1;}function d(a){1!==l.push(a)||k||e();}var e,f=a.MutationObserver||a.WebKitMutationObserver;if(f){var g=0,h=new f(c),i=a.document.createTextNode("");h.observe(i,{characterData:!0}),e=function(){i.data=g=++g%2;};}else if(a.setImmediate||"undefined"==typeof a.MessageChannel)e="document"in a&&"onreadystatechange"in a.document.createElement("script")?function(){var b=a.document.createElement("script");b.onreadystatechange=function(){c(),b.onreadystatechange=null,b.parentNode.removeChild(b),b=null;},a.document.documentElement.appendChild(b);}:function(){setTimeout(c,0);};else{var j=new a.MessageChannel;j.port1.onmessage=c,e=function(){j.port2.postMessage(0);};}var k,l=[];b.exports=d;}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{});},{}],37:[function(a,b,c){function d(){}function e(a){if("function"!=typeof a)throw new TypeError("resolver must be a function");this.state=s,this.queue=[],this.outcome=void 0,a!==d&&i(this,a);}function f(a,b,c){this.promise=a,"function"==typeof b&&(this.onFulfilled=b,this.callFulfilled=this.otherCallFulfilled),"function"==typeof c&&(this.onRejected=c,this.callRejected=this.otherCallRejected);}function g(a,b,c){o(function(){var d;try{d=b(c);}catch(e){return p.reject(a,e)}d===a?p.reject(a,new TypeError("Cannot resolve promise with itself")):p.resolve(a,d);});}function h(a){var b=a&&a.then;if(a&&("object"==typeof a||"function"==typeof a)&&"function"==typeof b)return function(){b.apply(a,arguments);}}function i(a,b){function c(b){f||(f=!0,p.reject(a,b));}function d(b){f||(f=!0,p.resolve(a,b));}function e(){b(d,c);}var f=!1,g=j(e);"error"===g.status&&c(g.value);}function j(a,b){var c={};try{c.value=a(b),c.status="success";}catch(d){c.status="error",c.value=d;}return c}function k(a){return a instanceof this?a:p.resolve(new this(d),a)}function l(a){var b=new this(d);return p.reject(b,a)}function m(a){function b(a,b){function d(a){g[b]=a,++h!==e||f||(f=!0,p.resolve(j,g));}c.resolve(a).then(d,function(a){f||(f=!0,p.reject(j,a));});}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=new Array(e),h=0,i=-1,j=new this(d);++i<e;)b(a[i],i);return j}function n(a){function b(a){c.resolve(a).then(function(a){f||(f=!0,p.resolve(h,a));},function(a){f||(f=!0,p.reject(h,a));});}var c=this;if("[object Array]"!==Object.prototype.toString.call(a))return this.reject(new TypeError("must be an array"));var e=a.length,f=!1;if(!e)return this.resolve([]);for(var g=-1,h=new this(d);++g<e;)b(a[g]);return h}var o=a("immediate"),p={},q=["REJECTED"],r=["FULFILLED"],s=["PENDING"];b.exports=e,e.prototype["finally"]=function(a){function b(b){function c(){return b}return d.resolve(a()).then(c)}function c(b){function c(){throw b}return d.resolve(a()).then(c)}if("function"!=typeof a)return this;var d=this.constructor;return this.then(b,c)},e.prototype["catch"]=function(a){return this.then(null,a)},e.prototype.then=function(a,b){if("function"!=typeof a&&this.state===r||"function"!=typeof b&&this.state===q)return this;var c=new this.constructor(d);if(this.state!==s){var e=this.state===r?a:b;g(c,e,this.outcome);}else this.queue.push(new f(c,a,b));return c},f.prototype.callFulfilled=function(a){p.resolve(this.promise,a);},f.prototype.otherCallFulfilled=function(a){g(this.promise,this.onFulfilled,a);},f.prototype.callRejected=function(a){p.reject(this.promise,a);},f.prototype.otherCallRejected=function(a){g(this.promise,this.onRejected,a);},p.resolve=function(a,b){var c=j(h,b);if("error"===c.status)return p.reject(a,c.value);var d=c.value;if(d)i(a,d);else{a.state=r,a.outcome=b;for(var e=-1,f=a.queue.length;++e<f;)a.queue[e].callFulfilled(b);}return a},p.reject=function(a,b){a.state=q,a.outcome=b;for(var c=-1,d=a.queue.length;++c<d;)a.queue[c].callRejected(b);return a},e.resolve=k,e.reject=l,e.all=m,e.race=n;},{immediate:36}],38:[function(a,b,c){var d=a("./lib/utils/common").assign,e=a("./lib/deflate"),f=a("./lib/inflate"),g=a("./lib/zlib/constants"),h={};d(h,e,f,g),b.exports=h;},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(a,b,c){function d(a){if(!(this instanceof d))return new d(a);this.options=i.assign({level:s,method:u,chunkSize:16384,windowBits:15,memLevel:8,strategy:t,to:""},a||{});var b=this.options;b.raw&&b.windowBits>0?b.windowBits=-b.windowBits:b.gzip&&b.windowBits>0&&b.windowBits<16&&(b.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=h.deflateInit2(this.strm,b.level,b.method,b.windowBits,b.memLevel,b.strategy);if(c!==p)throw new Error(k[c]);if(b.header&&h.deflateSetHeader(this.strm,b.header),b.dictionary){var e;if(e="string"==typeof b.dictionary?j.string2buf(b.dictionary):"[object ArrayBuffer]"===m.call(b.dictionary)?new Uint8Array(b.dictionary):b.dictionary,c=h.deflateSetDictionary(this.strm,e),c!==p)throw new Error(k[c]);this._dict_set=!0;}}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg||k[c.err];return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}function g(a,b){return b=b||{},b.gzip=!0,e(a,b)}var h=a("./zlib/deflate"),i=a("./utils/common"),j=a("./utils/strings"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=Object.prototype.toString,n=0,o=4,p=0,q=1,r=2,s=-1,t=0,u=8;d.prototype.push=function(a,b){var c,d,e=this.strm,f=this.options.chunkSize;if(this.ended)return !1;d=b===~~b?b:b===!0?o:n,"string"==typeof a?e.input=j.string2buf(a):"[object ArrayBuffer]"===m.call(a)?e.input=new Uint8Array(a):e.input=a,e.next_in=0,e.avail_in=e.input.length;do{if(0===e.avail_out&&(e.output=new i.Buf8(f),e.next_out=0,e.avail_out=f),c=h.deflate(e,d),c!==q&&c!==p)return this.onEnd(c),this.ended=!0,!1;0!==e.avail_out&&(0!==e.avail_in||d!==o&&d!==r)||("string"===this.options.to?this.onData(j.buf2binstring(i.shrinkBuf(e.output,e.next_out))):this.onData(i.shrinkBuf(e.output,e.next_out)));}while((e.avail_in>0||0===e.avail_out)&&c!==q);return d===o?(c=h.deflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===p):d!==r||(this.onEnd(p),e.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a);},d.prototype.onEnd=function(a){a===p&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=i.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg;},c.Deflate=d,c.deflate=e,c.deflateRaw=f,c.gzip=g;},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(a,b,c){function d(a){if(!(this instanceof d))return new d(a);this.options=h.assign({chunkSize:16384,windowBits:0,to:""},a||{});var b=this.options;b.raw&&b.windowBits>=0&&b.windowBits<16&&(b.windowBits=-b.windowBits,0===b.windowBits&&(b.windowBits=-15)),!(b.windowBits>=0&&b.windowBits<16)||a&&a.windowBits||(b.windowBits+=32),b.windowBits>15&&b.windowBits<48&&0===(15&b.windowBits)&&(b.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new l,this.strm.avail_out=0;var c=g.inflateInit2(this.strm,b.windowBits);if(c!==j.Z_OK)throw new Error(k[c]);this.header=new m,g.inflateGetHeader(this.strm,this.header);}function e(a,b){var c=new d(b);if(c.push(a,!0),c.err)throw c.msg||k[c.err];return c.result}function f(a,b){return b=b||{},b.raw=!0,e(a,b)}var g=a("./zlib/inflate"),h=a("./utils/common"),i=a("./utils/strings"),j=a("./zlib/constants"),k=a("./zlib/messages"),l=a("./zlib/zstream"),m=a("./zlib/gzheader"),n=Object.prototype.toString;d.prototype.push=function(a,b){var c,d,e,f,k,l,m=this.strm,o=this.options.chunkSize,p=this.options.dictionary,q=!1;if(this.ended)return !1;d=b===~~b?b:b===!0?j.Z_FINISH:j.Z_NO_FLUSH,"string"==typeof a?m.input=i.binstring2buf(a):"[object ArrayBuffer]"===n.call(a)?m.input=new Uint8Array(a):m.input=a,m.next_in=0,m.avail_in=m.input.length;do{if(0===m.avail_out&&(m.output=new h.Buf8(o),m.next_out=0,m.avail_out=o),c=g.inflate(m,j.Z_NO_FLUSH),c===j.Z_NEED_DICT&&p&&(l="string"==typeof p?i.string2buf(p):"[object ArrayBuffer]"===n.call(p)?new Uint8Array(p):p,c=g.inflateSetDictionary(this.strm,l)),c===j.Z_BUF_ERROR&&q===!0&&(c=j.Z_OK,q=!1),c!==j.Z_STREAM_END&&c!==j.Z_OK)return this.onEnd(c),this.ended=!0,!1;m.next_out&&(0!==m.avail_out&&c!==j.Z_STREAM_END&&(0!==m.avail_in||d!==j.Z_FINISH&&d!==j.Z_SYNC_FLUSH)||("string"===this.options.to?(e=i.utf8border(m.output,m.next_out),f=m.next_out-e,k=i.buf2string(m.output,e),m.next_out=f,m.avail_out=o-f,f&&h.arraySet(m.output,m.output,e,f,0),this.onData(k)):this.onData(h.shrinkBuf(m.output,m.next_out)))),0===m.avail_in&&0===m.avail_out&&(q=!0);}while((m.avail_in>0||0===m.avail_out)&&c!==j.Z_STREAM_END);return c===j.Z_STREAM_END&&(d=j.Z_FINISH),d===j.Z_FINISH?(c=g.inflateEnd(this.strm),this.onEnd(c),this.ended=!0,c===j.Z_OK):d!==j.Z_SYNC_FLUSH||(this.onEnd(j.Z_OK),m.avail_out=0,!0)},d.prototype.onData=function(a){this.chunks.push(a);},d.prototype.onEnd=function(a){a===j.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=h.flattenChunks(this.chunks)),this.chunks=[],this.err=a,this.msg=this.strm.msg;},c.Inflate=d,c.inflate=e,c.inflateRaw=f,c.ungzip=e;},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(a,b,c){var d="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;c.assign=function(a){for(var b=Array.prototype.slice.call(arguments,1);b.length;){var c=b.shift();if(c){if("object"!=typeof c)throw new TypeError(c+"must be non-object");for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d]);}}return a},c.shrinkBuf=function(a,b){return a.length===b?a:a.subarray?a.subarray(0,b):(a.length=b,a)};var e={arraySet:function(a,b,c,d,e){if(b.subarray&&a.subarray)return void a.set(b.subarray(c,c+d),e);for(var f=0;f<d;f++)a[e+f]=b[c+f];},flattenChunks:function(a){var b,c,d,e,f,g;for(d=0,b=0,c=a.length;b<c;b++)d+=a[b].length;for(g=new Uint8Array(d),e=0,b=0,c=a.length;b<c;b++)f=a[b],g.set(f,e),e+=f.length;return g}},f={arraySet:function(a,b,c,d,e){for(var f=0;f<d;f++)a[e+f]=b[c+f];},flattenChunks:function(a){return [].concat.apply([],a)}};c.setTyped=function(a){a?(c.Buf8=Uint8Array,c.Buf16=Uint16Array,c.Buf32=Int32Array,c.assign(c,e)):(c.Buf8=Array,c.Buf16=Array,c.Buf32=Array,c.assign(c,f));},c.setTyped(d);},{}],42:[function(a,b,c){function d(a,b){if(b<65537&&(a.subarray&&g||!a.subarray&&f))return String.fromCharCode.apply(null,e.shrinkBuf(a,b));for(var c="",d=0;d<b;d++)c+=String.fromCharCode(a[d]);return c}var e=a("./common"),f=!0,g=!0;try{String.fromCharCode.apply(null,[0]);}catch(h){f=!1;}try{String.fromCharCode.apply(null,new Uint8Array(1));}catch(h){g=!1;}for(var i=new e.Buf8(256),j=0;j<256;j++)i[j]=j>=252?6:j>=248?5:j>=240?4:j>=224?3:j>=192?2:1;i[254]=i[254]=1,c.string2buf=function(a){var b,c,d,f,g,h=a.length,i=0;for(f=0;f<h;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),i+=c<128?1:c<2048?2:c<65536?3:4;for(b=new e.Buf8(i),g=0,f=0;g<i;f++)c=a.charCodeAt(f),55296===(64512&c)&&f+1<h&&(d=a.charCodeAt(f+1),56320===(64512&d)&&(c=65536+(c-55296<<10)+(d-56320),f++)),c<128?b[g++]=c:c<2048?(b[g++]=192|c>>>6,b[g++]=128|63&c):c<65536?(b[g++]=224|c>>>12,b[g++]=128|c>>>6&63,b[g++]=128|63&c):(b[g++]=240|c>>>18,b[g++]=128|c>>>12&63,b[g++]=128|c>>>6&63,b[g++]=128|63&c);return b},c.buf2binstring=function(a){return d(a,a.length)},c.binstring2buf=function(a){for(var b=new e.Buf8(a.length),c=0,d=b.length;c<d;c++)b[c]=a.charCodeAt(c);return b},c.buf2string=function(a,b){var c,e,f,g,h=b||a.length,j=new Array(2*h);for(e=0,c=0;c<h;)if(f=a[c++],f<128)j[e++]=f;else if(g=i[f],g>4)j[e++]=65533,c+=g-1;else{for(f&=2===g?31:3===g?15:7;g>1&&c<h;)f=f<<6|63&a[c++],g--;g>1?j[e++]=65533:f<65536?j[e++]=f:(f-=65536,j[e++]=55296|f>>10&1023,j[e++]=56320|1023&f);}return d(j,e)},c.utf8border=function(a,b){var c;for(b=b||a.length,b>a.length&&(b=a.length),c=b-1;c>=0&&128===(192&a[c]);)c--;return c<0?b:0===c?b:c+i[a[c]]>b?c:b};},{"./common":41}],43:[function(a,b,c){function d(a,b,c,d){for(var e=65535&a|0,f=a>>>16&65535|0,g=0;0!==c;){g=c>2e3?2e3:c,c-=g;do e=e+b[d++]|0,f=f+e|0;while(--g);e%=65521,f%=65521;}return e|f<<16|0}b.exports=d;},{}],44:[function(a,b,c){b.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8};},{}],45:[function(a,b,c){function d(){for(var a,b=[],c=0;c<256;c++){a=c;for(var d=0;d<8;d++)a=1&a?3988292384^a>>>1:a>>>1;b[c]=a;}return b}function e(a,b,c,d){var e=f,g=d+c;a^=-1;for(var h=d;h<g;h++)a=a>>>8^e[255&(a^b[h])];return a^-1}var f=d();b.exports=e;},{}],46:[function(a,b,c){function d(a,b){return a.msg=I[b],b}function e(a){return (a<<1)-(a>4?9:0)}function f(a){for(var b=a.length;--b>=0;)a[b]=0;}function g(a){var b=a.state,c=b.pending;c>a.avail_out&&(c=a.avail_out),0!==c&&(E.arraySet(a.output,b.pending_buf,b.pending_out,c,a.next_out),a.next_out+=c,b.pending_out+=c,a.total_out+=c,a.avail_out-=c,b.pending-=c,0===b.pending&&(b.pending_out=0));}function h(a,b){F._tr_flush_block(a,a.block_start>=0?a.block_start:-1,a.strstart-a.block_start,b),a.block_start=a.strstart,g(a.strm);}function i(a,b){a.pending_buf[a.pending++]=b;}function j(a,b){a.pending_buf[a.pending++]=b>>>8&255,a.pending_buf[a.pending++]=255&b;}function k(a,b,c,d){var e=a.avail_in;return e>d&&(e=d),0===e?0:(a.avail_in-=e,E.arraySet(b,a.input,a.next_in,e,c),1===a.state.wrap?a.adler=G(a.adler,b,e,c):2===a.state.wrap&&(a.adler=H(a.adler,b,e,c)),a.next_in+=e,a.total_in+=e,e)}function l(a,b){var c,d,e=a.max_chain_length,f=a.strstart,g=a.prev_length,h=a.nice_match,i=a.strstart>a.w_size-la?a.strstart-(a.w_size-la):0,j=a.window,k=a.w_mask,l=a.prev,m=a.strstart+ka,n=j[f+g-1],o=j[f+g];a.prev_length>=a.good_match&&(e>>=2),h>a.lookahead&&(h=a.lookahead);do if(c=b,j[c+g]===o&&j[c+g-1]===n&&j[c]===j[f]&&j[++c]===j[f+1]){f+=2,c++;do;while(j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&j[++f]===j[++c]&&f<m);if(d=ka-(m-f),f=m-ka,d>g){if(a.match_start=b,g=d,d>=h)break;n=j[f+g-1],o=j[f+g];}}while((b=l[b&k])>i&&0!==--e);return g<=a.lookahead?g:a.lookahead}function m(a){var b,c,d,e,f,g=a.w_size;do{if(e=a.window_size-a.lookahead-a.strstart,a.strstart>=g+(g-la)){E.arraySet(a.window,a.window,g,g,0),a.match_start-=g,a.strstart-=g,a.block_start-=g,c=a.hash_size,b=c;do d=a.head[--b],a.head[b]=d>=g?d-g:0;while(--c);c=g,b=c;do d=a.prev[--b],a.prev[b]=d>=g?d-g:0;while(--c);e+=g;}if(0===a.strm.avail_in)break;if(c=k(a.strm,a.window,a.strstart+a.lookahead,e),a.lookahead+=c,a.lookahead+a.insert>=ja)for(f=a.strstart-a.insert,a.ins_h=a.window[f],a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+1])&a.hash_mask;a.insert&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[f+ja-1])&a.hash_mask,a.prev[f&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=f,f++,a.insert--,!(a.lookahead+a.insert<ja)););}while(a.lookahead<la&&0!==a.strm.avail_in)}function n(a,b){var c=65535;for(c>a.pending_buf_size-5&&(c=a.pending_buf_size-5);;){if(a.lookahead<=1){if(m(a),0===a.lookahead&&b===J)return ua;if(0===a.lookahead)break}a.strstart+=a.lookahead,a.lookahead=0;var d=a.block_start+c;if((0===a.strstart||a.strstart>=d)&&(a.lookahead=a.strstart-d,a.strstart=d,h(a,!1),0===a.strm.avail_out))return ua;if(a.strstart-a.block_start>=a.w_size-la&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.strstart>a.block_start&&(h(a,!1),0===a.strm.avail_out)?ua:ua}function o(a,b){for(var c,d;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),0!==c&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c)),a.match_length>=ja)if(d=F._tr_tally(a,a.strstart-a.match_start,a.match_length-ja),a.lookahead-=a.match_length,a.match_length<=a.max_lazy_match&&a.lookahead>=ja){a.match_length--;do a.strstart++,a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart;while(0!==--a.match_length);a.strstart++;}else a.strstart+=a.match_length,a.match_length=0,a.ins_h=a.window[a.strstart],a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+1])&a.hash_mask;else d=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++;if(d&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function p(a,b){for(var c,d,e;;){if(a.lookahead<la){if(m(a),a.lookahead<la&&b===J)return ua;if(0===a.lookahead)break}if(c=0,a.lookahead>=ja&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart),a.prev_length=a.match_length,a.prev_match=a.match_start,a.match_length=ja-1,0!==c&&a.prev_length<a.max_lazy_match&&a.strstart-c<=a.w_size-la&&(a.match_length=l(a,c),
  a.match_length<=5&&(a.strategy===U||a.match_length===ja&&a.strstart-a.match_start>4096)&&(a.match_length=ja-1)),a.prev_length>=ja&&a.match_length<=a.prev_length){e=a.strstart+a.lookahead-ja,d=F._tr_tally(a,a.strstart-1-a.prev_match,a.prev_length-ja),a.lookahead-=a.prev_length-1,a.prev_length-=2;do++a.strstart<=e&&(a.ins_h=(a.ins_h<<a.hash_shift^a.window[a.strstart+ja-1])&a.hash_mask,c=a.prev[a.strstart&a.w_mask]=a.head[a.ins_h],a.head[a.ins_h]=a.strstart);while(0!==--a.prev_length);if(a.match_available=0,a.match_length=ja-1,a.strstart++,d&&(h(a,!1),0===a.strm.avail_out))return ua}else if(a.match_available){if(d=F._tr_tally(a,0,a.window[a.strstart-1]),d&&h(a,!1),a.strstart++,a.lookahead--,0===a.strm.avail_out)return ua}else a.match_available=1,a.strstart++,a.lookahead--;}return a.match_available&&(d=F._tr_tally(a,0,a.window[a.strstart-1]),a.match_available=0),a.insert=a.strstart<ja-1?a.strstart:ja-1,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function q(a,b){for(var c,d,e,f,g=a.window;;){if(a.lookahead<=ka){if(m(a),a.lookahead<=ka&&b===J)return ua;if(0===a.lookahead)break}if(a.match_length=0,a.lookahead>=ja&&a.strstart>0&&(e=a.strstart-1,d=g[e],d===g[++e]&&d===g[++e]&&d===g[++e])){f=a.strstart+ka;do;while(d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&d===g[++e]&&e<f);a.match_length=ka-(f-e),a.match_length>a.lookahead&&(a.match_length=a.lookahead);}if(a.match_length>=ja?(c=F._tr_tally(a,1,a.match_length-ja),a.lookahead-=a.match_length,a.strstart+=a.match_length,a.match_length=0):(c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++),c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function r(a,b){for(var c;;){if(0===a.lookahead&&(m(a),0===a.lookahead)){if(b===J)return ua;break}if(a.match_length=0,c=F._tr_tally(a,0,a.window[a.strstart]),a.lookahead--,a.strstart++,c&&(h(a,!1),0===a.strm.avail_out))return ua}return a.insert=0,b===M?(h(a,!0),0===a.strm.avail_out?wa:xa):a.last_lit&&(h(a,!1),0===a.strm.avail_out)?ua:va}function s(a,b,c,d,e){this.good_length=a,this.max_lazy=b,this.nice_length=c,this.max_chain=d,this.func=e;}function t(a){a.window_size=2*a.w_size,f(a.head),a.max_lazy_match=D[a.level].max_lazy,a.good_match=D[a.level].good_length,a.nice_match=D[a.level].nice_length,a.max_chain_length=D[a.level].max_chain,a.strstart=0,a.block_start=0,a.lookahead=0,a.insert=0,a.match_length=a.prev_length=ja-1,a.match_available=0,a.ins_h=0;}function u(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=$,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new E.Buf16(2*ha),this.dyn_dtree=new E.Buf16(2*(2*fa+1)),this.bl_tree=new E.Buf16(2*(2*ga+1)),f(this.dyn_ltree),f(this.dyn_dtree),f(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new E.Buf16(ia+1),this.heap=new E.Buf16(2*ea+1),f(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new E.Buf16(2*ea+1),f(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0;}function v(a){var b;return a&&a.state?(a.total_in=a.total_out=0,a.data_type=Z,b=a.state,b.pending=0,b.pending_out=0,b.wrap<0&&(b.wrap=-b.wrap),b.status=b.wrap?na:sa,a.adler=2===b.wrap?0:1,b.last_flush=J,F._tr_init(b),O):d(a,Q)}function w(a){var b=v(a);return b===O&&t(a.state),b}function x(a,b){return a&&a.state?2!==a.state.wrap?Q:(a.state.gzhead=b,O):Q}function y(a,b,c,e,f,g){if(!a)return Q;var h=1;if(b===T&&(b=6),e<0?(h=0,e=-e):e>15&&(h=2,e-=16),f<1||f>_||c!==$||e<8||e>15||b<0||b>9||g<0||g>X)return d(a,Q);8===e&&(e=9);var i=new u;return a.state=i,i.strm=a,i.wrap=h,i.gzhead=null,i.w_bits=e,i.w_size=1<<i.w_bits,i.w_mask=i.w_size-1,i.hash_bits=f+7,i.hash_size=1<<i.hash_bits,i.hash_mask=i.hash_size-1,i.hash_shift=~~((i.hash_bits+ja-1)/ja),i.window=new E.Buf8(2*i.w_size),i.head=new E.Buf16(i.hash_size),i.prev=new E.Buf16(i.w_size),i.lit_bufsize=1<<f+6,i.pending_buf_size=4*i.lit_bufsize,i.pending_buf=new E.Buf8(i.pending_buf_size),i.d_buf=1*i.lit_bufsize,i.l_buf=3*i.lit_bufsize,i.level=b,i.strategy=g,i.method=c,w(a)}function z(a,b){return y(a,b,$,aa,ba,Y)}function A(a,b){var c,h,k,l;if(!a||!a.state||b>N||b<0)return a?d(a,Q):Q;if(h=a.state,!a.output||!a.input&&0!==a.avail_in||h.status===ta&&b!==M)return d(a,0===a.avail_out?S:Q);if(h.strm=a,c=h.last_flush,h.last_flush=b,h.status===na)if(2===h.wrap)a.adler=0,i(h,31),i(h,139),i(h,8),h.gzhead?(i(h,(h.gzhead.text?1:0)+(h.gzhead.hcrc?2:0)+(h.gzhead.extra?4:0)+(h.gzhead.name?8:0)+(h.gzhead.comment?16:0)),i(h,255&h.gzhead.time),i(h,h.gzhead.time>>8&255),i(h,h.gzhead.time>>16&255),i(h,h.gzhead.time>>24&255),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,255&h.gzhead.os),h.gzhead.extra&&h.gzhead.extra.length&&(i(h,255&h.gzhead.extra.length),i(h,h.gzhead.extra.length>>8&255)),h.gzhead.hcrc&&(a.adler=H(a.adler,h.pending_buf,h.pending,0)),h.gzindex=0,h.status=oa):(i(h,0),i(h,0),i(h,0),i(h,0),i(h,0),i(h,9===h.level?2:h.strategy>=V||h.level<2?4:0),i(h,ya),h.status=sa);else{var m=$+(h.w_bits-8<<4)<<8,n=-1;n=h.strategy>=V||h.level<2?0:h.level<6?1:6===h.level?2:3,m|=n<<6,0!==h.strstart&&(m|=ma),m+=31-m%31,h.status=sa,j(h,m),0!==h.strstart&&(j(h,a.adler>>>16),j(h,65535&a.adler)),a.adler=1;}if(h.status===oa)if(h.gzhead.extra){for(k=h.pending;h.gzindex<(65535&h.gzhead.extra.length)&&(h.pending!==h.pending_buf_size||(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending!==h.pending_buf_size));)i(h,255&h.gzhead.extra[h.gzindex]),h.gzindex++;h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),h.gzindex===h.gzhead.extra.length&&(h.gzindex=0,h.status=pa);}else h.status=pa;if(h.status===pa)if(h.gzhead.name){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.name.length?255&h.gzhead.name.charCodeAt(h.gzindex++):0,i(h,l);}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.gzindex=0,h.status=qa);}else h.status=qa;if(h.status===qa)if(h.gzhead.comment){k=h.pending;do{if(h.pending===h.pending_buf_size&&(h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),g(a),k=h.pending,h.pending===h.pending_buf_size)){l=1;break}l=h.gzindex<h.gzhead.comment.length?255&h.gzhead.comment.charCodeAt(h.gzindex++):0,i(h,l);}while(0!==l);h.gzhead.hcrc&&h.pending>k&&(a.adler=H(a.adler,h.pending_buf,h.pending-k,k)),0===l&&(h.status=ra);}else h.status=ra;if(h.status===ra&&(h.gzhead.hcrc?(h.pending+2>h.pending_buf_size&&g(a),h.pending+2<=h.pending_buf_size&&(i(h,255&a.adler),i(h,a.adler>>8&255),a.adler=0,h.status=sa)):h.status=sa),0!==h.pending){if(g(a),0===a.avail_out)return h.last_flush=-1,O}else if(0===a.avail_in&&e(b)<=e(c)&&b!==M)return d(a,S);if(h.status===ta&&0!==a.avail_in)return d(a,S);if(0!==a.avail_in||0!==h.lookahead||b!==J&&h.status!==ta){var o=h.strategy===V?r(h,b):h.strategy===W?q(h,b):D[h.level].func(h,b);if(o!==wa&&o!==xa||(h.status=ta),o===ua||o===wa)return 0===a.avail_out&&(h.last_flush=-1),O;if(o===va&&(b===K?F._tr_align(h):b!==N&&(F._tr_stored_block(h,0,0,!1),b===L&&(f(h.head),0===h.lookahead&&(h.strstart=0,h.block_start=0,h.insert=0))),g(a),0===a.avail_out))return h.last_flush=-1,O}return b!==M?O:h.wrap<=0?P:(2===h.wrap?(i(h,255&a.adler),i(h,a.adler>>8&255),i(h,a.adler>>16&255),i(h,a.adler>>24&255),i(h,255&a.total_in),i(h,a.total_in>>8&255),i(h,a.total_in>>16&255),i(h,a.total_in>>24&255)):(j(h,a.adler>>>16),j(h,65535&a.adler)),g(a),h.wrap>0&&(h.wrap=-h.wrap),0!==h.pending?O:P)}function B(a){var b;return a&&a.state?(b=a.state.status,b!==na&&b!==oa&&b!==pa&&b!==qa&&b!==ra&&b!==sa&&b!==ta?d(a,Q):(a.state=null,b===sa?d(a,R):O)):Q}function C(a,b){var c,d,e,g,h,i,j,k,l=b.length;if(!a||!a.state)return Q;if(c=a.state,g=c.wrap,2===g||1===g&&c.status!==na||c.lookahead)return Q;for(1===g&&(a.adler=G(a.adler,b,l,0)),c.wrap=0,l>=c.w_size&&(0===g&&(f(c.head),c.strstart=0,c.block_start=0,c.insert=0),k=new E.Buf8(c.w_size),E.arraySet(k,b,l-c.w_size,c.w_size,0),b=k,l=c.w_size),h=a.avail_in,i=a.next_in,j=a.input,a.avail_in=l,a.next_in=0,a.input=b,m(c);c.lookahead>=ja;){d=c.strstart,e=c.lookahead-(ja-1);do c.ins_h=(c.ins_h<<c.hash_shift^c.window[d+ja-1])&c.hash_mask,c.prev[d&c.w_mask]=c.head[c.ins_h],c.head[c.ins_h]=d,d++;while(--e);c.strstart=d,c.lookahead=ja-1,m(c);}return c.strstart+=c.lookahead,c.block_start=c.strstart,c.insert=c.lookahead,c.lookahead=0,c.match_length=c.prev_length=ja-1,c.match_available=0,a.next_in=i,a.input=j,a.avail_in=h,c.wrap=g,O}var D,E=a("../utils/common"),F=a("./trees"),G=a("./adler32"),H=a("./crc32"),I=a("./messages"),J=0,K=1,L=3,M=4,N=5,O=0,P=1,Q=-2,R=-3,S=-5,T=-1,U=1,V=2,W=3,X=4,Y=0,Z=2,$=8,_=9,aa=15,ba=8,ca=29,da=256,ea=da+1+ca,fa=30,ga=19,ha=2*ea+1,ia=15,ja=3,ka=258,la=ka+ja+1,ma=32,na=42,oa=69,pa=73,qa=91,ra=103,sa=113,ta=666,ua=1,va=2,wa=3,xa=4,ya=3;D=[new s(0,0,0,0,n),new s(4,4,8,4,o),new s(4,5,16,8,o),new s(4,6,32,32,o),new s(4,4,16,16,p),new s(8,16,32,32,p),new s(8,16,128,128,p),new s(8,32,128,256,p),new s(32,128,258,1024,p),new s(32,258,258,4096,p)],c.deflateInit=z,c.deflateInit2=y,c.deflateReset=w,c.deflateResetKeep=v,c.deflateSetHeader=x,c.deflate=A,c.deflateEnd=B,c.deflateSetDictionary=C,c.deflateInfo="pako deflate (from Nodeca project)";},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(a,b,c){function d(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1;}b.exports=d;},{}],48:[function(a,b,c){var d=30,e=12;b.exports=function(a,b){var c,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C;c=a.state,f=a.next_in,B=a.input,g=f+(a.avail_in-5),h=a.next_out,C=a.output,i=h-(b-a.avail_out),j=h+(a.avail_out-257),k=c.dmax,l=c.wsize,m=c.whave,n=c.wnext,o=c.window,p=c.hold,q=c.bits,r=c.lencode,s=c.distcode,t=(1<<c.lenbits)-1,u=(1<<c.distbits)-1;a:do{q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=r[p&t];b:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,0===w)C[h++]=65535&v;else{if(!(16&w)){if(0===(64&w)){v=r[(65535&v)+(p&(1<<w)-1)];continue b}if(32&w){c.mode=e;break a}a.msg="invalid literal/length code",c.mode=d;break a}x=65535&v,w&=15,w&&(q<w&&(p+=B[f++]<<q,q+=8),x+=p&(1<<w)-1,p>>>=w,q-=w),q<15&&(p+=B[f++]<<q,q+=8,p+=B[f++]<<q,q+=8),v=s[p&u];c:for(;;){if(w=v>>>24,p>>>=w,q-=w,w=v>>>16&255,!(16&w)){if(0===(64&w)){v=s[(65535&v)+(p&(1<<w)-1)];continue c}a.msg="invalid distance code",c.mode=d;break a}if(y=65535&v,w&=15,q<w&&(p+=B[f++]<<q,q+=8,q<w&&(p+=B[f++]<<q,q+=8)),y+=p&(1<<w)-1,y>k){a.msg="invalid distance too far back",c.mode=d;break a}if(p>>>=w,q-=w,w=h-i,y>w){if(w=y-w,w>m&&c.sane){a.msg="invalid distance too far back",c.mode=d;break a}if(z=0,A=o,0===n){if(z+=l-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C;}}else if(n<w){if(z+=l+n-w,w-=n,w<x){x-=w;do C[h++]=o[z++];while(--w);if(z=0,n<x){w=n,x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C;}}}else if(z+=n-w,w<x){x-=w;do C[h++]=o[z++];while(--w);z=h-y,A=C;}for(;x>2;)C[h++]=A[z++],C[h++]=A[z++],C[h++]=A[z++],x-=3;x&&(C[h++]=A[z++],x>1&&(C[h++]=A[z++]));}else{z=h-y;do C[h++]=C[z++],C[h++]=C[z++],C[h++]=C[z++],x-=3;while(x>2);x&&(C[h++]=C[z++],x>1&&(C[h++]=C[z++]));}break}}break}}while(f<g&&h<j);x=q>>3,f-=x,q-=x<<3,p&=(1<<q)-1,a.next_in=f,a.next_out=h,a.avail_in=f<g?5+(g-f):5-(f-g),a.avail_out=h<j?257+(j-h):257-(h-j),c.hold=p,c.bits=q;};},{}],49:[function(a,b,c){function d(a){return (a>>>24&255)+(a>>>8&65280)+((65280&a)<<8)+((255&a)<<24)}function e(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new s.Buf16(320),this.work=new s.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0;}function f(a){var b;return a&&a.state?(b=a.state,a.total_in=a.total_out=b.total=0,a.msg="",b.wrap&&(a.adler=1&b.wrap),b.mode=L,b.last=0,b.havedict=0,b.dmax=32768,b.head=null,b.hold=0,b.bits=0,b.lencode=b.lendyn=new s.Buf32(pa),b.distcode=b.distdyn=new s.Buf32(qa),b.sane=1,b.back=-1,D):G}function g(a){var b;return a&&a.state?(b=a.state,b.wsize=0,b.whave=0,b.wnext=0,f(a)):G}function h(a,b){var c,d;return a&&a.state?(d=a.state,b<0?(c=0,b=-b):(c=(b>>4)+1,b<48&&(b&=15)),b&&(b<8||b>15)?G:(null!==d.window&&d.wbits!==b&&(d.window=null),d.wrap=c,d.wbits=b,g(a))):G}function i(a,b){var c,d;return a?(d=new e,a.state=d,d.window=null,c=h(a,b),c!==D&&(a.state=null),c):G}function j(a){return i(a,sa)}function k(a){if(ta){var b;for(q=new s.Buf32(512),r=new s.Buf32(32),b=0;b<144;)a.lens[b++]=8;for(;b<256;)a.lens[b++]=9;for(;b<280;)a.lens[b++]=7;for(;b<288;)a.lens[b++]=8;for(w(y,a.lens,0,288,q,0,a.work,{bits:9}),b=0;b<32;)a.lens[b++]=5;w(z,a.lens,0,32,r,0,a.work,{bits:5}),ta=!1;}a.lencode=q,a.lenbits=9,a.distcode=r,a.distbits=5;}function l(a,b,c,d){var e,f=a.state;return null===f.window&&(f.wsize=1<<f.wbits,f.wnext=0,f.whave=0,f.window=new s.Buf8(f.wsize)),d>=f.wsize?(s.arraySet(f.window,b,c-f.wsize,f.wsize,0),f.wnext=0,f.whave=f.wsize):(e=f.wsize-f.wnext,e>d&&(e=d),s.arraySet(f.window,b,c-d,e,f.wnext),d-=e,d?(s.arraySet(f.window,b,c-d,d,0),f.wnext=d,f.whave=f.wsize):(f.wnext+=e,f.wnext===f.wsize&&(f.wnext=0),f.whave<f.wsize&&(f.whave+=e))),0}function m(a,b){var c,e,f,g,h,i,j,m,n,o,p,q,r,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa=0,Ba=new s.Buf8(4),Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!a||!a.state||!a.output||!a.input&&0!==a.avail_in)return G;c=a.state,c.mode===W&&(c.mode=X),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,o=i,p=j,xa=D;a:for(;;)switch(c.mode){case L:if(0===c.wrap){c.mode=X;break}for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if(2&c.wrap&&35615===m){c.check=0,Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0),m=0,n=0,c.mode=M;break}if(c.flags=0,c.head&&(c.head.done=!1),!(1&c.wrap)||(((255&m)<<8)+(m>>8))%31){a.msg="incorrect header check",c.mode=ma;break}if((15&m)!==K){a.msg="unknown compression method",c.mode=ma;break}if(m>>>=4,n-=4,wa=(15&m)+8,0===c.wbits)c.wbits=wa;else if(wa>c.wbits){a.msg="invalid window size",c.mode=ma;break}c.dmax=1<<wa,a.adler=c.check=1,c.mode=512&m?U:W,m=0,n=0;break;case M:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if(c.flags=m,(255&c.flags)!==K){a.msg="unknown compression method",c.mode=ma;break}if(57344&c.flags){a.msg="unknown header flags set",c.mode=ma;break}c.head&&(c.head.text=m>>8&1),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=N;case N:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}c.head&&(c.head.time=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,Ba[2]=m>>>16&255,Ba[3]=m>>>24&255,c.check=u(c.check,Ba,4,0)),m=0,n=0,c.mode=O;case O:for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}c.head&&(c.head.xflags=255&m,c.head.os=m>>8),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0,c.mode=P;case P:if(1024&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}c.length=m,c.head&&(c.head.extra_len=m),512&c.flags&&(Ba[0]=255&m,Ba[1]=m>>>8&255,c.check=u(c.check,Ba,2,0)),m=0,n=0;}else c.head&&(c.head.extra=null);c.mode=Q;case Q:if(1024&c.flags&&(q=c.length,q>i&&(q=i),q&&(c.head&&(wa=c.head.extra_len-c.length,c.head.extra||(c.head.extra=new Array(c.head.extra_len)),s.arraySet(c.head.extra,e,g,q,wa)),512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,c.length-=q),c.length))break a;c.length=0,c.mode=R;case R:if(2048&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.name+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.name=null);c.length=0,c.mode=S;case S:if(4096&c.flags){if(0===i)break a;q=0;do wa=e[g+q++],c.head&&wa&&c.length<65536&&(c.head.comment+=String.fromCharCode(wa));while(wa&&q<i);if(512&c.flags&&(c.check=u(c.check,e,q,g)),i-=q,g+=q,wa)break a}else c.head&&(c.head.comment=null);c.mode=T;case T:if(512&c.flags){for(;n<16;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if(m!==(65535&c.check)){a.msg="header crc mismatch",c.mode=ma;break}m=0,n=0;}c.head&&(c.head.hcrc=c.flags>>9&1,c.head.done=!0),a.adler=c.check=0,c.mode=W;break;case U:for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}a.adler=c.check=d(m),m=0,n=0,c.mode=V;case V:if(0===c.havedict)return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,F;a.adler=c.check=1,c.mode=W;case W:if(b===B||b===C)break a;case X:if(c.last){m>>>=7&n,n-=7&n,c.mode=ja;break}for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}switch(c.last=1&m,m>>>=1,n-=1,3&m){case 0:c.mode=Y;break;case 1:if(k(c),c.mode=ca,b===C){m>>>=2,n-=2;break a}break;case 2:c.mode=_;break;case 3:a.msg="invalid block type",c.mode=ma;}m>>>=2,n-=2;break;case Y:for(m>>>=7&n,n-=7&n;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if((65535&m)!==(m>>>16^65535)){a.msg="invalid stored block lengths",c.mode=ma;break}if(c.length=65535&m,m=0,n=0,c.mode=Z,b===C)break a;case Z:c.mode=$;case $:if(q=c.length){if(q>i&&(q=i),q>j&&(q=j),0===q)break a;s.arraySet(f,e,g,q,h),i-=q,g+=q,j-=q,h+=q,c.length-=q;break}c.mode=W;break;case _:for(;n<14;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if(c.nlen=(31&m)+257,m>>>=5,n-=5,c.ndist=(31&m)+1,m>>>=5,n-=5,c.ncode=(15&m)+4,m>>>=4,n-=4,c.nlen>286||c.ndist>30){a.msg="too many length or distance symbols",c.mode=ma;break}c.have=0,c.mode=aa;case aa:for(;c.have<c.ncode;){for(;n<3;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}c.lens[Ca[c.have++]]=7&m,m>>>=3,n-=3;}for(;c.have<19;)c.lens[Ca[c.have++]]=0;if(c.lencode=c.lendyn,c.lenbits=7,ya={bits:c.lenbits},xa=w(x,c.lens,0,19,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid code lengths set",c.mode=ma;break}c.have=0,c.mode=ba;case ba:for(;c.have<c.nlen+c.ndist;){for(;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if(sa<16)m>>>=qa,n-=qa,c.lens[c.have++]=sa;else{if(16===sa){for(za=qa+2;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if(m>>>=qa,n-=qa,0===c.have){a.msg="invalid bit length repeat",c.mode=ma;break}wa=c.lens[c.have-1],q=3+(3&m),m>>>=2,n-=2;}else if(17===sa){for(za=qa+3;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}m>>>=qa,n-=qa,wa=0,q=3+(7&m),m>>>=3,n-=3;}else{for(za=qa+7;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}m>>>=qa,n-=qa,wa=0,q=11+(127&m),m>>>=7,n-=7;}if(c.have+q>c.nlen+c.ndist){a.msg="invalid bit length repeat",c.mode=ma;break}for(;q--;)c.lens[c.have++]=wa;}}if(c.mode===ma)break;if(0===c.lens[256]){a.msg="invalid code -- missing end-of-block",c.mode=ma;break}if(c.lenbits=9,ya={bits:c.lenbits},xa=w(y,c.lens,0,c.nlen,c.lencode,0,c.work,ya),c.lenbits=ya.bits,xa){a.msg="invalid literal/lengths set",c.mode=ma;break}if(c.distbits=6,c.distcode=c.distdyn,ya={bits:c.distbits},xa=w(z,c.lens,c.nlen,c.ndist,c.distcode,0,c.work,ya),c.distbits=ya.bits,xa){a.msg="invalid distances set",c.mode=ma;break}if(c.mode=ca,b===C)break a;case ca:c.mode=da;case da:if(i>=6&&j>=258){a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,v(a,p),h=a.next_out,f=a.output,j=a.avail_out,g=a.next_in,e=a.input,i=a.avail_in,m=c.hold,n=c.bits,c.mode===W&&(c.back=-1);break}for(c.back=0;Aa=c.lencode[m&(1<<c.lenbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if(ra&&0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.lencode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}m>>>=ta,n-=ta,c.back+=ta;}if(m>>>=qa,n-=qa,c.back+=qa,c.length=sa,0===ra){c.mode=ia;break}if(32&ra){c.back=-1,c.mode=W;break}if(64&ra){a.msg="invalid literal/length code",c.mode=ma;break}c.extra=15&ra,c.mode=ea;case ea:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}c.length+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra;}c.was=c.length,c.mode=fa;case fa:for(;Aa=c.distcode[m&(1<<c.distbits)-1],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if(0===(240&ra)){for(ta=qa,ua=ra,va=sa;Aa=c.distcode[va+((m&(1<<ta+ua)-1)>>ta)],qa=Aa>>>24,ra=Aa>>>16&255,sa=65535&Aa,!(ta+qa<=n);){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}m>>>=ta,n-=ta,c.back+=ta;}if(m>>>=qa,n-=qa,c.back+=qa,64&ra){a.msg="invalid distance code",c.mode=ma;break}c.offset=sa,c.extra=15&ra,c.mode=ga;case ga:if(c.extra){for(za=c.extra;n<za;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}c.offset+=m&(1<<c.extra)-1,m>>>=c.extra,n-=c.extra,c.back+=c.extra;}if(c.offset>c.dmax){a.msg="invalid distance too far back",c.mode=ma;break}c.mode=ha;case ha:if(0===j)break a;if(q=p-j,c.offset>q){if(q=c.offset-q,q>c.whave&&c.sane){a.msg="invalid distance too far back",c.mode=ma;break}q>c.wnext?(q-=c.wnext,r=c.wsize-q):r=c.wnext-q,q>c.length&&(q=c.length),pa=c.window;}else pa=f,r=h-c.offset,q=c.length;q>j&&(q=j),j-=q,c.length-=q;do f[h++]=pa[r++];while(--q);0===c.length&&(c.mode=da);break;case ia:if(0===j)break a;f[h++]=c.length,j--,c.mode=da;break;case ja:if(c.wrap){for(;n<32;){if(0===i)break a;i--,m|=e[g++]<<n,n+=8;}if(p-=j,a.total_out+=p,c.total+=p,p&&(a.adler=c.check=c.flags?u(c.check,f,p,h-p):t(c.check,f,p,h-p)),p=j,(c.flags?m:d(m))!==c.check){a.msg="incorrect data check",c.mode=ma;break}m=0,n=0;}c.mode=ka;case ka:if(c.wrap&&c.flags){for(;n<32;){if(0===i)break a;i--,m+=e[g++]<<n,n+=8;}if(m!==(4294967295&c.total)){a.msg="incorrect length check",c.mode=ma;break}m=0,n=0;}c.mode=la;case la:xa=E;break a;case ma:xa=H;break a;case na:return I;case oa:default:return G}return a.next_out=h,a.avail_out=j,a.next_in=g,a.avail_in=i,c.hold=m,c.bits=n,(c.wsize||p!==a.avail_out&&c.mode<ma&&(c.mode<ja||b!==A))&&l(a,a.output,a.next_out,p-a.avail_out)?(c.mode=na,I):(o-=a.avail_in,p-=a.avail_out,a.total_in+=o,a.total_out+=p,c.total+=p,c.wrap&&p&&(a.adler=c.check=c.flags?u(c.check,f,p,a.next_out-p):t(c.check,f,p,a.next_out-p)),a.data_type=c.bits+(c.last?64:0)+(c.mode===W?128:0)+(c.mode===ca||c.mode===Z?256:0),(0===o&&0===p||b===A)&&xa===D&&(xa=J),xa)}function n(a){if(!a||!a.state)return G;var b=a.state;return b.window&&(b.window=null),a.state=null,D}function o(a,b){var c;return a&&a.state?(c=a.state,0===(2&c.wrap)?G:(c.head=b,b.done=!1,D)):G}function p(a,b){var c,d,e,f=b.length;return a&&a.state?(c=a.state,0!==c.wrap&&c.mode!==V?G:c.mode===V&&(d=1,d=t(d,b,f,0),d!==c.check)?H:(e=l(a,b,f,f))?(c.mode=na,I):(c.havedict=1,D)):G}var q,r,s=a("../utils/common"),t=a("./adler32"),u=a("./crc32"),v=a("./inffast"),w=a("./inftrees"),x=0,y=1,z=2,A=4,B=5,C=6,D=0,E=1,F=2,G=-2,H=-3,I=-4,J=-5,K=8,L=1,M=2,N=3,O=4,P=5,Q=6,R=7,S=8,T=9,U=10,V=11,W=12,X=13,Y=14,Z=15,$=16,_=17,aa=18,ba=19,ca=20,da=21,ea=22,fa=23,ga=24,ha=25,ia=26,ja=27,ka=28,la=29,ma=30,na=31,oa=32,pa=852,qa=592,ra=15,sa=ra,ta=!0;c.inflateReset=g,c.inflateReset2=h,c.inflateResetKeep=f,c.inflateInit=j,c.inflateInit2=i,c.inflate=m,c.inflateEnd=n,c.inflateGetHeader=o,c.inflateSetDictionary=p,c.inflateInfo="pako inflate (from Nodeca project)";},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(a,b,c){var d=a("../utils/common"),e=15,f=852,g=592,h=0,i=1,j=2,k=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],l=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],m=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],n=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];b.exports=function(a,b,c,o,p,q,r,s){var t,u,v,w,x,y,z,A,B,C=s.bits,D=0,E=0,F=0,G=0,H=0,I=0,J=0,K=0,L=0,M=0,N=null,O=0,P=new d.Buf16(e+1),Q=new d.Buf16(e+1),R=null,S=0;for(D=0;D<=e;D++)P[D]=0;for(E=0;E<o;E++)P[b[c+E]]++;for(H=C,G=e;G>=1&&0===P[G];G--);if(H>G&&(H=G),0===G)return p[q++]=20971520,p[q++]=20971520,s.bits=1,0;for(F=1;F<G&&0===P[F];F++);for(H<F&&(H=F),K=1,D=1;D<=e;D++)if(K<<=1,K-=P[D],K<0)return -1;if(K>0&&(a===h||1!==G))return -1;for(Q[1]=0,D=1;D<e;D++)Q[D+1]=Q[D]+P[D];for(E=0;E<o;E++)0!==b[c+E]&&(r[Q[b[c+E]]++]=E);if(a===h?(N=R=r,y=19):a===i?(N=k,O-=257,R=l,S-=257,y=256):(N=m,R=n,y=-1),M=0,E=0,D=F,x=q,I=H,J=0,v=-1,L=1<<H,w=L-1,a===i&&L>f||a===j&&L>g)return 1;for(;;){z=D-J,r[E]<y?(A=0,B=r[E]):r[E]>y?(A=R[S+r[E]],B=N[O+r[E]]):(A=96,B=0),t=1<<D-J,u=1<<I,F=u;do u-=t,p[x+(M>>J)+u]=z<<24|A<<16|B|0;while(0!==u);for(t=1<<D-1;M&t;)t>>=1;if(0!==t?(M&=t-1,M+=t):M=0,E++,0===--P[D]){if(D===G)break;D=b[c+r[E]];}if(D>H&&(M&w)!==v){for(0===J&&(J=H),x+=F,I=D-J,K=1<<I;I+J<G&&(K-=P[I+J],!(K<=0));)I++,K<<=1;if(L+=1<<I,a===i&&L>f||a===j&&L>g)return 1;v=M&w,p[v]=H<<24|I<<16|x-q|0;}}return 0!==M&&(p[x+M]=D-J<<24|64<<16|0),s.bits=H,0};},{"../utils/common":41}],51:[function(a,b,c){b.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"};},{}],52:[function(a,b,c){function d(a){for(var b=a.length;--b>=0;)a[b]=0;}function e(a,b,c,d,e){this.static_tree=a,this.extra_bits=b,this.extra_base=c,this.elems=d,this.max_length=e,this.has_stree=a&&a.length;}function f(a,b){this.dyn_tree=a,this.max_code=0,this.stat_desc=b;}function g(a){return a<256?ia[a]:ia[256+(a>>>7)]}function h(a,b){a.pending_buf[a.pending++]=255&b,a.pending_buf[a.pending++]=b>>>8&255;}function i(a,b,c){a.bi_valid>X-c?(a.bi_buf|=b<<a.bi_valid&65535,h(a,a.bi_buf),a.bi_buf=b>>X-a.bi_valid,a.bi_valid+=c-X):(a.bi_buf|=b<<a.bi_valid&65535,a.bi_valid+=c);}function j(a,b,c){i(a,c[2*b],c[2*b+1]);}function k(a,b){var c=0;do c|=1&a,a>>>=1,c<<=1;while(--b>0);return c>>>1}function l(a){16===a.bi_valid?(h(a,a.bi_buf),a.bi_buf=0,a.bi_valid=0):a.bi_valid>=8&&(a.pending_buf[a.pending++]=255&a.bi_buf,a.bi_buf>>=8,a.bi_valid-=8);}function m(a,b){var c,d,e,f,g,h,i=b.dyn_tree,j=b.max_code,k=b.stat_desc.static_tree,l=b.stat_desc.has_stree,m=b.stat_desc.extra_bits,n=b.stat_desc.extra_base,o=b.stat_desc.max_length,p=0;for(f=0;f<=W;f++)a.bl_count[f]=0;for(i[2*a.heap[a.heap_max]+1]=0,c=a.heap_max+1;c<V;c++)d=a.heap[c],f=i[2*i[2*d+1]+1]+1,f>o&&(f=o,p++),i[2*d+1]=f,d>j||(a.bl_count[f]++,g=0,d>=n&&(g=m[d-n]),h=i[2*d],a.opt_len+=h*(f+g),l&&(a.static_len+=h*(k[2*d+1]+g)));if(0!==p){do{for(f=o-1;0===a.bl_count[f];)f--;a.bl_count[f]--,a.bl_count[f+1]+=2,a.bl_count[o]--,p-=2;}while(p>0);for(f=o;0!==f;f--)for(d=a.bl_count[f];0!==d;)e=a.heap[--c],e>j||(i[2*e+1]!==f&&(a.opt_len+=(f-i[2*e+1])*i[2*e],i[2*e+1]=f),d--);}}function n(a,b,c){var d,e,f=new Array(W+1),g=0;for(d=1;d<=W;d++)f[d]=g=g+c[d-1]<<1;for(e=0;e<=b;e++){var h=a[2*e+1];0!==h&&(a[2*e]=k(f[h]++,h));}}function o(){var a,b,c,d,f,g=new Array(W+1);for(c=0,d=0;d<Q-1;d++)for(ka[d]=c,a=0;a<1<<ba[d];a++)ja[c++]=d;for(ja[c-1]=d,f=0,d=0;d<16;d++)for(la[d]=f,a=0;a<1<<ca[d];a++)ia[f++]=d;for(f>>=7;d<T;d++)for(la[d]=f<<7,a=0;a<1<<ca[d]-7;a++)ia[256+f++]=d;for(b=0;b<=W;b++)g[b]=0;for(a=0;a<=143;)ga[2*a+1]=8,a++,g[8]++;for(;a<=255;)ga[2*a+1]=9,a++,g[9]++;for(;a<=279;)ga[2*a+1]=7,a++,g[7]++;for(;a<=287;)ga[2*a+1]=8,a++,g[8]++;for(n(ga,S+1,g),a=0;a<T;a++)ha[2*a+1]=5,ha[2*a]=k(a,5);ma=new e(ga,ba,R+1,S,W),na=new e(ha,ca,0,T,W),oa=new e(new Array(0),da,0,U,Y);}function p(a){var b;for(b=0;b<S;b++)a.dyn_ltree[2*b]=0;for(b=0;b<T;b++)a.dyn_dtree[2*b]=0;for(b=0;b<U;b++)a.bl_tree[2*b]=0;a.dyn_ltree[2*Z]=1,a.opt_len=a.static_len=0,a.last_lit=a.matches=0;}function q(a){a.bi_valid>8?h(a,a.bi_buf):a.bi_valid>0&&(a.pending_buf[a.pending++]=a.bi_buf),a.bi_buf=0,a.bi_valid=0;}function r(a,b,c,d){q(a),d&&(h(a,c),h(a,~c)),G.arraySet(a.pending_buf,a.window,b,c,a.pending),a.pending+=c;}function s(a,b,c,d){var e=2*b,f=2*c;return a[e]<a[f]||a[e]===a[f]&&d[b]<=d[c]}function t(a,b,c){for(var d=a.heap[c],e=c<<1;e<=a.heap_len&&(e<a.heap_len&&s(b,a.heap[e+1],a.heap[e],a.depth)&&e++,!s(b,d,a.heap[e],a.depth));)a.heap[c]=a.heap[e],c=e,e<<=1;a.heap[c]=d;}function u(a,b,c){var d,e,f,h,k=0;if(0!==a.last_lit)do d=a.pending_buf[a.d_buf+2*k]<<8|a.pending_buf[a.d_buf+2*k+1],e=a.pending_buf[a.l_buf+k],k++,0===d?j(a,e,b):(f=ja[e],j(a,f+R+1,b),h=ba[f],0!==h&&(e-=ka[f],i(a,e,h)),d--,f=g(d),j(a,f,c),h=ca[f],0!==h&&(d-=la[f],i(a,d,h)));while(k<a.last_lit);j(a,Z,b);}function v(a,b){var c,d,e,f=b.dyn_tree,g=b.stat_desc.static_tree,h=b.stat_desc.has_stree,i=b.stat_desc.elems,j=-1;for(a.heap_len=0,a.heap_max=V,c=0;c<i;c++)0!==f[2*c]?(a.heap[++a.heap_len]=j=c,a.depth[c]=0):f[2*c+1]=0;for(;a.heap_len<2;)e=a.heap[++a.heap_len]=j<2?++j:0,f[2*e]=1,a.depth[e]=0,a.opt_len--,h&&(a.static_len-=g[2*e+1]);for(b.max_code=j,c=a.heap_len>>1;c>=1;c--)t(a,f,c);e=i;do c=a.heap[1],a.heap[1]=a.heap[a.heap_len--],t(a,f,1),d=a.heap[1],a.heap[--a.heap_max]=c,a.heap[--a.heap_max]=d,f[2*e]=f[2*c]+f[2*d],a.depth[e]=(a.depth[c]>=a.depth[d]?a.depth[c]:a.depth[d])+1,f[2*c+1]=f[2*d+1]=e,a.heap[1]=e++,t(a,f,1);while(a.heap_len>=2);a.heap[--a.heap_max]=a.heap[1],m(a,b),n(f,j,a.bl_count);}function w(a,b,c){var d,e,f=-1,g=b[1],h=0,i=7,j=4;for(0===g&&(i=138,j=3),b[2*(c+1)+1]=65535,d=0;d<=c;d++)e=g,g=b[2*(d+1)+1],++h<i&&e===g||(h<j?a.bl_tree[2*e]+=h:0!==e?(e!==f&&a.bl_tree[2*e]++,a.bl_tree[2*$]++):h<=10?a.bl_tree[2*_]++:a.bl_tree[2*aa]++,h=0,f=e,0===g?(i=138,j=3):e===g?(i=6,j=3):(i=7,j=4));}function x(a,b,c){var d,e,f=-1,g=b[1],h=0,k=7,l=4;for(0===g&&(k=138,l=3),d=0;d<=c;d++)if(e=g,g=b[2*(d+1)+1],!(++h<k&&e===g)){if(h<l){do j(a,e,a.bl_tree);while(0!==--h)}else 0!==e?(e!==f&&(j(a,e,a.bl_tree),h--),j(a,$,a.bl_tree),i(a,h-3,2)):h<=10?(j(a,_,a.bl_tree),i(a,h-3,3)):(j(a,aa,a.bl_tree),i(a,h-11,7));h=0,f=e,0===g?(k=138,l=3):e===g?(k=6,l=3):(k=7,l=4);}}function y(a){var b;for(w(a,a.dyn_ltree,a.l_desc.max_code),w(a,a.dyn_dtree,a.d_desc.max_code),v(a,a.bl_desc),b=U-1;b>=3&&0===a.bl_tree[2*ea[b]+1];b--);return a.opt_len+=3*(b+1)+5+5+4,b}function z(a,b,c,d){var e;for(i(a,b-257,5),i(a,c-1,5),i(a,d-4,4),e=0;e<d;e++)i(a,a.bl_tree[2*ea[e]+1],3);x(a,a.dyn_ltree,b-1),x(a,a.dyn_dtree,c-1);}function A(a){var b,c=4093624447;for(b=0;b<=31;b++,c>>>=1)if(1&c&&0!==a.dyn_ltree[2*b])return I;if(0!==a.dyn_ltree[18]||0!==a.dyn_ltree[20]||0!==a.dyn_ltree[26])return J;for(b=32;b<R;b++)if(0!==a.dyn_ltree[2*b])return J;return I}function B(a){pa||(o(),pa=!0),a.l_desc=new f(a.dyn_ltree,ma),a.d_desc=new f(a.dyn_dtree,na),a.bl_desc=new f(a.bl_tree,oa),a.bi_buf=0,a.bi_valid=0,p(a);}function C(a,b,c,d){i(a,(L<<1)+(d?1:0),3),r(a,b,c,!0);}function D(a){i(a,M<<1,3),j(a,Z,ga),l(a);}function E(a,b,c,d){var e,f,g=0;a.level>0?(a.strm.data_type===K&&(a.strm.data_type=A(a)),v(a,a.l_desc),v(a,a.d_desc),g=y(a),e=a.opt_len+3+7>>>3,f=a.static_len+3+7>>>3,f<=e&&(e=f)):e=f=c+5,c+4<=e&&b!==-1?C(a,b,c,d):a.strategy===H||f===e?(i(a,(M<<1)+(d?1:0),3),u(a,ga,ha)):(i(a,(N<<1)+(d?1:0),3),z(a,a.l_desc.max_code+1,a.d_desc.max_code+1,g+1),u(a,a.dyn_ltree,a.dyn_dtree)),p(a),d&&q(a);}function F(a,b,c){return a.pending_buf[a.d_buf+2*a.last_lit]=b>>>8&255,a.pending_buf[a.d_buf+2*a.last_lit+1]=255&b,a.pending_buf[a.l_buf+a.last_lit]=255&c,a.last_lit++,0===b?a.dyn_ltree[2*c]++:(a.matches++,b--,a.dyn_ltree[2*(ja[c]+R+1)]++,a.dyn_dtree[2*g(b)]++),a.last_lit===a.lit_bufsize-1}var G=a("../utils/common"),H=4,I=0,J=1,K=2,L=0,M=1,N=2,O=3,P=258,Q=29,R=256,S=R+1+Q,T=30,U=19,V=2*S+1,W=15,X=16,Y=7,Z=256,$=16,_=17,aa=18,ba=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ca=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],da=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ea=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],fa=512,ga=new Array(2*(S+2));
  d(ga);var ha=new Array(2*T);d(ha);var ia=new Array(fa);d(ia);var ja=new Array(P-O+1);d(ja);var ka=new Array(Q);d(ka);var la=new Array(T);d(la);var ma,na,oa,pa=!1;c._tr_init=B,c._tr_stored_block=C,c._tr_flush_block=E,c._tr_tally=F,c._tr_align=D;},{"../utils/common":41}],53:[function(a,b,c){function d(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0;}b.exports=d;},{}],54:[function(a,b,c){b.exports="function"==typeof setImmediate?setImmediate:function(){var a=[].slice.apply(arguments);a.splice(1,0,0),setTimeout.apply(null,a);};},{}]},{},[10])(10)});

  var JSZip = /*#__PURE__*/Object.freeze({

  });

  // cast array x into numbers
  // get the content of a text node, if any
  function nodeVal(x) {
    if (x && x.normalize) {
      x.normalize();
    }
    return (x && x.textContent) || "";
  }

  function getLineStyle(extensions) {
    const style = {};
    if (extensions) {
      const lineStyle = get1(extensions, "line");
      if (lineStyle) {
        const color = nodeVal(get1(lineStyle, "color")),
          opacity = parseFloat(nodeVal(get1(lineStyle, "opacity"))),
          width = parseFloat(nodeVal(get1(lineStyle, "width")));
        if (color) style.stroke = color;
        if (!isNaN(opacity)) style["stroke-opacity"] = opacity;
        // GPX width is in mm, convert to px with 96 px per inch
        if (!isNaN(width)) style["stroke-width"] = (width * 96) / 25.4;
      }
    }
    return style;
  }

  // get the contents of multiple text nodes, if present
  function getMulti(x, ys) {
    const o = {};
    let n;
    let k;
    for (k = 0; k < ys.length; k++) {
      n = get1(x, ys[k]);
      if (n) o[ys[k]] = nodeVal(n);
    }
    return o;
  }
  function getProperties(node) {
    const prop = getMulti(node, [
      "name",
      "cmt",
      "desc",
      "type",
      "time",
      "keywords"
    ]);
    const links = node.getElementsByTagName("link");
    if (links.length) prop.links = [];
    for (let i = 0; i < links.length; i++) {
      prop.links.push(
        Object.assign(
          { href: links[i].getAttribute("href") },
          getMulti(links[i], ["text", "type"])
        )
      );
    }
    return prop;
  }

  // one Y child of X, if any, otherwise null
  function get1(x, y) {
    const n = x.getElementsByTagName(y);
    return n.length ? n[0] : null;
  }

  function coordPair(x) {
    const ll = [
      parseFloat(x.getAttribute("lon")),
      parseFloat(x.getAttribute("lat"))
    ];
    const ele = get1(x, "ele");
    // handle namespaced attribute in browser
    const heartRate = get1(x, "gpxtpx:hr") || get1(x, "hr");
    const time = get1(x, "time");
    let e;
    if (ele) {
      e = parseFloat(nodeVal(ele));
      if (!isNaN(e)) {
        ll.push(e);
      }
    }
    return {
      coordinates: ll,
      time: time ? nodeVal(time) : null,
      heartRate: heartRate ? parseFloat(nodeVal(heartRate)) : null
    };
  }
  function getRoute(node) {
    const line = getPoints(node, "rtept");
    if (!line.line) return;
    return {
      type: "Feature",
      properties: Object.assign(
        getProperties(node),
        getLineStyle(get1(node, "extensions"))
      ),
      geometry: {
        type: "LineString",
        coordinates: line.line
      }
    };
  }
  function getPoints(node, pointname) {
    const pts = node.getElementsByTagName(pointname);
    const line = [];
    const times = [];
    const l = pts.length;
    let heartRates = undefined;
    if (l < 2) return {}; // Invalid line in GeoJSON
    for (let i = 0; i < l; i++) {
      const c = coordPair(pts[i]);
      line.push(c.coordinates);
      if (c.time) times.push(c.time);
      if (c.heartRate || heartRates) {
        if (!heartRates) heartRates = Array(i).fill(null);
        heartRates.push(c.heartRate || null);
      }
    }
    return {
      line: line,
      times: times,
      heartRates: heartRates || []
    };
  }
  function getTrack(node) {
    const segments = node.getElementsByTagName("trkseg");
    const track = [];
    const times = [];
    const heartRates = [];
    let line;
    for (let i = 0; i < segments.length; i++) {
      line = getPoints(segments[i], "trkpt");
      if (line) {
        if (line.line) track.push(line.line);
        if (line.times && line.times.length) times.push(line.times);
        if (heartRates.length || (line.heartRates && line.heartRates.length)) {
          if (!heartRates.length) {
            for (let s = 0; s < i; s++) {
              heartRates.push(Array(track[s].length).fill(null));
            }
          }
          if (line.heartRates && line.heartRates.length) {
            heartRates.push(line.heartRates);
          } else {
            heartRates.push(Array(line.line.length || 0).fill(null));
          }
        }
      }
    }
    if (track.length === 0) return;
    const properties = Object.assign(
      getProperties(node),
      getLineStyle(get1(node, "extensions"))
    );
    if (times.length)
      properties.coordTimes = track.length === 1 ? times[0] : times;
    if (heartRates.length)
      properties.heartRates = track.length === 1 ? heartRates[0] : heartRates;
    return {
      type: "Feature",
      properties: properties,
      geometry: {
        type: track.length === 1 ? "LineString" : "MultiLineString",
        coordinates: track.length === 1 ? track[0] : track
      }
    };
  }

  function getPoint(node) {
    return {
      type: "Feature",
      properties: Object.assign(getProperties(node), getMulti(node, ["sym"])),
      geometry: {
        type: "Point",
        coordinates: coordPair(node).coordinates
      }
    };
  }

  function* gpxGen(doc) {
    const tracks = doc.getElementsByTagName("trk");
    const routes = doc.getElementsByTagName("rte");
    const waypoints = doc.getElementsByTagName("wpt");

    for (let i = 0; i < tracks.length; i++) {
      const feature = getTrack(tracks[i]);
      if (feature) yield feature;
    }
    for (let i = 0; i < routes.length; i++) {
      const feature = getRoute(routes[i]);
      if (feature) yield feature;
    }
    for (let i = 0; i < waypoints.length; i++) {
      yield getPoint(waypoints[i]);
    }
  }

  function gpx(doc) {
    return {
      type: "FeatureCollection",
      features: Array.from(gpxGen(doc))
    };
  }

  const removeSpace = /\s*/g;
  const trimSpace = /^\s*|\s*$/g;
  const splitSpace = /\s+/;

  // generate a short, numeric hash of a string
  function okhash(x) {
    if (!x || !x.length) return 0;
    let h = 0;
    for (let i = 0; i < x.length; i++) {
      h = ((h << 5) - h + x.charCodeAt(i)) | 0;
    }
    return h;
  }

  // one Y child of X, if any, otherwise null
  function get1$1(x, y) {
    const n = x.getElementsByTagName(y);
    return n.length ? n[0] : null;
  }

  // get one coordinate from a coordinate array, if any
  function coord1(v) {
    return v
      .replace(removeSpace, "")
      .split(",")
      .map(parseFloat);
  }

  // get all coordinates from a coordinate array as [[],[]]
  function coord(v) {
    return v
      .replace(trimSpace, "")
      .split(splitSpace)
      .map(coord1);
  }

  function xml2str(node) {
    if (node.xml !== undefined) return node.xml;
    if (node.tagName) {
      let output = node.tagName;
      for (let i = 0; i < node.attributes.length; i++) {
        output += node.attributes[i].name + node.attributes[i].value;
      }
      for (let i = 0; i < node.childNodes.length; i++) {
        output += xml2str(node.childNodes[i]);
      }
      return output;
    }
    if (node.nodeName === "#text") {
      return (node.nodeValue || node.value || "").trim();
    }
    if (node.nodeName === "#cdata-section") {
      return node.nodeValue;
    }
    return "";
  }

  const geotypes = ["Polygon", "LineString", "Point", "Track", "gx:Track"];

  function kmlColor(v) {
    let color, opacity;
    v = v || "";
    if (v.substr(0, 1) === "#") {
      v = v.substr(1);
    }
    if (v.length === 6 || v.length === 3) {
      color = v;
    }
    if (v.length === 8) {
      opacity = parseInt(v.substr(0, 2), 16) / 255;
      color = "#" + v.substr(6, 2) + v.substr(4, 2) + v.substr(2, 2);
    }
    return [color, isNaN(opacity) ? undefined : opacity];
  }

  function gxCoords(root) {
    let elems = root.getElementsByTagName("coord");
    const coords = [];
    const times = [];
    if (elems.length === 0) elems = root.getElementsByTagName("gx:coord");
    for (let i = 0; i < elems.length; i++) {
      coords.push(
        nodeVal(elems[i])
          .split(" ")
          .map(parseFloat)
      );
    }
    const timeElems = root.getElementsByTagName("when");
    for (let j = 0; j < timeElems.length; j++) times.push(nodeVal(timeElems[j]));
    return {
      coords: coords,
      times: times
    };
  }

  function getGeometry(root) {
    let geomNode;
    let geomNodes;
    let i;
    let j;
    let k;
    const geoms = [];
    const coordTimes = [];
    if (get1$1(root, "MultiGeometry")) {
      return getGeometry(get1$1(root, "MultiGeometry"));
    }
    if (get1$1(root, "MultiTrack")) {
      return getGeometry(get1$1(root, "MultiTrack"));
    }
    if (get1$1(root, "gx:MultiTrack")) {
      return getGeometry(get1$1(root, "gx:MultiTrack"));
    }
    for (i = 0; i < geotypes.length; i++) {
      geomNodes = root.getElementsByTagName(geotypes[i]);
      if (geomNodes) {
        for (j = 0; j < geomNodes.length; j++) {
          geomNode = geomNodes[j];
          if (geotypes[i] === "Point") {
            geoms.push({
              type: "Point",
              coordinates: coord1(nodeVal(get1$1(geomNode, "coordinates")))
            });
          } else if (geotypes[i] === "LineString") {
            geoms.push({
              type: "LineString",
              coordinates: coord(nodeVal(get1$1(geomNode, "coordinates")))
            });
          } else if (geotypes[i] === "Polygon") {
            const rings = geomNode.getElementsByTagName("LinearRing"),
              coords = [];
            for (k = 0; k < rings.length; k++) {
              coords.push(coord(nodeVal(get1$1(rings[k], "coordinates"))));
            }
            geoms.push({
              type: "Polygon",
              coordinates: coords
            });
          } else if (geotypes[i] === "Track" || geotypes[i] === "gx:Track") {
            const track = gxCoords(geomNode);
            geoms.push({
              type: "LineString",
              coordinates: track.coords
            });
            if (track.times.length) coordTimes.push(track.times);
          }
        }
      }
    }
    return {
      geoms: geoms,
      coordTimes: coordTimes
    };
  }

  function getPlacemark(root, styleIndex, styleMapIndex, styleByHash) {
    const geomsAndTimes = getGeometry(root);
    let i;
    const properties = {};
    const name = nodeVal(get1$1(root, "name"));
    const address = nodeVal(get1$1(root, "address"));
    let styleUrl = nodeVal(get1$1(root, "styleUrl"));
    const description = nodeVal(get1$1(root, "description"));
    const timeSpan = get1$1(root, "TimeSpan");
    const timeStamp = get1$1(root, "TimeStamp");
    const extendedData = get1$1(root, "ExtendedData");
    let lineStyle = get1$1(root, "LineStyle");
    let polyStyle = get1$1(root, "PolyStyle");
    const visibility = get1$1(root, "visibility");

    if (!geomsAndTimes.geoms.length) return;
    if (name) properties.name = name;
    if (address) properties.address = address;
    if (styleUrl) {
      if (styleUrl[0] !== "#") {
        styleUrl = "#" + styleUrl;
      }

      properties.styleUrl = styleUrl;
      if (styleIndex[styleUrl]) {
        properties.styleHash = styleIndex[styleUrl];
      }
      if (styleMapIndex[styleUrl]) {
        properties.styleMapHash = styleMapIndex[styleUrl];
        properties.styleHash = styleIndex[styleMapIndex[styleUrl].normal];
      }
      // Try to populate the lineStyle or polyStyle since we got the style hash
      const style = styleByHash[properties.styleHash];
      if (style) {
        if (!lineStyle) lineStyle = get1$1(style, "LineStyle");
        if (!polyStyle) polyStyle = get1$1(style, "PolyStyle");
        const iconStyle = get1$1(style, "IconStyle");
        if (iconStyle) {
          const icon = get1$1(iconStyle, "Icon");
          if (icon) {
            const href = nodeVal(get1$1(icon, "href"));
            if (href) properties.icon = href;
          }
        }
      }
    }
    if (description) properties.description = description;
    if (timeSpan) {
      const begin = nodeVal(get1$1(timeSpan, "begin"));
      const end = nodeVal(get1$1(timeSpan, "end"));
      properties.timespan = { begin: begin, end: end };
    }
    if (timeStamp) {
      properties.timestamp = nodeVal(get1$1(timeStamp, "when"));
    }
    if (lineStyle) {
      const linestyles = kmlColor(nodeVal(get1$1(lineStyle, "color"))),
        color = linestyles[0],
        opacity = linestyles[1],
        width = parseFloat(nodeVal(get1$1(lineStyle, "width")));
      if (color) properties.stroke = color;
      if (!isNaN(opacity)) properties["stroke-opacity"] = opacity;
      if (!isNaN(width)) properties["stroke-width"] = width;
    }
    if (polyStyle) {
      const polystyles = kmlColor(nodeVal(get1$1(polyStyle, "color")));
      const pcolor = polystyles[0];
      const popacity = polystyles[1];
      const fill = nodeVal(get1$1(polyStyle, "fill"));
      const outline = nodeVal(get1$1(polyStyle, "outline"));
      if (pcolor) properties.fill = pcolor;
      if (!isNaN(popacity)) properties["fill-opacity"] = popacity;
      if (fill)
        properties["fill-opacity"] =
          fill === "1" ? properties["fill-opacity"] || 1 : 0;
      if (outline)
        properties["stroke-opacity"] =
          outline === "1" ? properties["stroke-opacity"] || 1 : 0;
    }
    if (extendedData) {
      const datas = extendedData.getElementsByTagName("Data"),
        simpleDatas = extendedData.getElementsByTagName("SimpleData");

      for (i = 0; i < datas.length; i++) {
        properties[datas[i].getAttribute("name")] = nodeVal(
          get1$1(datas[i], "value")
        );
      }
      for (i = 0; i < simpleDatas.length; i++) {
        properties[simpleDatas[i].getAttribute("name")] = nodeVal(simpleDatas[i]);
      }
    }
    if (visibility) {
      properties.visibility = nodeVal(visibility);
    }
    if (geomsAndTimes.coordTimes.length) {
      properties.coordTimes =
        geomsAndTimes.coordTimes.length === 1
          ? geomsAndTimes.coordTimes[0]
          : geomsAndTimes.coordTimes;
    }
    const feature = {
      type: "Feature",
      geometry:
        geomsAndTimes.geoms.length === 1
          ? geomsAndTimes.geoms[0]
          : {
              type: "GeometryCollection",
              geometries: geomsAndTimes.geoms
            },
      properties: properties
    };
    if (root.getAttribute("id")) feature.id = root.getAttribute("id");
    return feature;
  }

  function* kmlGen(doc) {
    // styleindex keeps track of hashed styles in order to match feature
    const styleIndex = {};
    const styleByHash = {};
    // stylemapindex keeps track of style maps to expose in properties
    const styleMapIndex = {};
    // atomic geospatial types supported by KML - MultiGeometry is
    // handled separately
    // all root placemarks in the file
    const placemarks = doc.getElementsByTagName("Placemark");
    const styles = doc.getElementsByTagName("Style");
    const styleMaps = doc.getElementsByTagName("StyleMap");

    for (let k = 0; k < styles.length; k++) {
      const hash = okhash(xml2str(styles[k])).toString(16);
      styleIndex["#" + styles[k].getAttribute("id")] = hash;
      styleByHash[hash] = styles[k];
    }
    for (let l = 0; l < styleMaps.length; l++) {
      styleIndex["#" + styleMaps[l].getAttribute("id")] = okhash(
        xml2str(styleMaps[l])
      ).toString(16);
      const pairs = styleMaps[l].getElementsByTagName("Pair");
      const pairsMap = {};
      for (let m = 0; m < pairs.length; m++) {
        pairsMap[nodeVal(get1$1(pairs[m], "key"))] = nodeVal(
          get1$1(pairs[m], "styleUrl")
        );
      }
      styleMapIndex["#" + styleMaps[l].getAttribute("id")] = pairsMap;
    }
    for (let j = 0; j < placemarks.length; j++) {
      const feature = getPlacemark(
        placemarks[j],
        styleIndex,
        styleMapIndex,
        styleByHash
      );
      if (feature) yield feature;
    }
  }

  function kml(doc) {
    return {
      type: "FeatureCollection",
      features: Array.from(kmlGen(doc))
    };
  }

  var toGeoJSON = /*#__PURE__*/Object.freeze({
    gpx: gpx,
    gpxGen: gpxGen,
    kml: kml,
    kmlGen: kmlGen
  });

  // calculate simplification data using optimized Douglas-Peucker algorithm

  function simplify(coords, first, last, sqTolerance) {
      var maxSqDist = sqTolerance;
      var mid = (last - first) >> 1;
      var minPosToMid = last - first;
      var index;

      var ax = coords[first];
      var ay = coords[first + 1];
      var bx = coords[last];
      var by = coords[last + 1];

      for (var i = first + 3; i < last; i += 3) {
          var d = getSqSegDist(coords[i], coords[i + 1], ax, ay, bx, by);

          if (d > maxSqDist) {
              index = i;
              maxSqDist = d;

          } else if (d === maxSqDist) {
              // a workaround to ensure we choose a pivot close to the middle of the list,
              // reducing recursion depth, for certain degenerate inputs
              // https://github.com/mapbox/geojson-vt/issues/104
              var posToMid = Math.abs(i - mid);
              if (posToMid < minPosToMid) {
                  index = i;
                  minPosToMid = posToMid;
              }
          }
      }

      if (maxSqDist > sqTolerance) {
          if (index - first > 3) simplify(coords, first, index, sqTolerance);
          coords[index + 2] = maxSqDist;
          if (last - index > 3) simplify(coords, index, last, sqTolerance);
      }
  }

  // square distance from a point to a segment
  function getSqSegDist(px, py, x, y, bx, by) {

      var dx = bx - x;
      var dy = by - y;

      if (dx !== 0 || dy !== 0) {

          var t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);

          if (t > 1) {
              x = bx;
              y = by;

          } else if (t > 0) {
              x += dx * t;
              y += dy * t;
          }
      }

      dx = px - x;
      dy = py - y;

      return dx * dx + dy * dy;
  }

  function createFeature(id, type, geom, tags) {
      var feature = {
          id: typeof id === 'undefined' ? null : id,
          type: type,
          geometry: geom,
          tags: tags,
          minX: Infinity,
          minY: Infinity,
          maxX: -Infinity,
          maxY: -Infinity
      };
      calcBBox(feature);
      return feature;
  }

  function calcBBox(feature) {
      var geom = feature.geometry;
      var type = feature.type;

      if (type === 'Point' || type === 'MultiPoint' || type === 'LineString') {
          calcLineBBox(feature, geom);

      } else if (type === 'Polygon' || type === 'MultiLineString') {
          for (var i = 0; i < geom.length; i++) {
              calcLineBBox(feature, geom[i]);
          }

      } else if (type === 'MultiPolygon') {
          for (i = 0; i < geom.length; i++) {
              for (var j = 0; j < geom[i].length; j++) {
                  calcLineBBox(feature, geom[i][j]);
              }
          }
      }
  }

  function calcLineBBox(feature, geom) {
      for (var i = 0; i < geom.length; i += 3) {
          feature.minX = Math.min(feature.minX, geom[i]);
          feature.minY = Math.min(feature.minY, geom[i + 1]);
          feature.maxX = Math.max(feature.maxX, geom[i]);
          feature.maxY = Math.max(feature.maxY, geom[i + 1]);
      }
  }

  // converts GeoJSON feature into an intermediate projected JSON vector format with simplification data

  function convert(data, options) {
      var features = [];
      if (data.type === 'FeatureCollection') {
          for (var i = 0; i < data.features.length; i++) {
              convertFeature(features, data.features[i], options, i);
          }

      } else if (data.type === 'Feature') {
          convertFeature(features, data, options);

      } else {
          // single geometry or a geometry collection
          convertFeature(features, {geometry: data}, options);
      }

      return features;
  }

  function convertFeature(features, geojson, options, index) {
      if (!geojson.geometry) return;

      var coords = geojson.geometry.coordinates;
      var type = geojson.geometry.type;
      var tolerance = Math.pow(options.tolerance / ((1 << options.maxZoom) * options.extent), 2);
      var geometry = [];
      var id = geojson.id;
      if (options.promoteId) {
          id = geojson.properties[options.promoteId];
      } else if (options.generateId) {
          id = index || 0;
      }
      if (type === 'Point') {
          convertPoint(coords, geometry);

      } else if (type === 'MultiPoint') {
          for (var i = 0; i < coords.length; i++) {
              convertPoint(coords[i], geometry);
          }

      } else if (type === 'LineString') {
          convertLine(coords, geometry, tolerance, false);

      } else if (type === 'MultiLineString') {
          if (options.lineMetrics) {
              // explode into linestrings to be able to track metrics
              for (i = 0; i < coords.length; i++) {
                  geometry = [];
                  convertLine(coords[i], geometry, tolerance, false);
                  features.push(createFeature(id, 'LineString', geometry, geojson.properties));
              }
              return;
          } else {
              convertLines(coords, geometry, tolerance, false);
          }

      } else if (type === 'Polygon') {
          convertLines(coords, geometry, tolerance, true);

      } else if (type === 'MultiPolygon') {
          for (i = 0; i < coords.length; i++) {
              var polygon = [];
              convertLines(coords[i], polygon, tolerance, true);
              geometry.push(polygon);
          }
      } else if (type === 'GeometryCollection') {
          for (i = 0; i < geojson.geometry.geometries.length; i++) {
              convertFeature(features, {
                  id: id,
                  geometry: geojson.geometry.geometries[i],
                  properties: geojson.properties
              }, options, index);
          }
          return;
      } else {
          throw new Error('Input data is not a valid GeoJSON object.');
      }

      features.push(createFeature(id, type, geometry, geojson.properties));
  }

  function convertPoint(coords, out) {
      out.push(projectX(coords[0]));
      out.push(projectY(coords[1]));
      out.push(0);
  }

  function convertLine(ring, out, tolerance, isPolygon) {
      var x0, y0;
      var size = 0;

      for (var j = 0; j < ring.length; j++) {
          var x = projectX(ring[j][0]);
          var y = projectY(ring[j][1]);

          out.push(x);
          out.push(y);
          out.push(0);

          if (j > 0) {
              if (isPolygon) {
                  size += (x0 * y - x * y0) / 2; // area
              } else {
                  size += Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)); // length
              }
          }
          x0 = x;
          y0 = y;
      }

      var last = out.length - 3;
      out[2] = 1;
      simplify(out, 0, last, tolerance);
      out[last + 2] = 1;

      out.size = Math.abs(size);
      out.start = 0;
      out.end = out.size;
  }

  function convertLines(rings, out, tolerance, isPolygon) {
      for (var i = 0; i < rings.length; i++) {
          var geom = [];
          convertLine(rings[i], geom, tolerance, isPolygon);
          out.push(geom);
      }
  }

  function projectX(x) {
      return x / 360 + 0.5;
  }

  function projectY(y) {
      var sin = Math.sin(y * Math.PI / 180);
      var y2 = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
      return y2 < 0 ? 0 : y2 > 1 ? 1 : y2;
  }

  /* clip features between two axis-parallel lines:
   *     |        |
   *  ___|___     |     /
   * /   |   \____|____/
   *     |        |
   */

  function clip(features, scale, k1, k2, axis, minAll, maxAll, options) {

      k1 /= scale;
      k2 /= scale;

      if (minAll >= k1 && maxAll < k2) return features; // trivial accept
      else if (maxAll < k1 || minAll >= k2) return null; // trivial reject

      var clipped = [];

      for (var i = 0; i < features.length; i++) {

          var feature = features[i];
          var geometry = feature.geometry;
          var type = feature.type;

          var min = axis === 0 ? feature.minX : feature.minY;
          var max = axis === 0 ? feature.maxX : feature.maxY;

          if (min >= k1 && max < k2) { // trivial accept
              clipped.push(feature);
              continue;
          } else if (max < k1 || min >= k2) { // trivial reject
              continue;
          }

          var newGeometry = [];

          if (type === 'Point' || type === 'MultiPoint') {
              clipPoints(geometry, newGeometry, k1, k2, axis);

          } else if (type === 'LineString') {
              clipLine(geometry, newGeometry, k1, k2, axis, false, options.lineMetrics);

          } else if (type === 'MultiLineString') {
              clipLines(geometry, newGeometry, k1, k2, axis, false);

          } else if (type === 'Polygon') {
              clipLines(geometry, newGeometry, k1, k2, axis, true);

          } else if (type === 'MultiPolygon') {
              for (var j = 0; j < geometry.length; j++) {
                  var polygon = [];
                  clipLines(geometry[j], polygon, k1, k2, axis, true);
                  if (polygon.length) {
                      newGeometry.push(polygon);
                  }
              }
          }

          if (newGeometry.length) {
              if (options.lineMetrics && type === 'LineString') {
                  for (j = 0; j < newGeometry.length; j++) {
                      clipped.push(createFeature(feature.id, type, newGeometry[j], feature.tags));
                  }
                  continue;
              }

              if (type === 'LineString' || type === 'MultiLineString') {
                  if (newGeometry.length === 1) {
                      type = 'LineString';
                      newGeometry = newGeometry[0];
                  } else {
                      type = 'MultiLineString';
                  }
              }
              if (type === 'Point' || type === 'MultiPoint') {
                  type = newGeometry.length === 3 ? 'Point' : 'MultiPoint';
              }

              clipped.push(createFeature(feature.id, type, newGeometry, feature.tags));
          }
      }

      return clipped.length ? clipped : null;
  }

  function clipPoints(geom, newGeom, k1, k2, axis) {
      for (var i = 0; i < geom.length; i += 3) {
          var a = geom[i + axis];

          if (a >= k1 && a <= k2) {
              newGeom.push(geom[i]);
              newGeom.push(geom[i + 1]);
              newGeom.push(geom[i + 2]);
          }
      }
  }

  function clipLine(geom, newGeom, k1, k2, axis, isPolygon, trackMetrics) {

      var slice = newSlice(geom);
      var intersect = axis === 0 ? intersectX : intersectY;
      var len = geom.start;
      var segLen, t;

      for (var i = 0; i < geom.length - 3; i += 3) {
          var ax = geom[i];
          var ay = geom[i + 1];
          var az = geom[i + 2];
          var bx = geom[i + 3];
          var by = geom[i + 4];
          var a = axis === 0 ? ax : ay;
          var b = axis === 0 ? bx : by;
          var exited = false;

          if (trackMetrics) segLen = Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));

          if (a < k1) {
              // ---|-->  | (line enters the clip region from the left)
              if (b > k1) {
                  t = intersect(slice, ax, ay, bx, by, k1);
                  if (trackMetrics) slice.start = len + segLen * t;
              }
          } else if (a > k2) {
              // |  <--|--- (line enters the clip region from the right)
              if (b < k2) {
                  t = intersect(slice, ax, ay, bx, by, k2);
                  if (trackMetrics) slice.start = len + segLen * t;
              }
          } else {
              addPoint(slice, ax, ay, az);
          }
          if (b < k1 && a >= k1) {
              // <--|---  | or <--|-----|--- (line exits the clip region on the left)
              t = intersect(slice, ax, ay, bx, by, k1);
              exited = true;
          }
          if (b > k2 && a <= k2) {
              // |  ---|--> or ---|-----|--> (line exits the clip region on the right)
              t = intersect(slice, ax, ay, bx, by, k2);
              exited = true;
          }

          if (!isPolygon && exited) {
              if (trackMetrics) slice.end = len + segLen * t;
              newGeom.push(slice);
              slice = newSlice(geom);
          }

          if (trackMetrics) len += segLen;
      }

      // add the last point
      var last = geom.length - 3;
      ax = geom[last];
      ay = geom[last + 1];
      az = geom[last + 2];
      a = axis === 0 ? ax : ay;
      if (a >= k1 && a <= k2) addPoint(slice, ax, ay, az);

      // close the polygon if its endpoints are not the same after clipping
      last = slice.length - 3;
      if (isPolygon && last >= 3 && (slice[last] !== slice[0] || slice[last + 1] !== slice[1])) {
          addPoint(slice, slice[0], slice[1], slice[2]);
      }

      // add the final slice
      if (slice.length) {
          newGeom.push(slice);
      }
  }

  function newSlice(line) {
      var slice = [];
      slice.size = line.size;
      slice.start = line.start;
      slice.end = line.end;
      return slice;
  }

  function clipLines(geom, newGeom, k1, k2, axis, isPolygon) {
      for (var i = 0; i < geom.length; i++) {
          clipLine(geom[i], newGeom, k1, k2, axis, isPolygon, false);
      }
  }

  function addPoint(out, x, y, z) {
      out.push(x);
      out.push(y);
      out.push(z);
  }

  function intersectX(out, ax, ay, bx, by, x) {
      var t = (x - ax) / (bx - ax);
      out.push(x);
      out.push(ay + (by - ay) * t);
      out.push(1);
      return t;
  }

  function intersectY(out, ax, ay, bx, by, y) {
      var t = (y - ay) / (by - ay);
      out.push(ax + (bx - ax) * t);
      out.push(y);
      out.push(1);
      return t;
  }

  function wrap(features, options) {
      var buffer = options.buffer / options.extent;
      var merged = features;
      var left  = clip(features, 1, -1 - buffer, buffer,     0, -1, 2, options); // left world copy
      var right = clip(features, 1,  1 - buffer, 2 + buffer, 0, -1, 2, options); // right world copy

      if (left || right) {
          merged = clip(features, 1, -buffer, 1 + buffer, 0, -1, 2, options) || []; // center world copy

          if (left) merged = shiftFeatureCoords(left, 1).concat(merged); // merge left into center
          if (right) merged = merged.concat(shiftFeatureCoords(right, -1)); // merge right into center
      }

      return merged;
  }

  function shiftFeatureCoords(features, offset) {
      var newFeatures = [];

      for (var i = 0; i < features.length; i++) {
          var feature = features[i],
              type = feature.type;

          var newGeometry;

          if (type === 'Point' || type === 'MultiPoint' || type === 'LineString') {
              newGeometry = shiftCoords(feature.geometry, offset);

          } else if (type === 'MultiLineString' || type === 'Polygon') {
              newGeometry = [];
              for (var j = 0; j < feature.geometry.length; j++) {
                  newGeometry.push(shiftCoords(feature.geometry[j], offset));
              }
          } else if (type === 'MultiPolygon') {
              newGeometry = [];
              for (j = 0; j < feature.geometry.length; j++) {
                  var newPolygon = [];
                  for (var k = 0; k < feature.geometry[j].length; k++) {
                      newPolygon.push(shiftCoords(feature.geometry[j][k], offset));
                  }
                  newGeometry.push(newPolygon);
              }
          }

          newFeatures.push(createFeature(feature.id, type, newGeometry, feature.tags));
      }

      return newFeatures;
  }

  function shiftCoords(points, offset) {
      var newPoints = [];
      newPoints.size = points.size;

      if (points.start !== undefined) {
          newPoints.start = points.start;
          newPoints.end = points.end;
      }

      for (var i = 0; i < points.length; i += 3) {
          newPoints.push(points[i] + offset, points[i + 1], points[i + 2]);
      }
      return newPoints;
  }

  // Transforms the coordinates of each feature in the given tile from
  // mercator-projected space into (extent x extent) tile space.
  function transformTile(tile, extent) {
      if (tile.transformed) return tile;

      var z2 = 1 << tile.z,
          tx = tile.x,
          ty = tile.y,
          i, j, k;

      for (i = 0; i < tile.features.length; i++) {
          var feature = tile.features[i],
              geom = feature.geometry,
              type = feature.type;

          feature.geometry = [];

          if (type === 1) {
              for (j = 0; j < geom.length; j += 2) {
                  feature.geometry.push(transformPoint(geom[j], geom[j + 1], extent, z2, tx, ty));
              }
          } else {
              for (j = 0; j < geom.length; j++) {
                  var ring = [];
                  for (k = 0; k < geom[j].length; k += 2) {
                      ring.push(transformPoint(geom[j][k], geom[j][k + 1], extent, z2, tx, ty));
                  }
                  feature.geometry.push(ring);
              }
          }
      }

      tile.transformed = true;

      return tile;
  }

  function transformPoint(x, y, extent, z2, tx, ty) {
      return [
          Math.round(extent * (x * z2 - tx)),
          Math.round(extent * (y * z2 - ty))];
  }

  function createTile(features, z, tx, ty, options) {
      var tolerance = z === options.maxZoom ? 0 : options.tolerance / ((1 << z) * options.extent);
      var tile = {
          features: [],
          numPoints: 0,
          numSimplified: 0,
          numFeatures: 0,
          source: null,
          x: tx,
          y: ty,
          z: z,
          transformed: false,
          minX: 2,
          minY: 1,
          maxX: -1,
          maxY: 0
      };
      for (var i = 0; i < features.length; i++) {
          tile.numFeatures++;
          addFeature(tile, features[i], tolerance, options);

          var minX = features[i].minX;
          var minY = features[i].minY;
          var maxX = features[i].maxX;
          var maxY = features[i].maxY;

          if (minX < tile.minX) tile.minX = minX;
          if (minY < tile.minY) tile.minY = minY;
          if (maxX > tile.maxX) tile.maxX = maxX;
          if (maxY > tile.maxY) tile.maxY = maxY;
      }
      return tile;
  }

  function addFeature(tile, feature, tolerance, options) {

      var geom = feature.geometry,
          type = feature.type,
          simplified = [];

      if (type === 'Point' || type === 'MultiPoint') {
          for (var i = 0; i < geom.length; i += 3) {
              simplified.push(geom[i]);
              simplified.push(geom[i + 1]);
              tile.numPoints++;
              tile.numSimplified++;
          }

      } else if (type === 'LineString') {
          addLine(simplified, geom, tile, tolerance, false, false);

      } else if (type === 'MultiLineString' || type === 'Polygon') {
          for (i = 0; i < geom.length; i++) {
              addLine(simplified, geom[i], tile, tolerance, type === 'Polygon', i === 0);
          }

      } else if (type === 'MultiPolygon') {

          for (var k = 0; k < geom.length; k++) {
              var polygon = geom[k];
              for (i = 0; i < polygon.length; i++) {
                  addLine(simplified, polygon[i], tile, tolerance, true, i === 0);
              }
          }
      }

      if (simplified.length) {
          var tags = feature.tags || null;
          if (type === 'LineString' && options.lineMetrics) {
              tags = {};
              for (var key in feature.tags) tags[key] = feature.tags[key];
              tags['mapbox_clip_start'] = geom.start / geom.size;
              tags['mapbox_clip_end'] = geom.end / geom.size;
          }
          var tileFeature = {
              geometry: simplified,
              type: type === 'Polygon' || type === 'MultiPolygon' ? 3 :
                  type === 'LineString' || type === 'MultiLineString' ? 2 : 1,
              tags: tags
          };
          if (feature.id !== null) {
              tileFeature.id = feature.id;
          }
          tile.features.push(tileFeature);
      }
  }

  function addLine(result, geom, tile, tolerance, isPolygon, isOuter) {
      var sqTolerance = tolerance * tolerance;

      if (tolerance > 0 && (geom.size < (isPolygon ? sqTolerance : tolerance))) {
          tile.numPoints += geom.length / 3;
          return;
      }

      var ring = [];

      for (var i = 0; i < geom.length; i += 3) {
          if (tolerance === 0 || geom[i + 2] > sqTolerance) {
              tile.numSimplified++;
              ring.push(geom[i]);
              ring.push(geom[i + 1]);
          }
          tile.numPoints++;
      }

      if (isPolygon) rewind(ring, isOuter);

      result.push(ring);
  }

  function rewind(ring, clockwise) {
      var area = 0;
      for (var i = 0, len = ring.length, j = len - 2; i < len; j = i, i += 2) {
          area += (ring[i] - ring[j]) * (ring[i + 1] + ring[j + 1]);
      }
      if (area > 0 === clockwise) {
          for (i = 0, len = ring.length; i < len / 2; i += 2) {
              var x = ring[i];
              var y = ring[i + 1];
              ring[i] = ring[len - 2 - i];
              ring[i + 1] = ring[len - 1 - i];
              ring[len - 2 - i] = x;
              ring[len - 1 - i] = y;
          }
      }
  }

  function geojsonvt(data, options) {
      return new GeoJSONVT(data, options);
  }

  function GeoJSONVT(data, options) {
      options = this.options = extend(Object.create(this.options), options);

      var debug = options.debug;

      if (debug) console.time('preprocess data');

      if (options.maxZoom < 0 || options.maxZoom > 24) throw new Error('maxZoom should be in the 0-24 range');
      if (options.promoteId && options.generateId) throw new Error('promoteId and generateId cannot be used together.');

      var features = convert(data, options);

      this.tiles = {};
      this.tileCoords = [];

      if (debug) {
          console.timeEnd('preprocess data');
          console.log('index: maxZoom: %d, maxPoints: %d', options.indexMaxZoom, options.indexMaxPoints);
          console.time('generate tiles');
          this.stats = {};
          this.total = 0;
      }

      features = wrap(features, options);

      // start slicing from the top tile down
      if (features.length) this.splitTile(features, 0, 0, 0);

      if (debug) {
          if (features.length) console.log('features: %d, points: %d', this.tiles[0].numFeatures, this.tiles[0].numPoints);
          console.timeEnd('generate tiles');
          console.log('tiles generated:', this.total, JSON.stringify(this.stats));
      }
  }

  GeoJSONVT.prototype.options = {
      maxZoom: 14,            // max zoom to preserve detail on
      indexMaxZoom: 5,        // max zoom in the tile index
      indexMaxPoints: 100000, // max number of points per tile in the tile index
      tolerance: 3,           // simplification tolerance (higher means simpler)
      extent: 4096,           // tile extent
      buffer: 64,             // tile buffer on each side
      lineMetrics: false,     // whether to calculate line metrics
      promoteId: null,        // name of a feature property to be promoted to feature.id
      generateId: false,      // whether to generate feature ids. Cannot be used with promoteId
      debug: 0                // logging level (0, 1 or 2)
  };

  GeoJSONVT.prototype.splitTile = function (features, z, x, y, cz, cx, cy) {

      var stack = [features, z, x, y],
          options = this.options,
          debug = options.debug;

      // avoid recursion by using a processing queue
      while (stack.length) {
          y = stack.pop();
          x = stack.pop();
          z = stack.pop();
          features = stack.pop();

          var z2 = 1 << z,
              id = toID(z, x, y),
              tile = this.tiles[id];

          if (!tile) {
              if (debug > 1) console.time('creation');

              tile = this.tiles[id] = createTile(features, z, x, y, options);
              this.tileCoords.push({z: z, x: x, y: y});

              if (debug) {
                  if (debug > 1) {
                      console.log('tile z%d-%d-%d (features: %d, points: %d, simplified: %d)',
                          z, x, y, tile.numFeatures, tile.numPoints, tile.numSimplified);
                      console.timeEnd('creation');
                  }
                  var key = 'z' + z;
                  this.stats[key] = (this.stats[key] || 0) + 1;
                  this.total++;
              }
          }

          // save reference to original geometry in tile so that we can drill down later if we stop now
          tile.source = features;

          // if it's the first-pass tiling
          if (!cz) {
              // stop tiling if we reached max zoom, or if the tile is too simple
              if (z === options.indexMaxZoom || tile.numPoints <= options.indexMaxPoints) continue;

          // if a drilldown to a specific tile
          } else {
              // stop tiling if we reached base zoom or our target tile zoom
              if (z === options.maxZoom || z === cz) continue;

              // stop tiling if it's not an ancestor of the target tile
              var m = 1 << (cz - z);
              if (x !== Math.floor(cx / m) || y !== Math.floor(cy / m)) continue;
          }

          // if we slice further down, no need to keep source geometry
          tile.source = null;

          if (features.length === 0) continue;

          if (debug > 1) console.time('clipping');

          // values we'll use for clipping
          var k1 = 0.5 * options.buffer / options.extent,
              k2 = 0.5 - k1,
              k3 = 0.5 + k1,
              k4 = 1 + k1,
              tl, bl, tr, br, left, right;

          tl = bl = tr = br = null;

          left  = clip(features, z2, x - k1, x + k3, 0, tile.minX, tile.maxX, options);
          right = clip(features, z2, x + k2, x + k4, 0, tile.minX, tile.maxX, options);
          features = null;

          if (left) {
              tl = clip(left, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, options);
              bl = clip(left, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, options);
              left = null;
          }

          if (right) {
              tr = clip(right, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, options);
              br = clip(right, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, options);
              right = null;
          }

          if (debug > 1) console.timeEnd('clipping');

          stack.push(tl || [], z + 1, x * 2,     y * 2);
          stack.push(bl || [], z + 1, x * 2,     y * 2 + 1);
          stack.push(tr || [], z + 1, x * 2 + 1, y * 2);
          stack.push(br || [], z + 1, x * 2 + 1, y * 2 + 1);
      }
  };

  GeoJSONVT.prototype.getTile = function (z, x, y) {
      var options = this.options,
          extent = options.extent,
          debug = options.debug;

      if (z < 0 || z > 24) return null;

      var z2 = 1 << z;
      x = ((x % z2) + z2) % z2; // wrap tile x coordinate

      var id = toID(z, x, y);
      if (this.tiles[id]) return transformTile(this.tiles[id], extent);

      if (debug > 1) console.log('drilling down to z%d-%d-%d', z, x, y);

      var z0 = z,
          x0 = x,
          y0 = y,
          parent;

      while (!parent && z0 > 0) {
          z0--;
          x0 = Math.floor(x0 / 2);
          y0 = Math.floor(y0 / 2);
          parent = this.tiles[toID(z0, x0, y0)];
      }

      if (!parent || !parent.source) return null;

      // if we found a parent tile containing the original geometry, we can drill down from it
      if (debug > 1) console.log('found parent tile z%d-%d-%d', z0, x0, y0);

      if (debug > 1) console.time('drilling down');
      this.splitTile(parent.source, z0, x0, y0, z, x, y);
      if (debug > 1) console.timeEnd('drilling down');

      return this.tiles[id] ? transformTile(this.tiles[id], extent) : null;
  };

  function toID(z, x, y) {
      return (((1 << z) * y + x) * 32) + z;
  }

  function extend(dest, src) {
      for (var i in src) dest[i] = src[i];
      return dest;
  }

  (function(window) {
  	var HAS_HASHCHANGE = (function() {
  		var doc_mode = window.documentMode;
  		return ('onhashchange' in window) &&
  			(doc_mode === undefined || doc_mode > 7);
  	})();

  	L.Hash = function(map) {
  		this.onHashChange = L.Util.bind(this.onHashChange, this);

  		if (map) {
  			this.init(map);
  		}
  	};

  	L.Hash.parseHash = function(hash) {
  		if(hash.indexOf('#') === 0) {
  			hash = hash.substr(1);
  		}
  		var args = hash.split("/");
  		if (args.length == 3) {
  			var zoom = parseInt(args[0], 10),
  			lat = parseFloat(args[1]),
  			lon = parseFloat(args[2]);
  			if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
  				return false;
  			} else {
  				return {
  					center: new L.LatLng(lat, lon),
  					zoom: zoom
  				};
  			}
  		} else {
  			return false;
  		}
  	};

  	L.Hash.formatHash = function(map) {
  		var center = map.getCenter(),
  		    zoom = map.getZoom(),
  		    precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

  		return "#" + [zoom,
  			center.lat.toFixed(precision),
  			center.lng.toFixed(precision)
  		].join("/");
  	},

  	L.Hash.prototype = {
  		map: null,
  		lastHash: null,

  		parseHash: L.Hash.parseHash,
  		formatHash: L.Hash.formatHash,

  		init: function(map) {
  			this.map = map;

  			// reset the hash
  			this.lastHash = null;
  			this.onHashChange();

  			if (!this.isListening) {
  				this.startListening();
  			}
  		},

  		removeFrom: function(map) {
  			if (this.changeTimeout) {
  				clearTimeout(this.changeTimeout);
  			}

  			if (this.isListening) {
  				this.stopListening();
  			}

  			this.map = null;
  		},

  		onMapMove: function() {
  			// bail if we're moving the map (updating from a hash),
  			// or if the map is not yet loaded

  			if (this.movingMap || !this.map._loaded) {
  				return false;
  			}

  			var hash = this.formatHash(this.map);
  			if (this.lastHash != hash) {
  				location.replace(hash);
  				this.lastHash = hash;
  			}
  		},

  		movingMap: false,
  		update: function() {
  			var hash = location.hash;
  			if (hash === this.lastHash) {
  				return;
  			}
  			var parsed = this.parseHash(hash);
  			if (parsed) {
  				this.movingMap = true;

  				this.map.setView(parsed.center, parsed.zoom);

  				this.movingMap = false;
  			} else {
  				this.onMapMove(this.map);
  			}
  		},

  		// defer hash change updates every 100ms
  		changeDefer: 100,
  		changeTimeout: null,
  		onHashChange: function() {
  			// throttle calls to update() so that they only happen every
  			// `changeDefer` ms
  			if (!this.changeTimeout) {
  				var that = this;
  				this.changeTimeout = setTimeout(function() {
  					that.update();
  					that.changeTimeout = null;
  				}, this.changeDefer);
  			}
  		},

  		isListening: false,
  		hashChangeInterval: null,
  		startListening: function() {
  			this.map.on("moveend", this.onMapMove, this);

  			if (HAS_HASHCHANGE) {
  				L.DomEvent.addListener(window, "hashchange", this.onHashChange);
  			} else {
  				clearInterval(this.hashChangeInterval);
  				this.hashChangeInterval = setInterval(this.onHashChange, 50);
  			}
  			this.isListening = true;
  		},

  		stopListening: function() {
  			this.map.off("moveend", this.onMapMove, this);

  			if (HAS_HASHCHANGE) {
  				L.DomEvent.removeListener(window, "hashchange", this.onHashChange);
  			} else {
  				clearInterval(this.hashChangeInterval);
  			}
  			this.isListening = false;
  		}
  	};
  	L.hash = function(map) {
  		return new L.Hash(map);
  	};
  	L.Map.prototype.addHash = function() {
  		this._hash = L.hash(this);
  	};
  	L.Map.prototype.removeHash = function() {
  		this._hash.removeFrom();
  	};
  })(window);

  !function(t,a){"object"==typeof exports&&"undefined"!=typeof module?a(exports):"function"==typeof define&&define.amd?define("leaflet-gesture-handling",["exports"],a):a((t=t||self)["leaflet-gesture-handling"]={});}(undefined,function(t){var e={ar:{touch:"استخدم إصبعين لتحريك الخريطة",scroll:"‏استخدم ctrl + scroll لتصغير/تكبير الخريطة",scrollMac:"يمكنك استخدام ⌘ + التمرير لتكبير/تصغير الخريطة"},bg:{touch:"Използвайте два пръста, за да преместите картата",scroll:"Задръжте бутона Ctrl натиснат, докато превъртате, за да промените мащаба на картата",scrollMac:"Задръжте бутона ⌘ натиснат, докато превъртате, за да промените мащаба на картата"},bn:{touch:"মানচিত্রটিকে সরাতে দুটি আঙ্গুল ব্যবহার করুন",scroll:"ম্যাপ জুম করতে ctrl + scroll ব্যবহার করুন",scrollMac:"ম্যাপে জুম করতে ⌘ বোতাম টিপে স্ক্রল করুন"},ca:{touch:"Fes servir dos dits per moure el mapa",scroll:"Prem la tecla Control mentre et desplaces per apropar i allunyar el mapa",scrollMac:"Prem la tecla ⌘ mentre et desplaces per apropar i allunyar el mapa"},cs:{touch:"K posunutí mapy použijte dva prsty",scroll:"Velikost zobrazení mapy změňte podržením klávesy Ctrl a posouváním kolečka myši",scrollMac:"Velikost zobrazení mapy změníte podržením klávesy ⌘ a posunutím kolečka myši / touchpadu"},da:{touch:"Brug to fingre til at flytte kortet",scroll:"Brug ctrl + rullefunktionen til at zoome ind og ud på kortet",scrollMac:"Brug ⌘ + rullefunktionen til at zoome ind og ud på kortet"},de:{touch:"Verschieben der Karte mit zwei Fingern",scroll:"Verwende Strg+Scrollen zum Zoomen der Karte",scrollMac:"⌘"},el:{touch:"Χρησιμοποιήστε δύο δάχτυλα για μετακίνηση στον χάρτη",scroll:"Χρησιμοποιήστε το πλήκτρο Ctrl και κύλιση, για να μεγεθύνετε τον χάρτη",scrollMac:"Χρησιμοποιήστε το πλήκτρο ⌘ + κύλιση για εστίαση στον χάρτη"},en:{touch:"Use two fingers to move the map",scroll:"Use ctrl + scroll to zoom the map",scrollMac:"Use ⌘ + scroll to zoom the map"},"en-AU":{touch:"Use two fingers to move the map",scroll:"Use ctrl + scroll to zoom the map",scrollMac:"Use ⌘ + scroll to zoom the map"},"en-GB":{touch:"Use two fingers to move the map",scroll:"Use ctrl + scroll to zoom the map",scrollMac:"Use ⌘ + scroll to zoom the map"},es:{touch:"Para mover el mapa, utiliza dos dedos",scroll:"Mantén pulsada la tecla Ctrl mientras te desplazas para acercar o alejar el mapa",scrollMac:"Mantén pulsada la tecla ⌘ mientras te desplazas para acercar o alejar el mapa"},eu:{touch:"Erabili bi hatz mapa mugitzeko",scroll:"Mapan zooma aplikatzeko, sakatu Ktrl eta egin gora edo behera",scrollMac:"Eduki sakatuta ⌘ eta egin gora eta behera mapa handitu eta txikitzeko"},fa:{touch:"برای حرکت دادن نقشه از دو انگشت استفاده کنید.",scroll:"‏برای بزرگ‌نمایی نقشه از ctrl + scroll استفاده کنید",scrollMac:"برای بزرگ‌نمایی نقشه، از ⌘ + پیمایش استفاده کنید."},fi:{touch:"Siirrä karttaa kahdella sormella.",scroll:"Zoomaa karttaa painamalla Ctrl-painiketta ja vierittämällä.",scrollMac:"Zoomaa karttaa pitämällä painike ⌘ painettuna ja vierittämällä."},fil:{touch:"Gumamit ng dalawang daliri upang iusog ang mapa",scroll:"Gamitin ang ctrl + scroll upang i-zoom ang mapa",scrollMac:"Gamitin ang ⌘ + scroll upang i-zoom ang mapa"},fr:{touch:"Utilisez deux doigts pour déplacer la carte",scroll:"Vous pouvez zoomer sur la carte à l'aide de CTRL+Molette de défilement",scrollMac:"Vous pouvez zoomer sur la carte à l'aide de ⌘+Molette de défilement"},gl:{touch:"Utiliza dous dedos para mover o mapa",scroll:"Preme Ctrl mentres te desprazas para ampliar o mapa",scrollMac:"Preme ⌘ e desprázate para ampliar o mapa"},gu:{touch:"નકશો ખસેડવા બે આંગળીઓનો ઉપયોગ કરો",scroll:"નકશાને ઝૂમ કરવા માટે ctrl + સ્ક્રોલનો ઉપયોગ કરો",scrollMac:"નકશાને ઝૂમ કરવા ⌘ + સ્ક્રોલનો ઉપયોગ કરો"},hi:{touch:"मैप एक जगह से दूसरी जगह ले जाने के लिए दो उंगलियों का इस्तेमाल करें",scroll:"मैप को ज़ूम करने के लिए ctrl + स्क्रोल का उपयोग करें",scrollMac:"मैप को ज़ूम करने के लिए ⌘ + स्क्रोल का उपयोग करें"},hr:{touch:"Pomičite kartu pomoću dva prsta",scroll:"Upotrijebite Ctrl i klizač miša da biste zumirali kartu",scrollMac:"Upotrijebite gumb ⌘ dok se pomičete za zumiranje karte"},hu:{touch:"Két ujjal mozgassa a térképet",scroll:"A térkép a ctrl + görgetés használatával nagyítható",scrollMac:"A térkép a ⌘ + görgetés használatával nagyítható"},id:{touch:"Gunakan dua jari untuk menggerakkan peta",scroll:"Gunakan ctrl + scroll untuk memperbesar atau memperkecil peta",scrollMac:"Gunakan ⌘ + scroll untuk memperbesar atau memperkecil peta"},it:{touch:"Utilizza due dita per spostare la mappa",scroll:"Utilizza CTRL + scorrimento per eseguire lo zoom della mappa",scrollMac:"Utilizza ⌘ + scorrimento per eseguire lo zoom della mappa"},iw:{touch:"הזז את המפה באמצעות שתי אצבעות",scroll:"‏אפשר לשנות את מרחק התצוגה במפה באמצעות מקש ctrl וגלילה",scrollMac:"אפשר לשנות את מרחק התצוגה במפה באמצעות מקש ⌘ וגלילה"},ja:{touch:"地図を移動させるには指 2 本で操作します",scroll:"地図をズームするには、Ctrl キーを押しながらスクロールしてください",scrollMac:"地図をズームするには、⌘ キーを押しながらスクロールしてください"},kn:{touch:"Use two fingers to move the map",scroll:"Use Ctrl + scroll to zoom the map",scrollMac:"Use ⌘ + scroll to zoom the map"},ko:{touch:"지도를 움직이려면 두 손가락을 사용하세요.",scroll:"지도를 확대/축소하려면 Ctrl을 누른 채 스크롤하세요.",scrollMac:"지도를 확대하려면 ⌘ + 스크롤 사용"},lt:{touch:"Perkelkite žemėlapį dviem pirštais",scroll:"Slinkite nuspaudę klavišą „Ctrl“, kad pakeistumėte žemėlapio mastelį",scrollMac:"Paspauskite klavišą ⌘ ir slinkite, kad priartintumėte žemėlapį"},lv:{touch:"Lai pārvietotu karti, bīdiet to ar diviem pirkstiem",scroll:"Kartes tālummaiņai izmantojiet ctrl + ritināšanu",scrollMac:"Lai veiktu kartes tālummaiņu, izmantojiet ⌘ + ritināšanu"},ml:{touch:"മാപ്പ് നീക്കാൻ രണ്ട് വിരലുകൾ ഉപയോഗിക്കുക",scroll:"കൺട്രോൾ + സ്‌ക്രോൾ ഉപയോഗിച്ച് ‌മാപ്പ് ‌സൂം ചെയ്യുക",scrollMac:"⌘ + സ്‌ക്രോൾ ഉപയോഗിച്ച് ‌മാപ്പ് ‌സൂം ചെയ്യുക"},mr:{touch:"नकाशा हलविण्यासाठी दोन बोटे वापरा",scroll:"नकाशा झूम करण्यासाठी ctrl + scroll वापरा",scrollMac:"नकाशावर झूम करण्यासाठी ⌘ + स्क्रोल वापरा"},nl:{touch:"Gebruik twee vingers om de kaart te verplaatsen",scroll:"Gebruik Ctrl + scrollen om in- en uit te zoomen op de kaart",scrollMac:"Gebruik ⌘ + scrollen om in en uit te zoomen op de kaart"},no:{touch:"Bruk to fingre for å flytte kartet",scroll:"Hold ctrl-tasten inne og rull for å zoome på kartet",scrollMac:"Hold inne ⌘-tasten og rull for å zoome på kartet"},pl:{touch:"Przesuń mapę dwoma palcami",scroll:"Naciśnij CTRL i przewiń, by przybliżyć mapę",scrollMac:"Naciśnij ⌘ i przewiń, by przybliżyć mapę"},pt:{touch:"Use dois dedos para mover o mapa",scroll:"Pressione Ctrl e role a tela simultaneamente para aplicar zoom no mapa",scrollMac:"Use ⌘ e role a tela simultaneamente para aplicar zoom no mapa"},"pt-BR":{touch:"Use dois dedos para mover o mapa",scroll:"Pressione Ctrl e role a tela simultaneamente para aplicar zoom no mapa",scrollMac:"Use ⌘ e role a tela simultaneamente para aplicar zoom no mapa"},"pt-PT":{touch:"Utilize dois dedos para mover o mapa",scroll:"Utilizar ctrl + deslocar para aumentar/diminuir zoom do mapa",scrollMac:"Utilize ⌘ + deslocar para aumentar/diminuir o zoom do mapa"},ro:{touch:"Folosiți două degete pentru a deplasa harta",scroll:"Apăsați tasta ctrl și derulați simultan pentru a mări harta",scrollMac:"Folosiți ⌘ și derulați pentru a mări/micșora harta"},ru:{touch:"Чтобы переместить карту, проведите по ней двумя пальцами",scroll:"Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl.",scrollMac:"Чтобы изменить масштаб, нажмите ⌘ + прокрутка"},sk:{touch:"Mapu môžete posunúť dvoma prstami",scroll:"Ak chcete priblížiť mapu, stlačte kláves ctrl a posúvajte",scrollMac:"Ak chcete priblížiť mapu, stlačte kláves ⌘ a posúvajte kolieskom myši"},sl:{touch:"Premaknite zemljevid z dvema prstoma",scroll:"Zemljevid povečate tako, da držite tipko Ctrl in vrtite kolesce na miški",scrollMac:"Uporabite ⌘ + funkcijo pomika, da povečate ali pomanjšate zemljevid"},sr:{touch:"Мапу померајте помоћу два прста",scroll:"Притисните ctrl тастер док померате да бисте зумирали мапу",scrollMac:"Притисните тастер ⌘ док померате да бисте зумирали мапу"},sv:{touch:"Använd två fingrar för att flytta kartan",scroll:"Använd ctrl + rulla för att zooma kartan",scrollMac:"Använd ⌘ + rulla för att zooma på kartan"},ta:{touch:"மேப்பை நகர்த்த இரண்டு விரல்களைப் பயன்படுத்தவும்",scroll:"மேப்பை பெரிதாக்கி/சிறிதாக்கிப் பார்க்க, ctrl பட்டனைப் பிடித்தபடி, மேலே/கீழே ஸ்க்ரால் செய்யவும்",scrollMac:"மேப்பை பெரிதாக்கி/சிறிதாக்கிப் பார்க்க, ⌘ பட்டனைப் பிடித்தபடி, மேலே/கீழே ஸ்க்ரால் செய்யவும்"},te:{touch:"మ్యాప్‌ని తరలించడం కోసం రెండు వేళ్లను ఉపయోగించండి",scroll:"మ్యాప్‌ని జూమ్ చేయడానికి ctrl బటన్‌ను నొక్కి ఉంచి, స్క్రోల్ చేయండి",scrollMac:"మ్యాప్ జూమ్ చేయాలంటే ⌘ + స్క్రోల్ ఉపయోగించండి"},th:{touch:"ใช้ 2 นิ้วเพื่อเลื่อนแผนที่",scroll:"กด Ctrl ค้างไว้ แล้วเลื่อนหน้าจอเพื่อซูมแผนที่",scrollMac:"กด ⌘ แล้วเลื่อนหน้าจอเพื่อซูมแผนที่"},tl:{touch:"Gumamit ng dalawang daliri upang iusog ang mapa",scroll:"Gamitin ang ctrl + scroll upang i-zoom ang mapa",scrollMac:"Gamitin ang ⌘ + scroll upang i-zoom ang mapa"},tr:{touch:"Haritada gezinmek için iki parmağınızı kullanın",scroll:"Haritayı yakınlaştırmak için ctrl + kaydırma kombinasyonunu kullanın",scrollMac:"Haritayı yakınlaştırmak için ⌘ tuşuna basıp ekranı kaydırın"},uk:{touch:"Переміщуйте карту двома пальцями",scroll:"Щоб змінювати масштаб карти, прокручуйте коліщатко миші, утримуючи клавішу Ctrl",scrollMac:"Щоб змінити масштаб карти, використовуйте ⌘ + прокручування"},vi:{touch:"Sử dụng hai ngón tay để di chuyển bản đồ",scroll:"Sử dụng ctrl + cuộn để thu phóng bản đồ",scrollMac:"Sử dụng ⌘ + cuộn để thu phóng bản đồ"},"zh-CN":{touch:"使用双指移动地图",scroll:"按住 Ctrl 并滚动鼠标滚轮才可缩放地图",scrollMac:"按住 ⌘ 并滚动鼠标滚轮才可缩放地图"},"zh-TW":{touch:"同時以兩指移動地圖",scroll:"按住 ctrl 鍵加上捲動滑鼠可以縮放地圖",scrollMac:"按 ⌘ 加上滾動捲軸可以縮放地圖"}},a=!1,l={text:{},duration:1700},o=L.Handler.extend({_isScrolling:!1,_isTouching:!1,_isFading:!1,addHooks:function(){this._handleTouch=L.bind(this._handleTouch,this),this._setGestureHandlingOptions(),this._disableInteractions(),this._map._container.addEventListener("touchstart",this._handleTouch),this._map._container.addEventListener("touchmove",this._handleTouch),this._map._container.addEventListener("touchend",this._handleTouch),this._map._container.addEventListener("touchcancel",this._handleTouch),this._map._container.addEventListener("click",this._handleTouch),L.DomEvent.on(this._map._container,"mousewheel",this._handleScroll,this),L.DomEvent.on(this._map,"mouseover",this._handleMouseOver,this),L.DomEvent.on(this._map,"mouseout",this._handleMouseOut,this),L.DomEvent.on(this._map,"movestart",this._handleDragging,this),L.DomEvent.on(this._map,"move",this._handleDragging,this),L.DomEvent.on(this._map,"moveend",this._handleDragging,this),L.DomEvent.off(this._map,"enterFullscreen",this._onEnterFullscreen,this),L.DomEvent.off(this._map,"exitFullscreen",this._onExitFullscreen,this),L.DomEvent.on(this._map,"enterFullscreen",this._onEnterFullscreen,this),L.DomEvent.on(this._map,"exitFullscreen",this._onExitFullscreen,this),L.DomUtil.addClass(this._map._container,"leaflet-gesture-handling");},removeHooks:function(){this._enableInteractions(),this._map._container.removeEventListener("touchstart",this._handleTouch),this._map._container.removeEventListener("touchmove",this._handleTouch),this._map._container.removeEventListener("touchend",this._handleTouch),this._map._container.removeEventListener("touchcancel",this._handleTouch),this._map._container.removeEventListener("click",this._handleTouch),L.DomEvent.off(this._map._container,"mousewheel",this._handleScroll,this),L.DomEvent.off(this._map,"mouseover",this._handleMouseOver,this),L.DomEvent.off(this._map,"mouseout",this._handleMouseOut,this),L.DomEvent.off(this._map,"movestart",this._handleDragging,this),L.DomEvent.off(this._map,"move",this._handleDragging,this),L.DomEvent.off(this._map,"moveend",this._handleDragging,this),L.DomUtil.removeClass(this._map._container,"leaflet-gesture-handling");},_handleDragging:function(t){"movestart"==t.type||"move"==t.type?a=!0:"moveend"==t.type&&(a=!1);},_disableInteractions:function(){this._map.dragging.disable(),this._map.scrollWheelZoom.disable(),this._map.tap&&this._map.tap.disable();},_enableInteractions:function(){this._map.dragging.enable(),this._map.scrollWheelZoom.enable(),this._map.tap&&this._map.tap.enable();},_enableWarning:function(t){clearTimeout(this._isFading),L.DomUtil.addClass(this._map._container,"leaflet-gesture-handling-"+t),L.DomUtil.addClass(this._map._container,"leaflet-gesture-handling-warning");},_disableWarning:function(t,a){clearTimeout(this._isFading),this._isFading=setTimeout(L.bind(function(t){L.DomUtil.removeClass(this._map._container,"leaflet-gesture-handling-"+t);},this,t),a||this._map.options.gestureHandlingOptions.duration),L.DomUtil.removeClass(this._map._container,"leaflet-gesture-handling-warning");},_isLanguageContent:function(t){return t&&t.touch&&t.scroll&&t.scrollMac},_isMacUser:function(){return 0<=navigator.platform.toUpperCase().indexOf("MAC")},_parseGestureHandlingOptions:function(){var t=L.extend(this._map.options.gestureHandlingOptions,l);return this._map.options.gestureHandlingText&&(t.text=this._map.options.gestureHandlingText),t},_setGestureHandlingOptions:function(){var t=this._parseGestureHandlingOptions(),a=this._isLanguageContent(t.text)?t.text:this._getLanguageContent(t.locale);this._map._container.setAttribute("data-gesture-handling-touch-content",a.touch),this._map._container.setAttribute("data-gesture-handling-scroll-content",a.scroll),this._touchWarning=a.touch,this._scrollWarning=a.scroll;},_getUserLanguage:function(){return navigator.languages?navigator.languages[0]:navigator.language||navigator.userLanguage},_getLanguageContent:function(t){t=t||this._getUserLanguage()||"en";var a=e[t];return (a=(a=a||-1===t.indexOf("-")?a:e[t.split("-")[0]])||e.en).scroll=this._isMacUser()?a.scrollMac:a.scroll,a},_hasClass:function(t,a){for(var e=0;e<a.length;e++)if(L.DomUtil.hasClass(t,a[e]))return !0;return !1},_handleTouch:function(t){this._hasClass(t.target,["leaflet-control-minimap","leaflet-interactive","leaflet-popup-content","leaflet-popup-content-wrapper","leaflet-popup-close-button","leaflet-control-zoom-in","leaflet-control-zoom-out"])?L.DomUtil.hasClass(t.target,"leaflet-interactive")&&"touchmove"===t.type&&1===t.touches.length?this._enableTouchWarning():this._disableTouchWarning():"touchmove"!==t.type&&"touchstart"!==t.type?this._disableTouchWarning():1===t.touches.length?this._enableTouchWarning():this._disableTouchWarning();},_enableTouchWarning:function(){this._enableWarning("touch"),this._disableInteractions();},_disableTouchWarning:function(t){clearTimeout(this._isTouching),this._isTouching=setTimeout(L.bind(function(){this._disableWarning("touch"),this._enableInteractions();},this),t||0);},_enableScrollWarning:function(){this._enableWarning("scroll"),this._map.scrollWheelZoom.disable();},_disableScrollWarning:function(t){clearTimeout(this._isScrolling),this._isScrolling=setTimeout(L.bind(function(){this._disableWarning("scroll"),this._map.scrollWheelZoom.enable();},this),t||0);},_handleScroll:function(t){t.metaKey||t.ctrlKey?(t.preventDefault(),this._disableScrollWarning()):(this._enableScrollWarning(),this._disableScrollWarning(this._map.options.gestureHandlingOptions.duration));},_handleMouseOver:function(t){this._enableInteractions();},_handleMouseOut:function(t){a||this._disableInteractions();},_onExitFullscreen:function(){this._map.options.gestureHandling&&this._map.gestureHandling.enable();},_onEnterFullscreen:function(){this._map.options.gestureHandling&&this._map.gestureHandling.disable();}});L.Map.mergeOptions({gestureHandlingOptions:l}),L.Map.addInitHook("addHandler","gestureHandling",o),t.GestureHandling=o,t.default=o,Object.defineProperty(t,"__esModule",{value:!0});});

  // Based on https://github.com/shramov/leaflet-plugins
  // GridLayer like https://avinmathew.com/leaflet-and-google-maps/ , but using MutationObserver instead of jQuery


  // 🍂class GridLayer.GoogleMutant
  // 🍂extends GridLayer
  L.GridLayer.GoogleMutant = L.GridLayer.extend({
  	options: {
  		minZoom: 0,
  		maxZoom: 23,
  		tileSize: 256,
  		subdomains: 'abc',
  		errorTileUrl: '',
  		attribution: '',	// The mutant container will add its own attribution anyways.
  		opacity: 1,
  		continuousWorld: false,
  		noWrap: false,
  		// 🍂option type: String = 'roadmap'
  		// Google's map type. Valid values are 'roadmap', 'satellite' or 'terrain'. 'hybrid' is not really supported.
  		type: 'roadmap',
  		maxNativeZoom: 21
  	},

  	initialize: function (options) {
  		L.GridLayer.prototype.initialize.call(this, options);

  		this._ready = !!window.google && !!window.google.maps && !!window.google.maps.Map;

  		this._GAPIPromise = this._ready ? Promise.resolve(window.google) : new Promise(function (resolve, reject) {
  			var checkCounter = 0;
  			var intervalId = null;
  			intervalId = setInterval(function () {
  				if (checkCounter >= 10) {
  					clearInterval(intervalId);
  					return reject(new Error('window.google not found after 10 attempts'));
  				}
  				if (!!window.google && !!window.google.maps && !!window.google.maps.Map) {
  					clearInterval(intervalId);
  					return resolve(window.google);
  				}
  				checkCounter++;
  			}, 500);
  		});

  		// Couple data structures indexed by tile key
  		this._tileCallbacks = {};	// Callbacks for promises for tiles that are expected
  		this._freshTiles = {};	// Tiles from the mutant which haven't been requested yet

  		this._imagesPerTile = (this.options.type === 'hybrid') ? 2 : 1;

  		this._boundOnMutatedImage = this._onMutatedImage.bind(this);
  	},

  	onAdd: function (map) {
  		L.GridLayer.prototype.onAdd.call(this, map);
  		this._initMutantContainer();

  		this._GAPIPromise.then(function () {
  			this._ready = true;
  			this._map = map;

  			this._initMutant();

  			map.on('viewreset', this._reset, this);
  			if (this.options.updateWhenIdle) {
  				map.on('moveend', this._update, this);
  			} else {
  				map.on('move', this._update, this);
  			}
  			map.on('zoomend', this._handleZoomAnim, this);
  			map.on('resize', this._resize, this);

  			//handle layer being added to a map for which there are no Google tiles at the given zoom
  			google.maps.event.addListenerOnce(this._mutant, 'idle', function () {
  				this._checkZoomLevels();
  				this._mutantIsReady = true;
  			}.bind(this));

  			//20px instead of 1em to avoid a slight overlap with google's attribution
  			map._controlCorners.bottomright.style.marginBottom = '20px';
  			map._controlCorners.bottomleft.style.marginBottom = '20px';

  			this._reset();
  			this._update();

  			if (this._subLayers) {
  				//restore previously added google layers
  				for (var layerName in this._subLayers) {
  					this._subLayers[layerName].setMap(this._mutant);
  				}
  			}
  		}.bind(this));
  	},

  	onRemove: function (map) {
  		L.GridLayer.prototype.onRemove.call(this, map);
  		map._container.removeChild(this._mutantContainer);
  		this._mutantContainer = undefined;

  		google.maps.event.clearListeners(map, 'idle');
  		google.maps.event.clearListeners(this._mutant, 'idle');
  		map.off('viewreset', this._reset, this);
  		map.off('move', this._update, this);
  		map.off('moveend', this._update, this);
  		map.off('zoomend', this._handleZoomAnim, this);
  		map.off('resize', this._resize, this);

  		if (map._controlCorners) {
  			map._controlCorners.bottomright.style.marginBottom = '0em';
  			map._controlCorners.bottomleft.style.marginBottom = '0em';
  		}
  	},

  	getAttribution: function () {
  		return this.options.attribution;
  	},

  	setElementSize: function (e, size) {
  		e.style.width = size.x + 'px';
  		e.style.height = size.y + 'px';
  	},


  	addGoogleLayer: function (googleLayerName, options) {
  		if (!this._subLayers) this._subLayers = {};
  		return this._GAPIPromise.then(function () {
  			var Constructor = google.maps[googleLayerName];
  			var googleLayer = new Constructor(options);
  			googleLayer.setMap(this._mutant);
  			this._subLayers[googleLayerName] = googleLayer;
  			return googleLayer;
  		}.bind(this));
  	},

  	removeGoogleLayer: function (googleLayerName) {
  		var googleLayer = this._subLayers && this._subLayers[googleLayerName];
  		if (!googleLayer) return;

  		googleLayer.setMap(null);
  		delete this._subLayers[googleLayerName];
  	},


  	_initMutantContainer: function () {
  		if (!this._mutantContainer) {
  			this._mutantContainer = L.DomUtil.create('div', 'leaflet-google-mutant leaflet-top leaflet-left');
  			this._mutantContainer.id = '_MutantContainer_' + L.Util.stamp(this._mutantContainer);
  			this._mutantContainer.style.zIndex = '800'; //leaflet map pane at 400, controls at 1000
  			this._mutantContainer.style.pointerEvents = 'none';
  			
  			L.DomEvent.off(this._mutantContainer);

  			this._map.getContainer().appendChild(this._mutantContainer);
  		}

  		this.setOpacity(this.options.opacity);
  		this.setElementSize(this._mutantContainer, this._map.getSize());

  		this._attachObserver(this._mutantContainer);
  	},

  	_initMutant: function () {
  		if (!this._ready || !this._mutantContainer) return;
  		this._mutantCenter = new google.maps.LatLng(0, 0);

  		var map = new google.maps.Map(this._mutantContainer, {
  			center: this._mutantCenter,
  			zoom: 0,
  			tilt: 0,
  			mapTypeId: this.options.type,
  			disableDefaultUI: true,
  			keyboardShortcuts: false,
  			draggable: false,
  			disableDoubleClickZoom: true,
  			scrollwheel: false,
  			streetViewControl: false,
  			styles: this.options.styles || {},
  			backgroundColor: 'transparent'
  		});

  		this._mutant = map;

  		google.maps.event.addListenerOnce(map, 'idle', function () {
  			var nodes = this._mutantContainer.querySelectorAll('a');
  			for (var i = 0; i < nodes.length; i++) {
  				nodes[i].style.pointerEvents = 'auto';
  			}
  		}.bind(this));

  		// 🍂event spawned
  		// Fired when the mutant has been created.
  		this.fire('spawned', {mapObject: map});
  	},

  	_attachObserver: function _attachObserver (node) {
  // 		console.log('Gonna observe', node);

  		var observer = new MutationObserver(this._onMutations.bind(this));

  		// pass in the target node, as well as the observer options
  		observer.observe(node, { childList: true, subtree: true });
  	},

  	_onMutations: function _onMutations (mutations) {
  		for (var i = 0; i < mutations.length; ++i) {
  			var mutation = mutations[i];
  			for (var j = 0; j < mutation.addedNodes.length; ++j) {
  				var node = mutation.addedNodes[j];

  				if (node instanceof HTMLImageElement) {
  					this._onMutatedImage(node);
  				} else if (node instanceof HTMLElement) {
  					Array.prototype.forEach.call(
  						node.querySelectorAll('img'),
  						this._boundOnMutatedImage
  					);

  					// Check for, and remove, the "Google Maps can't load correctly" div.
  					// You *are* loading correctly, you dumbwit.
  					if (node.style.backgroundColor === 'white') {
  						L.DomUtil.remove(node);
  					}
                      
  					// Check for, and remove, the "For development purposes only" divs on the aerial/hybrid tiles.
  					if (node.textContent.indexOf('For development purposes only') === 0) {
  						L.DomUtil.remove(node);
  					}
                      
  					// Check for, and remove, the "Sorry, we have no imagery here"
  					// empty <div>s. The [style*="text-align: center"] selector
  					// avoids matching the attribution notice.
  					// This empty div doesn't have a reference to the tile
  					// coordinates, so it's not possible to mark the tile as
  					// failed.
  					Array.prototype.forEach.call(
  						node.querySelectorAll('div[draggable=false][style*="text-align: center"]'),
  						L.DomUtil.remove
  					);
  				}
  			}
  		}
  	},

  	// Only images which 'src' attrib match this will be considered for moving around.
  	// Looks like some kind of string-based protobuf, maybe??
  	// Only the roads (and terrain, and vector-based stuff) match this pattern
  	_roadRegexp: /!1i(\d+)!2i(\d+)!3i(\d+)!/,

  	// On the other hand, raster imagery matches this other pattern
  	_satRegexp: /x=(\d+)&y=(\d+)&z=(\d+)/,

  	// On small viewports, when zooming in/out, a static image is requested
  	// This will not be moved around, just removed from the DOM.
  	_staticRegExp: /StaticMapService\.GetMapImage/,

  	_onMutatedImage: function _onMutatedImage (imgNode) {
  // 		if (imgNode.src) {
  // 			console.log('caught mutated image: ', imgNode.src);
  // 		}

  		var coords;
  		var match = imgNode.src.match(this._roadRegexp);
  		var sublayer = 0;

  		if (match) {
  			coords = {
  				z: match[1],
  				x: match[2],
  				y: match[3]
  			};
  			if (this._imagesPerTile > 1) { 
  				imgNode.style.zIndex = 1;
  				sublayer = 1;
  			}
  		} else {
  			match = imgNode.src.match(this._satRegexp);
  			if (match) {
  				coords = {
  					x: match[1],
  					y: match[2],
  					z: match[3]
  				};
  			}
  // 			imgNode.style.zIndex = 0;
  			sublayer = 0;
  		}

  		if (coords) {
  			var tileKey = this._tileCoordsToKey(coords);
  			imgNode.style.position = 'absolute';
  			imgNode.style.visibility = 'hidden';

  			var key = tileKey + '/' + sublayer;
  			// console.log('mutation for tile', key)
  			//store img so it can also be used in subsequent tile requests
  			this._freshTiles[key] = imgNode;

  			if (key in this._tileCallbacks && this._tileCallbacks[key]) {
  // console.log('Fullfilling callback ', key);
  				//fullfill most recent tileCallback because there maybe callbacks that will never get a 
  				//corresponding mutation (because map moved to quickly...)
  				this._tileCallbacks[key].pop()(imgNode); 
  				if (!this._tileCallbacks[key].length) { delete this._tileCallbacks[key]; }
  			} else {
  				if (this._tiles[tileKey]) {
  					//we already have a tile in this position (mutation is probably a google layer being added)
  					//replace it
  					var c = this._tiles[tileKey].el;
  					var oldImg = (sublayer === 0) ? c.firstChild : c.firstChild.nextSibling;
  					var cloneImgNode = this._clone(imgNode);
  					c.replaceChild(cloneImgNode, oldImg);
  				}
  			}
  		} else if (imgNode.src.match(this._staticRegExp)) {
  			imgNode.style.visibility = 'hidden';
  		}
  	},


  	createTile: function (coords, done) {
  		var key = this._tileCoordsToKey(coords);

  		var tileContainer = L.DomUtil.create('div');
  		tileContainer.dataset.pending = this._imagesPerTile;
  		done = done.bind(this, null, tileContainer);

  		for (var i = 0; i < this._imagesPerTile; i++) {
  			var key2 = key + '/' + i;
  			if (key2 in this._freshTiles) {
  				var imgNode = this._freshTiles[key2];
  				tileContainer.appendChild(this._clone(imgNode));
  				tileContainer.dataset.pending--;
  // 				console.log('Got ', key2, ' from _freshTiles');
  			} else {
  				this._tileCallbacks[key2] = this._tileCallbacks[key2] || [];
  				this._tileCallbacks[key2].push( (function (c/*, k2*/) {
  					return function (imgNode) {
  						c.appendChild(this._clone(imgNode));
  						c.dataset.pending--;
  						if (!parseInt(c.dataset.pending)) { done(); }
  // 						console.log('Sent ', k2, ' to _tileCallbacks, still ', c.dataset.pending, ' images to go');
  					}.bind(this);
  				}.bind(this))(tileContainer/*, key2*/) );
  			}
  		}

  		if (!parseInt(tileContainer.dataset.pending)) {
  			L.Util.requestAnimFrame(done);
  		}
  		return tileContainer;
  	},

  	_clone: function (imgNode) {
  		var clonedImgNode = imgNode.cloneNode(true);
  		clonedImgNode.style.visibility = 'visible';
  		return clonedImgNode;
  	},

  	_checkZoomLevels: function () {
  		//setting the zoom level on the Google map may result in a different zoom level than the one requested
  		//(it won't go beyond the level for which they have data).
  		var zoomLevel = this._map.getZoom();
  		var gMapZoomLevel = this._mutant.getZoom();
  		if (!zoomLevel || !gMapZoomLevel) return;


  		if ((gMapZoomLevel !== zoomLevel) || //zoom levels are out of sync, Google doesn't have data
  			(gMapZoomLevel > this.options.maxNativeZoom)) { //at current location, Google does have data (contrary to maxNativeZoom)
  			//Update maxNativeZoom
  			this._setMaxNativeZoom(gMapZoomLevel);
  		}
  	},

  	_setMaxNativeZoom: function (zoomLevel) {
  		if (zoomLevel != this.options.maxNativeZoom) {
  			this.options.maxNativeZoom = zoomLevel;
  			this._resetView();
  		}
  	},

  	_reset: function () {
  		this._initContainer();
  	},

  	_update: function () {
  		// zoom level check needs to happen before super's implementation (tile addition/creation)
  		// otherwise tiles may be missed if maxNativeZoom is not yet correctly determined
  		if (this._mutant) {
  			var center = this._map.getCenter();
  			var _center = new google.maps.LatLng(center.lat, center.lng);

  			this._mutant.setCenter(_center);
  			var zoom = this._map.getZoom();
  			var fractionalLevel = zoom !== Math.round(zoom);
  			var mutantZoom = this._mutant.getZoom();

  			//ignore fractional zoom levels
  			if (!fractionalLevel && (zoom != mutantZoom)) {
  				this._mutant.setZoom(zoom);
  							
  				if (this._mutantIsReady) this._checkZoomLevels();
  				//else zoom level check will be done later by 'idle' handler
  			}
  		}

  		L.GridLayer.prototype._update.call(this);
  	},

  	_resize: function () {
  		var size = this._map.getSize();
  		if (this._mutantContainer.style.width === size.x &&
  			this._mutantContainer.style.height === size.y)
  			return;
  		this.setElementSize(this._mutantContainer, size);
  		if (!this._mutant) return;
  		google.maps.event.trigger(this._mutant, 'resize');
  	},

  	_handleZoomAnim: function () {
  		if (!this._mutant) return;
  		var center = this._map.getCenter();
  		var _center = new google.maps.LatLng(center.lat, center.lng);

  		this._mutant.setCenter(_center);
  		this._mutant.setZoom(Math.round(this._map.getZoom()));
  	},

  	// Agressively prune _freshtiles when a tile with the same key is removed,
  	// this prevents a problem where Leaflet keeps a loaded tile longer than
  	// GMaps, so that GMaps makes two requests but Leaflet only consumes one,
  	// polluting _freshTiles with stale data.
  	_removeTile: function (key) {
  		if (!this._mutant) return;

  		//give time for animations to finish before checking it tile should be pruned
  		setTimeout(this._pruneTile.bind(this, key), 1000);


  		return L.GridLayer.prototype._removeTile.call(this, key);
  	},

  	_pruneTile: function (key) {
  		var gZoom = this._mutant.getZoom();
  		var tileZoom = key.split(':')[2];
  		var googleBounds = this._mutant.getBounds();
  		var sw = googleBounds.getSouthWest();
  		var ne = googleBounds.getNorthEast();
  		var gMapBounds = L.latLngBounds([[sw.lat(), sw.lng()], [ne.lat(), ne.lng()]]);

  		for (var i=0; i<this._imagesPerTile; i++) {
  			var key2 = key + '/' + i;
  			if (key2 in this._freshTiles) { 
  				var tileBounds = this._map && this._keyToBounds(key);
  				var stillVisible = this._map && tileBounds.overlaps(gMapBounds) && (tileZoom == gZoom);

  				if (!stillVisible) delete this._freshTiles[key2]; 
  //				console.log('Prunning of ', key, (!stillVisible))
  			}
  		}
  	}
  });


  // 🍂factory gridLayer.googleMutant(options)
  // Returns a new `GridLayer.GoogleMutant` given its options
  L.gridLayer.googleMutant = function (options) {
  	return new L.GridLayer.GoogleMutant(options);
  };

  /*!
  Copyright (c) 2016 Dominik Moritz

  This file is part of the leaflet locate control. It is licensed under the MIT license.
  You can find the project at: https://github.com/domoritz/leaflet-locatecontrol
  */
  (function (factory, window) {
       // see https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md#module-loaders
       // for details on how to structure a leaflet plugin.

      // define an AMD module that relies on 'leaflet'
      if (typeof define === 'function' && define.amd) {
          define(['leaflet'], factory);

      // define a Common JS module that relies on 'leaflet'
      } else if (typeof exports === 'object') {
          if (typeof window !== 'undefined' && window.L) {
              module.exports = factory(L);
          } else {
              module.exports = factory(require('leaflet'));
          }
      }

      // attach your plugin to the global 'L' variable
      if (typeof window !== 'undefined' && window.L){
          window.L.Control.Locate = factory(L);
      }
  } (function (L) {
      var LDomUtilApplyClassesMethod = function(method, element, classNames) {
          classNames = classNames.split(' ');
          classNames.forEach(function(className) {
              L.DomUtil[method].call(this, element, className);
          });
      };

      var addClasses = function(el, names) { LDomUtilApplyClassesMethod('addClass', el, names); };
      var removeClasses = function(el, names) { LDomUtilApplyClassesMethod('removeClass', el, names); };

      /**
       * Compatible with L.Circle but a true marker instead of a path
       */
      var LocationMarker = L.Marker.extend({
          initialize: function (latlng, options) {
              L.Util.setOptions(this, options);
              this._latlng = latlng;
              this.createIcon();
          },

          /**
           * Create a styled circle location marker
           */
          createIcon: function() {
              var opt = this.options;

              var style = '';

              if (opt.color !== undefined) {
                  style += 'stroke:'+opt.color+';';
              }
              if (opt.weight !== undefined) {
                  style += 'stroke-width:'+opt.weight+';';
              }
              if (opt.fillColor !== undefined) {
                  style += 'fill:'+opt.fillColor+';';
              }
              if (opt.fillOpacity !== undefined) {
                  style += 'fill-opacity:'+opt.fillOpacity+';';
              }
              if (opt.opacity !== undefined) {
                  style += 'opacity:'+opt.opacity+';';
              }

              var icon = this._getIconSVG(opt, style);

              this._locationIcon = L.divIcon({
                  className: icon.className,
                  html: icon.svg,
                  iconSize: [icon.w,icon.h],
              });

              this.setIcon(this._locationIcon);
          },

          /**
           * Return the raw svg for the shape
           *
           * Split so can be easily overridden
           */
          _getIconSVG: function(options, style) {
              var r = options.radius;
              var w = options.weight;
              var s = r + w;
              var s2 = s * 2;
              var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+s2+'" height="'+s2+'" version="1.1" viewBox="-'+s+' -'+s+' '+s2+' '+s2+'">' +
              '<circle r="'+r+'" style="'+style+'" />' +
              '</svg>';
              return {
                  className: 'leaflet-control-locate-location',
                  svg: svg,
                  w: s2,
                  h: s2
              };
          },

          setStyle: function(style) {
              L.Util.setOptions(this, style);
              this.createIcon();
          }
      });

      var CompassMarker = LocationMarker.extend({
          initialize: function (latlng, heading, options) {
              L.Util.setOptions(this, options);
              this._latlng = latlng;
              this._heading = heading;
              this.createIcon();
          },

          setHeading: function(heading) {
              this._heading = heading;
          },

          /**
           * Create a styled arrow compass marker
           */
          _getIconSVG: function(options, style) {
              var r = options.radius;
              var w = (options.width + options.weight);
              var h = (r+options.depth + options.weight)*2;
              var path = 'M0,0 l'+(options.width/2)+','+options.depth+' l-'+(w)+',0 z';
              var svgstyle = 'transform: rotate('+this._heading+'deg)';
              var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="'+(w)+'" height="'+h+'" version="1.1" viewBox="-'+(w/2)+' 0 '+w+' '+h+'" style="'+svgstyle+'">'+
              '<path d="'+path+'" style="'+style+'" />'+
              '</svg>';
              return {
                  className: 'leaflet-control-locate-heading',
                  svg: svg,
                  w: w,
                  h: h
              };
          },
      });


      var LocateControl = L.Control.extend({
          options: {
              /** Position of the control */
              position: 'topleft',
              /** The layer that the user's location should be drawn on. By default creates a new layer. */
              layer: undefined,
              /**
               * Automatically sets the map view (zoom and pan) to the user's location as it updates.
               * While the map is following the user's location, the control is in the `following` state,
               * which changes the style of the control and the circle marker.
               *
               * Possible values:
               *  - false: never updates the map view when location changes.
               *  - 'once': set the view when the location is first determined
               *  - 'always': always updates the map view when location changes.
               *              The map view follows the user's location.
               *  - 'untilPan': like 'always', except stops updating the
               *                view if the user has manually panned the map.
               *                The map view follows the user's location until she pans.
               *  - 'untilPanOrZoom': (default) like 'always', except stops updating the
               *                view if the user has manually panned the map.
               *                The map view follows the user's location until she pans.
               */
              setView: 'untilPanOrZoom',
              /** Keep the current map zoom level when setting the view and only pan. */
              keepCurrentZoomLevel: false,
              /**
               * This callback can be used to override the viewport tracking
               * This function should return a LatLngBounds object.
               *
               * For example to extend the viewport to ensure that a particular LatLng is visible:
               *
               * getLocationBounds: function(locationEvent) {
               *    return locationEvent.bounds.extend([-33.873085, 151.219273]);
               * },
               */
              getLocationBounds: function (locationEvent) {
                  return locationEvent.bounds;
              },
              /** Smooth pan and zoom to the location of the marker. Only works in Leaflet 1.0+. */
              flyTo: false,
              /**
               * The user location can be inside and outside the current view when the user clicks on the
               * control that is already active. Both cases can be configures separately.
               * Possible values are:
               *  - 'setView': zoom and pan to the current location
               *  - 'stop': stop locating and remove the location marker
               */
              clickBehavior: {
                  /** What should happen if the user clicks on the control while the location is within the current view. */
                  inView: 'stop',
                  /** What should happen if the user clicks on the control while the location is outside the current view. */
                  outOfView: 'setView',
                  /**
                   * What should happen if the user clicks on the control while the location is within the current view
                   * and we could be following but are not. Defaults to a special value which inherits from 'inView';
                   */
                  inViewNotFollowing: 'inView',
              },
              /**
               * If set, save the map bounds just before centering to the user's
               * location. When control is disabled, set the view back to the
               * bounds that were saved.
               */
              returnToPrevBounds: false,
              /**
               * Keep a cache of the location after the user deactivates the control. If set to false, the user has to wait
               * until the locate API returns a new location before they see where they are again.
               */
              cacheLocation: true,
              /** If set, a circle that shows the location accuracy is drawn. */
              drawCircle: true,
              /** If set, the marker at the users' location is drawn. */
              drawMarker: true,
              /** If set and supported then show the compass heading */
              showCompass: true,
              /** The class to be used to create the marker. For example L.CircleMarker or L.Marker */
              markerClass: LocationMarker,
              /** The class us be used to create the compass bearing arrow */
              compassClass: CompassMarker,
              /** Accuracy circle style properties. NOTE these styles should match the css animations styles */
              circleStyle: {
                  className:   'leaflet-control-locate-circle',
                  color:       '#136AEC',
                  fillColor:   '#136AEC',
                  fillOpacity: 0.15,
                  weight:      0
              },
              /** Inner marker style properties. Only works if your marker class supports `setStyle`. */
              markerStyle: {
                  className:   'leaflet-control-locate-marker',
                  color:       '#fff',
                  fillColor:   '#2A93EE',
                  fillOpacity: 1,
                  weight:      3,
                  opacity:     1,
                  radius:      9
              },
              /** Compass */
              compassStyle: {
                  fillColor:   '#2A93EE',
                  fillOpacity: 1,
                  weight:      0,
                  color:       '#fff',
                  opacity:     1,
                  radius:      9, // How far is the arrow is from the center of of the marker
                  width:       9, // Width of the arrow
                  depth:       6  // Length of the arrow
              },
              /**
               * Changes to accuracy circle and inner marker while following.
               * It is only necessary to provide the properties that should change.
               */
              followCircleStyle: {},
              followMarkerStyle: {
                  // color: '#FFA500',
                  // fillColor: '#FFB000'
              },
              followCompassStyle: {},
              /** The CSS class for the icon. For example fa-location-arrow or fa-map-marker */
              icon: 'fa fa-map-marker',
              iconLoading: 'fa fa-spinner fa-spin',
              /** The element to be created for icons. For example span or i */
              iconElementTag: 'span',
              /** Padding around the accuracy circle. */
              circlePadding: [0, 0],
              /** Use metric units. */
              metric: true,
              /**
               * This callback can be used in case you would like to override button creation behavior.
               * This is useful for DOM manipulation frameworks such as angular etc.
               * This function should return an object with HtmlElement for the button (link property) and the icon (icon property).
               */
              createButtonCallback: function (container, options) {
                  var link = L.DomUtil.create('a', 'leaflet-bar-part leaflet-bar-part-single', container);
                  link.title = options.strings.title;
                  var icon = L.DomUtil.create(options.iconElementTag, options.icon, link);
                  return { link: link, icon: icon };
              },
              /** This event is called in case of any location error that is not a time out error. */
              onLocationError: function(err, control) {
                  alert(err.message);
              },
              /**
               * This event is called when the user's location is outside the bounds set on the map.
               * The event is called repeatedly when the location changes.
               */
              onLocationOutsideMapBounds: function(control) {
                  control.stop();
                  alert(control.options.strings.outsideMapBoundsMsg);
              },
              /** Display a pop-up when the user click on the inner marker. */
              showPopup: true,
              strings: {
                  title: "Show me where I am",
                  metersUnit: "meters",
                  feetUnit: "feet",
                  popup: "You are within {distance} {unit} from this point",
                  outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
              },
              /** The default options passed to leaflets locate method. */
              locateOptions: {
                  maxZoom: Infinity,
                  watch: true,  // if you overwrite this, visualization cannot be updated
                  setView: false // have to set this to false because we have to
                                 // do setView manually
              }
          },

          initialize: function (options) {
              // set default options if nothing is set (merge one step deep)
              for (var i in options) {
                  if (typeof this.options[i] === 'object') {
                      L.extend(this.options[i], options[i]);
                  } else {
                      this.options[i] = options[i];
                  }
              }

              // extend the follow marker style and circle from the normal style
              this.options.followMarkerStyle = L.extend({}, this.options.markerStyle, this.options.followMarkerStyle);
              this.options.followCircleStyle = L.extend({}, this.options.circleStyle, this.options.followCircleStyle);
              this.options.followCompassStyle = L.extend({}, this.options.compassStyle, this.options.followCompassStyle);
          },

          /**
           * Add control to map. Returns the container for the control.
           */
          onAdd: function (map) {
              var container = L.DomUtil.create('div',
                  'leaflet-control-locate leaflet-bar leaflet-control');

              this._layer = this.options.layer || new L.LayerGroup();
              this._layer.addTo(map);
              this._event = undefined;
              this._compassHeading = null;
              this._prevBounds = null;

              var linkAndIcon = this.options.createButtonCallback(container, this.options);
              this._link = linkAndIcon.link;
              this._icon = linkAndIcon.icon;

              L.DomEvent
                  .on(this._link, 'click', L.DomEvent.stopPropagation)
                  .on(this._link, 'click', L.DomEvent.preventDefault)
                  .on(this._link, 'click', this._onClick, this)
                  .on(this._link, 'dblclick', L.DomEvent.stopPropagation);

              this._resetVariables();

              this._map.on('unload', this._unload, this);

              return container;
          },

          /**
           * This method is called when the user clicks on the control.
           */
          _onClick: function() {
              this._justClicked = true;
              var wasFollowing =  this._isFollowing();
              this._userPanned = false;
              this._userZoomed = false;

              if (this._active && !this._event) {
                  // click while requesting
                  this.stop();
              } else if (this._active && this._event !== undefined) {
                  var behaviors = this.options.clickBehavior;
                  var behavior = behaviors.outOfView;
                  if (this._map.getBounds().contains(this._event.latlng)) {
                      behavior = wasFollowing ? behaviors.inView : behaviors.inViewNotFollowing;
                  }

                  // Allow inheriting from another behavior
                  if (behaviors[behavior]) {
                      behavior = behaviors[behavior];
                  }

                  switch (behavior) {
                      case 'setView':
                          this.setView();
                          break;
                      case 'stop':
                          this.stop();
                          if (this.options.returnToPrevBounds) {
                              var f = this.options.flyTo ? this._map.flyToBounds : this._map.fitBounds;
                              f.bind(this._map)(this._prevBounds);
                          }
                          break;
                  }
              } else {
                  if (this.options.returnToPrevBounds) {
                    this._prevBounds = this._map.getBounds();
                  }
                  this.start();
              }

              this._updateContainerStyle();
          },

          /**
           * Starts the plugin:
           * - activates the engine
           * - draws the marker (if coordinates available)
           */
          start: function() {
              this._activate();

              if (this._event) {
                  this._drawMarker(this._map);

                  // if we already have a location but the user clicked on the control
                  if (this.options.setView) {
                      this.setView();
                  }
              }
              this._updateContainerStyle();
          },

          /**
           * Stops the plugin:
           * - deactivates the engine
           * - reinitializes the button
           * - removes the marker
           */
          stop: function() {
              this._deactivate();

              this._cleanClasses();
              this._resetVariables();

              this._removeMarker();
          },

          /**
           * Keep the control active but stop following the location
           */
          stopFollowing: function() {
              this._userPanned = true;
              this._updateContainerStyle();
              this._drawMarker();
          },

          /**
           * This method launches the location engine.
           * It is called before the marker is updated,
           * event if it does not mean that the event will be ready.
           *
           * Override it if you want to add more functionalities.
           * It should set the this._active to true and do nothing if
           * this._active is true.
           */
          _activate: function() {
              if (!this._active) {
                  this._map.locate(this.options.locateOptions);
                  this._active = true;

                  // bind event listeners
                  this._map.on('locationfound', this._onLocationFound, this);
                  this._map.on('locationerror', this._onLocationError, this);
                  this._map.on('dragstart', this._onDrag, this);
                  this._map.on('zoomstart', this._onZoom, this);
                  this._map.on('zoomend', this._onZoomEnd, this);
                  if (this.options.showCompass) {
                      if ('ondeviceorientationabsolute' in window) {
                          L.DomEvent.on(window, 'deviceorientationabsolute', this._onDeviceOrientation, this);
                      } else if ('ondeviceorientation' in window) {
                          L.DomEvent.on(window, 'deviceorientation', this._onDeviceOrientation, this);
                      }
                  }
              }
          },

          /**
           * Called to stop the location engine.
           *
           * Override it to shutdown any functionalities you added on start.
           */
          _deactivate: function() {
              this._map.stopLocate();
              this._active = false;

              if (!this.options.cacheLocation) {
                  this._event = undefined;
              }

              // unbind event listeners
              this._map.off('locationfound', this._onLocationFound, this);
              this._map.off('locationerror', this._onLocationError, this);
              this._map.off('dragstart', this._onDrag, this);
              this._map.off('zoomstart', this._onZoom, this);
              this._map.off('zoomend', this._onZoomEnd, this);
              if (this.options.showCompass) {
                  this._compassHeading = null;
                  if ('ondeviceorientationabsolute' in window) {
                      L.DomEvent.off(window, 'deviceorientationabsolute', this._onDeviceOrientation, this);
                  } else if ('ondeviceorientation' in window) {
                      L.DomEvent.off(window, 'deviceorientation', this._onDeviceOrientation, this);
                  }
              }
          },

          /**
           * Zoom (unless we should keep the zoom level) and an to the current view.
           */
          setView: function() {
              this._drawMarker();
              if (this._isOutsideMapBounds()) {
                  this._event = undefined;  // clear the current location so we can get back into the bounds
                  this.options.onLocationOutsideMapBounds(this);
              } else {
                  if (this.options.keepCurrentZoomLevel) {
                      var f = this.options.flyTo ? this._map.flyTo : this._map.panTo;
                      f.bind(this._map)([this._event.latitude, this._event.longitude]);
                  } else {
                      var f = this.options.flyTo ? this._map.flyToBounds : this._map.fitBounds;
                      // Ignore zoom events while setting the viewport as these would stop following
                      this._ignoreEvent = true;
                      f.bind(this._map)(this.options.getLocationBounds(this._event), {
                          padding: this.options.circlePadding,
                          maxZoom: this.options.locateOptions.maxZoom
                      });
                      L.Util.requestAnimFrame(function(){
                          // Wait until after the next animFrame because the flyTo can be async
                          this._ignoreEvent = false;
                      }, this);

                  }
              }
          },

          /**
           *
           */
          _drawCompass: function() {
              if (!this._event) {
                  return;
              }

              var latlng = this._event.latlng;

              if (this.options.showCompass && latlng && this._compassHeading !== null) {
                  var cStyle = this._isFollowing() ? this.options.followCompassStyle : this.options.compassStyle;
                  if (!this._compass) {
                      this._compass = new this.options.compassClass(latlng, this._compassHeading, cStyle).addTo(this._layer);
                  } else {
                      this._compass.setLatLng(latlng);
                      this._compass.setHeading(this._compassHeading);
                      // If the compassClass can be updated with setStyle, update it.
                      if (this._compass.setStyle) {
                          this._compass.setStyle(cStyle);
                      }
                  }
                  // 
              }
              if (this._compass && (!this.options.showCompass || this._compassHeading === null)) {
                  this._compass.removeFrom(this._layer);
                  this._compass = null;
              }
          },

          /**
           * Draw the marker and accuracy circle on the map.
           *
           * Uses the event retrieved from onLocationFound from the map.
           */
          _drawMarker: function() {
              if (this._event.accuracy === undefined) {
                  this._event.accuracy = 0;
              }

              var radius = this._event.accuracy;
              var latlng = this._event.latlng;

              // circle with the radius of the location's accuracy
              if (this.options.drawCircle) {
                  var style = this._isFollowing() ? this.options.followCircleStyle : this.options.circleStyle;

                  if (!this._circle) {
                      this._circle = L.circle(latlng, radius, style).addTo(this._layer);
                  } else {
                      this._circle.setLatLng(latlng).setRadius(radius).setStyle(style);
                  }
              }

              var distance, unit;
              if (this.options.metric) {
                  distance = radius.toFixed(0);
                  unit =  this.options.strings.metersUnit;
              } else {
                  distance = (radius * 3.2808399).toFixed(0);
                  unit = this.options.strings.feetUnit;
              }

              // small inner marker
              if (this.options.drawMarker) {
                  var mStyle = this._isFollowing() ? this.options.followMarkerStyle : this.options.markerStyle;
                  if (!this._marker) {
                      this._marker = new this.options.markerClass(latlng, mStyle).addTo(this._layer);
                  } else {
                      this._marker.setLatLng(latlng);
                      // If the markerClass can be updated with setStyle, update it.
                      if (this._marker.setStyle) {
                          this._marker.setStyle(mStyle);
                      }
                  }
              }

              this._drawCompass();

              var t = this.options.strings.popup;
              if (this.options.showPopup && t && this._marker) {
                  this._marker
                      .bindPopup(L.Util.template(t, {distance: distance, unit: unit}))
                      ._popup.setLatLng(latlng);
              }
              if (this.options.showPopup && t && this._compass) {
                  this._compass
                      .bindPopup(L.Util.template(t, {distance: distance, unit: unit}))
                      ._popup.setLatLng(latlng);
              }
          },

          /**
           * Remove the marker from map.
           */
          _removeMarker: function() {
              this._layer.clearLayers();
              this._marker = undefined;
              this._circle = undefined;
          },

          /**
           * Unload the plugin and all event listeners.
           * Kind of the opposite of onAdd.
           */
          _unload: function() {
              this.stop();
              this._map.off('unload', this._unload, this);
          },

          /**
           * Sets the compass heading
           */
          _setCompassHeading: function(angle) {
              if (!isNaN(parseFloat(angle)) && isFinite(angle)) {
                  angle = Math.round(angle);

                  this._compassHeading = angle;
                  L.Util.requestAnimFrame(this._drawCompass, this);
              } else {
                  this._compassHeading = null;
              }
          },

          /**
           * If the compass fails calibration just fail safely and remove the compass
           */
          _onCompassNeedsCalibration: function() {
              this._setCompassHeading();
          },

          /**
           * Process and normalise compass events
           */
          _onDeviceOrientation: function(e) {
              if (!this._active) {
                  return;
              }

              if (e.webkitCompassHeading) {
                  // iOS
                  this._setCompassHeading(e.webkitCompassHeading);
              } else if (e.absolute && e.alpha) {
                  // Android
                  this._setCompassHeading(360 - e.alpha);
              }
          },

          /**
           * Calls deactivate and dispatches an error.
           */
          _onLocationError: function(err) {
              // ignore time out error if the location is watched
              if (err.code == 3 && this.options.locateOptions.watch) {
                  return;
              }

              this.stop();
              this.options.onLocationError(err, this);
          },

          /**
           * Stores the received event and updates the marker.
           */
          _onLocationFound: function(e) {
              // no need to do anything if the location has not changed
              if (this._event &&
                  (this._event.latlng.lat === e.latlng.lat &&
                   this._event.latlng.lng === e.latlng.lng &&
                       this._event.accuracy === e.accuracy)) {
                  return;
              }

              if (!this._active) {
                  // we may have a stray event
                  return;
              }

              this._event = e;

              this._drawMarker();
              this._updateContainerStyle();

              switch (this.options.setView) {
                  case 'once':
                      if (this._justClicked) {
                          this.setView();
                      }
                      break;
                  case 'untilPan':
                      if (!this._userPanned) {
                          this.setView();
                      }
                      break;
                  case 'untilPanOrZoom':
                      if (!this._userPanned && !this._userZoomed) {
                          this.setView();
                      }
                      break;
                  case 'always':
                      this.setView();
                      break;
                  case false:
                      // don't set the view
                      break;
              }

              this._justClicked = false;
          },

          /**
           * When the user drags. Need a separate event so we can bind and unbind event listeners.
           */
          _onDrag: function() {
              // only react to drags once we have a location
              if (this._event && !this._ignoreEvent) {
                  this._userPanned = true;
                  this._updateContainerStyle();
                  this._drawMarker();
              }
          },

          /**
           * When the user zooms. Need a separate event so we can bind and unbind event listeners.
           */
          _onZoom: function() {
              // only react to drags once we have a location
              if (this._event && !this._ignoreEvent) {
                  this._userZoomed = true;
                  this._updateContainerStyle();
                  this._drawMarker();
              }
          },

          /**
           * After a zoom ends update the compass and handle sideways zooms
           */
          _onZoomEnd: function() {
              if (this._event) {
                  this._drawCompass();
              }

              if (this._event && !this._ignoreEvent) {
                  // If we have zoomed in and out and ended up sideways treat it as a pan
                  if (this._marker && !this._map.getBounds().pad(-.3).contains(this._marker.getLatLng())) {
                      this._userPanned = true;
                      this._updateContainerStyle();
                      this._drawMarker();
                  }
              }
          },

          /**
           * Compute whether the map is following the user location with pan and zoom.
           */
          _isFollowing: function() {
              if (!this._active) {
                  return false;
              }

              if (this.options.setView === 'always') {
                  return true;
              } else if (this.options.setView === 'untilPan') {
                  return !this._userPanned;
              } else if (this.options.setView === 'untilPanOrZoom') {
                  return !this._userPanned && !this._userZoomed;
              }
          },

          /**
           * Check if location is in map bounds
           */
          _isOutsideMapBounds: function() {
              if (this._event === undefined) {
                  return false;
              }
              return this._map.options.maxBounds &&
                  !this._map.options.maxBounds.contains(this._event.latlng);
          },

          /**
           * Toggles button class between following and active.
           */
          _updateContainerStyle: function() {
              if (!this._container) {
                  return;
              }

              if (this._active && !this._event) {
                  // active but don't have a location yet
                  this._setClasses('requesting');
              } else if (this._isFollowing()) {
                  this._setClasses('following');
              } else if (this._active) {
                  this._setClasses('active');
              } else {
                  this._cleanClasses();
              }
          },

          /**
           * Sets the CSS classes for the state.
           */
          _setClasses: function(state) {
              if (state == 'requesting') {
                  removeClasses(this._container, "active following");
                  addClasses(this._container, "requesting");

                  removeClasses(this._icon, this.options.icon);
                  addClasses(this._icon, this.options.iconLoading);
              } else if (state == 'active') {
                  removeClasses(this._container, "requesting following");
                  addClasses(this._container, "active");

                  removeClasses(this._icon, this.options.iconLoading);
                  addClasses(this._icon, this.options.icon);
              } else if (state == 'following') {
                  removeClasses(this._container, "requesting");
                  addClasses(this._container, "active following");

                  removeClasses(this._icon, this.options.iconLoading);
                  addClasses(this._icon, this.options.icon);
              }
          },

          /**
           * Removes all classes from button.
           */
          _cleanClasses: function() {
              L.DomUtil.removeClass(this._container, "requesting");
              L.DomUtil.removeClass(this._container, "active");
              L.DomUtil.removeClass(this._container, "following");

              removeClasses(this._icon, this.options.iconLoading);
              addClasses(this._icon, this.options.icon);
          },

          /**
           * Reinitializes state variables.
           */
          _resetVariables: function() {
              // whether locate is active or not
              this._active = false;

              // true if the control was clicked for the first time
              // we need this so we can pan and zoom once we have the location
              this._justClicked = false;

              // true if the user has panned the map after clicking the control
              this._userPanned = false;

              // true if the user has zoomed the map after clicking the control
              this._userZoomed = false;
          }
      });

      L.control.locate = function (options) {
          return new L.Control.Locate(options);
      };

      return LocateControl;
  }, window));

  (function () {

  L.Control.FullScreen = L.Control.extend({
  	options: {
  		position: 'topleft',
  		title: 'Full Screen',
  		titleCancel: 'Exit Full Screen',
  		forceSeparateButton: false,
  		forcePseudoFullscreen: false,
  		fullscreenElement: false
  	},
  	
  	onAdd: function (map) {
  		var className = 'leaflet-control-zoom-fullscreen', container, content = '';
  		
  		if (map.zoomControl && !this.options.forceSeparateButton) {
  			container = map.zoomControl._container;
  		} else {
  			container = L.DomUtil.create('div', 'leaflet-bar');
  		}
  		
  		if (this.options.content) {
  			content = this.options.content;
  		} else {
  			className += ' fullscreen-icon';
  		}

  		this._createButton(this.options.title, className, content, container, this.toggleFullScreen, this);
  		this._map.fullscreenControl = this;

  		this._map.on('enterFullscreen exitFullscreen', this._toggleTitle, this);

  		return container;
  	},
  	
  	_createButton: function (title, className, content, container, fn, context) {
  		this.link = L.DomUtil.create('a', className, container);
  		this.link.href = '#';
  		this.link.title = title;
  		this.link.innerHTML = content;

  		this.link.setAttribute('role', 'button');
  		this.link.setAttribute('aria-label', title);

  		L.DomEvent
  			.addListener(this.link, 'click', L.DomEvent.stopPropagation)
  			.addListener(this.link, 'click', L.DomEvent.preventDefault)
  			.addListener(this.link, 'click', fn, context);
  		
  		L.DomEvent
  			.addListener(container, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
  			.addListener(container, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
  			.addListener(container, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context);
  		
  		L.DomEvent
  			.addListener(document, fullScreenApi.fullScreenEventName, L.DomEvent.stopPropagation)
  			.addListener(document, fullScreenApi.fullScreenEventName, L.DomEvent.preventDefault)
  			.addListener(document, fullScreenApi.fullScreenEventName, this._handleFullscreenChange, context);

  		return this.link;
  	},
  	
  	toggleFullScreen: function () {
  		var map = this._map;
  		map._exitFired = false;
  		if (map._isFullscreen) {
  			if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
  				fullScreenApi.cancelFullScreen();
  			} else {
  				L.DomUtil.removeClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen');
  			}
  			map.fire('exitFullscreen');
  			map._exitFired = true;
  			map._isFullscreen = false;
  		}
  		else {
  			if (fullScreenApi.supportsFullScreen && !this.options.forcePseudoFullscreen) {
  				fullScreenApi.requestFullScreen(this.options.fullscreenElement ? this.options.fullscreenElement : map._container);
  			} else {
  				L.DomUtil.addClass(this.options.fullscreenElement ? this.options.fullscreenElement : map._container, 'leaflet-pseudo-fullscreen');
  			}
  			map.fire('enterFullscreen');
  			map._isFullscreen = true;
  		}
  	},
  	
  	_toggleTitle: function () {
  		this.link.title = this._map._isFullscreen ? this.options.title : this.options.titleCancel;
  	},
  	
  	_handleFullscreenChange: function () {
  		var map = this._map;
  		map.invalidateSize();
  		if (!fullScreenApi.isFullScreen() && !map._exitFired) {
  			map.fire('exitFullscreen');
  			map._exitFired = true;
  			map._isFullscreen = false;
  		}
  	}
  });

  L.Map.include({
  	toggleFullscreen: function () {
  		this.fullscreenControl.toggleFullScreen();
  	}
  });

  L.Map.addInitHook(function () {
  	if (this.options.fullscreenControl) {
  		this.addControl(L.control.fullscreen(this.options.fullscreenControlOptions));
  	}
  });

  L.control.fullscreen = function (options) {
  	return new L.Control.FullScreen(options);
  };

  /* 
  Native FullScreen JavaScript API
  -------------
  Assumes Mozilla naming conventions instead of W3C for now

  source : http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/

  */

  	var 
  		fullScreenApi = { 
  			supportsFullScreen: false,
  			isFullScreen: function () { return false; }, 
  			requestFullScreen: function () {}, 
  			cancelFullScreen: function () {},
  			fullScreenEventName: '',
  			prefix: ''
  		},
  		browserPrefixes = 'webkit moz o ms khtml'.split(' ');
  	
  	// check for native support
  	if (typeof document.exitFullscreen !== 'undefined') {
  		fullScreenApi.supportsFullScreen = true;
  	} else {
  		// check for fullscreen support by vendor prefix
  		for (var i = 0, il = browserPrefixes.length; i < il; i++) {
  			fullScreenApi.prefix = browserPrefixes[i];
  			if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] !== 'undefined') {
  				fullScreenApi.supportsFullScreen = true;
  				break;
  			}
  		}
  		if (typeof document['msExitFullscreen'] !== 'undefined') {
  			fullScreenApi.prefix = 'ms';
  			fullScreenApi.supportsFullScreen = true;
  		}
  	}
  	
  	// update methods to do something useful
  	if (fullScreenApi.supportsFullScreen) {
  		if (fullScreenApi.prefix === 'ms') {
  			fullScreenApi.fullScreenEventName = 'MSFullscreenChange';
  		} else {
  			fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
  		}
  		fullScreenApi.isFullScreen = function () {
  			switch (this.prefix) {
  				case '':
  					return document.fullscreen;
  				case 'webkit':
  					return document.webkitIsFullScreen;
  				case 'ms':
  					return document.msFullscreenElement;
  				default:
  					return document[this.prefix + 'FullScreen'];
  			}
  		};
  		fullScreenApi.requestFullScreen = function (el) {
  			switch (this.prefix) {
  				case '':
  					return el.requestFullscreen();
  				case 'ms':
  					return el.msRequestFullscreen();
  				default:
  					return el[this.prefix + 'RequestFullScreen']();
  			}
  		};
  		fullScreenApi.cancelFullScreen = function () {
  			switch (this.prefix) {
  				case '':
  					return document.exitFullscreen();
  				case 'ms':
  					return document.msExitFullscreen();
  				default:
  					return document[this.prefix + 'CancelFullScreen']();
  			}
  		};
  	}

  	// jQuery plugin
  	if (typeof jQuery !== 'undefined') {
  		jQuery.fn.requestFullScreen = function () {
  			return this.each(function () {
  				var el = jQuery(this);
  				if (fullScreenApi.supportsFullScreen) {
  					fullScreenApi.requestFullScreen(el);
  				}
  			});
  		};
  	}

  	// export api
  	window.fullScreenApi = fullScreenApi;
  })();

  /**
   * leaflet-pegman
   *
   * @author    Raruto
   * @license   GPL-3.0+
   * @link https://github.com/Raruto/leaflet-pegman
   * @desc Leaflet plugin that allows an easy integration with the Google StreetView Service API
   */
  L.Control.Pegman = L.Control.extend({
    includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,
    options: {
      position: 'bottomright', // position of control inside the map
      theme: "leaflet-pegman-v3-default", // or "leaflet-pegman-v3-small"
      logging: false, // enable console logging (debugging),
      apiKey: '',
      libraries: '',
      mutant: {
        attribution: 'Map data: &copy; <a href="https://www.google.com/intl/en/help/terms_maps.html">Google</a>',
        pane: "overlayPane",
        type: null, // Non-image map type (used to force a transparent background)
      },
      pano: {
        enableCloseButton: true,
      }
    },

    initialize: function(options) {
      L.Util.setOptions(this, options);

      // Grab Left/Right/Up/Down Direction of Mouse for Pegman Image
      this._mousePos = {
        direction: {},
        old: {},
      };

      this._pegmanMarkerCoords = null;
      this._streetViewCoords = null;
      this._streetViewLayerEnabled = false;

      this._dropzoneMapOpts = {
        accept: '.draggable', // Only Accept Elements Matching this CSS Selector
        overlap: 0.75, // Require a 75% Element Overlap for a Drop to be Possible
        ondropactivate: L.bind(this.onDropZoneActivated, this),
        ondragenter: L.bind(this.onDropZoneDragEntered, this),
        ondragleave: L.bind(this.onDropZoneDragLeaved, this),
        ondrop: L.bind(this.onDropZoneDropped, this),
        ondropdeactivate: L.bind(this.onDropZoneDeactivated, this),
      };
      this._draggableMarkerOpts = {
        inertia: false,
        onmove: L.bind(this.onDraggableMove, this),
        onend: L.bind(this.onDraggableEnd, this),
      };

      this._pegmanMarkerOpts = {
        draggable: true,
        icon: L.icon({
          className: "pegman-marker",
          iconSize: [52, 52],
          iconAnchor: [26, 13],
          iconUrl: 'data:image/png;base64,' + "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAFElEQVR4XgXAAQ0AAABAMP1L30IDCPwC/o5WcS4AAAAASUVORK5CYII=",
        }),
      };
      this._lazyLoaderAdded = false;
    },

    onAdd: function(map) {
      this._map = map;

      this._container = L.DomUtil.create('div', 'leaflet-pegman pegman-control leaflet-bar');
      this._pegman = L.DomUtil.create('div', 'pegman draggable drag-drop', this._container);
      this._pegmanButton = L.DomUtil.create('div', 'pegman-button', this._container);
      this._pegmanMarker = L.marker([0, 0], this._pegmanMarkerOpts);
      this._panoDiv = L.DomUtil.create('div', 'pano-canvas', this._map._container);

      L.DomUtil.addClass(this._map._container, this.options.theme);

      L.DomEvent.disableClickPropagation(this._panoDiv);
      L.DomEvent.on(this._container, 'click mousedown touchstart dblclick', this._disableClickPropagation, this);

      this._container.addEventListener('mousedown', this._loadScripts.bind(this, true), false);
      this._container.addEventListener('mouseover', this._loadScripts.bind(this, false), false);

      this._loadInteractHandlers();
      this._loadGoogleHandlers();

      L.DomEvent.on(document, 'mousemove', this.mouseMoveTracking, this);
      L.DomEvent.on(document, 'keyup', this.keyUpTracking, this);

      this._pegmanMarker.on("dragend", this.onPegmanMarkerDragged, this);
      this._map.on("click", this.onMapClick, this);
      this._map.on("layeradd", this.onMapLayerAdd, this);

      return this._container;
    },

    onRemove: function(map) {
      this._googleStreetViewLayer.remove();
      this._pegmanMarker.remove();

      L.DomUtil.remove(this._panoDiv);

      L.DomEvent.off(document, 'mousemove', this.mouseMoveTracking, this);
      L.DomEvent.off(document, 'keyup', this.keyUpTracking, this);
    },

    _log: function(args) {
      if (this.options.logging) {
        console.log(args);
      }
    },

    _addClasses: function(el, classNames) {
      classNames = classNames.split(" ");
      for (var s in classNames) {
        L.DomUtil.addClass(el, classNames[s]);
      }
    },

    _removeClasses: function(el, classNames) {
      classNames = classNames.split(" ");
      for (var s in classNames) {
        L.DomUtil.removeClass(el, classNames[s]);
      }
    },

    _removeAttributes: function(el, attrNames) {
      for (var a in attrNames) {
        el.removeAttribute(attrNames[a]);
      }
    },

    _insertAfter: function(targetNode, newNode) {
      targetNode.parentNode.insertBefore(newNode, targetNode.nextSibling);
    },

    _translateElement: function(el, dx, dy) {
      if (dx === false && dy === false) {
        this._removeAttributes(this._pegman, ["style", "data-x", "data-y"]);
      }
      // Element's position is preserved within the data-x/data-y attributes
      var x = (parseFloat(el.getAttribute('data-x')) || 0) + dx;
      var y = (parseFloat(el.getAttribute('data-y')) || 0) + dy;

      // Translate element
      el.style.webkitTransform = el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      // Update position attributes
      el.setAttribute('data-x', x);
      el.setAttribute('data-y', y);
    },

    _updateClasses: function(action) {
      switch (action) {
        case "pegman-dragging":
          this._removeClasses(this._pegman, "dropped");
          this._addClasses(this._container, "dragging");
          break;
        case "pegman-dragged":
          this._removeClasses(this._pegman, "can-drop dragged left right active dropped");
          this._removeAttributes(this._pegman, ["style", "data-x", "data-y"]);
          break;
        case "dropzone-actived":
          this._addClasses(this._map._container, "drop-active");
          break;
        case "dropzone-drag-entered":
          this._addClasses(this._pegman, "active can-drop");
          this._addClasses(this._map._container, "drop-target");
          break;
        case "dropzone-drag-leaved":
          this._removeClasses(this._map._container, "drop-target");
          this._removeClasses(this._pegman, "can-drop");
          break;
        case "dropzone-drop":
          this._removeClasses(this._container, "dragging");
          this._removeClasses(this._pegman, "active left right");
          this._addClasses(this._pegman, "dropped");
          this._removeClasses(this._pegman, "can-drop dragged left right active dropped");
          break;
        case "dropzone-deactivated":
          this._removeClasses(this._pegman, "active left right");
          this._removeClasses(this._map._container, "drop-active drop-target");
          break;
        case "mousemove-top":
          this._addClasses(this._pegman, "top");
          this._removeClasses(this._pegman, "bottom right left");
          break;
        case "mousemove-bottom":
          this._addClasses(this._pegman, "bottom");
          this._removeClasses(this._pegman, "top right left");
          break;
        case "mousemove-left":
          this._addClasses(this._pegman, "left");
          this._removeClasses(this._pegman, "right top bottom");
          break;
        case "mousemove-right":
          this._addClasses(this._pegman, "right");
          this._removeClasses(this._pegman, "left top bottom");
          break;
        case "pegman-added":
          this._addClasses(this._container, "active");
          break;
        case "pegman-removed":
          this._removeClasses(this._container, "active");
          break;
        case "streetview-shown":
          this._addClasses(this._container, "streetview-layer-active");
          break;
        case "streetview-hidden":
          this._removeClasses(this._container, "streetview-layer-active");
          break;
        default:
          throw "Unhandled event:" + action;
      }
      this._log(action);
      this.fireEvent("svpc_" + action);
    },

    onDraggableMove: function(e) {
      this.mouseMoveTracking(e);
      this._updateClasses("pegman-dragging");
      this._translateElement(this._pegman, e.dx, e.dy);
    },

    onDraggableEnd: function(e) {
      this._pegmanMarkerCoords = this._map.mouseEventToLatLng(e);
      this.pegmanAdd();
      this._updateClasses("pegman-dragged");
    },

    onDropZoneActivated: function(e) {
      this._updateClasses("dropzone-actived");
    },

    onDropZoneDragEntered: function(e) {
      this.showStreetViewLayer();
      this._updateClasses("dropzone-drag-entered");
    },

    onDropZoneDragLeaved: function(e) {
      this._updateClasses("dropzone-drag-leaved");
    },

    onDropZoneDropped: function(e) {
      this._updateClasses("dropzone-drop");
      this._translateElement(this._pegman, false, false);
    },

    onDropZoneDeactivated: function(e) {
      this._updateClasses("dropzone-deactivated");
    },

    onPegmanMarkerDragged: function(e) {
      this._pegmanMarkerCoords = this._pegmanMarker.getLatLng();
      this.findStreetViewData(this._pegmanMarkerCoords.lat, this._pegmanMarkerCoords.lng);
    },

    onMapClick: function(e) {
      if (this._streetViewLayerEnabled)
        this.findStreetViewData(e.latlng.lat, e.latlng.lng);
    },

    onMapLayerAdd: function(e) {
      if (this._googleStreetViewLayer)
        this._googleStreetViewLayer.bringToFront();
    },

    onStreetViewPanoramaClose: function() {
      this.clear();
    },

    clear: function() {
      this.pegmanRemove();
      this.hideStreetViewLayer();
      this.closeStreetViewPanorama();
    },

    toggleStreetViewLayer: function(e) {
      if (this._streetViewLayerEnabled) this.clear();
      else this.showStreetViewLayer();
    },

    pegmanAdd: function() {
      this._pegmanMarker.addTo(this._map);
      this._pegmanMarker.setLatLng(this._pegmanMarkerCoords);
      this.findStreetViewData(this._pegmanMarkerCoords.lat, this._pegmanMarkerCoords.lng);
      this._updateClasses("pegman-added");
    },

    pegmanRemove: function() {
      this._pegmanMarker.removeFrom(this._map);
      this._updateClasses("pegman-removed");
    },

    closeStreetViewPanorama: function() {
      this._panoDiv.style.display = "none";
    },

    openStreetViewPanorama: function() {
      this._panoDiv.style.display = "block";
    },

    hideStreetViewLayer: function() {
      if (this._googleStreetViewLayer) {
        this._googleStreetViewLayer.removeFrom(this._map);
        this._streetViewLayerEnabled = false;
        this._updateClasses("streetview-hidden");
      }
    },

    showStreetViewLayer: function() {
      if (this._googleStreetViewLayer) {
        this._googleStreetViewLayer.addTo(this._map);
        this._streetViewLayerEnabled = true;
        this._updateClasses("streetview-shown");
      }
    },

    findStreetViewData: function(lat, lng) {
      this._streetViewCoords = new google.maps.LatLng(lat, lng);
      var zoom = this._map.getZoom();
      var searchRadius = 100;

      if (zoom < 6) searchRadius = 5000;
      else if (zoom < 10) searchRadius = 500;
      else if (zoom < 15) searchRadius = 250;
      else if (zoom >= 17) searchRadius = 50;
      else searchRadius = 100;

      this._streetViewService.getPanoramaByLocation(this._streetViewCoords, searchRadius, L.bind(this.processStreetViewServiceData, this));
    },

    processStreetViewServiceData: function(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
        this.openStreetViewPanorama();
        this._panorama.setPano(data.location.pano);
        this._panorama.setPov({
          heading: google.maps.geometry.spherical.computeHeading(data.location.latLng, this._streetViewCoords),
          pitch: 0,
          zoom: 0
        });
        this._panorama.setVisible(true);
      } else {
        this._log("Street View data not found for this location.");
        // this.clear(); // TODO: add a visual feedback when no SV data available
      }
    },

    /**
     * mouseMoveTracking
     * @desc internal function used to style pegman while dragging
     */
    mouseMoveTracking: function(e) {
      var mousePos = this._mousePos;

      // Top <--> Bottom
      if (e.pageY < mousePos.old.y) {
        mousePos.direction.y = 'top';
        this._updateClasses("mousemove-top");
      } else if (e.pageY > mousePos.old.y) {
        mousePos.direction.y = 'bottom';
        this._updateClasses("mousemove-bottom");
      }
      // Left <--> Right
      if (e.pageX < mousePos.old.x) {
        mousePos.direction.x = 'left';
        this._updateClasses("mousemove-left");
      } else if (e.pageX > mousePos.old.x) {
        mousePos.direction.x = 'right';
        this._updateClasses("mousemove-right");
      }

      mousePos.old.x = e.pageX;
      mousePos.old.y = e.pageY;
    },

    /**
     * keyUpTracking
     * @desc internal function used to track keyup events
     */
    keyUpTracking: function(e) {
      if (e.keyCode == 27) {
        this._log('escape pressed');
        this.clear();
      }
    },

    _disableClickPropagation: function(e) {
      L.DomEvent.stopPropagation(e);
      L.DomEvent.preventDefault(e);
    },

    _loadGoogleHandlers: function() {
      if (typeof google !== 'object' || typeof google.maps !== 'object' || typeof L.GridLayer.GoogleMutant !== 'function') return;
      this._initGoogleMaps();
      this._initMouseTracker();
    },

    _initGoogleMaps: function() {
      this._googleStreetViewLayer = L.gridLayer.googleMutant(this.options.mutant);
      this._googleStreetViewLayer.addGoogleLayer('StreetViewCoverageLayer');

      this._panorama = new google.maps.StreetViewPanorama(this._panoDiv, this.options.pano);
      this._streetViewService = new google.maps.StreetViewService();

      google.maps.event.addListener(this._panorama, 'closeclick', L.bind(this.onStreetViewPanoramaClose, this));
    },

    _initMouseTracker: function() {
      if (!this._googleStreetViewLayer) return;

      var tileSize = this._googleStreetViewLayer.getTileSize();

      this.tileWidth = tileSize.x;
      this.tileHeight = tileSize.y;

      this.defaultDraggableCursor = this._map._container.style.cursor;

      this._map.on("mousemove", this._setMouseCursor, this);
    },

    _setMouseCursor: function(e) {
      var coords = this._getTileCoords(e.latlng.lat, e.latlng.lng, this._map.getZoom());
      var img = this._getTileImage(coords);
      var pixel = this._getTilePixelPoint(img, e.originalEvent);
      var hasTileData = this._hasTileData(img, pixel);
      this._map._container.style.cursor = hasTileData ? 'pointer' : this.defaultDraggableCursor;
    },

    _getTileCoords: function(lat, lon, zoom) {
      var xtile = parseInt(Math.floor((lon + 180) / 360 * (1 << zoom)));
      var ytile = parseInt(Math.floor((1 - Math.log(Math.tan(this._toRad(lat)) + 1 / Math.cos(this._toRad(lat))) / Math.PI) / 2 * (1 << zoom)));
      return {
        x: xtile,
        y: ytile,
        z: zoom,
      };
    },

    _getTileImage: function(coords) {
      if (!this._googleStreetViewLayer || !this._googleStreetViewLayer._tiles) return;
      var key = this._googleStreetViewLayer._tileCoordsToKey(coords);
      var tile = this._googleStreetViewLayer._tiles[key];
      if (!tile) return;
      var img = tile.el.querySelector('img');
      if (!img) return;
      this._downloadTile(img.src, this._tileLoaded); // crossOrigin = "Anonymous"
      return img;
    },

    _getTilePixelPoint: function(img, e) {
      if (!img) return;
      var imgRect = img.getBoundingClientRect();
      var imgPos = {
        pageY: (imgRect.top + window.scrollY).toFixed(0),
        pageX: (imgRect.left + window.scrollX).toFixed(0)
      };
      var mousePos = {
        x: e.pageX - imgPos.pageX,
        y: e.pageY - imgPos.pageY
      };
      return mousePos;
    },

    _hasTileData: function(img, pixelPoint) {
      if (!this.tileContext || !pixelPoint) return;
      var pixelData = this.tileContext.getImageData(pixelPoint.x, pixelPoint.y, 1, 1).data;
      var alpha = pixelData[3];
      var hasTileData = (alpha != 0);
      return hasTileData;
    },

    _toRad: function(number) {
      return number * Math.PI / 180;
    },

    _downloadTile: function(imageSrc, callback) {
      if (!imageSrc) return;
      img = new Image();
      img.crossOrigin = "Anonymous";
      img.addEventListener("load", callback.bind(this, img), false);
      img.src = imageSrc;
    },

    _tileLoaded: function(img) {
      this.tileCanvas = document.createElement("canvas");
      this.tileContext = this.tileCanvas.getContext("2d");

      this.tileCanvas.width = this.tileWidth;
      this.tileCanvas.height = this.tileHeight;

      this.tileContext.drawImage(img, 0, 0);
    },

    _loadInteractHandlers: function() {
      if (typeof interact !== 'function') return;
      // Enable Draggable Element to be Dropped into Map Container
      this._draggable = interact(this._pegman).draggable(this._draggableMarkerOpts);
      this._dropzone = interact(this._map._container).dropzone(this._dropzoneMapOpts);

      this._draggable.styleCursor(false);

      // Toggle on/off SV Layer on Pegman's Container single clicks
      interact(this._container).on("tap", L.bind(this.toggleStreetViewLayer, this));
    },

    _loadScripts: function(toggleStreetView) {
      if (this._lazyLoaderAdded) return;
      this._lazyLoaderAdded = true;

      if (typeof interact !== 'function') {
        var i_url = 'https://cdnjs.cloudflare.com/ajax/libs/interact.js/1.2.9/interact.min.js';
        this._loadJS(i_url, function() {
          this._log("interact.js loaded");
          this._loadInteractHandlers();
        }.bind(this));
      }

      if (typeof google !== 'object' || typeof google.maps !== 'object') {
        var g_url = 'https://maps.googleapis.com/maps/api/js?v=3' +
          '&key=' + this.options.apiKey +
          '&libraries=' + this.options.libraries +
          '&callback=?';
        this._loadJS(g_url, function() {
          this._log("gmaps.js loaded");
          this._loadGoogleHandlers();
          if (toggleStreetView) {
            this.toggleStreetViewLayer();
          }
        }.bind(this));
      }

      if (typeof L.GridLayer.GoogleMutant !== 'function') {
        var m_url = 'https://unpkg.com/leaflet.gridlayer.googlemutant@0.8.0/Leaflet.GoogleMutant.js';
        this._loadJS(m_url, function() {
          this._log("Leaflet.GoogleMutant.js loaded");
          this._loadGoogleHandlers();
          if (toggleStreetView) {
            this.toggleStreetViewLayer();
          }
        }.bind(this));
      }
    },

    _loadJS: function(url, callback) {
      if (url.indexOf('callback=?') !== -1) {
        this._jsonp(url, callback);
      } else {
        var script = document.createElement('script');
        script.src = url;
        script.onload = script.onreadystatechange = callback;

        var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
        head.insertBefore(script, head.firstChild);
      }
    },

    _jsonp: function(url, callback, params) {
      var query = url.indexOf('?') === -1 ? '?' : '&';
      params = params || {};
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          query += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&';
        }
      }

      var timestamp = new Date().getUTCMilliseconds();
      var jsonp = "json_call_" + timestamp; // uniqueId('json_call');
      window[jsonp] = function(data) {
        callback(data);
        window[jsonp] = undefined;
      };

      var script = document.createElement('script');
      if (url.indexOf('callback=?') !== -1) {
        script.src = url.replace('callback=?', 'callback=' + jsonp) + query.slice(0, -1);
      } else {
        script.src = url + query + 'callback=' + jsonp;
      }
      script.async = true;
      script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          script.onload = script.onreadystatechange = null;
          if (script && script.parentNode) {
            script.parentNode.removeChild(script);
          }
        }
      };
      var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
      // Use insertBefore instead of appendChild to circumvent an IE6 bug.
      // This arises when a base node is used.
      head.insertBefore(script, head.firstChild);
    },

  });

  L.control.pegman = function(options) {
    return new L.Control.Pegman(options);
  };

  L.Control.OpacitySlider = L.Control.extend({

    includes: L.Evented ? L.Evented.prototype : L.Mixin.Events,

    options: {
      position: 'topright',
      opacity: 100,
      backgroundColor: 'transparent',
      sliderImageUrl: 'images/opacity-slider3d14.png',
      margin: 5,
    },

    _OPACITY_MAX_PIXELS: 69,

    initialize: function(layer, options) {
      L.Util.setOptions(this, options);

      this.layer = layer;
      this.layers = this.layer ? [this.layer] : [];
    },

    onAdd: function(map) {

      var container = this._container = L.DomUtil.create('DIV', 'opacity-control');
      var slider = this._slider = L.DomUtil.create('DIV', 'opacity-slider');
      var knob = this._knob = L.DomUtil.create('DIV', 'opacity-knob');

      container.setAttribute("style", "cursor:pointer;");
      slider.setAttribute("style", "margin:" + this.options.margin + "px;overflow-x:hidden;overflow-y:hidden;background:url(" + this.options.sliderImageUrl + ") no-repeat;width:71px;height:21px;");
      knob.setAttribute("style", "padding:0;margin:0;overflow-x:hidden;overflow-y:hidden;background:url(" + this.options.sliderImageUrl + ") no-repeat -71px 0;width:14px;height:21px;");

      slider.appendChild(knob);
      container.appendChild(slider);

      this.knob = new this.DraggableObject(knob, {
        restrictY: true,
        container: container,
        onDragEnd: function(e) {
          var opacity = this.knob.getValueX();
          this.setOpacity(opacity);
        }.bind(this)
      });

      L.DomEvent.on(container, 'click mousedown mousemove mouseup', function(e) {
        L.DomUtil.disableTextSelection();
        if (e.type == 'mousedown') this._dragging = true;
        else if (e.type == 'mouseup' || e.type == 'click') this._dragging = false;

        if (e.type == 'mousemove' && this._dragging == true || e.type == 'click') {
          var left = this.findPosLeft(this._container);
          var x = e.pageX - left - this.options.margin;
          this.knob.setValueX(x);
          this.setOpacity(x);
        }
      }, this);

      L.DomEvent.disableClickPropagation(container);

      this._resetSlider();

      this.on('hidden', function(e) {
        for (var i in this.layers) {
          if (this.layers[i])
            this.layers[i].remove();
        }
      }, this);
      this.on('visible', function(e) {
        for (var i in this.layers) {
          if (this.layers[i])
            this.layers[i].addTo(this._map);
        }
      }, this);

      if (!this.layer) {
        map.on('baselayerchange', function(e) {
          this.setLayer(e.layer);
          this._setLayerOpacity(e.layer, this.opacity);
        }, this);
      }

      return container;
    },

    setOpacity: function(pixelX) {
      // Range = 0 to OPACITY_MAX_PIXELS
      var value = (100 / this._OPACITY_MAX_PIXELS) * pixelX;
      value = value / 100;

      if (value < 0) {
        value = 0;
      }

      this.fire(value > 0 ? 'visible' : 'hidden');

      if (this.layer) {
        if (this.layer.eachLayer) {
          this.layer.eachLayer(function(layer) {
            this._setLayerOpacity(layer, value);
          }, this);
        } else {
          this._setLayerOpacity(this.layer, value);
        }
      }
    },

    _setLayerOpacity: function(layer, value) {
      if (layer.setStyle) {
        layer.setStyle({
          opacity: value
        });
        this.opacity = value;
      } else if (layer.setOpacity) {
        layer.setOpacity(value);
        this.opacity = value;
      }
    },

    findPosLeft: function(obj) {
      var curleft = 0;
      if (obj.offsetParent) {
        do {
          curleft += obj.offsetLeft;
          obj = obj.offsetParent;
        } while (obj);
        return curleft;
      }
      return undefined;
    },

    getLayer: function() {
      return this.layer;
    },

    setLayer: function(layer) {
      this.removeFeatureLayer(this.layer);
      this.addFeatureLayer(layer);
      this.layer = layer;
    },

    addFeatureLayer: function(layer) {
      this.layers.push(layer);
      return this.layers;
    },

    removeFeatureLayer: function(layer) {
      for (var i in this.layers) {
        if (this.layers[i] && this.layers[i]._leaflet_id === layer._leaflet_id) {
          this.layers.splice(i, 1);
        }
      }
      return this.layers;
    },

    _resetSlider: function() {
      // Set initial value
      this._initialValue = this._OPACITY_MAX_PIXELS / (100 / this.options.opacity);
      this.knob.setValueX(this._initialValue);
      this.setOpacity(this._initialValue);
    },

    /**
     * TODO: trying to replace with the "L.Draggable" class
     */
    DraggableObject: function(src, options) {
      var self = this;

      var _opts = {
        draggingCursor: "default",
        draggableCursor: "default",
        onDragStart: _dumbFunction,
        onDragEnd: _dumbFunction,
        onDragging: _dumbFunction,
        onMouseDown: _dumbFunction,
        onMouseUp: _dumbFunction,
        intervalX: 1,
        intervalY: 1,
        toleranceX: Infinity,
        toleranceY: Infinity,
        interval: 1
      };

      L.Util.extend(_opts, options);

      var _draggingCursor = _opts.draggingCursor;
      var _draggableCursor = _opts.draggableCursor;
      var _dragging = false;
      var _preventDefault;
      var _currentX, _currentY, _formerY, _formerX, _formerMouseX, _formerMouseY;
      var _top, _left;
      var _originalX, _originalY;
      var _target = src.setCapture ? src : document;

      _opts.left = _opts.left || src.offsetLeft;
      _opts.top = _opts.top || src.offsetTop;

      src.style.position = "absolute";

      src.addEventListener("mousedown", _mouseDown);
      _target.addEventListener("mouseup", _mouseUp);

      _setCursor(false);
      _moveTo(_opts.left, _opts.top, false);

      /**
       * Set the cursor for {@link src} based on whether or not
       *     the element is currently being dragged.
       * @param {Boolean} a Is the element being dragged?
       * @private
       */
      function _setCursor(a) {
        src.style.cursor = a ? _draggingCursor : _draggableCursor;
      }

      /**
       * Moves the element {@link src} to the given
       *     location.
       * @param {Number} x The left position to move to.
       * @param {Number} y The top position to move to.
       * @param {Boolean} prevent Prevent moving?
       * @private
       */
      function _moveTo(x, y, prevent) {
        _left = Math.round(x);
        _top = Math.round(y);

        if (_opts.intervalX > 1) {
          var halfIntervalX = Math.round(_opts.intervalX / 2);
          var roundedIntervalX = Math.round(_left % _opts.intervalX);
          _left = (roundedIntervalX < halfIntervalX) ? (_left - roundedIntervalX) : (_left + (_opts.intervalX - roundedIntervalX));
        }
        if (_opts.intervalY > 1) {
          var halfIntervalY = Math.round(_opts.intervalY / 2);
          var roundedIntervalY = Math.round(_top % _opts.intervalY);
          _top = (roundedIntervalY < halfIntervalY) ? (_top - roundedIntervalY) : (_top + (_opts.intervalY - roundedIntervalY));
        }
        if (_opts.container && _opts.container.offsetWidth) {
          _left = Math.max(0, Math.min(_left, _opts.container.offsetWidth - src.offsetWidth));
          _top = Math.max(0, Math.min(_top, _opts.container.offsetHeight - src.offsetHeight));
        }
        if (typeof _currentX === "number") {
          if (((_left - _currentX) > _opts.toleranceX || (_currentX - (_left + src.offsetWidth)) > _opts.toleranceX) || ((_top - _currentY) > _opts.toleranceY || (_currentY - (_top + src.offsetHeight)) > _opts.toleranceY)) {
            _left = _originalX;
            _top = _originalY;
          }
        }
        src.style.left = !_opts.restrictX && !prevent ? _left + "px" : src.style.left;
        src.style.top = !_opts.restrictY && !prevent ? _top + "px" : src.style.top;
      }

      /**
       * Handles the mousemove event.
       * @param {event} ev The event data sent by the browser.
       * @private
       */
      function _mouseMove(ev) {
        var e = ev || event;
        _currentX = _formerX + ((_getFormerMouseX(e)) - _formerMouseX);
        _currentY = _formerY + ((_getFormerMouseY(e)) - _formerMouseY);
        _formerX = _currentX;
        _formerY = _currentY;
        _formerMouseX = _getFormerMouseX(e);
        _formerMouseY = _getFormerMouseY(e);
        if (_dragging) {
          _moveTo(_currentX, _currentY, _preventDefault);
          _opts.onDragging({
            mouseX: _formerMouseX,
            mouseY: _formerMouseY,
            startLeft: _originalX,
            startTop: _originalY,
            event: e
          });
        }
      }

      /**
       * Handles the mousedown event.
       * @param {event} ev The event data sent by the browser.
       * @private
       */
      function _mouseDown(ev) {
        var e = ev || event;
        _setCursor(true);
        _opts.onMouseDown(e);
        if (src.style.position !== "absolute") {
          src.style.position = "absolute";
          return;
        }
        _formerMouseX = _getFormerMouseX(e);
        _formerMouseY = _getFormerMouseY(e);
        _originalX = src.offsetLeft;
        _originalY = src.offsetTop;
        _formerX = _originalX;
        _formerY = _originalY;
        _target.addEventListener("mousemove", _mouseMove);
        if (src.setCapture) {
          src.setCapture();
        }
        if (e.preventDefault) {
          e.preventDefault();
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
          e.returnValue = false;
        }
        _dragging = true;
        _opts.onDragStart({
          mouseX: _formerMouseX,
          mouseY: _formerMouseY,
          startLeft: _originalX,
          startTop: _originalY,
          event: e
        });
      }

      /**
       * Handles the mouseup event.
       * @param {event} ev The event data sent by the browser.
       * @private
       */
      function _mouseUp(ev) {
        var e = ev || event;
        if (_dragging) {
          _setCursor(false);
          _target.removeEventListener("mousemove", _mouseMove);
          if (src.releaseCapture) {
            src.releaseCapture();
          }
          _dragging = false;
          _opts.onDragEnd({
            mouseX: _formerMouseX,
            mouseY: _formerMouseY,
            startLeft: _originalX,
            startTop: _originalY,
            event: e
          });
        }
        _currentX = _currentY = null;
        _opts.onMouseUp(e);
      }

      function _getFormerMouseX(e) {
        return e.pageX || (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
      }

      function _getFormerMouseY(e) {
        return e.pageY || (e.clientY + document.body.scrollTop + document.documentElement.scrollTop);
      }

      function _dumbFunction(e) {}

      /**
       * Move the element {@link src} to the given location.
       * @param {Point} point An object with an x and y property
       *     that represents the location to move to.
       */
      self.moveTo = function(point) {
        _moveTo(point.x, point.y, false);
      };

      /**
       * Move the element {@link src} by the given amount.
       * @param {Size} size An object with an x and y property
       *     that represents distance to move the element.
       */
      self.moveBy = function(size) {
        _moveTo(src.offsetLeft + size.width, src.offsetHeight + size.height, false);
      };

      /**
       * Sets the cursor for the dragging state.
       * @param {String} cursor The name of the cursor to use.
       */
      self.setDraggingCursor = function(cursor) {
        _draggingCursor = cursor;
        _setCursor(_dragging);
      };

      /**
       * Sets the cursor for the draggable state.
       * @param {String} cursor The name of the cursor to use.
       */
      self.setDraggableCursor = function(cursor) {
        _draggableCursor = cursor;
        _setCursor(_dragging);
      };

      /**
       * Returns the current left location.
       * @return {Number}
       */
      self.left = function() {
        return _left;
      };

      /**
       * Returns the current top location.
       * @return {Number}
       */
      self.top = function() {
        return _top;
      };

      /**
       * Returns the number of intervals the element has moved
       *     along the X axis. Useful for scrollbar type
       *     applications.
       * @return {Number}
       */
      self.getValueX = function() {
        var i = _opts.intervalX || 1;
        return Math.round(_left / i);
      };

      /**
       * Returns the number of intervals the element has moved
       *     along the Y axis. Useful for scrollbar type
       *     applications.
       * @return {Number}
       */
      self.getValueY = function() {
        var i = _opts.intervalY || 1;
        return Math.round(_top / i);
      };

      /**
       * Sets the left position of the draggable object based on
       *     intervalX.
       * @param {Number} value The location to move to.
       */
      self.setValueX = function(value) {
        _moveTo(value * _opts.intervalX, _top, false);
      };

      /**
       * Sets the top position of the draggable object based on
       *     intervalY.
       * @param {Number} value The location to move to.
       */
      self.setValueY = function(value) {
        _moveTo(_left, value * _opts.intervalY, false);
      };

      /**
       * Prevents the default movement behavior of the object.
       *     The object can still be moved by other methods.
       */
      self.preventDefaultMovement = function(prevent) {
        _preventDefault = prevent;
      };
    }
    /**
     * @name DraggableObjectOptions
     * @class This class represents the optional parameter passed into constructor of
     * <code>DraggableObject</code>.
     * @property {Number} [top] Top pixel
     * @property {Number} [left] Left pixel
     * @property {HTMLElement} [container] HTMLElement as container.
     * @property {String} [draggingCursor] Dragging Cursor
     * @property {String} [draggableCursor] Draggable Cursor
     * @property {Number} [intervalX] Interval in X direction
     * @property {Number} [intervalY] Interval in Y direction
     * @property {Number} [toleranceX] Tolerance X in pixel
     * @property {Number} [toleranceY] Tolerance Y in pixel
     * @property {Boolean} [restrictX] Whether to restrict move in X direction
     * @property {Boolean} [restrictY] Whether to restrict move in Y direction
     */
  });

  (function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jszip'), require('geojson-vt'), require('@tmcw/togeojson'), require('leaflet-pointable')) :
    typeof define === 'function' && define.amd ? define(['exports', 'jszip', 'geojson-vt', '@tmcw/togeojson', 'leaflet-pointable'], factory) :
    (global = global || self, factory(global['leaflet-kmz'] = {}, global.JSZip, global.geojsonvt, global.toGeoJSON));
  }(undefined, function (exports, JSZip, geojsonvt, toGeoJSON) {
    JSZip = JSZip && JSZip.hasOwnProperty('default') ? JSZip['default'] : JSZip;
    geojsonvt = geojsonvt && geojsonvt.hasOwnProperty('default') ? geojsonvt['default'] : geojsonvt;
    toGeoJSON = toGeoJSON && toGeoJSON.hasOwnProperty('default') ? toGeoJSON['default'] : toGeoJSON;

    L.KMZParser = L.Class.extend({

      initialize: function(opts) {
        L.setOptions(this, opts);
        this.loaders = [];
      },

      load: function(kmzUrl, opts) {
        var kmzLoader = new L.KMZLoader(L.extend({}, this.options, opts));
        kmzLoader.parse(kmzUrl);
        this.loaders.push(kmzLoader);
      },

      get: function(i) {
        return i < this.loaders.length ? this.loaders[i] : false;
      },
    });

    var KMZParser = L.KMZParser;

    L.KMZLoader = L.Class.extend({
      options: {
        tiled: true,
        interactive: true,
        ballon: true,
        bindPopup: true,
        bindTooltip: true,
        debug: 0,
      },

      initialize: function(opts) {
        L.setOptions(this, opts);
        // Optimized GeoJSON Vector Tiles through "geojson-vt.js" library.
        this.tiled = 'geojsonvt' in window && this.options.tiled;
        // Standard Mouse interactions through default "leaflet.js" layers.
        this.interactive = this.options.interactive;
        // (Experimental) Optimized Mouse interactions through "geojson-vt.js" and "leaflet-pointable.js" libraries.
        this.pointable = this.tiled && !this.options.interactive && this.options.pointable;
        this.emptyIcon = 'data:image/png;base64,' + "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAFElEQVR4XgXAAQ0AAABAMP1L30IDCPwC/o5WcS4AAAAASUVORK5CYII=";
        this.name = this.options.name;
        this.callback = opts.onKMZLoaded;
      },

      parse: function(kmzUrl) {
        this.name = this.name ? this.name : kmzUrl.split('/').pop();
        this._load(kmzUrl);
      },

      _load: function(url) {
        this._getBinaryContent(url, function(err, data) {
          if (err != null) console.error(url, err, data);
          else this._parse(data);
        }.bind(this));
      },

      _parse: function(data) {
        return this._isZipped(data) ? this._parseKMZ(data) : this._parseKML(data);
      },

      _parseKMZ: function(data) {
        var that = this;
        JSZip.loadAsync(data).then((zip) => {
          Promise.all(that._mapZipFiles(zip)).then((list) => {
            Promise.all(that._mapListFiles(list)).then((data) => {
              var kmlString = this._decodeKMZFolder(data);
              that._parseKML(kmlString);
            });
          });
        });
      },

      _parseKML: function(data) {
        var kmlString = this._decodeKMLString(data);
        var xmlDoc = this._toXML(kmlString);
        this._kmlToLayer(xmlDoc);
      },

      _decodeKMLString: function(data) {
        return data instanceof ArrayBuffer ? String.fromCharCode.apply(null, new Uint8Array(data)) : data;
      },

      _decodeKMZFolder: function(data) {
        var kmzFiles = this._listToObject(data);
        var kmlDoc = this._getKmlDoc(kmzFiles);
        var images = this._getImageFiles(Object.keys(kmzFiles));

        var kmlString = kmzFiles[kmlDoc];

        // replaces all images with their base64 encoding
        for (var i in images) {
          var imageUrl = images[i];
          var dataUrl = kmzFiles[imageUrl];
          kmlString = this._replaceAll(kmlString, imageUrl, dataUrl);
        }
        return kmlString;
      },

      _toXML: function(text) {
        return (new DOMParser()).parseFromString(text, 'text/xml');
      },

      _toGeoJSON: function(xmlDoc) {
        return (toGeoJSON || window.toGeoJSON).kml(xmlDoc);
      },

      _kmlToLayer: function(xmlDoc) {
        var data = this._toGeoJSON(xmlDoc);

        if (this.interactive) {
          this.geojson = L.geoJson(data, {
            pointToLayer: this._pointToLayer.bind(this),
            onEachFeature: this._onEachFeature.bind(this),
          });
          this.layer = this.geojson;
        }

        if (this.tiled) {
          this.gridlayer = L.gridLayer.geoJson(data, {
            pointable: this.pointable,
            ballon: this.options.ballon,
            bindPopup: this.options.bindPopup,
            bindTooltip: this.options.bindTooltip,
          });
          this.layer = this.interactive ? L.featureGroup([this.gridlayer, this.geojson]) : this.gridlayer;
        }

        if (this.layer) {
          this._onKMZLoaded(this.layer, this.name);
        }
      },

      _pointToLayer: function(feature, latlng) {
        return new L.marker(latlng, {
          icon: L.icon({
            iconUrl: this.emptyIcon,
          }),
        });
      },

      _onEachFeature: function(feature, layer) {
        switch (feature.geometry.type) {
          case 'Point':
            this._setLayerPointIcon(feature, layer);
            break;
          case 'LineString':
          case 'Polygon':
          case 'GeometryCollection':
            this._setLayerStyle(feature, layer);
            break;
          default:
            console.warn('Unsupported feature type: ' + feature.geometry.type, feature);
            break;
        }
        this._setLayerBalloon(feature, layer);
      },

      _onKMZLoaded: function(layer, name) {
        if (this.options.debug) console.log(layer, name);
        if (this.callback) this.callback(layer, name);
      },

      _setLayerPointIcon: function(feature, layer) {
        var width = 28;
        var height = 28;
        layer.setIcon(L.icon({
          iconSize: [width, height],
          iconAnchor: [width / 2, height / 2],
          iconUrl: this.tiled ? this.emptyIcon : feature.properties.icon,
        }));
      },

      _setLayerStyle: function(feature, layer) {
        var styles = {
          weight: 1,
          opacity: 0,
          fillOpacity: 0,
        };
        if (!this.tiled) {
          if (feature.properties["stroke-width"]) {
            styles.weight = feature.properties["stroke-width"] * 1.05;
          }
          if (feature.properties["stroke-opacity"]) {
            styles.opacity = feature.properties["stroke-opacity"];
          }
          if (feature.properties["fill-opacity"]) {
            styles.fillOpacity = feature.properties["fill-opacity"];
          }
          if (feature.properties.stroke) {
            styles.color = feature.properties.stroke;
          }
          if (feature.properties.fill) {
            styles.fillColor = feature.properties.fill;
          }
        }
        layer.setStyle(styles);
      },

      _setLayerBalloon: function(feature, layer) {
        if (!this.options.ballon) return;

        var name = feature.properties.name ? feature.properties.name : "";
        var desc = feature.properties.description ? feature.properties.description : "";

        if (name || desc) {
          if (this.options.bindPopup) {
            layer.bindPopup('<div>' + '<b>' + name + '</b>' + '<br>' + desc + '</div>');
          }
          if (this.options.bindTooltip) {
            layer.bindTooltip('<b>' + name + '</b>', {
              direction: 'auto',
              sticky: true,
            });
          }
        }
      },

      _escapeRegExp: function(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      },

      _replaceAll: function(str, find, replace) {
        return str.replace(new RegExp(this._escapeRegExp(find), 'g'), replace);
      },

      _mapZipFiles: function(zip) {
        return Object.keys(zip.files)
          .map((name) => zip.files[name])
          .map((entry) => entry
            .async("blob")
            .then((value) => [entry.name, value]) // [ fileName, stringValue ]
          );
      },

      _mapListFiles: function(list) {
        return list.map(file => Promise.resolve().then(() => {
          return this._readFile(file);
        }));
      },

      _listToObject: function(list) {
        return list
          .reduce(function(newObj, listElem) {
            newObj[listElem[0]] = listElem[1]; // { fileName: stringValue }
            return newObj;
          }, {} /* NB: do not remove, initial value */ );
      },

      _getFileExt: function(filename) {
        return filename.split('.').pop().toLowerCase().replace('jpg', 'jpeg');
      },

      _getMimeType: function(filename, ext) {
        var mime = 'text/plain';
        if (/\.(jpe?g|png|gif|bmp)$/i.test(filename)) {
          mime = 'image/' + ext;
        } else if (/\.kml$/i.test(filename)) {
          mime = 'text/plain';
        }
        return mime;
      },

      _getKmlDoc: function(files) {
        return files["doc.kml"] ? "doc.kml" : this._getKmlFiles(Object.keys(files))[0];
      },

      _getKmlFiles: function(files) {
        return files.filter((file) => /.*\.kml/.test(file));
      },

      _getImageFiles: function(files) {
        return files.filter((file) => /\.(jpe?g|png|gif|bmp)$/i.test(file));
      },

      /**
       * It checks if a given file begins with PK, if so it's zipped
       *
       * @link https://en.wikipedia.org/wiki/List_of_file_signatures
       */
      _isZipped: function(file) {
        var P = new Uint8Array(file, 0, 1); // offset, length
        var K = new Uint8Array(file, 1, 1);
        var PK = String.fromCharCode(P, K);
        return 'PK' === PK;
      },

      _readFile: function(file) {
        var filename = file[0];
        var fileblob = file[1];
        var ext = this._getFileExt(filename);
        var mime = this._getMimeType(filename, ext);
        return this._fileReader(fileblob, mime, filename);
      },

      _fileReader: function(blob, mime, name) {
        return new Promise((resolve, reject) => {
          var fr = new FileReader();
          fr.onload = () => {
            var result = fr.result;
            if (mime.indexOf('text') === -1) {
              var dataUrl = fr.result;
              var base64 = dataUrl.split(',')[1];
              result = 'data:' + mime + ';base64,' + base64;
            }
            return resolve([
              name, result
            ]);
          };
          if (mime.indexOf('text') === -1) {
            fr.readAsDataURL(blob);
          } else {
            fr.readAsText(blob);
          }
        });
      },

      _getBinaryContent: function(path, callback) {
        try {
          var xhr = new window.XMLHttpRequest();
          xhr.open('GET', path, true);
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
          xhr.responseType = "arraybuffer";
          xhr.onreadystatechange = function(evt) {
            var file, err;
            if (xhr.readyState === 4) {
              if (xhr.status === 200 || xhr.status === 0) {
                file = null;
                err = null;
                try {
                  file = xhr.response || xhr.responseText;
                } catch (e) {
                  err = new Error(e);
                }
                callback(err, file);
              } else {
                callback(new Error("Ajax error for " + path + " : " + this.status + " " + this.statusText), null);
              }
            }
          };
          xhr.send();
        } catch (e) {
          callback(new Error(e), null);
        }
      },

      _blobToString: function(b) {
        var u, x;
        u = URL.createObjectURL(b);
        x = new XMLHttpRequest();
        x.open('GET', u, false); // although sync, you're not fetching over internet
        x.send();
        URL.revokeObjectURL(u);
        return x.responseText;
      },

      _blobToBase64: function(blob, callback) {
        var reader = new FileReader();
        reader.onload = function() {
          var dataUrl = reader.result;
          var base64 = dataUrl.split(',')[1];
          callback(base64);
        };
        reader.readAsDataURL(blob);
      },

    });

    var KMZLoader = L.KMZLoader;

    /**
     * A plugin combining geojson-vt with leafletjs which is initially inspired by leaflet-geojson-vt.
     *
     * @author Brandonxiang, Raruto
     *
     * @link https://github.com/brandonxiang/leaflet-geojson-vt
     */
    L.GridLayer.GeoJSON = L.GridLayer.extend({
      options: {
        pointable: false,
        ballon: false,
        bindPopup: false,
        bindTooltip: false,
        async: false,
        maxZoom: 24,
        tolerance: 3,
        debug: 0,
        extent: 4096,
        buffer: 256,
        icon: {
          width: 28,
          height: 28
        },
        styles: {
          strokeWidth: 1,
          strokeColor: '#f00',
          strokeOpacity: 1.0,
          fillColor: '#000',
          fillOpacity: 0.25
        }
      },

      initialize: function(geojson, options) {
        L.setOptions(this, options);
        L.GridLayer.prototype.initialize.call(this, options);
        this.tileIndex = (geojsonvt || window.geojsonvt)(geojson, this.options);
        this.geojson = geojson; // eg. saved for advanced "leaflet-pip" mouse/click integrations
      },

      onAdd: function(map) {
        L.GridLayer.prototype.onAdd.call(this, map);
        if (this.options.ballon) {
          if (this.options.bindPopup) this._map.on("click", this.updateBalloon, this);
          if (this.options.bindTooltip) this._map.on("mousemove", this.updateBalloon, this);
        }
      },

      createTile: function(coords) {
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;
        var ctx = tile.getContext('2d');

        // return the tile so it can be rendered on screen
        var tileInfo = this.tileIndex.getTile(coords.z, coords.x, coords.y);
        var features = tileInfo ? tileInfo.features : [];
        for (var i = 0; i < features.length; i++) {
          this._drawFeature(ctx, features[i]);
        }
        return tile;
      },

      _drawFeature: function(ctx, feature) {
        ctx.beginPath();
        this._setStyle(ctx, feature);

        if (feature.type === 1) this._drawIcon(ctx, feature);
        else if (feature.type === 2) this._drawLine(ctx, feature);
        else if (feature.type === 3) this._drawPolygon(ctx, feature);
        else console.warn('Unsupported feature type: ' + feature.geometry.type, feature);

        ctx.stroke();
      },

      _drawIcon: function(ctx, feature) {
        var icon = new Image(),
          p = feature.geometry[0],
          width = this.options.icon.width,
          height = this.options.icon.height;
        icon.onload = function() {
          ctx.drawImage(icon, (p[0] / 16.0) - (width / 2.0), (p[1] / 16.0) - (height / 2.0), width, height);
        };
        icon.src = feature.tags.icon ? feature.tags.icon : null;
      },

      _drawLine: function(ctx, feature) {
        for (var j = 0; j < feature.geometry.length; j++) {
          var ring = feature.geometry[j];
          for (var k = 0; k < ring.length; k++) {
            var p = ring[k];
            if (k) ctx.lineTo(p[0] / 16.0, p[1] / 16.0);
            else ctx.moveTo(p[0] / 16.0, p[1] / 16.0);
          }
        }
      },

      _drawPolygon: function(ctx, feature) {
        this._drawLine(ctx, feature);
        ctx.fill('evenodd');
      },

      _setStyle: function(ctx, feature) {
        var style = {};

        if (feature.type === 1) style = this._setPointStyle(feature, style);
        else if (feature.type === 2) style = this._setLineStyle(feature, style);
        else if (feature.type === 3) style = this._setPolygonStyle(feature, style);

        ctx.lineWidth = style.stroke ? this._setWeight(style.weight) : 0;
        ctx.strokeStyle = style.stroke ? this._setOpacity(style.stroke, style.opacity) : {};
        ctx.fillStyle = style.fill ? this._setOpacity(style.fill, style.fillOpacity) : {};
      },

      _setPointStyle: function(feature, style) {
        return style;
      },

      _setLineStyle: function(feature, style) {
        style.weight = (feature.tags["stroke-width"] ? feature.tags["stroke-width"] : this.options.styles.strokeWidth) * 1.05;
        style.opacity = feature.tags["stroke-opacity"] ? feature.tags["stroke-opacity"] : this.options.styles.strokeOpacity;
        style.stroke = feature.tags.stroke ? feature.tags.stroke : this.options.styles.strokeColor;
        return style;
      },

      _setPolygonStyle: function(feature, style) {
        style = this._setLineStyle(feature, style);
        style.fill = feature.tags.fill ? feature.tags.fill : this.options.styles.fillColor;
        style.fillOpacity = feature.tags["fill-opacity"] ? feature.tags["fill-opacity"] : this.options.styles.fillOpacity;
        return style;
      },

      _setWeight: function(weight) {
        return weight || 5;
      },

      _setOpacity: function(color, opacity) {
        color = color || '#f00';
        if (opacity && this._iscolorHex(color)) {
          var colorRgb = this._colorRgb(color);
          return "rgba(" + colorRgb[0] + "," + colorRgb[1] + "," + colorRgb[2] + "," + opacity + ")";
        }
        return color;
      },

      _iscolorHex: function(color) {
        return /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color.toLowerCase());
      },

      _colorRgb: function(color) {
        var sColor = color.toLowerCase();
        if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }
          sColor = sColorNew;
        }
        var sColorChange = [];
        for (var j = 1; j < 7; j += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(j, j + 2)));
        }
        return sColorChange;
      },

      /**
       * Point in Polygon: ray-casting algorithm
       *
       * @link http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
       */
      _pointInPolygon: function(point, vs) {
        var x = point[0];
        var y = point[1];

        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0];
          var yi = vs[i][1];
          var xj = vs[j][0];
          var yj = vs[j][1];

          var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
        }

        return inside;
      },

      _getLatLngsPoly: function(feature, i) {
        var o = [];
        var geometry = feature.geometry || feature;
        var coords = geometry.type == "Polygon" ? geometry.coordinates[0] : geometry.coordinates;
        for (var j = i || 0; j < coords.length; j++) {
          o[i++] = [coords[j][0], coords[j][1]];
        }
        return o.length ? o : false;
      },

      _getLatLngsPoint: function(feature, i) {
        var o = [];
        var geometry = feature.geometry || feature;
        var coords = geometry.coordinates;
        o[i || 0] = [coords[0], coords[1]];
        return o.length ? o : false;
      },

      _getLatLngs: function(feature, i) {
        var o = [];
        i = i || 0;
        var coords;

        var geometry = feature.geometry || feature;
        var type = geometry.type;

        if (type == "Point") {
          coords = this._getLatLngsPoint(feature, i);
          if (coords) Array.prototype.push.apply(o, coords);
        } else if (type == "LineString" || type == "Polygon") {
          coords = this._getLatLngsPoly(feature, i);
          if (coords) Array.prototype.push.apply(o, coords);
        } else if (type == "GeometryCollection") {
          var polys = geometry.geometries;
          for (var j = 0; j < polys.length; j++) {
            coords = this._getLatLngs(polys[j], i);
            if (coords) Array.prototype.push.apply(o, coords);
          }
        } else {
          console.warn("Unsupported feature type: " + type);
        }
        return o.length ? o : false;
      },

      /**
       * (EXPERIMENTAL) Based on: https://github.com/mapbox/leaflet-pip
       *
       * TODO: add/check support for Points, Lines and "donuts" Polygons
       */
      pointInLayer: function(p, layer, first) {
        if (p instanceof L.LatLng) p = [p.lng, p.lat];
        var results = [];

        layer = layer || this.geojson;
        first = first || true;
        features = layer.features;

        for (var i = 0; i < features.length; i++) {
          if (first && results.length) break;
          var coords = this._getLatLngs(features[i]);
          if (coords) {
            var inside = this._pointInPolygon(p, coords); // NB. works only with polygons (see: https://observablehq.com/@tmcw/understanding-point-in-polygon).
            if (inside) results.push(features[i]);
          }
        }
        return results.length ? results : false;
      },

      /**
       * (EXPERIMENTAL) Based on: https://github.com/Raruto/leaflet-pointable
       */
      updateBalloon: function(e) {
        if (!this._map || !this.options.pointable || !this._map.isPointablePixel() || !this.isPointablePixel()) return;
        this._popup = this._popup || new L.Popup();
        var points = this.pointInLayer(e.latlng, this.geojson);
        if (points) {
          var feature = points[0];
          var name = feature.properties.name || "";
          if (name) {
            this._popup.setLatLng(e.latlng);
            this._popup.setContent('<b>' + name + '</b>');
            this._popup.openOn(this._map);
          }
        } else {
          this._map.closePopup(this._popup);
        }
      },

    });

    L.gridLayer.geoJson = function(geojson, options) {
      return new L.GridLayer.GeoJSON(geojson, options);
    };

    var GridLayer = {
      GeoJSON: L.GridLayer.GeoJSON,
    };

    var gridLayer = {
      geoJSON: L.gridLayer.geoJson,
    };

    exports.GridLayer = GridLayer;
    exports.KMZLoader = KMZLoader;
    exports.KMZParser = KMZParser;
    exports.gridLayer = gridLayer;

    Object.defineProperty(exports, '__esModule', { value: true });

  }));

  // var css = require('./app.css');

      (function() {


        window.JSZip = JSZip;
        window.toGeoJSON = toGeoJSON;
        window.geojsonvt = geojsonvt;

        if (!window.google)
          GoogleMapsLoader.load(function(google) {
            window.google = google;
            initMap();
          });
        else
          initMap();

        function initMap() {

          var map, hash;
          var layers = {};
          var controls = {};

          map = new L.Map('map', {
            center: [41.4583, 12.7059],
            zoom: 5,
            zoomControl: false,
            gestureHandling: true,
          });

          hash = new L.Hash(map);

          layers.osm = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          });

          layers.otm = new L.TileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
          });

          layers.google = {};

          layers.google.terrain = new L.GridLayer.GoogleMutant({
            type: 'terrain',
            maxZoom: 24,
          });

          layers.google.satellite = new L.GridLayer.GoogleMutant({
            type: 'satellite',
            maxZoom: 24,
          });

          var baseMaps = {
            "OSM": layers.osm,
            "Terrain": layers.google.terrain,
            "Satellite": layers.google.satellite,
            "Topo": layers.otm,
          };

          controls.baseLayers = new L.Control.Layers(baseMaps, null, {
            collapsed: false,
            position: 'topleft'
          });

          controls.layers = new L.Control.Layers(null, null, {
            collapsed: false,
            position: 'topright'
          });

          controls.zoom = new L.Control.Zoom({
            position: 'bottomright',
          });

          controls.pegman = new L.Control.Pegman({
            position: 'bottomright',
            theme: "leaflet-pegman-v3-small",
          });

          controls.locate = new L.Control.Locate({
            position: "bottomright"
          });

          controls.fullscreen = new L.Control.FullScreen({
            position: 'topright',
            title: 'Enter Fullscreen',
            titleCancel: 'Exit Fullscreen',
            forceSeparateButton: true,
          });

          controls.opacity = new L.Control.OpacitySlider(null, {
            sliderImageUrl: "https://unpkg.com/leaflet-transparency@0.0.3/images/opacity-slider2.png",
            backgroundColor: "rgba(229, 227, 223, 0.9)",
            position: 'topleft',
          });

          map.on('enterFullscreen', function() {
            map.gestureHandling.disable();
          });

          map.on('exitFullscreen', function() {
            map.gestureHandling.enable();
          });

          var leafletAttribution = map.attributionControl.options.prefix;
          map.on('baselayerchange', updateLeafletAttribution);
          map.on('baselayerchange', updateBaseLayers);

          for (var i in controls) {
            if (controls[i].addTo) {
              controls[i].addTo(map);
            }
          }

          layers.otm.addTo(map);

          // Instantiate KMZ parser (async)
          var kmzParser = new L.KMZParser({
            onKMZLoaded: function(layer, name) {
              controls.layers.addOverlay(layer, name);
              layer.addTo(map);
              layer.bringToFront();
              map.on('baselayerchange', function(e) {
                layer.bringToFront();
              });

              var layersOpacity = new L.Control.OpacitySlider(this.gridlayer, {
                sliderImageUrl: "https://unpkg.com/leaflet-transparency@0.0.3/images/opacity-slider2.png",
                backgroundColor: "rgba(229, 227, 223, 0.9)",
                position: 'topright',
              });
              layersOpacity.addFeatureLayer(this.layer);
              layersOpacity.addTo(map);
            },
            name: "ON / OFF"
          });
          kmzParser.load('regions.kmz');

          function updateBaseLayers(e) {
            L.DomUtil.addClass(controls.baseLayers._container, "inline-control-layers");

            var inputs = controls.baseLayers._layerControlInputs;
            for (var i = 0; i < inputs.length; i++) {
              var span = inputs[i].nextElementSibling;
              if (inputs[i].checked) {
                span.style.fontWeight = 700;
                span.style.color = "";
              } else {
                span.style.fontWeight = "";
                span.style.color = "#565656";
              }
            }
          }

          function updateLeafletAttribution(e) {
            map.attributionControl.setPrefix((e && e.layer && e.layer instanceof L.GridLayer.GoogleMutant) ? false : leafletAttribution);
          }

        }
      })();

}));
//# sourceMappingURL=bundle-src.js.map
