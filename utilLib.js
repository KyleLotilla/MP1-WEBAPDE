function getURLParam(param) {
	var url = (location.search).substr(1);
	var bFound = false;
	var params = url.split("&");
	var value = null;
	param = param + "=";
	
	for (var i = 0; i < params.length && !bFound; i++) {
		if (params[i].indexOf(param) >= 0) {
			value = params[i].substr(param.length);
			bFound = true;
		}
	}
	
	return value;
}

function buildParamURL(param, value) {
	var curURL = location.protocol + "//" + location.host + location.pathname;
	var curURL = curURL + "?" + param + "=" + value;
	return curURL;
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (i) {
			return i.charAt(0).toUpperCase() + i.substr(1).toLowerCase();
	});
}

function setCookie(cName, cValue) {
	var dateExp = new Date();
	dateExp.setTime(dateExp.getTime() + (24 * 60 * 60 * 1000)); 
	document.cookie = cName + "=" + cValue + ";" + "expires=" + dateExp.toUTCString();
}

function getCookie(cName) {
	cName = cName + "=";
	var sCookie = decodeURIComponent(document.cookie);
	var sCookieAttr = sCookie.split(';');
	
	for (var i = 0; i < sCookieAttr.length; i++) {
		sCounter = sCookieAttr[i];
		while (sCounter.charAt(0) == ' ')
			sCounter = sCounter.subString(1);
		if (sCounter.indexOf(cName) == 0)
			return sCounter.substring(cName.length);
	}
	return "";
}

function redirectURLOnClick(url, id) {
	$("#" + id).click(function () {
		window.location.href = url;
	});
}