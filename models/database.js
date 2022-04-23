const mongoose = require('mongoose')
//users
const userModel = mongoose.Schema({
    firstname :{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    country:{type:String,required:true},
    password:{type:String,},
    googleId : {type:String,required:true},
    
})

const User = mongoose.model('User',userModel);
//talents 
const talentsModel = mongoose.Schema({
    firstname :{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    profile:{type:Array,required:true},
    experience_level:{type:Number || String},

})
const Talents = mongoose.model('Talents',talentsModel);

//notification..
const notificationSchema = mongoose.Schema({
    allowTalentsTipNotification:{type:Boolean,required:true},
    userId:{type:String,required:true},
    acceptedTermsAndConditions:{type:Boolean,required:true},
});

const Notifications = mongoose.model('Notifications',notificationSchema);


module.exports = {User,Talents,Notifications}