import mongoose from 'mongoose'
import { connectDb } from '../config/connect.db.js'
connectDb()

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        validate:()=>Promise.reject(new Error('Opps!')),
    },
    email:{
        type:String,
        validate:{
            validator:function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            },
            message:props=>`${props.value} is not a valid Email`
        }
    }
})
//? we can make custom validator like using validate key given by mongoose and inside we have another key validator(it's again function where we do this logic) or message(here we send our custom error message) and if you don't want message you can use validate:()=>'error' like this ...
 
const Usering=mongoose.model('Usering',userSchema);

const user=new Usering({name:'ramu',email:'hell'});

console.log(user);

const error=user.validateSync()
console.log(error.errors['email'].message,error.errors['name'])