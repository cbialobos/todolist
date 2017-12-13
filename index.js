const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const encode = require('ent/encode');

const todolist = [];
let nextId = 0;

app.use(serveStatic(`${__dirname}/public`))
  .use(favicon(`${__dirname}/public/favicon.ico`));

app.get('/task', (req, res) => {
  res.json(todolist);
});

io.on('connection', (socket) => {
  socket.on('add', (task) => {
    const newTask = addElement(task);
    io.emit('add', newTask);
  })

    .on('remove', (taskId) => {
      todolist.splice(taskId, 1);
      io.emit('remove', taskId);
    });
});

server.listen(8080);

function addElement(task) {
  const newTask = {
    id: nextId,
    task: encode(task),
  };
  nextId += 1;
  todolist.push(newTask);
  return newTask;
}

