import mongoose from 'mongoose'
import { connectDb } from '../config/connect.db.js'
connectDb()

const userSchema=new mongoose.Schema({
      name:{
        firstName:String,
        lastName:String,
      }
}
,{
    virtuals:{
        fullname:{
            get:function(){
                return this.name.firstName+' ' +this.name.lastName; 
            }
        }
    }
}
)

//! you can also define by this method

userSchema.virtual('fullname').get=function(){
    return this.name.firstName+ ' '+ this.name.lastName;
}

const User=mongoose.model('User',userSchema);

const user=new User({name:{firstName:'Prajwol',lastName:'Shrestha'}});
// const newUser=user.toObject({virtuals:true})

console.log(user.fullname)


//?Use .toObject() when you need a Mongoose document instance with virtuals or getters included.
//?Use .lean() when you want faster, plain JavaScript objects without Mongoose-specific features.


//?Virtuals are computed properties and are not part of the underlying database document. Mongoose doesn't include them by default to optimize for performance, and you need to explicitly convert the document to a plain object to access them.
//? this above might not be true because it does noting here it's still undefined ..but when i use the virtuals inside of that schema it's working without converting it to the toObject().


