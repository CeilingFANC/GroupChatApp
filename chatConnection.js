exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
      console.log("a new user");
      socket.broadcast.emit('new User',{hello:'world'});
      socket.on('file1Event', function () {
        console.log('file1Event triggered');
      });
      socket.on('new message', function (data) {
        console.log(data);
      });
      socket.on('disconnect', function(){
          console.log('someone left')
      });
    });
  }

