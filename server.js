const express = require('express');
const socket = require('socket.io');

 
const app = express();

const tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});
 
app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

const io = socket(server);

io.on('connection', (socket) => {

    socket.emit('updateData', tasks);

    socket.on('addTask', (taskName) => {
        tasks.push(taskName);
        socket.broadcast.emit('addTask', taskName);
    });
    socket.on('removeTask', (id) => {
        const indexToRemove = tasks.indexOf(tasks.find(task => task.id === id ));
        tasks.splice(indexToRemove, 1);
        socket.broadcast.emit('removeTask', id);
    });

    
    
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
      });
      
    socket.on('disconnect', () => { 
        console.log('Oh, socket ' + socket.id + ' has left');
        const user = users.find(object => object.id === socket.id)
        const index = users.indexOf(user);
        users.splice(index, 1);
        socket.broadcast.emit('message', {author: 'Chat Bot', content: `${user.name} has left the conversation` });

    });
    console.log('I\'ve added a listener on message event \n');
});
  