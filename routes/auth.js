const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/logout',(req,res)=>{
    //handle with passport
    res.send("logging out");
})

router.get('/google',passport.authenticate('google',{
    scope:['profile']
}))

router.get('/google/redirect',passport.authenticate('google'),(req,res)=>{
    res.send(req.user);
})



module.exports = {
    google:router
}