//! subDocument is not a like doing pupulate

//? Subdocuments are similar to normal documents. Nested schemas can have middleware, custom validation logic, virtuals, and any other feature top-level schemas can use. The major difference is that subdocuments are not saved individually, they are saved whenever their top-level parent document is saved.

import mongoose from 'mongoose'
import { connectDb } from '../config/connect.db.js'
connectDb()

const childSchema=new mongoose.Schema({
    name:String,
})

const parentSchema=new mongoose.Schema({
    child:childSchema
})
//TODO:- here child is an childSchema is an subDocument.

const Parent=mongoose.model('Parent',parentSchema)

const data=new Parent({child:{name:'Ram'}})
await data.save();
console.log(data);
