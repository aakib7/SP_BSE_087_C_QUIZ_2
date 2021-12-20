var express = require('express');
var router = express.Router();
let { User } = require('../models/User');
var bcrypt = require('bcryptjs');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');


// Register new User
router.post('/register', async(req,res) => {
   let user = await User.findOne({ email:req.body.email });
   if(user){
     return res.status(400).send("User Already exist");
   }
   else{
    let user = new User();
    user.user_name = req.body.user_name;
    user.email = req.body.email;
    user.password = req.body.password;

    let salt = await bcrypt.genSalt(10); // password encryption with bcryptjs
    user.password = await bcrypt.hash(user.password, salt);

    await user.save()
    res.send(_.pick(user,["user_name","email"]));
   }   
});

router.post('/login',async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(!user){
      return res.status(400).send("User Not registerd");
    }
    else{
      let valid = await bcrypt.compare(req.body.password,user.password);
      if(!valid){
        return res.status(401).send("Incorect Password");
      }
      else{
        let token = jwt.sign({_id:user._id,name:user.user_name},config.get('jwtPrivateKey'));
        // res.send("Login Successfully");
        res.send(token);
      }
    }

   });



module.exports = router;
