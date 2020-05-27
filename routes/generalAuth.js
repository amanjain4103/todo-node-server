const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const {users} = require('../users');


const saltRounds = 10;



//login route starts here
/* ####################################################################### */
//responses : user(required data of user) , wrongPassword , wrongMail , other
router.post('/login',(req,res)=>{
    
    users.findOne({"gmail":req.body.gmail},"gmail fullname password projects tasks",(error,userData)=>{
        if(error){
            res.json("other");
        }else{
            if(userData!==null){
                if(userData!==""){
                    bcrypt.compare(req.body.password,userData.password,(err,isMatch)=>{
                        if(err){
                            console.log("problem with password matching");
                            res.json("other");
                        }else if(!isMatch){
                            res.json("wrongPassword");
                        }else{
                            res.json({
                                fullname:userData.fullname,
                                projects:userData.projects,
                                tasks:userData.tasks,
                                gmail:userData.gmail
                            })
                        }
                    })

                }else{
                    res.json("wrongMail");
                }
            }else{
                res.json("wrongMail");
            }
        }
    })

})

//login route ends here
/* ####################################################################### */




//register route starts here
/* ####################################################################### */
//responses : registered , alreadyRegistered , other
router.post('/register',(req,res)=>{

    var  message="";
    bcrypt.hash(req.body.password , saltRounds , (err,hash)=>{
        
        if(err){
            console.log("error in hanshing");
        }else{
            
            let user = new users({
                fullname:req.body.fullname,
                gmail:req.body.gmail,
                password:hash
            })


            var addUser = () => {
                user.save().then((result)=>{
                    if(result){
                        res.json("registered")
                    }
                    else{
                        console.log("error while adding");
                        res.json("other")
                    }
                })
            }

            users.findOne({"gmail":req.body.gmail},"gmail",(err,userData)=>{
                if(err){
                    console.log("error while finding user");
                    res.json("other")
                }else{
                    if(userData!==null){
                        if(userData!==""){
                            res.json("alreadyRegistered");
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
//register route ends here
/* ####################################################################### */


//update route starts here
/* ####################################################################### */

router.post('/update',(req,res)=>{
    users.updateOne({"gmail":req.body.gmail},{projects:req.body.projects,tasks:req.body.tasks},(err,rawRes)=>{
        if(err){
            console.log("error while finding user");
            res.json("notUpdated")
        }else{
            if(rawRes!==null){
                if(rawRes!==""){
                    res.json("updated");
                }else{
                    res.json("notUdated");
                }
            }else{
                res.json("notUpdated");
            }
        }
    });
})

//update route ends here
/* ####################################################################### */

module.exports = {
    generalAuth:router
}