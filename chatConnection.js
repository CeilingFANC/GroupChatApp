const Message = require('./DAO/message');

exports = module.exports = function(io){
    io.sockets.on('connection', function (socket) {
      console.log("a new user");
      socket.broadcast.emit('new User',{hello:'world'});
      socket.on('file1Event', function () {
        console.log('file1Event triggered');
      });
      socket.on('new Message', function (data) {
        console.log('new message'+data.thread_id);

        let newMessage = new Message(data);
        console.log(data);
        console.log(newMessage)
        newMessage.save(function(err,mass){
            if(err){
                console.log(err);
            }
        })
        socket.to(data.thread_id).emit('read message',data);
      });
      socket.on('connect thread',function(data){
        console.log('connect thread'+data)
        console.log(data.connect)
        socket.join(data.connect.thread_id);
        if(data.disconnect){
          socket.leave(data.disconnect.thread_id);
        }
      });


      socket.on('disconnect', function(){
          console.log('someone left')
      });
    });
  }

