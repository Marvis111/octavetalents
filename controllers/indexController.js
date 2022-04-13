const {User} = require('../models/Users')
const {OAuth2Client} = require('google-auth-library');

 const client = new OAuth2Client({clientId:process.env.CLIENTID});

module.exports = {
     index : async (req,res) =>{
    var newUser;
    try {
        newUser = await User.create({name:'heyy frontend..'});
    } catch (error) {
        console.log('error',error)
        newUser = null
    }
    res.send(newUser);
},
googleAuth: async (req,res,next) =>{
   const {token} = req.body

   const ticket = await client.verifyIdToken({
       idToken:token,
       audience:process.env.CLIENTID
   })
   const  user = ticket.getPayload(); 
   console.log(user)

   res.status(201)
   res.json(user)
}
}