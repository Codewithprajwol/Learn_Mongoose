import mongoose from 'mongoose'


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
    }
})

// console.log(userSchema)


console.log(userSchema.path('name').path)
console.log(userSchema.path('_id').instance)
//? here we get 'name' that we do like name{type:String,default:'ram'}


//?here userSchema is a object that has multiple inner objects like aliases, virtuals, paths,methods etc


const User=mongoose.model('User',userSchema)

const data= new  User({name:'ram',email:'hello@gmail.com'})

console.log(data._id instanceof mongoose.Types.ObjectId)//! return true here
console.log(User._id instanceof mongoose.Types.ObjectId)//! return false here 

//?User is a constructor function (a class-like function) that Mongoose uses to create instances of documents and interact with the MongoDB collection. It’s not exactly a factory function because it doesn’t return a plain object; it’s a Mongoose model that provides instance methods and static methods.

//?In addition to being a constructor function, the User model also provides several static methods (like .find(), .create(), .update(), etc.) to interact with the database. So it’s not just a plain function, but a function that also contains some built-in methods to work with MongoDB.
// console.log(User)
