const express = require('express');
const app = express();
const router = require('./router/router');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', '../frontend');
app.use(express.static('../frontend'));
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html');
});

app.use('/api', router);

const server = app.listen(3000, function () {
    console.log('start server');
});
