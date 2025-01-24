import mongoose, { model } from 'mongoose'
import { connectDb } from '../config/connect.db.js'
connectDb()


const MyModel = mongoose.model('Test', new mongoose.Schema({ name: String }));
const doc = new MyModel();

console.log(doc instanceof MyModel)//true
console.log(doc instanceof mongoose.Model)// true
console.log(doc instanceof mongoose.Document)// true
// console.log(mongoose.Model)
// console.log(mongoose.Document)


//!mongoose.Model is the Parent Class:

//!All models (like User, Product) inherit from mongoose.Model.
//!When you call mongoose.model('User', schema), it creates a new model (User) that extends mongoose.Model.
//!mongoose.model Creates Models:

//!It uses the schema you define to create a new model for interacting with the database.
//!The resulting model (User, Product, etc.) is an instance of mongoose.Model.
//!Visualizing It

// Base Class: mongoose.Model
//?console.log(mongoose.Model);

// Creating a Model
//?const User = mongoose.model('User', new mongoose.Schema({ name: String }));

// User inherits from mongoose.Model
//?console.log(User.prototype instanceof mongoose.Model); // true


//?The Relationship Between mongoose.Model and mongoose.Document

//!mongoose.Model:


//?A base class for models.
//?Provides methods for interacting with the entire collection, like find(), findById(), updateOne(), etc.

//!mongoose.Document:

//?A base class for documents.
//?Represents a single record in the database.
//?Provides methods for interacting with that specific document, like save(), validate(), toObject(), etc.
//?When You Use mongoose.model():

//?It creates a new Model (e.g., User), which is a subclass of mongoose.Model.
//?When you create a new document (e.g., new User()), the resulting object is an instance of mongoose.Document.

//?so what you have to understand is that 1.when you create a model using model.create it is the instance of mongoose.Model and it return the constructor function where we can create a document and that document is the instance of mongoose.document

//? now let's talk about validation

const personSchema=new mongoose.Schema({
    name:String,
    age:{
        type:Number,
        min:0
    }
})

const Person=mongoose.model('Person',personSchema);//? it will create the instance from mongoose.Model and return the constructor function which is the instance of mongoose.Document

const person=new Person({name:'sitaRam',age:1})//before it was age:'prajuell'
await person.validate()//? here it will give error because age:'prajuell' is string not number

await person.save()
console.log('hello')


//! now lets see how we can replace the document
const newData=await Person.findOne({_id:'6792f184ee1c044d2edcde77'})
newData.overwrite({name:'radhaKrishna'})

await newData.save()

const replacedData=await Person.replaceOne({_id:'6792f2be369c0c35b728d5db'},{name:'i love you'})
console.log(replacedData)//! replaceone automatically replaces the data in database we don't have to save it



