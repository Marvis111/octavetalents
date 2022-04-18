const {User} = require('../models/Users')
const {OAuth2Client} = require('google-auth-library');

 const client = new OAuth2Client({clientId:process.env.CLIENTID});

module.exports = {
     index : async (req,res) =>{
         res.data.status = "success";
         res.data.data = {message:"Welcome to octave talent"}

        res.send(res.data);
},
signup:async (req,res) =>{

}
,
googleAuth: async (req,res,next) =>{
   const {token} = req.body
   const ticket = await client.verifyIdToken({
       idToken:token,
       audience:process.env.CLIENTID
   })
   const  user = ticket.getPayload(); 
   console.log(user);
   res.status(201)
   res.json(user);
}
}