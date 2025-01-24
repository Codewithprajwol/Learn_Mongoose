//? Mongoose has 4 types of middleware: document middleware, model middleware, aggregate middleware, and query middleware.

//? Here are the possible strings that can be passed to pre() and post as well

//? aggregate
//? bulkWrite
//? count
//? countDocuments
//? createCollection
//? deleteOne
//? deleteMany
//? estimatedDocumentCount
//? find
//? findOne
//? findOneAndDelete
//? findOneAndReplace
//? findOneAndUpdate
//? init
//? insertMany
//? replaceOne
//? save
//? update
//? updateOne
//? updateMany
//? validate


//? Note: Query middlewares are not executed on subdocuments.

const childSchema = new mongoose.Schema({
  name: String
});

const mainSchema = new mongoose.Schema({
  child: [childSchema]
});

mainSchema.pre('findOneAndUpdate', function() {
  console.log('Middleware on parent document'); // Will be executed
});

childSchema.pre('findOneAndUpdate', function() {
  console.log('Middleware on subdocument'); // Will not be executed
});


// schema.pre('save', async function() {
//     await Promise.resolve();
//     You can also throw an error in an async function
//     throw new Error('something went wrong');
//   });// if this middleware i have created then that means it will run before saving the document to the database


//? to show error of the middle i was thinking where it will be ....but that message can be seen in our catch block

//? The save() function triggers validate() hooks, because mongoose has a built-in pre('save') hook that calls validate(). This means that all pre('validate') and post('validate') hooks get called before any pre('save') hooks.

schema.pre('validate', function() {
  console.log('this gets printed first');
});
schema.post('validate', function() {
  console.log('this gets printed second');
});
schema.pre('save', function() {
  console.log('this gets printed third');
});
schema.post('save', function() {
  console.log('this gets printed fourth');
});

//? Remember :- before save() function runs the validate() hooks it pre-built in mongoose

//todo:- for error handling we have to different middleware(err,doc,next)