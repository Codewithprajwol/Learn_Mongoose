import mongoose, { model } from 'mongoose'
import { connectDb } from '../config/connect.db.js';
connectDb()

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
},{
    query:{
        byName(name){
           return this.where({name:new RegExp(name,'i')});//?here, i will tell you where is this 'this' is pointing here so below
        }
    }
})

const User=mongoose.model('User',userSchema)

//   await User.find()//! it will return all the document and now if i do .byname() method i have defined under the query object then it will point that return object and chain the qurey like where name:'ram' and execute that data.

//! so to add the query we can do like that

const user= new User({name:'prajwol',email:'hello@gmail.com',password:'rampleasehelpme'})

console.log(user)
   const data=await User.find().byName('prajwol')//?like this and we get the document of name where name is 'prajwol'
   console.log(data)

await user.save()
 