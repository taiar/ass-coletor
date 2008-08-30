document.write('<Script language=\"JavaScript\" type=\"text/javascript\"  src=\"http://motifcdn2.doubleclick.net/NAM/motif339/dartjavascript/modifyoverflow/modifyOverflow_v3.js\"><\/script>');document.write('\n\n');

//  (c) 2004. All Rights Reserved.  DoubleClick Inc.

if(typeof(dartMotifCreatives) == "undefined")
	var dartMotifCreatives = new Array();

if(typeof(dartCallbackObjects) == "undefined")
	var dartCallbackObjects = new Array();

if(typeof(dartGlobalTemplateObjects) == "undefined")
	var dartGlobalTemplateObjects = new Array();

function DARTGlobalTemplate_23_07(creativeIdentifier) {
	this.version = "23_07";
	this.creativeIdentifier = creativeIdentifier;
	this.dartPopupArray = new Array();
	this.dartPopupAssetMap = new Object();
	this.dartIsInPreviewMode = (("%PreviewMode" == "true") ? true : false);
	this.dartIsInDebugEventsMode = (("%DebugEventsMode" == "true") ? true : false);
	this.dartIsInMMPreviewMode = (("%MMPreviewMode" == "true") ? true : false);
	this.dartIsFsvEnabled = false;
	this.isTzCreative = false;
	this.tzAutoContract = true;
	this.tzOverlayToPlacement = false;
	this.mtfNoFlush = "".toLowerCase() == "true";
	this.debugEventBin = null;

	this._isValidStartTime = function(startTime) {
		return this._isValidNumber(startTime);
	}

	this._convertDuration = function(duration) {
		if(duration) {
			duration = duration.toString().toUpperCase();
			switch(duration) {
				case "AUTO": return "AUTO";
				case "NONE": return 0;
				default: return (this._isValidNumber(duration) ? eval(duration) : 0);
			}
		}
		return 0;
	}

	this._isValidNumber = function(num) {
		var floatNum = parseFloat(num);
		if(isNaN(floatNum) || floatNum < 0)
			return false;
		return ((floatNum == num) ? true : false);
	}

	this.isPartOfArrayPrototype = function(subject) {
		for(var prototypeItem in Array.prototype) {
			if(prototypeItem == subject) {
				return true;
			}
		}
		return false;
	}

	this.writeSurveyURL = function(surveyUrl) {
		if(!this.dartIsInPreviewMode && surveyUrl.length > 0) {
			document.write('<scr' + 'ipt src="' + surveyUrl + '" language="JavaScript"></scr' + 'ipt>');
		}
	}

	this.postPublisherData = function(isInterstitial, publisherURL) {
		if(!this.dartIsInPreviewMode && isInterstitial && publisherURL != "") {
			var postImg = new Image();
			postImg.src = publisherURL;
		}
	}

	this.convertUnit = function(pos) {
		if(pos != "") {
			pos = pos.toLowerCase().replace(new RegExp("pct", "g"), "%");
			if(pos.indexOf("%") < 0 && pos.indexOf("px") < 0 && pos.indexOf("pxc") < 0)
				pos += "px";
		}
		return pos;
	}

	this.isGlobalTemplateJSLoaded = function() {
		return (typeof(dartGlobalTemplateJSLoaded_23_07) != "undefined") ? true : false;
	}

	this.isGlobalTemplateJSLoading = function() {
		return (typeof(dartGlobalTemplateJSLoading_23_07) != "undefined") ? true : false;
	}

	this.addCreativeToDisplayQueue = function(creative, advertiser) {
		if(creative.isFSV) {
			this.writeFSVPlayerTag(this.creativeIdentifier);
		}

		if(this.isGlobalTemplateJSLoaded()) {
			if(this.isFirefox() && creative.type == "ExpandingFlash") {
				this.expandingCreative = creative;
				this.registerTimeoutHandler(200, "displayExpandingCreative()", this);
			}
			else {
				var scheduler = new MotifCreativeDisplayScheduler_23_07();
				scheduler.displayCreative(creative);
			}
		}
		else if(this.isGlobalTemplateJSLoading()) {
			dartMotifCreatives[dartMotifCreatives.length] = creative;
		}
		else {
			dartMotifCreatives[dartMotifCreatives.length] = creative;
			window.eval("var dartGlobalTemplateJSLoading_23_07 = true;");
			document.write('<scr' + 'ipt src="' + 'http://m1.2mdn.net/' + advertiser + '/globalTemplate_23_07.js' + '" language="JavaScript"></scr' + 'ipt>');
		}
	}

	this.displayExpandingCreative = function() {
		var variableName = "FLASH_" + this.expandingCreative.assets["ExpandingFlash"].variableName;
		var flashObj = this.toObject(variableName);
		if(flashObj == null) {
			this.registerTimeoutHandler(200, "displayExpandingCreative()", this);
			return;
		}
		var scheduler = new MotifCreativeDisplayScheduler_23_07();
		scheduler.displayCreative(this.expandingCreative);
	}

	this.createCreative = function(type, rid) {
		var creative = new Object();
		creative.gtVersion = this.version;
		creative.renderingId = rid;
		creative.type = type;
		creative.assets = new Array();
		creative.creativeIdentifier = this.creativeIdentifier;
		creative.previewMode = this.dartIsInPreviewMode;
		creative.debugEventsMode = this.dartIsInDebugEventsMode;
		creative.isFSV = this.isFSVCreative();
		creative.isTzCreative = this.isTzCreative;
		creative.tzAutoContract = this.tzAutoContract;
		creative.tzOverlayToPlacement = this.tzOverlayToPlacement;
		creative.mtfNoFlush = this.mtfNoFlush;
		return creative;
	}

	this.isBrowserComplient = function(plugin) {
		return (this.isInternetExplorer() || this.isFirefox() || this.isSafari()) && (this.isWindows() || this.isMac() ||this.dartIsInMMPreviewMode) && this.getPluginInfo() >= plugin;
	}

	this.shouldDisplayFloatingAsset = function(duration) {
		return !this.isInternetExplorer() || this._convertDuration(duration) || this.getIEVersion() >= 5.5 || (this.dartIsInMMPreviewMode && this.isMac());
	}

	this.isWindows = function() {
		return (navigator.appVersion.indexOf("Windows") != -1);
	}

	this.isFirefox = function() {
		var appUserAgent = navigator.userAgent.toUpperCase();
		if(appUserAgent.indexOf("GECKO") != -1) {
			if(appUserAgent.indexOf("FIREFOX") != -1) {
				var version = parseFloat(appUserAgent.substr(appUserAgent.lastIndexOf("/") + 1));
				return (version >= 1) ? true : false;
			}
			else if(appUserAgent.indexOf("NETSCAPE") != -1) {
				var version = parseFloat(appUserAgent.substr(appUserAgent.lastIndexOf("/") + 1));
				return (version >= 8) ? true : false;
			} else {
				return false;
			}
		}
		else
			return false;
	}

	this.isSafari = function() {
		var br = "Safari";
		var index = navigator.userAgent.indexOf(br);
		return (navigator.appVersion.indexOf(br) != -1) && parseFloat(navigator.userAgent.substring(index + br.length + 1)) >= 312.6;
	}

	this.isMac = function() {
		return (navigator.appVersion.indexOf("Mac") != -1);
	}

	this.isInternetExplorer = function() {
		return (navigator.appVersion.indexOf("MSIE") != -1 && navigator.userAgent.indexOf("Opera") < 0);
	}

	this.getIEVersion = function() {
		var version = 0;
		if(this.isInternetExplorer()) {
			var key = "MSIE ";
			var index = navigator.appVersion.indexOf(key) + key.length;
			var subString = navigator.appVersion.substr(index);
			version = parseFloat(subString.substring(0, subString.indexOf(";")));
		}
		return version;
	}

	this.getPluginInfo = function() {
		return (this.isInternetExplorer() && this.isWindows()) ? this._getIeWindowsFlashPluginVersion() : this._detectNonWindowsFlashPluginVersion();
	}

	this._detectNonWindowsFlashPluginVersion = function() {
		var flashVersion = 0;
		var key = "Shockwave Flash";
		if(navigator.plugins && (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins[key])) {
			var version2Offset = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins[key + version2Offset].description;
			var keyIndex = flashDescription.indexOf(key) + (key.length+1);
			var majorVersion = flashDescription.substring(keyIndex, keyIndex+1);
			var minorVersion = "0";
			var minorVersionKey = "r";
			var minorVersionKeyIndex = flashDescription.indexOf(minorVersionKey ) + (minorVersionKey.length);
			if(minorVersionKeyIndex > 1) {
				minorVersion = flashDescription.substring(minorVersionKeyIndex)
			}
			flashVersion = parseFloat(majorVersion + "." + minorVersion);
			if(flashVersion > 6.0 && flashVersion < 6.65) {
				flashVersion = 0 ;
			}
		}
		return flashVersion;
	}

	this._getIeWindowsFlashPluginVersion = function() {
		var versionStr = "";
		var flashVersion = 0;
		var versionArray = new Array();
		var tempArray = new Array();
		var lineFeed = "\r\n";
		var defSwfVersion = 0;
		var str = 'swfVersion = '+ defSwfVersion + lineFeed +
			'mtfIsOk = ' + false + lineFeed +
			'On Error Resume Next' + lineFeed +
			'set motifSwfObject = CreateObject(\"ShockwaveFlash.ShockwaveFlash\")' + lineFeed +
			'mtfIsOk = IsObject(motifSwfObject)' + lineFeed +
			'if mtfIsOk = true then' + lineFeed +
			'swfVersion = motifSwfObject.GetVariable(\"$version\")' + lineFeed +
			'end if' + lineFeed + '';

		window.execScript(str, "VBScript");
		if(mtfIsOk == true) {
			versionStr = swfVersion;
			tempArray = versionStr.split(" ");
			if(tempArray.length > 1) {
				versionArray = tempArray[1].split(",");
				var versionMajor = versionArray[0];
				var versionRevision = versionArray[2];
				flashVersion = parseFloat(versionMajor + "." + versionRevision);
			}
		}
		return flashVersion;
	}

	this.toObject = function(variableName) {
		try{
			if(document.layers) {
				return (document.layers[variableName]) ? eval(document.layers[variableName]) : null;
			}
			else if(document.all && !document.getElementById) {
				return (eval("window." + variableName)) ? eval("window." + variableName) : null;
			}
			else if(document.getElementById && document.body.style) {
				return (document.getElementById(variableName)) ? eval(document.getElementById(variableName)) : null;
			}
		}catch(e){}
		return null;
	}

	this.getObjectHtml = function() {
		var ret = this.getArgs(arguments);
		return this.generateObj(ret.objAttrs, ret.params, ret.embedAttrs);
	}

	this.getArgs = function(args) {
		var ret = new Object();
		ret.embedAttrs = new Object();
		ret.params = new Object();
		ret.objAttrs = new Object();
		var queryString="";
		var canGoFullScreen = false;
		for(var i=0; i < args.length; i=i+2) {
			var currArg = args[i].toLowerCase();
			switch(currArg) {
				case "codebase":
				case "pluginspage":
				case "type":
				case "classid":
				case "minversion":
					break;
				case "src":
				case "movie":
					ret.params["movie"] = ret.embedAttrs["src"] = args[i+1];
					break;
				case "querystring":
					queryString=args[i+1] = args[i+1] + '&br=' + escape(this.getBrowser()) + '&os=' + escape(this.getOS());
					break;
				case "width":
				case "height":
				case "align":
				case "vspace":
				case "hspace":
				case "class":
				case "title":
				case "accesskey":
				case "name":
				case "id":
				case "tabindex":
				case "alt":
					ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
					break;
				case "swliveconnect":
					ret.embedAttrs[args[i]] = args[i+1];
					break;
				case "play":
					if(!this.isTzCreative) {
						ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
					}
					break;
				case "wmode":
					canGoFullScreen = this.isFlashFullScreenSupported(args[i+1]);
					ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
					break;
				default:
					ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
			}
		}
		queryString += "&isFlashFullScreenEnabled=" + canGoFullScreen;
		if(this.getPluginInfo()>=6){
			ret.params["FlashVars"] = ret.embedAttrs["FlashVars"] = queryString;
		}
		else{
			var url=ret.params["movie"];
			ret.params["movie"] = ret.embedAttrs["src"] =url+"?"+queryString;
		}
		ret.objAttrs["classid"] = "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000";
		ret.embedAttrs["type"] = "application/x-shockwave-flash";
		ret.params["allowScriptAccess"] = "always";
		ret.embedAttrs["allowScriptAccess"] = "always";
		if(canGoFullScreen) {
			ret.params["allowFullScreen"] = "true";
			ret.embedAttrs["allowFullScreen"] = "true";
		}
		return ret;
	}

	this.generateObj = function(objAttrs, params, embedAttrs) {
		var str = "";
		if(this.isInternetExplorer()) {
			str += '<object ';
			for (var i in objAttrs) {
				if(!this.isPartOfArrayPrototype(i)) {
					str += i + '="' + objAttrs[i] + '" ';
				}
			}
			str += '>';
			for (var i in params) {
				if(!this.isPartOfArrayPrototype(i)) {
					str += '<param name="' + i + '" value="' + params[i] + '" /> ';
				}
			}
		}

		str += '<embed ';
		for (var i in embedAttrs) {
			if(!this.isPartOfArrayPrototype(i)) {
				str += i + '="' + embedAttrs[i] + '" ';
			}
		}
		str += ' ></embed>';

		if(this.isInternetExplorer()) {
			str += '</object>';
		}
		return str;
	}

	this.writeHtml = function(html) {
		if((("j") == "i" || this.dartIsInPreviewMode) && typeof(motifWriteHtml) != "undefined") {
			motifWriteHtml(html);
		}
		else {
			document.write(html);
		}
	}

	this.getCallbackObjectIndex = function(obj) {
		for(var i = 0; i < dartCallbackObjects.length; i++) {
			if(dartCallbackObjects[i] == obj)
				return i;
		}
		dartCallbackObjects[dartCallbackObjects.length] = obj;
		return dartCallbackObjects.length - 1;
	}

	this.registerPageLoadHandler = function(handler, obj) {
		var callback = this.generateGlobalCallback(handler, obj);
		if(this.isInternetExplorer()) {
			if(self.document.readyState == "complete")
				callback();
			else
				self.attachEvent("onload", callback);
		}
		else if(this.isFirefox()) {
			if(this.isPageLoaded) {
				callback();
			}
			else {
				self.addEventListener("load", callback, true);
			}
		}
		else if(this.isSafari()) {
			if(self.document.readyState == "complete")
				callback();
			else
				self.addEventListener("load", callback, true);
		}
	}

	this.isPageLoaded = false;

	this.pageLoaded = function() {
		this.isPageLoaded = true;
	}

	this.registerPageUnLoadHandler = function(handler, obj) {
		var callback = this.generateGlobalCallback(handler, obj);
		if(this.isInternetExplorer() && this.isWindows()) {
			self.attachEvent("onunload", callback);
		}
		else if(this.isFirefox() || this.isSafari()) {
			self.addEventListener("unload", callback, true);
		}
	}

	this.registerTimeoutHandler = function(timeout, handler, obj) {
		window.setTimeout(this.generateGlobalCallback(handler, obj), timeout);
	}

	this.createFunction = function(name, ownerObject, args) {
		var fun = "dartCallbackObjects[" + this.getCallbackObjectIndex(ownerObject) + "]." + name + "(";
		for(var i = 0; i < args.length; i++) {
			fun += "dartCallbackObjects[" + this.getCallbackObjectIndex(args[i]) + "]";
			if(i != (args.length - 1))
				fun += ","
		}
		fun += ")";
		return new Function(fun);
	}

	this.generateGlobalCallback = function(handler, obj) {
		if(obj) {
			var index = this.getCallbackObjectIndex(obj);
			handler = "if(dartCallbackObjects["+ index +"] != null) dartCallbackObjects["+ index +"]." + handler;
		}
		return new Function(handler);
	}

	this.registerEventHandler = function(event, element, handler, obj) {
		var callback = this.generateGlobalCallback(handler, obj);
		if(this.isInternetExplorer() && this.isWindows()) {
			self.attachEvent("on" + event, callback)
		}
		else if(this.isFirefox() || this.isSafari()) {
			element.addEventListener(event, callback, false);
		}
	}

	this.isFSVCreative = function() {
		return (this.dartIsFsvEnabled && this.isFullScreenVideoSupported());
	}

	this.isFullScreenVideoSupported = function() {
		var version = 0;
		try {
			if(this.isWindows() && this.isInternetExplorer()) {
				var player = new ActiveXObject("WMPlayer.OCX");
				version = parseFloat(player.versionInfo);
			}
		}
		catch(e) {
			version = 0;
		}
		return (version >= 9);
	}

	this.getWMPObjectHTML = function(fsvCreativeIdentifier) {
		var wmpObjectName = "OBJECT_" + fsvCreativeIdentifier;
		var obj = '<object id="' + wmpObjectName + '" CLASSID="CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6"';
		obj += 'TYPE="application/x-oleobject" width="0" height="0">';
		obj += '<param name="AutoStart" value="false">';
		obj += '<param name="uiMode" value="none">';
		obj += '<param name="fullScreen" value="false">';
		obj += '</object>';
		return obj;
	}

	this.writeFSVPlayerTag = function(creativeIdentifier) {
		var fsvCreativeIdentifier = "FSV_" + creativeIdentifier;
		var divVideoName = "DIV_" + fsvCreativeIdentifier;
		var fsvDiv = '<DIV id="' + divVideoName + '" style="visibility:hidden" align=left>';
		fsvDiv += this.getWMPObjectHTML(fsvCreativeIdentifier);
		fsvDiv += "</div>";

		this.writeHtml(fsvDiv);
	}

	this.getBrowser = function() {
		if(this.isInternetExplorer())
			return "ie";
		else if(this.isFirefox())
			return "ff";
		else if(this.isSafari())
			return "sf";
		else
			return "NOT_SUPPORTED";
	}

	this.getOS = function() {
		if(this.isWindows())
			return "win"
		if(this.isMac())
			return "mac";
		else
			return "NOT_SUPPORTED";
	}

	this.trackBackupImageEvent = function(adserverUrl) {
		var activityString = "eid1=9;ecn1=1;etm1=0;";
		var timeStamp = new Date();
		var postImage = document.createElement("IMG");
		var postUrl = adserverUrl + "&timestamp=" + timeStamp.getTime() + ";" + activityString;
		postImage.src = postUrl;
	}

	this.trackUrl = function(url, createElement) {
		if (createElement && url != "") {
			var postImage = document.createElement("IMG");
			postImage.src = url;
		}
		else if(!this.dartIsInPreviewMode && url != "") {
			document.write('<IMG SRC="'+ url + '" style="visibility:hidden" width="0px" height="0px" alt="">');
		}
	}

	this.logThirdPartyImpression = function(url) {
		this.trackUrl(url, false);
	}

	this.logThirdPartyBackupImageImpression = function(url, createElement) {
		this.trackUrl(url, createElement);
	}

	this.logThirdPartyFlashDisplayImpression = function(url, createElement) {
		this.trackUrl(url, createElement);
	}

	this.openPopupAsset = function(assetID) {
		if (this.dartPopupAssetMap[assetID]) {
			var cback = this.generateGlobalCallback("dartPopupAssetMap['" + assetID + "']._openPopup()", this);
			setTimeout(cback, 100);
		}
	}

	this.closePopupAsset = function(assetID) {
		if (this.dartPopupAssetMap[assetID]) {
			this.dartPopupAssetMap[assetID]._closePopup();
		}
	}

	this.removeArrayElement = function(array, obj) {
		for(var i = 0; i < array.length; i++) {
			if(array[i] == obj)
				array[i] = null;
		}
	}

	this.getSalign = function(expandedWidth, expandedHeight, offsetTop,offsetLeft,offsetRight,offsetBottom) {
		var salign = "";
		if (offsetTop == 0 && offsetBottom != expandedHeight) {
			salign += "T";
		} else if (offsetTop != 0 && offsetBottom == expandedHeight) {
			salign += "B";
		}
		if (offsetLeft == 0 && offsetRight != expandedWidth) {
			salign += "L";
		} else if (offsetLeft != 0 && offsetRight == expandedWidth) {
			salign += "R";
		}
		if ((salign == "T" || salign == "B") && (offsetLeft != 0 || offsetRight != expandedWidth)) {
			return "";
		}
		if ((salign == "L" || salign == "R") && (offsetTop != 0 || offsetBottom != expandedHeight)) {
			return "";
		}
		return salign;
	}

	this.usesSalignForExpanding = function(salign, wmode) {
		return ((this.isMac() && (this.isSafari() || this.isFirefox())) || (this.isWindows() && this.isFirefox() && wmode == "window")) && salign.length > 0;
	}

	this.getFlashVisibility = function() {
		return (this.isTzCreative) ? "visible" : "hidden";
	}

	this.getExpandingDivStyleSheet = function(cssKeyValues) {
		if(cssKeyValues == "") {
			return "";
		}
		var cssKeyValueArray = cssKeyValues.split(";");
		var expandingDivCSS = "";

		for (var i = 0; i < cssKeyValueArray.length; i++ ) {
			var cssKeyVal = cssKeyValueArray[i].split(":");
			if(cssKeyVal[0] != "display") {
				if(expandingDivCSS != "")
					expandingDivCSS += ";";
				expandingDivCSS += cssKeyVal[0] + ":" + cssKeyVal[1];
			}
		}
		return expandingDivCSS;
	}

	this.onAdMouseOver = function(assetName) {
		try{
			var flashObject = this.toObject("FLASH_" + assetName);
			flashObject.SetVariable("_root.isMouseOver", "1");
		}
		catch(e) {}
	}

	this.onAdMouseOut = function(assetName) {
		try{
			var flashObject = this.toObject("FLASH_" + assetName);
			flashObject.SetVariable("_root.isMouseOver", "0");
		}
		catch(e) {}
	}

	if(this.dartIsInDebugEventsMode)
		this.debugEventBin = new DARTDebugEventBin_23_07(this.creativeIdentifier, this);

	this.isFlashFullScreenSupported = function(wmode) {
        var playerVersion = this.getPluginInfo();
		var swfPublishedVersion = 8;

		if(playerVersion != 0) {
		    var versionArray = playerVersion.toString().split(".");
		    var majorVersion = parseInt(versionArray[0]);
		    var minorVersion = parseInt(versionArray[1]);

		    if(swfPublishedVersion > 5 && majorVersion >= 9 && minorVersion >= 28 && this.dartIsFsvEnabled) {
			if(wmode == "window" || minorVersion >= 115) {
			    return true;
			}
		    }
		}
	        return false;
	}

}   // end of DARTGlobalTemplate_XX

