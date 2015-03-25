var request = require('request')
  , JSONStream = require('JSONStream')
  , es = require('event-stream');

exports.create = function(filepath) {

	var dbSourceUrl = 'https://jsonblob.com/api/jsonBlob/5208a709e4b002188ed03bdd';

    function load(onload) {
       
		request({url: dbSourceUrl})
		  .pipe(JSONStream.parse('response.*'))
		  .pipe(es.mapSync(function (data) {
		    onload(data);
		    return data
		  }))
    }

    return {
        load: load
    };
};
