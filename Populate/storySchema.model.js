import mongoose from 'mongoose'

const storySchema=new mongoose.Schema({
    author:[{type:mongoose.Schema.Types.ObjectId,ref:'manxey'}],
    title:String,
    fans:[{type:mongoose.Schema.Types.ObjectId,ref:'manxey'}]
})

const Story=mongoose.model('Story',storySchema);

export default Story;