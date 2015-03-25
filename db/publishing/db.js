var request = require('request');

exports.create = function(filepath) {

	var dbSourceUrl = 'https://jsonblob.com/api/jsonBlob/5208ac13e4b002188ed03bdf';

    function load(onload) {
       request(dbSourceUrl, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		  	var data = JSON.parse(body);
		    onload(data.response); 
		  }
		})
    }

    return {
        load: load
    };
};
