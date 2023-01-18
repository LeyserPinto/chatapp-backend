//index.js
const express = require('express');
const app = express();
const PORT = 4000;

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:5173"
    }
});

//Add this before the app.get() block
socketIO.on('connection', (socket) => {
    


    console.log(`⚡: user: ${socket.id} just connected!`);

    //Listens and logs the message to the console
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});




//main route
app.get('/api', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});