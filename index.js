var express = require('express');
var socket = require('socket.io');

const PORT = process.env.PORT || 4000;

var app = express();
var server = app.listen(PORT, function(){
    console.log('listening for requests on port,', PORT);
});


app.use(express.static('public'));


var io = socket(server);
io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });

});
