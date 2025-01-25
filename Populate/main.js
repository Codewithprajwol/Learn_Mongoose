import { connectDb } from "../config/connect.db.js";
import Person from "./personSchema.model.js";
import Story from "./storySchema.model.js";

connectDb()

// const author=new Person({
//     name:'prajwol',
//     age:20,
// })

// export const story=new Story({author:author._id,title:'love is blind'});

// await story.save();

// const fan1=new Person({name:'Ram'})
// await fan1.save()
// story.fans.push(fan1)

// const fan2=await Person.create({name:'rahul'})
// console.log(fan2)
// story.fans.push(fan2)

// story.fans.push({name:'Krish'});

// const fan4=await Person.create({name:'Hari'})
// await fan4.save()
// story.fans.push(fan4._id)

// await story.save()


const data=await Story.findOne({title:'love is blind'}).populate({path:'fans',match:{name:{$ne:'rahul'}},select:'name'})

console.log(data)
console.log(data.populated('author'))
console.log(data.populated('fans'))//? it's returning the  data becaues in data fans is populated

//todo:- here what you have to understand is that in data variable even the author is either populated or not we can get the data.author and data.author._id ...both works ...written in moongose documentation 

//? here what you have to understand is if any field is taking the objectId of any refrence instead of object id we can push the whole object database will automatically extract the object id and extract it...and works fine but here {name:Krish} will not be shown but in the database because in Person model it will not be present when seen by the populate function ...bcz we only have pushed to the story object not created the Person model



//! these thing should be considerd correctly

// In general, there is no way to make populate() filter stories based on properties of the story's author. For example, the below query won't return any results, even though author is populated.

// const story = await Story.
//   findOne({ 'author.name': 'Ian Fleming' }).
//   populate('author').
//   exec();
// story; // null

//? these cannot be possible ...so for this we have to learn denormalization


//? if we do Story.create([{title:'h1',fans:[objectId(1),objectId(2)]},{title:'h3',fans:[objectId(3),objectId(4)]}])

//? then two documents will be created ...like this we can make multiple documents




//! main thing you have to remember like this ...there are more but this is curcial in my thinking
//!Concept:

//? When you have two collections that are related by references (i.e., one document in one collection references a document in another collection), localField and foreignField are the fields that help Mongoose understand how to link those documents.

//! Example Scenario:

//? Author Collection: Contains information about authors.
//? BlogPost Collection: Contains blog posts, each with an author field that references the Author collection.

//!Author Schema:

const AuthorSchema = new mongoose.Schema({
  name: String,
  favoriteTags: [String] // List of tags the author likes
});

//!BlogPost Schema:

const BlogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }, // Reference to an author
  tags: [String] // Tags associated with the blog post
});

//? Virtual Population with localField and foreignField:
//? Now, let's say you want to create a virtual field posts on the Author model, which will give you all the blog posts written by that author. The posts field will be populated with blog posts that match the author's favoriteTags.


AuthorSchema.virtual('posts', {
  ref: 'BlogPost', // The model to populate with (BlogPost)
  localField: '_id', // The field in the Author schema to match (Author's _id)
  foreignField: 'author', // The field in the BlogPost schema that references the author (BlogPost's author field)
  match: author => ({ tags: author.favoriteTags }) // Filter the blog posts by the author's favorite tags
});

//?What Does localField and foreignField Do?
//todo localField: '_id': This refers to the field in the Author schema that contains the unique identifier (usually _id).

//todo In the case of the Author schema, the localField is _id.

//todo foreignField: 'author': This refers to the field in the BlogPost schema that holds the reference to the Author model.

//todo In the case of the BlogPost schema, the foreignField is author, which holds the ObjectId of the Author document.

//! How It Works:

//todo localField: '_id' means: Find the _id of the Author document.

//todo foreignField: 'author' means: Look for the author field in the BlogPost documents that references the Author by their _id.

//todo match: author => ({ tags: author.favoriteTags }) means: After finding the blog posts that belong to this author, only include the blog posts that have one of the author's favorite tags in the tags field.

//! Example:
//! Let's say you have the following data:

//?Author Document:

{
  "_id": ObjectId("author1"),
  "name": "John Doe",
  "favoriteTags": ["Tech", "Science"]
}

//?BlogPost Documents:

[
  {
    "_id": ObjectId("post1"),
    "title": "Tech Innovations",
    "author": ObjectId("author1"),
    "tags": ["Tech", "Innovation"]
  },
  {
    "_id": ObjectId("post2"),
    "title": "Cooking Tips",
    "author": ObjectId("author1"),
    "tags": ["Food"]
  },
  {
    "_id": ObjectId("post3"),
    "title": "Science Discoveries",
    "author": ObjectId("author1"),
    "tags": ["Science"]
  }
]
//? When you query the Author document with .populate('posts'), Mongoose will:

//? Find the Author document with _id: "author1".
//? Find all BlogPost documents where the author field matches _id: "author1".
//? Apply the match filter to only include the blog posts whose tags field contains one of the author's favorite tags.

//! Result:

{
  "_id": ObjectId("author1"),
  "name": "John Doe",
  "favoriteTags": ["Tech", "Science"],
  "posts": [
    {
      "_id": ObjectId("post1"),
      "title": "Tech Innovations",
      "author": ObjectId("author1"),
      "tags": ["Tech", "Innovation"]
    },
    {
      "_id": ObjectId("post3"),
      "title": "Science Discoveries",
      "author": ObjectId("author1"),
      "tags": ["Science"]
    }
  ]
}

//? post2 is not included because it doesn't have a tag that matches any of the author's favorite tags.

//! Summary:

//? localField: The field in the "parent" document (e.g., Author) that you're using to match documents from the "referenced" model (e.g., BlogPost).

//? foreignField: The field in the referenced model (e.g., BlogPost) that contains the reference to the parent document (e.g., Author).

//? In the example, localField is _id (the Author's ID), and foreignField is author (the field in BlogPost that references the Author). This allows Mongoose to "populate" the Author's posts virtual with the matching BlogPost documents.