const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { google } = require('./keys')
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const {users} = require('../users');


passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})

passport.use(new GoogleStrategy({
    //options for strategy
    callbackURL:'/auth/google/redirect',
    clientID:google.clientID,
    clientSecret:google.clientSecret
},(accessToken,refreshToken,profile,done)=>{
    //passport callback function
    //this middleware function is called just after redirected to /suth/google/redirect
    //and after this /auth/google/redirect body is going to execute
    // console.log(profile);
    
    bcrypt.hash(profile.id , 10  , (err,hash)=>{
        
        if(err){
            console.log("error in hanshing");
        }else{
            
            let user = new users({
                fullname:profile.displayName,
                gmail:profile.id+"@gmail.com",
                password:hash
            })


            var addUser = () => {
                user.save().then((result)=>{
                    if(result){
                        var newUser = {
                            fullname:userData.fullname,
                            projects:userData.projects,
                            tasks:userData.tasks,
                            gmail:userData.gmail
                        }
                        done(null,newUser);
                    }
                    else{
                        console.log("error while adding");
                        res.json("other")
                    }
                })
            }
            var recievedGmail = profile.id+"@gmail.com";
            users.findOne({"gmail":recievedGmail},"gmail fullname password projects tasks",(err,userData)=>{
                if(err){
                    console.log("error while finding user");
                    res.json("other")
                }else{
                    if(userData!==null){
                        if(userData!==""){
                            //to send user data as it already exits
                            var currentUser = {
                                fullname:userData.fullname,
                                projects:userData.projects,
                                tasks:userData.tasks,
                                gmail:userData.gmail
                            };
                            done(null,currentUser);
                        }else{
                            addUser();
                        }
                    }else{
                        addUser();
                    }
                }
            });



        
        }
       
    })
    
})
)
