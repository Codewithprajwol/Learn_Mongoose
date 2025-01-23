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

console.log(userSchema)
//?here userSchema is a object that has multiple inner objects like aliases, virtuals, paths,methods etc


const User=mongoose.model('User',userSchema)

//?User is a constructor function (a class-like function) that Mongoose uses to create instances of documents and interact with the MongoDB collection. It’s not exactly a factory function because it doesn’t return a plain object; it’s a Mongoose model that provides instance methods and static methods.

//?In addition to being a constructor function, the User model also provides several static methods (like .find(), .create(), .update(), etc.) to interact with the database. So it’s not just a plain function, but a function that also contains some built-in methods to work with MongoDB.
console.log(User)

console.log('test')