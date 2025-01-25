
//! now lets talk about plugin ...let's make a plugin that make createdAt field at automatically when new document is created.
import mongoose from 'mongoose'
import { connectDb } from '../config/connect.db.js'
connectDb()
const userSchema=new mongoose.Schema({
    name:String,
    age:Number
})
function autoTimeStamp(schema){
    schema.add({createAt:Date})

    schema.pre('save',(next)=>{
        if(!this.createdAt){
            this.createdAt=new Date()
        }
        next();
    })
}
userSchema.plugin(autoTimeStamp)

const User=mongoose.model('manisharu',userSchema);

const user=await User.create({name:'Ram',age:20})
console.log(user)

