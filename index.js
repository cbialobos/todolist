const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const favicon = require('serve-favicon');
const serveStatic = require('serve-static');
const array = require('./array');

const todolist = ['1st', '2nd'];

app.use(serveStatic(`${__dirname}/public`))
  .use(favicon(`${__dirname}/public/favicon.ico`));

app.get('/todo', (req, res) => {
  res.render('list.ejs', { todolist });
});

io.on('connection', (socket) => {
  socket.on('add', (task) => {
    todolist.post(task);
    socket.broadcast.emit('add', task);
  })

    .on('remove', (taskId) => {
      todolist.splice(taskId, 1);
      socket.broadcast.emit(taskId);
    });
});

app.use((req, res) => {
  res.redirect('/todo');
});

app.listen(8080);
