var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
//either use cloud service port or local port:3000
var port = process.env.PORT || 8000;
var keypress = require('keypress');

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

keypress(process.stdin);
console.log("x, y, z");
process.stdin.on('keypress', function(ch, key) {
  if (key && key.ctrl && key.name == 'c') {
      process.exit();
  }

  switch (key.name) {
      case 'z':
        io.emit("status", "z");
        break;

      case 'x':
        io.emit("status", "x");
        break;

      case 'c':
        io.emit("status", "c");
        break;
  }

  console.log(key.name);
});

process.stdin.setRawMode(true);
process.stdin.resume();