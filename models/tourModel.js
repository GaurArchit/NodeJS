const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  duration:{
    type:Number,
    required:[true,"A tour must have a duration"]
  },
  maxGroupSize:{
    type:Number,
    required:[true,"A tour must have a maxgroupsize"]
  },
  difficulty:{
    type:String,
    required:[true,"A tour must have a difficulty"]
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingQuantity:{
    type:Number,
    default:0
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price '],
  },
  proiceDiscount:{
    type:Number,
  },
  summary:{
    type:String,
    trim:true, 
    required:[true,"A tour must have a summary"] 
  },
  description:{
    type:String,
    trim:true, 
  },
  imageCover:{
    type:String,
    required:[true,'A tour must have a cover image']
  },
  images:[String] ,//Here I am saving the images in form of array 
  createdAt:{
    type:Date,
    default:Date.now()
  },
  startDates:[Date]
});
//Model here we define the table or collection name that is to be used eg here we use Tours here
const Tour = mongoose.model('Tour', toursSchema);

module.exports =Tour
