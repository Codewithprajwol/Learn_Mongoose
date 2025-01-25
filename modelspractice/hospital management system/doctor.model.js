import mongoose from 'mongoose'


const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
    experienceInYears:{
        type:Number,
        default:0
    },
    qualification:{
        type:String,
        required:true,
    },
    worksInHospital:[{type:mongoose.Schema.Types.ObjectId,ref:'Hospital'}]


},{timestamps:true})

const Doctor=mongoose.model('Doctor',doctorSchema);

export default Patient