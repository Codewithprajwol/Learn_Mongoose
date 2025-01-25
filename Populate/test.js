import mongoose from 'mongoose'
// import {story} from './main.js'

import Person from './personSchema.model.js'
import { connectDb } from '../config/connect.db.js'
import Story from './storySchema.model.js'
connectDb()


// const testPerson=Person.create({name:'dhmi'})

// const data=await Person.deleteMany({name:'dhmi'})
// console.log(data)

// console.log(story.populated('author'))
// console.log(story.populated('fans'))
const story = await Story.findOne({ title: 'love is blind' }).populate('author');
console.log(story.author)//? here i get null because all the data in Person model have been deleted ...and since i have changed the author field to array and since no data is found so it will return the empty array.
