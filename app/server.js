var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//either use cloud service port or local port:3000
var port = process.env.PORT || 8000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname));

io.sockets.on('connection', function(socket) {
    socket.emit("hello", "Hello from Server");
    socket.on("hello", function(data) {
      console.log(data);
    });
});