function DARTMotifUtil_23_07() {

	this.isInFriendlyIFrame = function() {
		return this.isInMsnFriendlyIFrame() || this.isInAolFriendlyIFrame();
	}

	this.isInMsnFriendlyIFrame = function() {
		return (typeof(inDapIF) != "undefined" && inDapIF);
	}

	this.isInAolFriendlyIFrame = function() {
		return (typeof(inFIF) != "undefined" && inFIF);
	}

	this.isInMsnAjaxEnvironment = function() {
		return (typeof(inDapMgrIf) != "undefined" && inDapMgrIf);
	}
}


document.write('\n\n\n\n');


function DARTIFrameUtil_23_07(globalTemplate) {
	this.globalTemplate = globalTemplate;

	this.getSiteHost = function(pageUrl) {
		var siteHost = "";
		if((pageUrl.length >= 7) && (pageUrl.substr(0, 7) == "http://"))
			siteHost = pageUrl.substr(7);
		else if((pageUrl.length >= 8) && (pageUrl.substr(0, 8) == "https://"))
			siteHost = pageUrl.substr(8);
		else
			siteHost = pageUrl;

		var index = siteHost.indexOf("/");
		if(index > 0)
			siteHost = siteHost.substr(0, index);
		return siteHost;
	}

	this.getSiteProtocol = function(pageUrl) {
		var siteProtocol = "";
		if((pageUrl.length >= 5) && (pageUrl.substr(0, 5) == "http:"))
			siteProtocol = "http:";
		else if((pageUrl.length >= 6) && (pageUrl.substr(0, 6) == "https:"))
			siteProtocol = "https:";
		else
			siteProtocol = "http:";
		return siteProtocol;
	}

	this.writeIFrame = function(adParameters, gtVersion, mediaServer, advertiserID, creativeType, isInPreviewMode, creativeIdentifier, isFSV, isFlashFullScreenEnabled) {
		if(this.isInFriendlyIFrame())
			this.processFriendlyIFrameBreakout(adParameters, gtVersion, mediaServer, advertiserID, creativeType, isInPreviewMode, creativeIdentifier, isFSV, isFlashFullScreenEnabled);
		else
			this.processBreakoutUsingPublisherFile(adParameters, gtVersion, mediaServer, advertiserID, creativeType, isInPreviewMode, creativeIdentifier, isFSV, isFlashFullScreenEnabled);
	}

	this.processFriendlyIFrameBreakout = function(adParameters, gtVersion, mediaServer, advertiserID, creativeType, isInPreviewMode, creativeIdentifier, isFSV, isFlashFullScreenEnabled) {
		var targetWindow = self.parent;
		this.targetWindow = targetWindow;
		var iframe = this.getThisIFrame();
		if(typeof(iframe.MotifIFrameIDArray) == "undefined") {
			iframe.MotifIFrameIDArray = new Array();
		}
		iframe.MotifIFrameIDArray[iframe.MotifIFrameIDArray.length] = creativeIdentifier;
		iframe.dartGlobalTemplateVersion = gtVersion;

		if(this.globalTemplate.isFirefox()) { //ReadyState workaround for Firefox.
			targetWindow.g_motifPageLoadedFlag = false;
			targetWindow.pageLoadCallback = new Function("self.parent.g_motifPageLoadedFlag = true;");
			targetWindow.addEventListener("load", targetWindow.pageLoadCallback, true);
		}
		if(creativeType == "FLOATING" || creativeType == "FLOATINGWITHREMINDER") {
			if(this.isInterstitialPlaying(targetWindow))
				return;
			this.setInterstitialPlaying(targetWindow);
		}
		this.setPreviewMode(targetWindow, isInPreviewMode);
		if(this.isGlobalTemplateScriptLoaded(gtVersion)) {
			var iframeObj = this.getDARTIFrameObject(gtVersion);
			var creativeObj = this.getCreativeObject(adParameters, gtVersion, mediaServer, creativeType, creativeIdentifier, isFSV, isFlashFullScreenEnabled);
			iframeObj.doIFrameBreakout(creativeObj, creativeIdentifier);
		}
		else {
		this.setCreativeData(targetWindow, adParameters, gtVersion, mediaServer, creativeType, creativeIdentifier, isFSV, isFlashFullScreenEnabled);
		this.loadGlobalTemplateScript(targetWindow, iframe, gtVersion, mediaServer, advertiserID);
	}
		var unloadCallback = "removeCreative('" + gtVersion + "','" + creativeIdentifier + "','" + creativeType + "', true)";
		this.globalTemplate.registerPageUnLoadHandler(unloadCallback, this);
	}

	this.removeCreative = function(gtVersion, creativeIdentifier, creativeType, deleteOnlyJSObjects) {
		if(this.isGlobalTemplateScriptLoaded(gtVersion)) {
			var iframeObj = this.getDARTIFrameObject(gtVersion);
			iframeObj.removeCreative(creativeIdentifier, creativeType, deleteOnlyJSObjects);
		}
	}

	this.getDARTIFrameObject = function(gtVersion) {
		var script = "(new this.targetWindow.DARTIFrame_" + gtVersion + "())";
		return eval(script);
	}

	this.getCreativeObject = function(adParameters, gtVersion, mediaServer, creativeType, creativeIdentifier, isFSV, isFlashFullScreenEnabled) {
		var obj = new Object();
		obj.creativeInfo = adParameters;
		obj.creativeType = creativeType;
		obj.mediaServer = mediaServer;
		obj.fullScreenVideoEnabled = isFSV;
		var util = new DARTMotifUtil_23_07();
		obj.MsnDapIF = (util.isInMsnFriendlyIFrame()) ? true : false;
		obj.isTzCreative = this.globalTemplate.isTzCreative;
		obj.tzAutoContract = this.globalTemplate.tzAutoContract;
		obj.tzOverlayToPlacement = this.globalTemplate.tzOverlayToPlacement;
		obj.mtfNoFlush = this.globalTemplate.mtfNoFlush;
		obj.flashFullScreenEnabled = isFlashFullScreenEnabled;
		return obj;
	}

	this.setCreativeData = function(targetWindow, adParameters, gtVersion, mediaServer, creativeType, creativeIdentifier, isFSV, isFlashFullScreenEnabled) {
		var creativeVariable = "dartIFrameCreative_" + creativeIdentifier + "_" + gtVersion;
		var obj = this.getCreativeObject(adParameters, gtVersion, mediaServer, creativeType, creativeIdentifier, isFSV, isFlashFullScreenEnabled);
		this.createJSVariable(targetWindow, creativeVariable, obj);
	}

	this.loadGlobalTemplateScript = function(targetWindow, iframe, gtVersion, mediaServer, advertiserID) {
		if(this.isLoadingGlobalTemplateScript(targetWindow, gtVersion))
			return;
		this.createJSVariable(targetWindow, "loadingDartGlobalTemplate_" + gtVersion, true);
		var script = targetWindow.document.createElement("SCRIPT");
		script.src = mediaServer + "/" + advertiserID + "/globalTemplateIframe_" +  gtVersion + ".js";

		if(iframe.parentNode.parentNode) {
			iframe.parentNode.parentNode.appendChild(script);
		}
		else {
			iframe.parentNode.insertBefore(script, iframe);
		}
	}

	this.isLoadingGlobalTemplateScript = function(targetWindow, gtVersion) {
		var varName = "loadingDartGlobalTemplate_" + gtVersion;
		return (typeof(targetWindow[varName]) != "undefined" && targetWindow[varName]);
	}

	this.isGlobalTemplateScriptLoaded = function(gtVersion) {
		var varName = "this.targetWindow.dartGlobalTemplateLoaded_" + gtVersion;
		if(eval("typeof(" + varName + ")") != "undefined" && eval(varName) == true)
			return true;
		return false;
	}

	this.processBreakoutUsingPublisherFile = function(adParameters, gtVersion, mediaServer, advertiserID, creativeType, isInPreviewMode, creativeIdentifier, isFSV, isFlashFullScreenEnabled) {
		var docReferrer = self.document.referrer;
		if(docReferrer == "") {
			try {
				docReferrer = self.parent.location.href;
				if(docReferrer == "")
					return;
			}
			catch(e) {
				return;
			}
		}
		if(isInPreviewMode)
			docReferrer = self.location.href;

		var filePath = "";
		if(filePath == "")
			filePath = "/doubleclick/DARTIframe.html";
		else
			filePath += "DARTIframe.html";

		mediaServer += "/" + advertiserID;
		var siteProtocol = this.getSiteProtocol(docReferrer);
		var siteHost = this.getSiteHost(docReferrer);
		siteHost = siteProtocol + "//" + siteHost + filePath;
		adParameters = escape(adParameters);

		var getSizeLimit = 1600;
		var staticParams = "&gtVersion=" + escape(gtVersion) + "&mediaserver=" + escape(mediaServer) +
							"&previewMode=" + escape(isInPreviewMode) + "&creativeType=" + escape(creativeType) + "&cid=" + escape(creativeIdentifier) +
							"&isFSV=" + isFSV + "&isTz=" + this.globalTemplate.isTzCreative + "&tzAutoContract=" + this.globalTemplate.tzAutoContract + "&tzOverlayToPlacement=" + this.globalTemplate.tzOverlayToPlacement +
							"&mtfNoFlush=" + this.globalTemplate.mtfNoFlush + "&isFlashFullScreenEnabled=" + isFlashFullScreenEnabled;

		var masterParamLength = getSizeLimit - staticParams.length - siteHost.length - "?adParams=".length;
		var needSlaves = false;
		if(masterParamLength >= adParameters.length)
			masterParamLength = adParameters.length;
		else
			needSlaves = true;

		var slaveParams = "";
		var slaveParamLength = 0;
		var numberOfSlaves = 0;
		if(needSlaves) {
			slaveParams = "&gtVersion=" + escape(gtVersion) + "&mediaserver=" + escape(mediaServer) + "&cid=" + escape(creativeIdentifier);
			slaveParamLength = getSizeLimit - siteHost.length - "?adParams=".length - slaveParams.length - "&index=".length;
			numberOfSlaves = Math.ceil((adParameters.length - masterParamLength)/slaveParamLength);
		}
		var masterParams = adParameters.substring(0, masterParamLength);
		document.write("<iframe src='" + siteHost + "?adParams=" + masterParams + staticParams + "&needSlaves=" + needSlaves + "&numberOfSlaves=" + numberOfSlaves + "' width='0px' height='0px' frameborder='0' scrolling='no'></iframe>");
		if(needSlaves) {
			adParameters = adParameters.substring(masterParamLength);
			var paramLength = 0;
			var slaveIndex = 0;
			while(adParameters.length > 0) {
				paramLength = slaveParamLength;
				if(slaveParamLength >= adParameters.length)
					paramLength = adParameters.length;

				this.writeSlaveIFrame(siteHost, adParameters.substring(0, paramLength), slaveParams, slaveIndex++, creativeIdentifier);
				adParameters = adParameters.substring(paramLength);
			}
		}
	}

	this.writeSlaveIFrame = function(siteHost, adParams, slaveParams, index, cid) {
		var iframeLocation = siteHost + "?adParams=" + adParams + slaveParams + "&index=" + index;
		document.write("<iframe src='" + iframeLocation + "' name='" + cid + "_" + index + "' width='0px' height='0px' frameborder='0' scrolling='no'></iframe>");
	}

	this.isInIFrame = function() {
		var iframeReq = "";
		if(typeof(iframeRequest) == "undefined")
			iframeRequest = "";
		if(iframeReq != "")
			iframeRequest = iframeReq;

		if(self == top)
			return false;
		else if(String(iframeRequest).toLowerCase() == "false")
			return false;
		else if(self.location.href.toLowerCase().indexOf("doubleclick.net/adi") > -1)
			return true;
		else if(("j") == "i")
			return true;
		else if(this.checkWithTryCatch())
			return true;
		else
			return false;
	}

	this.checkWithTryCatch = function() {
		try {
			if(self.parent.document) {
				if(self.parent.document.getElementsByTagName("frame").length == 0) {
					var frames = self.parent.frames;
					for(var i = 0; i < frames.length; i++) {
						if(frames[i] == self)
							return true;
					}
				}
			}
			else if (this.globalTemplate.isSafari() && self.parent.document == undefined) {
				return true;
			}
			return false;
		}
		catch(e) {
			return true;
		}
	}

	this.isBreakoutSuccessful = function() {
		try {
			return (self.frames[0].frames.length > 0 && typeof(self.frames[0].frames['DARTMotifIFrame']) != "undefined");
		}
		catch(e) {
			return true;
		}
	}

	this.isInFriendlyIFrame = function() {
		var motifUtil = new DARTMotifUtil_23_07();
		return motifUtil.isInFriendlyIFrame();
	}

	this.getThisIFrame = function() {
		if(this.globalTemplate.isFirefox()) {
			var iframeElements = self.parent.document.getElementsByTagName("iframe");
			for(var k = 0; k < iframeElements.length; k++) {
				var iframeEle = iframeElements[k];
				if(iframeEle.contentWindow == self) {
					return iframeEle;
				}
			}
			return null;
		}

		var targetWindow = self.parent;
		var frames = targetWindow.frames;
		for(var i = 0; i < frames.length; i++) {
			if(frames[i] == self)
				return targetWindow.document.getElementsByTagName("iframe")[i];
		}
		return null;
	}

	this.isInterstitialPlaying = function(targetWindow) {
		return (typeof(targetWindow.DoNotDisplayIA) == "number");
	}

	this.setInterstitialPlaying = function(targetWindow) {
		this.createJSVariable(targetWindow, "DoNotDisplayIA", 1);
	}

	this.setPreviewMode = function(targetWindow, previewMode) {
		this.createJSVariable(targetWindow, "doubleClick_dartIsInPrevMode", previewMode);
	}

	this.createJSVariable = function(targetWindow, variableName, variableValue) {
		targetWindow[variableName] = variableValue;
	}
}


