var express = require('express');
var app = express();
var config = require('config');
var routes = require('./modules/routes');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('./modules/tools/passport');
var cors = require('cors');
// var passport = require('./modules/tools/local_passport');
var compression = require('compression');


app.use(express.static(__dirname +'/static'));
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ type : '*/*' }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
//to allow request to another sites


//commpress all static files
app.use(compression());

// User session support middlewares. Your exact suite might vary depending on your app's needs.
app.use(cookieParser());
app.use(session({secret:'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.get('/auth/vkontakte', passport.authenticate('vkontakte'));

app.get('/auth/vkontakte/callback',
    passport.authenticate('vkontakte', {
        successRedirect: '/',
        failureRedirect: '/'
    })
);

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use('/api', routes.api);

app.use('/getUser',(req,res,err)=>{
    if (req.user) res.json(req.user);
    else res.sendStatus(404);
});

app.listen(config.get("port"), ()=>{
    console.log(`App listening on port ${config.get("port")}!`);
    console.log(`http://localhost:${config.get("port")}`);
});

