var request = require('request');
var refreshDelay = 500;
global.maxTime = 0;

function _refresh() {
    request('http://192.168.0.129:8080/output?after=' + maxTime, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	    	var json = JSON.parse(body);
	    	if (json && json.data && maxTime != json.maxTime) {
		    	json.data.forEach(function(text) {
		    		console.log(text);
		    });
		    maxTime = json.maxTime;
	    }
        setTimeout(_refresh, refreshDelay);
	    }
    });
}

function requestData() {
	_refresh();
}

module.exports = requestData;