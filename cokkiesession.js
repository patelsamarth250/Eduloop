var express = require('express')
var app = express();
var cookieParser = require('cookie-parser')
var sesssion = require('express-session')

app.use(cookieParser());
app.use(sesssion({
    secret: "behenchod",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serving public file
app.use(express.static(__dirname));

const myusername = 'user1'
const mypassword = 'mypassword'
// a variable to save a session
var session;
app.get('/', (req, res) => {
    session = req.session;
    if (session.userid) {
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    } else
        res.sendFile(__dirname + "/" + 'signup1.html')
});
app.post('/user', (req, res) => {
    if (req.body.username == myusername && req.body.password == mypassword) {
        session = req.session;
        session.userid = req.body.username;
        console.log(req.session)

        res.cookie("Status","LoggedIn");
        console.log(JSON.stringify(req.cookies["Status"]));
        res.send("Hey there, welcome <a href=\'/logout'>click to logout</a>");



    }
    else {
        res.send('Invalid username or password');
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(3000);