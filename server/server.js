const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
// route to dummy db
app.use('/', router) 
// to only run build and get static when in production, not development
app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')),
);

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.log('error handler', err);
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
