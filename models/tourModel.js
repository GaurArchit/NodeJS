const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price '],
  },
});
//Model here we define the table or collection name that is to be used eg here we use Tours here
const Tour = mongoose.model('Tour', toursSchema);

module.exports =Tour