document.write('\n\n\n			\n			<script src=\"http://m1.2mdn.net/879366/MotifExternalScript_01_01.js\" language=\"JavaScript\"><\/script>');document.write('\n\n			');

			function DARTExpandingUtil_23_07(globalTemplate) {
				this.globalTemplate = globalTemplate;
				function writeExpandingFlashcode(variableName, wmode, zIndex, width, height, expandedWidth, expandedHeight, offsetTop, offsetLeft, offsetRight, offsetBottom, salign, url,queryString, exp) {
					var position = this.getPosition(offsetTop, offsetLeft);
					var mouseOutMethod = "dartCreativeDisplayManagers['" + this.globalTemplate.creativeIdentifier + "'].onMouseOut('" + variableName + "');";
					var mouseOverMethod = "dartCreativeDisplayManagers['" + this.globalTemplate.creativeIdentifier + "'].onMouseOver('" + variableName + "');";
					var styleSheet = "";
					if(exp.expandingDivStyleSheet != "")
						styleSheet = exp.expandingDivStyleSheet + ";";
					document.write('<div id="DIV_'+variableName+'" onmouseover="' + mouseOverMethod + '" onmouseout="' + mouseOutMethod + '" style="'+position+
								   'visibility:'+this.globalTemplate.getFlashVisibility()+';z-index:' + zIndex + ';text-align:left;'+ styleSheet +'">');

					var movie = url;
					queryString+='&td=' + escape(self.location.hostname) + "&wmode=" + wmode;
					queryString+= (this.globalTemplate.usesSalignForExpanding(salign, wmode)) ? '&scaleMode=noScale' : '';
					var html = this.globalTemplate.getObjectHtml("id", "FLASH_" + variableName, "name", "FLASH_" + variableName,
												 "WIDTH", expandedWidth, "HEIGHT", expandedHeight,
												 "movie", movie, "quality", "high", "wmode", wmode, "salign", salign,
												 "queryString",queryString, "play", "false"
												 );
					globalTemplate.writeHtml(html);
					exp.flashHtml = html;
					document.write('</div>');
				}
				this.writeExpandingFlashcode = writeExpandingFlashcode;

				function getPosition(OffsetTop, OffsetLeft) {
					var position = "position:absolute;";
					position += "top:" + (0 - OffsetTop) + "px;";
					position += "left:" + (0 - OffsetLeft) + "px;";
					return position;
				}
				this.getPosition = getPosition;

				function displayImageOnBreakoutFailure(variableName, target, hRef, imgSrc, width, height, altText, exp) {
					var callback = "displayImage(\""+variableName+"\",\""+target+"\",\""+hRef+"\",\""+imgSrc+"\",\""+width+"\",\""+height+"\",\""+altText+"\",\""+exp.adserverUrl+"\")";
					this.globalTemplate.registerPageLoadHandler(callback, this);
				}
				this.displayImageOnBreakoutFailure = displayImageOnBreakoutFailure;

				function displayImage(variableName, target, hRef, imgSrc, width, height, altText, adserverUrl) {
					var iframeUtil = new DARTIFrameUtil_23_07(this.globalTemplate);
					if(!iframeUtil.isBreakoutSuccessful()) {
						var outerDiv = globalTemplate.toObject("OUTER_DIV_" + variableName);
						outerDiv.innerHTML = '<A TARGET="'+target+'" HREF="'+hRef+'"><IMG id="IMG_'+variableName+'" SRC="'+imgSrc+'" width="'+width+'" height="'+height+'" BORDER=0 alt="'+altText+'"/></A>';
						this.globalTemplate.trackBackupImageEvent(adserverUrl);
						globalTemplate.logThirdPartyBackupImageImpression("", true);
					} else {
						globalTemplate.logThirdPartyFlashDisplayImpression("", true);
					}
				}
				this.displayImage = displayImage;
			}

			function Expanding_27931930_1(variableName, globalTemplate) {
				var pubHideObjects = "";
				var pubHideApplets = "";
				var pubDisplayInline = "";

				this.isFSV = globalTemplate.isFSVCreative();
				this.variableName = variableName;
				this.wmode = "transparent";
				if(globalTemplate.isMac() && globalTemplate.isFirefox()) {
					this.wmode = "transparent" ;
				}
				this.zIndex = "999999";
				this.width = "300";
				this.height = "250";
				this.expandedWidth = "560";
				this.expandedHeight = "300";
				this.offsetTop = "0";
				this.offsetLeft = "260";
				this.offsetRight = "560";
				this.offsetBottom = "250";
				this.salign = globalTemplate.getSalign(this.expandedWidth, this.expandedHeight, this.offsetTop,this.offsetLeft,this.offsetRight,this.offsetBottom);
				this.url = 'http://m1.2mdn.net/1659546/PID_711079_WhyChose_v2_02_parent.swf';
				this.queryString='click='+ escape("http://us.ard.yahoo.com/SIG=14tcadmv6/M=626899.12948803.13175272.1679323/D=fin/S=95993639:LREC/Y=YAHOO/EXP=1220134598/L=xb63N0SOxFe4Rtn8SLXcfwEHyTr6Q0i5qqYAAf3v/B=rtaNAdG_Rus-/J=1220127398146961/A=5461326/R=0/*http://ad.doubleclick.net/click%3Bh=v8/372c/7/d2/%2a/b%3B206880786%3B2-0%3B0%3B23040997%3B4307-300/250%3B27914051/27931930/1%3B%3B%7Esscs%3D%3f") + '&rid=27931930&JS=0&clickN=&FSV=' + this.isFSV + '&varName=' + variableName + '&progressiveBaseURL=' + escape('http://rmcdn.2mdn.net/MotifFiles/html/1659546') + '&streamingHostDomain=' + escape('rtmp://rmcdn.f.2mdn.net/ondemand') + '&streamingBasePath=' + escape('/MotifFiles/html/1659546') + '&CDNFiles=' + escape('') + '';
				this.duration = "none";
				this.startTime = "0";
				this.hideDropdowns = false;
				this.hideIframes = false;
				this.hideScrollbars = false;
				this.hideObjects = (pubHideObjects != "") ? (pubHideObjects.toLowerCase() == "true") : false;
				this.hideApplets = (pubHideApplets != "") ? (pubHideApplets.toLowerCase() == "true") : false;
				this.adserverUrl = "http://ad.doubleclick.net/activity;src=1659546;met=1;v=1;pid=23040997;aid=206880786;ko=0;cid=27914051;rid=27931930;rv=1;";
				this.assetType = "expando";
				this.isMainAsset = true;
				this.pushContents = false;
				this.animationTime = isNaN("1.0") ? 0 : parseFloat("1.0");
				this.displayInline = (pubDisplayInline.toLowerCase() == "true") ? true : false;
				this.cssProperty = "";
				this.expandingDivStyleSheet= globalTemplate.getExpandingDivStyleSheet(this.cssProperty);
			}

			function _generateExpandingFlashCode(variableName) {
				var creativeIdentifier = "GlobalTemplate_" + "27931930_" + (new Date()).getTime();
				var globalTemplate = new DARTGlobalTemplate_23_07(creativeIdentifier);
				dartGlobalTemplateObjects[creativeIdentifier] = globalTemplate;
				globalTemplate.logThirdPartyImpression("");
				var exp = new Expanding_27931930_1(variableName, globalTemplate);
				var styleSheet = "";
				if(exp.expandingDivStyleSheet != "")
					styleSheet = ";" + exp.expandingDivStyleSheet;

				if(exp.displayInline)
					document.write('<table style="display:inline;width:300px;height:250px'+styleSheet+'" border="0" cellpadding="0" cellspacing="0"> ');
				else
					document.write('<table style="width:300px;height:250px;" border="0" cellpadding="0" cellspacing="0"> ');
				document.write('<tr style="padding:0px;margin:0px;border-style:none;border-width:0px">');
				document.write('<td style="padding:0px;margin:0px;border-style:none;border-width:0px">');

				document.write('<div id="OUTER_DIV_' + variableName + '" style="position:relative;z-index:999999'+styleSheet+'">');

				if(globalTemplate.isBrowserComplient(8)) {
					var globalTemplateVersion = "23_07";
					var advertiserID = "879366";
					var mediaServer = "http://m1.2mdn.net";
					var renderingId = "27931930";
					var altImgTarget = "_blank";
					var altImgHRef = "http://us.ard.yahoo.com/SIG=14tcadmv6/M=626899.12948803.13175272.1679323/D=fin/S=95993639:LREC/Y=YAHOO/EXP=1220134598/L=xb63N0SOxFe4Rtn8SLXcfwEHyTr6Q0i5qqYAAf3v/B=rtaNAdG_Rus-/J=1220127398146961/A=5461326/R=0/*http://ad.doubleclick.net/activity;src%3D1659546%3Bmet%3D1%3Bv%3D1%3Bpid%3D23040997%3Baid%3D206880786%3Bko%3D0%3Bcid%3D27914051%3Brid%3D27931930%3Brv%3D1%3Bcs%3De%3Beid1%3D1043%3Becn1%3D1%3Betm1%3D0%3B_dc_redir%3Durl%3fhttp://ad.doubleclick.net/click%3Bh=v8/372c/7/d2/%2a/b%3B206880786%3B2-0%3B0%3B23040997%3B4307-300/250%3B27914051/27931930/1%3B%3B%7Esscs%3D%3fhttp://www.scottrade.com/lp/whychoose/1c.asp?id=1";
					var altImgSrc = "http://m1.2mdn.net/1659546/PID_711079_Reasons-AltImage01.gif";
					var altImgWidth = "300";
					var altImgHeight = "250";
					var altImgAltText = "Click Here!";
					var expandingUtil = new DARTExpandingUtil_23_07(globalTemplate);
					var iframeUtil = new DARTIFrameUtil_23_07(globalTemplate);
					if(iframeUtil.isInIFrame()) {
						var paramStr = '\''+variableName+'\',\''+exp.wmode+'\',\''+exp.zIndex+'\',\''+exp.width+'\',\''+exp.height+'\',\''+exp.expandedWidth+'\',\''+exp.expandedHeight+'\',\''+exp.offsetTop+'\',\''+exp.offsetLeft+'\',\''+exp.offsetRight+'\',\''+exp.offsetBottom+'\',\''+exp.salign+'\',\''+exp.url+'\',\''+exp.queryString+'\',\''+exp.duration+'\',\''+exp.startTime+'\','+exp.hideDropdowns+','+exp.hideIframes+','+exp.hideScrollbars+','+exp.hideObjects+','+exp.hideApplets+',\''+renderingId+'\',\''+exp.adserverUrl+'\', '+exp.pushContents+','+exp.animationTime+','+exp.displayInline+',\''+exp.cssProperty+'\',\''+exp.expandingDivStyleSheet+'\'';
						var creativeType = "EXPANDO";
						var isFlashFullScreenEnabled = false;
						if(globalTemplate.dartIsFsvEnabled)
							isFlashFullScreenEnabled = globalTemplate.isFlashFullScreenSupported(exp.wmode);
						iframeUtil.writeIFrame(paramStr, globalTemplateVersion, mediaServer, advertiserID, creativeType, globalTemplate.dartIsInPreviewMode, globalTemplate.creativeIdentifier, exp.isFSV, isFlashFullScreenEnabled);
						if(!iframeUtil.isInFriendlyIFrame())
							expandingUtil.displayImageOnBreakoutFailure(variableName, altImgTarget, altImgHRef, altImgSrc, altImgWidth, altImgHeight, altImgAltText, exp);
					}
					else {
						document.write('<IMG id="' + "EXPANDO_PLACEHOLDER_" + variableName + '" SRC="http://m1.2mdn.net/dot.gif" style="visibility:hidden" width="300" height="250" BORDER="0" alt="">');
						expandingUtil.writeExpandingFlashcode(exp.variableName, exp.wmode, exp.zIndex, exp.width, exp.height, exp.expandedWidth, exp.expandedHeight, exp.offsetTop, exp.offsetLeft, exp.offsetRight, exp.offsetBottom, exp.salign, exp.url,exp.queryString,exp);
						var creative = globalTemplate.createCreative("ExpandingFlash", renderingId);
						creative.assets["ExpandingFlash"] = exp;
						globalTemplate.addCreativeToDisplayQueue(creative, advertiserID);
						globalTemplate.logThirdPartyFlashDisplayImpression("", false);
					}
				}
				else {
					document.write('<A TARGET="_blank" HREF="http://us.ard.yahoo.com/SIG=14tcadmv6/M=626899.12948803.13175272.1679323/D=fin/S=95993639:LREC/Y=YAHOO/EXP=1220134598/L=xb63N0SOxFe4Rtn8SLXcfwEHyTr6Q0i5qqYAAf3v/B=rtaNAdG_Rus-/J=1220127398146961/A=5461326/R=0/*http://ad.doubleclick.net/activity;src%3D1659546%3Bmet%3D1%3Bv%3D1%3Bpid%3D23040997%3Baid%3D206880786%3Bko%3D0%3Bcid%3D27914051%3Brid%3D27931930%3Brv%3D1%3Bcs%3De%3Beid1%3D1043%3Becn1%3D1%3Betm1%3D0%3B_dc_redir%3Durl%3fhttp://ad.doubleclick.net/click%3Bh=v8/372c/7/d2/%2a/b%3B206880786%3B2-0%3B0%3B23040997%3B4307-300/250%3B27914051/27931930/1%3B%3B%7Esscs%3D%3fhttp://www.scottrade.com/lp/whychoose/1c.asp?id=1"><IMG id="IMG_'+ variableName +'" SRC="http://m1.2mdn.net/1659546/PID_711079_Reasons-AltImage01.gif" width="300" height="250" BORDER=0 alt="Click Here!"/></A>');
					globalTemplate.trackBackupImageEvent(exp.adserverUrl);
					globalTemplate.logThirdPartyBackupImageImpression("", false);
				}
				document.write('</div>');
				document.write('</td> </tr> </table>');

				globalTemplate.writeSurveyURL("");
			}

			_generateExpandingFlashCode("27931930_1" + (new Date()).getTime());
			
