const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
var cookiesession = require('cookie-session')

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.cookieParser());
app.use(express.cookieSession());
app.use(app.router);

app.use(express.static(`${__dirname}/public`))
  .use(favicon(`${__dirname}/public/favicon.ico`));

app.get('/', (req, res) => {
  res.render('list.ejs', { todolist: req.session.todolist || [] });
});

app.post('/todo/add', (req, res) => {
  if (req.body.newitem !== undefined) {
    if (req.session.todolist === undefined) {
      req.session.todolist = [];
    }

    req.session.tododolist.push(req.body.newitem);
    res.render('list.ejs', { todolist: req.session.todolist });
  }
});

app.post('/todo/delete/', (req, res) => { 
  const newLocal = req.session.tododolist;

  let pos = newLocal.indexOf(req.body.id);
  newLocal.splice(pos, 1);
  res.render('list.ejs', { todolist: newLocal });
});

app.listen(8080);

