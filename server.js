const express = require('express');
const app = express();
const {google} = require("./routes/auth");
const {generalAuth} = require("./routes/generalAuth");
const mongoose = require('mongoose');
const {connectionString} = require('./config/connectionString');
const bodyParser = require('body-parser');
const cors = require('cors');
// const passportSetup = require('./config/passport-setup');
// const passport = require('passport');

// app.use(passport.initialize());


mongoose.connect(connectionString,
                    {useNewUrlParser:true,useUnifiedTopology: true}
                );

mongoose.connection
            .once("open",err => console.log("connected"))
            .on("error", error=> console.log(error))


app.use(cors())          
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// app.use('/auth',google);
app.use('/',generalAuth);

app.listen("4000",()=>{
    console.log("listening to port 4000")
});