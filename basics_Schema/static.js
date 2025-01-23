import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
},{
    statics:{
        findByname:(name)=>{
            return mongoose.find({name:new RegExp(name,i)})
        }
    }
})

userSchema.statics.findByname=function(name){
    return mongoose.find({name:new RegExp(name,i)})
}

const User=mongoose.model('User',userSchema);

const user=await User.findByname('ram');
console.log(user)
//? here these static methods are available in the User model but that methods are available in the instances of the User model we created ....that we have to understand that
