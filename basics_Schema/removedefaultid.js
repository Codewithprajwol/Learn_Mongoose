import mongoose from 'mongoose'


const nestedSchema=new mongoose.Schema({
    _id:false,//? here id will not be displayed here
    hobby:{
        type:String,
        default:'coding, dancing'
    }
})

const userSchema=new mongoose.Schema({
    // _id:false,//?you can do like that also
    name:{
        type:String,
    },
    hobbies:[nestedSchema]
    //here hobbies becomes like this:  hobbies:{hobby:{type:string,default }}
    
},{_id:false})

const User=mongoose.model('User',userSchema)

const data=new User({
    name:'prajwol',
    hobbies:[{}]
})

console.log(data)