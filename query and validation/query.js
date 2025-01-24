import mongoose from 'mongoose'

//? Model.deleteMany()
//? Model.deleteOne()
//? Model.find()
//? Model.findById()
//? Model.findByIdAndDelete()
//? Model.findByIdAndRemove()
//? Model.findByIdAndUpdate()
//? Model.findOne()
//? Model.findOneAndDelete()
//? Model.findOneAndReplace()
//? Model.findOneAndUpdate()
//? Model.replaceOne()
//? Model.updateMany()
//? Model.updateOne()

//! above methods can be used to manipulate the document in the collection


//?A mongoose query can be executed in one of two ways. First, if you pass in a callback function, Mongoose will execute the query asynchronously and pass the results to the callback.


//? most of the methods are same as query we have done in the mogosh shell 

//? lean() method is used to change the mongoose document into POJO ...after lean() we cannot use methods like save(), update(), and other methods...
