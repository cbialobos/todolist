const express = require('express');
const favicon = require('serve-favicon');
const url = require('url');
const querystring = require('querystring');

const app = express();
let totodolist = [];

app.use(express.static(`${__dirname}/public`))
  .use(favicon(`${__dirname}/public/favicon.ico`));

app.get('/', (req, res) => {
  res.render('list.ejs', { totolist: totodolist });
});

app.post('/todolist', (req, res) => {
  const params = querystring.parse(url.parse(req.url).query);
  if ('append' in params) {
    totodolist.push(params.append);
  }
});

app.listen(8080);