const express = require('express');
const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
//This perticular middleware runs for every route on tourrouter file
exports.checkID = (req, res, next, id) => {
  console.log(`Tour is ${id}`);
  if (id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID ',
    });
  }

  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name and price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestdAt: req.sam,
    name: req.archit,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
exports.getTourId = (req, res) => {
  console.log(req.params);
  //req.param take parameter from the url that is nothing but :id

  const id = req.params.id * 1; //Initally id was string { id: '4' } to this we are doing to convert into number

  if (id > tours.length) {
    //here we are cheking if id is bevond the tours length
    return res.status(404).send('Failed');
  }
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: tour,
  });
};
exports.createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
          name: req.body.name,
          price: req.body.price,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
