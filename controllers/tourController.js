const express = require('express');
const Tour = require('./../models/tourModel.js'); //Model has been defined in tourModel class here we are importing it as we need to perform CURD opertation
const fs = require('fs');

(exports.createTour = async (req, res) => {
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
}),
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

  (exports.getAllTours = async (req, res) => {
    try {
      const tours = await Tour.find(); //find method is used to retieve all the data from backend
      res.status(200).json({
        status: 'success',
        data: {
          tour: tours,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  });
exports.getTourId = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); //It is used to get only one data based on the id  it is same as //Tours.findOne({_id:req.params.id})
    res.status(200).json({
      status: 'Success',
      data: tour,
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

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour: '<Updated tour here>',
    // },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
