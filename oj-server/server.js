// const express = require('express')
// const app = express()

// var restRouter = require("./routes/rest");

// var indexRouter = require("./routes/index");


// var mongoose = require("mongoose");

// var path = require("path");

	


// mongoose.connect("mongodb://user:a123456@ds255262.mlab.com:55262/minilc");

// app.use(express.static(path.join(__dirname, '../public')));

// app.use('/', indexRouter);

// app.use("/api/v1", restRouter);



// // app.get('/', (req, res) => res.send('Hello express World!'))

// app.listen(3000, () => console.log('App listening on port 3000!'))

const express = require('express');
const app = express();
const restRouter = require('./routes/rest');
const path = require('path');

const mongoose = require('mongoose');

var http = require('http');

var socket_io = require('socket.io');
var io = socket_io();
var SocketService = require('./services/SocketService.js')(io);

try {
    mongoose.connect("mongodb://user:a123456@ds255262.mlab.com:55262/minilc");
} catch (error) {
    console.log(error);
}


app.use('/api/v1', restRouter);
app.use(express.static(path.join(__dirname, '../public')));

app.get('/',(req,res)=>res.send("Hello express World!"));

// app.listen(3000,()=>console.log('app running'));

app.use((req, res) => {
    res.sendFile('index.html', {root:path.join(__dirname, '../public')});
});

var server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
	throw error;
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr == 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	console.log('Listening on ' + bind);
}