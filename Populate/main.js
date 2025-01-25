import { connectDb } from "../config/connect.db.js";
import Person from "./personSchema.model.js";
import Story from "./storySchema.model.js";

connectDb()

const author=new Person({
    name:'prajwol',
    age:20,
})

export const story=new Story({author:author._id,title:'love is blind'});

await story.save();

const fan1=new Person({name:'Ram'})
await fan1.save()
story.fans.push(fan1)

const fan2=await Person.create({name:'rahul'})
console.log(fan2)
story.fans.push(fan2)

story.fans.push({name:'Krish'});

const fan4=await Person.create({name:'Hari'})
await fan4.save()
story.fans.push(fan4._id)

await story.save()


const data=await Story.findOne({title:'love is blind'}).populate('fans')

console.log(data)
console.log(data.populated('author'))
console.log(data.populated('fans'))//? it's returning the  data becaues in data fans is populated

//todo:- here what you have to understand is that in data variable even the author is either populated or not we can get the data.author and data.author._id ...both works ...written in moongose documentation 

//? here what you have to understand is if any field is taking the objectId of any refrence instead of object id we can push the whole object database will automatically extract the object id and extract it...and works fine but here {name:Krish} will not be shown but in the database because in Person model it will not be present when seen by the populate function ...bcz we only have pushed to the story object not created the Person model