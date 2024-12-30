const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController.js');

//Here in place of app we are using router  and param is a middlerware which picks up the param entered in the url
//router.param('id', ); //It run for every router but only takes those route which have param value  as its a middleware

router
  .route('/')
  .get(tourController.getAllTours)
  .post( tourController.createTour); //Checkbody is a POST specific middle ware

router
  .route('/:id')
  .get(tourController.getTourId)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
