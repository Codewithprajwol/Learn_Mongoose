import mongoose from "mongoose";
import { connectDb } from "../config/connect.db.js";
connectDb()

const childSchema=new mongoose.Schema({
    name:String
})
const childModel=mongoose.model('Child',childSchema)
const childbacha=new childModel({name:'Prajwol'})
console.log(childbacha._id)
await childbacha.save()

const parentSchema=new mongoose.Schema({
    child:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Child'
    },
    wife:String
})

const Parewar=mongoose.model('Parewar',parentSchema);

const meroParewar=new Parewar({child:childbacha._id,wife:'y'})
console.log(meroParewar)
await meroParewar.save()

const mylove=await Parewar.findOne({_id:meroParewar._id}).populate('child')
console.log(mylove)
