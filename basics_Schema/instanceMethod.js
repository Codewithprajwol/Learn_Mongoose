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

// animalSchema.methods.findsimilarTypes=function(cb){
//     return mongoose.model('Animal').find({type:this.type},cb);
// }//? here we can define by two methods either in the schema itself or outside the schema using this 

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

//TODOS: what you have to understand is that if we provide the callback to the find method then we donot have to put the 'AWAIT' keyword at the front of the query it acts as .then (and value of either err or resolve data)