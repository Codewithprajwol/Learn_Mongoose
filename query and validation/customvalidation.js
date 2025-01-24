//?Validation is defined in the SchemaType
//?Validation is middleware. Mongoose registers validation as a pre('save') hook on every schema by default.
//?Validation always runs as the first pre('save') hook. This means that validation doesn't run on any changes you make in pre('save') hooks.
//?You can disable automatic validation before save by setting the validateBeforeSave option
//?You can manually run validation using doc.validate() or doc.validateSync()
//?You can manually mark a field as invalid (causing validation to fail) by using doc.invalidate(...)
//?Validators are not run on undefined values. The only exception is the required validator.
//?When you call Model#save, Mongoose also runs subdocument validation. If an error occurs, your Model#save promise rejects
//?Validation is customizable

import mongoose from "mongoose";
import { connectDb } from "../config/connect.db.js";
import assert from "node:assert"
connectDb()

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        minLength:[3,'name length should be greater than 3']
    },
    bacon:{
        type:Number,
        required:[true,'why no bacon?']
    },
    drink:{
        type:String,
        enum:['coffee','Tea'],
        required:()=>{
            return this.bacon>3
        }
    }
})

const Persona=mongoose.model('personal',userSchema);

const user=new Persona({name:'Omesh',bacon:2,drink:'milk'});
await user.save()

let error=user.validateSync();
console.log(error)
// assert.equal('ram','sam')
// console.log('ma chaldina hai')
