import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:String,
    age:Number,
    stories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Story'
    }]
})
const Person=mongoose.model('manxey',userSchema);

export default Person