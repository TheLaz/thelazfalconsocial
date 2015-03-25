var _ = require('lodash');
var shortid = require('shortid');
var publishersTransform = require('./publishersTransforms');
var constants = require('../../constants');

var _db;
var _emitter;
var _publishers = [];

function onloaded(data) {

	var enteries = Object.keys(data).map(function(key) { 
		return publishersTransform.transform(
			data[key].content.id,
			data[key].content.message,
			data[key].content.media.url,
			data[key].content.media.fileName,
			data[key].content.network); 
	});

	_publishers = enteries.concat();
}

exports.get = function(publisherId) {
	
	var _publisher = _publishers.filter(function(item) {
		 return item.id == publisherId
		});

	return _publisher[0];
}

exports.getAll = function() {

	var _allPublishing = _publishers.filter(function(item){
		return item.deleted === false;
	});

	return _allPublishing;
}

exports.create = function(publisher) {

	var _newPublisher = publishersTransform.transform(
			shortid.generate(),
			publisher.message,
			publisher.imageurl,
			publisher.imagename,
			publisher.network,
			false
		);
	
	_publishers.push(_newPublisher);
	_emitter.emit(constants.PUBLISHER_NEW_CREATED, _newPublisher);
}

exports.update = function(publisher) {
	
	var _dirty = publishersTransform.transform(
			publisher.id,
			publisher.message,
			publisher.image,
			publisher.imagename,
			publisher.network
		);

	var _publisher = exports.get(publisher.id);

	_publisher.message = _dirty.message;
	_publisher.imagename = _dirty.image;
	_publisher.imagename = _dirty.imagename;
	_publisher.network = _dirty.network;    
}

exports.remove = function (publisherId) {
	
	var _publisher = exports.get(publisherId);
    if (_publisher) {
        _publisher.deleted = true;
        _emitter.emit(constants.PUBLISHER_DELETED, publisherId);
    }
}

exports.init = function(db, Emitter) {

	_emitter = Emitter;
	_db = db;
	_publishers = [];

	 if (db) {
         db.load(onloaded);
    }
}

