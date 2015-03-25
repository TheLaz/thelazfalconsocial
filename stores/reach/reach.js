var _ = require('lodash');
var shortid = require('shortid');
var reachTransform = require('./reachTransforms');
var constants = require('../../constants');

var _db;
var _emitter;
var _reaches = [];

function onloaded(data) {

	if(data['post_impressions']) {

		exports.create(data);
	}	
}

exports.getAll = function() {

	return _reaches;
}

exports.create = function(data) {

	var reachentry = reachTransform.transform(
					_reaches.length + 1,
					data['post_impressions'][0],
					data['post_impressions_organic'][0],
					data['post_impressions_viral'][0],
					data['post_impressions_paid'][0]);

			_emitter.emit(constants.REACH_NEW_CREATED, reachentry);
			_reaches.push(reachentry);
}

exports.fetch = function() {
	
	if (_db) {
        _db.load(onloaded);
    }
}

exports.init = function(db, Emitter) {
	_emitter = Emitter;
	_db = db;
	_reaches = [];
}

