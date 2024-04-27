const express = require('express');
const mongoose = require('mongoose');
const password = require('./apis/password.api.cjs');
const users = require('./apis/user.api.cjs');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const helper = require('./apis/cookie.helper.cjs');


const mongoDBEndpoint = 'mongodb+srv://ron:banana1@cluster0.mvblcup.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoDBEndpoint, {
    useNewUrlParser: true,
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users/', users);
app.use('/api/password/', password)


let frontend_dir = path.join(__dirname, '..', 'frontend', 'dist');

app.use(express.static(frontend_dir));
app.get('*', function (req, res) {
    console.log("received request");
    res.sendFile(path.join(frontend_dir, "index.html"));
});



app.listen(process.env.PORT || 8000, function () {
    console.log("Starting server now...")
})