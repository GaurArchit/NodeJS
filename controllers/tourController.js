const express = require('express');
const Tour = require('./../models/tourModel.js'); //Model has been defined in tourModel class here we are importing it as we need to perform CURD opertation
const fs = require('fs');
const APIFeatures = require('../utils/apiFeatures.js');
//This is a middleware that we are using in tourRoutes file
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
};

exports.createTour = async (req, res) => {
  //Notes
  // Here in tourModel we define the schema and model for the table tour ,
  // then in controller function with async and await we pass the data to the table via req.body
  // here req.body automatically picks up the name , price and rating from the Json object that has been sent in Post call
  //tourmodel -> tourController where for every implementation og GET and post we use Curd opertaion
  try {
    const newTour = await Tour.create(req.body); //create method is a promise )
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: `Invalid data sent ! ${err}`,
    });
  }
  // const newTours = new Tour({})
  //  //newTours.save() can also be written as

  //console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //         name: req.body.name,
  //         price: req.body.price,
};
// const tours = JSON.parse( Since now we will import it from Backend
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

//This perticular middleware runs for every route on tourrouter file
// exports.checkID = (req, res, next, id) => {
//   console.log(`Tour is ${id}`);
//   if (id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID ',
//     });
//   }

//   next();
// };

//-------------------------------------------------------------------------- class in JS

// class in js is as follows :
// class Person {
//   // Constructor: Initializes properties
//   constructor(name, age) {
//       this.name = name;
//       this.age = age;
//   }

//   // Method: Defines behavior
//   greet() {
//       console.log(`Hello, my name is ${this.name}.`);
//   }

//   // Getter: Access a property
//   get info() {
//       return `${this.name} is ${this.age} years old.`;
//   }

//   // Setter: Update a property
//   set updateAge(newAge) {
//       this.age = newAge;
//   }

//   // Static Method: Belongs to the class, not an instance
//   static description() {
//       return "A class for creating person objects.";
//   }
// }

// // Create an instance of the class
// const john = new Person("John", 30);
// john.greet(); // Output: Hello, my name is John.

// console.log(john.info); // Output: John is 30 years old.
// john.updateAge = 31; // Update age using setter
// console.log(john.info); // Output: John is 31 years old.

// console.log(Person.description()); // Static method: Output: A class for creating person objects.

exports.getAllTours = async (req, res) => {
  try {
    //Build query
    //1).Filtering Normally
    // console.log(req.query);
    // const queryObj = { ...req.query }; //This is know as shalow mapping
    // const excludeFields = ['page', 'sort', 'limit', 'fields'];
    // excludeFields.forEach((el) => delete queryObj[el]);
    // console.log(queryObj);
    // //1.1).Advance filtering in this we will be handling the graterthan and lessthan
    // let queryStr = JSON.stringify(queryObj); //since here we are taking the req.query therefore will convert it to string
    // queryStr = queryStr.replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   (match) => `$${match}`,
    // ); //this is the regex expression
    // console.log('line number 83', JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));

    // //2)Sorting the query
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join(' ');
    //   console.log(sortBy);
    //   query = query.sort(sortBy); //sort here is a mongoose method
    // } else {
    //   query = query.sort('-crecreatedAt');
    // }

    // //3)Field limiting it will only show that fields that we want to see
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }
    // 4) Pagination it basically means here we are just adding the page number and limit of number of results
    //page=3 &limit=10 ,1-10 ,page 1 ,11-20 ,page 2
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit); //here skip and limit are the mongoose method that we use
    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('There are not enough results');
    // }

    //-------------------------------------------------------------------------------------------------------------------------------------
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitingField()
      .pagination();
    //Execute the query
    const tours = await features.query;
    //find method is used to retieve all the data from backend
    //  const tours =await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');
    //There are some by default mongoose method like where and easy
    //Responce
    res.status(200).json({
      status: 'success',
      data: {
        length: tours.length,
        tour: tours,
        name: req.archit, //This I got from the middleware in app.js class
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTourId = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); //It is used to get only one data based on the id  it is same as //Tours.findOne({_id:req.params.id})
    res.status(200).json({
      status: 'Success',
      data: tour,
      archit,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  // console.log(req.params);
  // //req.param take parameter from the url that is nothing but :id

  // const id = req.params.id * 1; //Initally id was string { id: '4' } to this we are doing to convert into number

  // // if (id > tours.length) {
  // //   //here we are cheking if id is bevond the tours length
  // //   return res.status(404).send('Failed');
  // // }
  // // const tour = tours.find((el) => el.id === id);
  // // res.status(200).json({
  // //   status: 'success',
  // //   data: tour,
  // // });
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const deltours = await Tour.findByIdAndDelete(req.params.id);
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      updatedtour: tours,
      length: tours.length, //This is the updated length when
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        //Each stage is like an object
        $match: { price: { $gt: 1000 } }, // It decreases the data on the basis of condition
      },
      {
        $group: {
          _id: '$difficulty', //id:{$toUpper:'$difficulty'}
          count: { $sum: 1 }, // It add +1 to every occurence in the group
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
        
      },{
        $sort:{avgPrice:-1}
      },
      // {
      //   $match:{_id:{$ne:'difficult'}}
      // }
      
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
