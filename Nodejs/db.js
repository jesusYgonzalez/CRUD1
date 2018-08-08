const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/CRUD1")
    .then(() => {
        console.log('connected to db');
    })
    .catch(() => {
        console.log('connection failed');
    });


module.exports = mongoose;
