const {User} = require('../models/Users')

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
}

}