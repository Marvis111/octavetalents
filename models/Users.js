const mongoose = require('mongoose')

const userModel = mongoose.Schema({
    name :{type:String,required:true}
})

const User = mongoose.model('User',userModel);

module.exports = {User}