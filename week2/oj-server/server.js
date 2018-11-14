//use express to create server
const express = require('express');

const app = express();

//connect to mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://zc2421:Aber597186@ds049161.mlab.com:49161/oj1805');

const restRouter = require('./routes/rest');
const indexRouter = require('./routes/index');
const path = require('path');



// app.get('/', (req, res) => {
//     res.send('Hello world from express');
// });

app.use('/api/v1', restRouter);
app.use(express.static(path.join(__dirname, '../public')));
app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname,
            '../public')});
})

app.listen(3000, () =>{
    console.log('App is listening to port 3000');
});