const jwt = require('jsonwebtoken');

const {JSONWEBTOKENSECRET} = process.env;

module.exports = (req,res, next)=>{

    const token = req.headers['x-auth-token'];

    jwt.verify(token,JSONWEBTOKENSECRET,(err,user)=>{
        if(err){
            res.data = {
                status:"fail",
                data:{message:err.message},
                statusCode:401
            }
            res.send(res.data);
        }
        if(user && user !== undefined){
            req.UserId = user.id;
            next();
        }
    })
};