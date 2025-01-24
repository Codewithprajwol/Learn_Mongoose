import mongoose from 'mongoose'
import { connectDb } from '../config/connect.db.js'
connectDb()

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        validate:()=>Promise.reject(new Error('Opps!')),
    },
    email:{
        type:String,
        validate:{
            validator:function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            },
            message:props=>`${props.value} is not a valid Email`
        }
    }
})
//? we can make custom validator like using validate key given by mongoose and inside we have another key validator(it's again function where we do this logic) or message(here we send our custom error message) and if you don't want message you can use validate:()=>'error' like this ...

const Usering=mongoose.model('Usering',userSchema);

const user=new Usering({name:'ramu',email:'hell'});

console.log(user);

const error=user.validateSync()



console.log(error.errors['email'].message,error.errors['name'])


//todos:- if i have custom validator will not run if first cast doesnot match ...mongoose will first checks the cast and if doesnot match then it will give error of castError

//? {PATH}: the path that failed to cast
//? {VALUE}: a string representation of the value that failed to cast
//? {KIND}: the type that Mongoose attempted to cast to, like 'String' or 'Number'

//? you can also set the global validation like this below

mongoose.Types.Schema.String.set('validate',v=>v==null || v>0);



let personSchema = new Schema({
    name: {
      first: String,
      last: String
    }
  });
  
  assert.throws(function() {
    // This throws an error, because 'name' isn't a full fledged path
    personSchema.path('name').required(true);
  }, /Cannot.*'required'/);
  
  // To make a nested object required, use a single nested schema
  const nameSchema = new Schema({
    first: String,
    last: String
  });
  
  personSchema = new Schema({
    name: {
      type: nameSchema,
      required: true
    }
  });
  
  const Person = db.model('Person', personSchema);
  
  const person = new Person();
  const error1 = person.validateSync();
  assert.ok(error.errors['name']);

  //? here above if you have nested thing and you want all to be required true or any validation then you can use hor create subdocument to handle this like above



  //! you can use User.updateOne() (or other update methods like updateMany(), findOneAndUpdate()) instead of using user.save() in some cases, but there are some key differences between the two methods.

  //? to run validation on this you have to use this options:- const opts = { runValidators: true };
