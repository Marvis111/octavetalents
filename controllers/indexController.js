const {User, Notifications,} = require('../models/database')
const {OAuth2Client, JWT} = require('google-auth-library');
const {check,validationResult,body} = require("express-validator"),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken');
const {JSONWEBTOKENSECRET} = process.env;

const client = new OAuth2Client({clientId:process.env.CLIENTID});

module.exports = {
     index : async (req,res) =>{
         res.data.status = "success";
         res.data.data = {message:"Welcome to octave talent"}

        res.send(res.data);
},
checkInputs:[
    check('firstname','First name is required').notEmpty(),
    check('lastname','Last name is required').notEmpty(),
    check('email','Email is required.').notEmpty(),
    check('email','Invalid Email Address').isEmail(),
    check('password','Password is required').notEmpty(),
    check('country','Country name is required.').notEmpty(),
],
validateInputs:async(req,res,next)=>{
    req.skip = false
        const {errors} = validationResult(req);
        if(errors.length > 0){
            req.skip = true
            res.data.data = errors
            res.statusCode = 401
            next();
        }else{
            //check if email already exist...
           const existingUser = await User.findOne({email:req.body.email});
           if(existingUser != null){
                req.skip = true;
                res.statusCode = 400;
                res.data.data = [{message:"Email Aready existed",param:'email'}];
                next();
           }else{
            if (req.body.password === req.body.comf_password ) {
                try {
                    const allowTalentsTipNotification = req.body.allowTalentsTipNotification ? true : false;
                    req.skip = false
                const hashedPasword = await bcrypt.hash(req.body.password,10);
                const newUser = await User.create({...req.body,password:hashedPasword}),
                userId = newUser._id;
                const talentipsNotification = await Notifications.create({userId,allowTalentsTipNotification});
                const token = jwt.sign({id:newUser._id},JSONWEBTOKENSECRET,{expiresIn: 3600});
                 //session;
                    const user = {}
                
                 user.userId = newUser._id;
                 user.firstname = newUser.firstname;
                 user.lastname = newUser.lastname;
                 user.email = newUser.email;
                 user.token = token;
                 //user
                 req.session.user = user;
                 res.statusCode = 200;
                 next();
                } catch (error) {
                    req.skip = true;
                    res.data.status = 'fail'
                    res.statusCode = 400
                    if (error.code === 11000) {
                   res.data.data = [{message:"Email Address Already Exist.",param:"email"}];
                    }else{
                     res.data.data = [{message:error.message,param:""}];
                    }
                    next();
                }
             } else {
                  //skip the next middle ware..
                  req.skip = true;
                  res.data.status = "fail"
                  res.statusCode= 400;
                  res.data.data = [{message:"Password mismatched",param:'password'}];
                  next();
             }
           }
            
        }
},
sendResponse:(req,res)=>{
   if(req.skip){
   res.data.status = 'fail';
   res.data.statusCode = res.statusCode
   }else{
    res.data.data = req.session.user;
   res.data.status = "success";
   }
   res.json(res.data);
}
,
googleAuth: async (req,res,next) =>{
    req.skip = false
   const {token} = req.body;
  try {
    req.skip =false
    const ticket = await client.verifyIdToken({
        idToken:token,
        audience:process.env.CLIENTID
    });
    const  user = ticket.getPayload(); 
    console.log(user);
    const {email,name,given_name,family_name,sub} = user
    const existingUser = User.findOne({
        $where:{email,googleId:sub}
    });
     
    res.status = "success";
    res.statusCode = 200;
    res.data.data = user;
    next();
  } catch (error) {
      req.skip =true
      res.statusCode = 401;
      res.data.data = {message:error.message};
    next();
  }
}

}