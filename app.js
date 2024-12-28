const express = require('express');

const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.static(`${__dirname}/public`));

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Creating own middleware
app.use((req, res, next) => {
  //next can also be written as x or n
  console.log('Middleware function is  working');
  next();
});
app.use((req, res, next) => {
  req.sam = new Date().toISOString();
  req.archit = req.url;
  next();
});
//This is the http request that we want to access
// app.get('/',(req,res)=>{
//   res.status(200).json({message:"Hello from the server",app:"Guruji",surnam:"Gaur"},

//   );
// });
// app.post('/',(req,res)=>{
//     console.log(req.body);
//     res.send(req.body);

// })

//handling Get request

//If not add JSON.parse it will treat data as Buffer and post adding it , converts it into array
//Refactoring our code it means creating function for all the routes.

//Users Function----------------------------------------------------------------------------------------------------

//Creating Router Post defining the router we will replace it with app

//They are now defined in seprate classes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//route in node js

//Users Routes
//app.get('/api/v1/tours', getAllTours);
//Responding to URL parameter
//app.get('/api/v1/tours/:id', getTourId);
//Handling Post call
//app.post('/api/v1/tours',createTour)
//Patch request it is used to update the request
//app.patch('/api/v1/tours/:id',updateTour)
//Delete request it is used to remove a particular data from dataset
//app.delete('/api/v1/tours/:id', deleteTour);

//File has been restructed added a controller and router file

module.exports = app;
