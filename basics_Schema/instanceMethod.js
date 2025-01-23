import mongoose from 'mongoose'

const animalSchema=new mongoose.Schema({
    name:String,
    type:{type:String}
},{
    methods:{
        findsimilarTypes(cb){
            console.log('ma chalyaa hai')
            return mongoose.model('Animal').find({type:this.type},cb);
        }
    }
})

animalSchema.methods.findsimilarTypes=function(cb){
    return mongoose.model('Animal').find({type:this.type},cb);
}

const animal=mongoose.model('Animal',animalSchema);

const dog=new animal({name:'Tommy',type:'String'});
const dogData=dog.findsimilarTypes((err,similarTypes)=>{
    if(err){
        console.log(err)
    }else{
        console.log(similarTypes)
    }

})
console.log(dogData)
console.log(dog)