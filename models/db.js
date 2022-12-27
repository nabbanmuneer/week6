const mongoose=require('mongoose');
const { stringify } = require('querystring');
const validator=require('mongoose-unique-validator');


const userSchema=new mongoose.Schema({
    fname:{type:String,require:true},
    lname:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    userType: {type: String,required: true
    }
})

userSchema.plugin(validator)
module.exports=mongoose.model("User",userSchema);