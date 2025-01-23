import mongoose from 'mongoose'

console.log(mongoose.SchemaType)//? it is used internally by the mongoose if we put some custom types....
console.log(mongoose.Schema.Types)//? it define the type like what field will take this as a type like (String,Number etc)

// mongoose.ObjectId//? here mongoose.ObjectId is an schema type to store the object data of mongodb that is generated by mongodb itself

const newId=new mongoose.Types.ObjectId()
console.log('naya id:-',newId)

//? how we can use Number directly and do have to use mongoose.Schema.Types.Number like this ...how Number is direclty available
//?Mongoose internally maps JavaScript's native types (like String, Number, etc.) to the corresponding Mongoose SchemaType. This means:

//?When you write Number in your schema, Mongoose automatically interprets it as mongoose.Schema.Types.Number.
//?This is a shorthand provided by Mongoose to make schemas easier to define.


