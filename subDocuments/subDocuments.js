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


//? in case of middleware if we make the middleware of the subDocument these middleware of validate and save executes before the top-level document's pre('save') but pre('validate') will run first of parentSchema


//! so now you might have one question why to make the subDocuments we can make the nested paths .....ahh we can ...but there is slighty diffrence between them 

const subDocuments=new mongoose.Schema({
    love:new mongoose.schema({
        name:'Krishna',
        age:{
            type:Number,
            default:0
        }
    })
})

const nestedDocuments=new mongoose.Schema({
    love:{
        name:String,
        age:{type:Number,default:0}
    }
})

//TODO:- hre in case of nesetedDocuments if we doesnot provide any value then it will not be undefined ...rather it will be love:{age:0} but in case of subDocument it undefined by default and to make the default value pop up we have to do set the default value to be empty object


//? and to find the subDocument we can use parent.children.id(_id) and other methods like push, unshift ,addToSet

//? const newdoc = parent.children.create({ name: 'Aaron' }); //we can create like this

/*?

// Equivalent to `parent.children.pull(_id)`
parent.children.id(_id).deleteOne();
// Equivalent to `parent.child = null`
parent.child.deleteOne();

await parent.save();
console.log('the subdocs were removed');
*/ //? you can delete subDocument like this

//! lastly if you want to get the parents document then you can use parent() method.
