import mongoose from 'mongoose'

const medical_reportSchema=new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        required:true,
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required:true
    },
    diagnosis:[{
        name:{type:String,required:true},
        dosage:{type:String,required:true},
        frequency:{type:String,required:true}
    }],
    testRecommended:[
        {
            testName:{type:String,required:true},
            reason:{type:String}
        }
    ],
    reportDate:{
        type:Date,
        default:Date.now,
    },
    notes:String,
    followUpDate:Date,
})

const MedicalReport=mongoose.model('MedicalReport',medical_reportSchema);

export default MedicalReport