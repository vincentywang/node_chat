/**
 * 1. receiveMessage (update UI through callback)
 * 2. sendMessage (node server logic should handle the DB CRUD)
 * 3. 
 */
module.exports = function (socket) {
  
  var receiveMessage = function (msg, callback) {
    socket.on('chat-update', function (data) {
      callback(data);
      // update message to append to DOM
      // updateChat(msg);
      console.log('trigger function to receiveMessage');
      console.log(data);
    });
  };

  var sendMessage = function (msg) {
    /**
     * client side doesn't save user information
     * server get information through web socket 
     * session management at server side
     */
    socket.emit('chat-commit', {'message': msg});
  };

  /**
   * This is for testing purpose
   */
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });

  socket.on('user_id', function (data) {
    socket.userId = data.userId;
  });

  socket.on('offline', function () {
    console.log('user offline');
  });

  return {
    'receiveMessage' : receiveMessage,
    'sendMessage' : sendMessage
  };
};
  