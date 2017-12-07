const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookiesession = require('cookie-session');
const array = require('./array');

let urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

app.use(cookiesession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(express.static(`${__dirname}/public`))
  .use(favicon(`${__dirname}/public/favicon.ico`));

app.use((req, res, next) => {
  if (typeof req.session.todolist === 'undefined') {
    req.session.todolist = [];
  }
  next();
});

app.get('/todo', (req, res) => {
  res.render('list.ejs', { todolist: req.session.todolist });
});

app.post('/todo/add', urlencodedParser, (req, res) => {
  if (req.body.newitem === '') {
    return;
  }

  req.session.todolist.push(req.body.newitem);
  res.redirect('/todo');
});

app.post('/todo/delete/', urlencodedParser, (req, res) => {
  if (typeof req.body.id === 'undefined') {
    return;
  }

  array.RemoveElem(req.session.todolist, req.body.id);
  res.redirect('/todo');
});

app.use((req, res) => {
  res.redirect('/todo');
});

app.listen(8080);