document.write('\n			<NOSCRIPT>\n			<A TARGET=\"_blank\" HREF=\"http://us.ard.yahoo.com/SIG=14tcadmv6/M=626899.12948803.13175272.1679323/D=fin/S=95993639:LREC/Y=YAHOO/EXP=1220134598/L=xb63N0SOxFe4Rtn8SLXcfwEHyTr6Q0i5qqYAAf3v/B=rtaNAdG_Rus-/J=1220127398146961/A=5461326/R=0/*http://ad.doubleclick.net/activity;src%3D1659546%3Bmet%3D1%3Bv%3D1%3Bpid%3D23040997%3Baid%3D206880786%3Bko%3D0%3Bcid%3D27914051%3Brid%3D27931930%3Brv%3D1%3Bcs%3De%3Beid1%3D1043%3Becn1%3D1%3Betm1%3D0%3B_dc_redir%3Durl%3fhttp://ad.doubleclick.net/click%3Bh=v8/372c/7/d2/%2a/b%3B206880786%3B2-0%3B0%3B23040997%3B4307-300/250%3B27914051/27931930/1%3B%3B%7Esscs%3D%3fhttp://www.scottrade.com/lp/whychoose/1c.asp?id=1\">\n			<IMG SRC=\"http://m1.2mdn.net/1659546/PID_711079_Reasons-AltImage01.gif\" width=\"300\" height=\"250\" BORDER=\"0\" alt=\"Click Here!\">\n			</A>\n			<IMG SRC=\"http://ad.doubleclick.net/activity;src=1659546;met=1;v=1;pid=23040997;aid=206880786;ko=0;cid=27914051;rid=27931930;rv=1;&timestamp=756039;eid1=9;ecn1=1;etm1=0;\" width=\"0px\" height=\"0px\" style=\"visibility:hidden\" BORDER=\"0\"/>\n			<IMG SRC=\"\" width=\"0px\" height=\"0px\" style=\"visibility:hidden\" BORDER=\"0\"/>\n			<IMG SRC=\"\" width=\"0px\" height=\"0px\" style=\"visibility:hidden\" BORDER=\"0\"/>\n			</NOSCRIPT>\n			');

				var motifUtil = new DARTMotifUtil_23_07();
				if(motifUtil.isInMsnAjaxEnvironment()) {
					window.setTimeout("document.close();", 1000);
				}
			
document.write('');
