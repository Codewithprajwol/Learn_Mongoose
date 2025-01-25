import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:String,
    age:String
})

const orderSchema=new mongoose.Schema({
    quantity:Number,
    orderName:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const User=mongoose.model('User',userSchema,{session})
const Order=mongoose.model('Order',orderSchema,{session})

const session=await mongoose.startSession()

try{
session.startTransaction()

const user=await User.create({name:'prajwol',age:'12'})
const order=await Order.create({quantity:1,orderName:'pencil',user:user._id})
await session.commitTransaction()
await session.endSession()
}catch(err){
    await session.abortTransaction()
    console.log(err)

}//? it helps to rolback ..if any of the order or user document fails to create




