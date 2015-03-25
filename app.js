var express = require('express');
var EventEmitter = require("events").EventEmitter;
var path = require('path');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var publishingDB = require('./db/publishing/db');
var reachDB = require('./db/reach/db');
var publishersStore = require('./stores/publishing/publishers');
var reachStore = require('./stores/reach/reach');
var constants = require('./constants');

var app = express();
var emitter  = new EventEmitter();

emitter.setMaxListeners(0);

publishersStore.init(publishingDB.create(), emitter);
reachStore.init(reachDB.create(), emitter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));
app.use('/styles',lessMiddleware(path.join(__dirname, 'public', 'styles')));
app.use('/angular', express.static(path.join(__dirname, 'node_modules', 'angular')));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'default.html'));
});

app.use('/publishers', require('./routes/publishers'));
app.use('/reach', require('./routes/reach'));

var io = require('socket.io').listen(app.listen(process.env.PORT || 3000));

io.sockets.on('connection', function (socket) {

    emitter.on(constants.PUBLISHER_NEW_CREATED, function(publisher) {
		socket.emit(constants.PUBLISHER_NEW_CREATED, publisher);
	});

    emitter.on(constants.REACH_NEW_CREATED, function(item) {
        socket.emit(constants.REACH_NEW_CREATED, item);
    });
});

module.exports = app;




