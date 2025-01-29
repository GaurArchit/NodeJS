const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController.js');

//Here in place of app we are using router  and param is a middlerware which picks up the param entered in the url
//router.param('id', ); //It run for every router but only takes those route which have param value  as its a middleware

router //Here we added a route path and then added the middleware which would automatically add the query parameters in the url
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTourId)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
