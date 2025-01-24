import mongoose from 'mongoose'
import { connectDb } from '../config/connect.db.js'
connectDb()

const foodSchema=new mongoose.Schema({
    loddu:{
        type:Number,
        min:[4,'loddu should be at least 4 but you send {VALUE}'],
        max:12
    },
    lodutypes:{
        type:String,
        enum:{
            values:['basenkeladdu','tilkeladdu'],
            message:'{VALUE} is not supported'
        }
    }
})

const Food=mongoose.model("Food",foodSchema);

     const food=new Food({loddu:3,lodutypes:'bhangkeladdu'})
     console.log(food)
     const error=food.validateSync()
     console.log(error.errors['loddu'].message,error.errors['lodutypes'].message)
