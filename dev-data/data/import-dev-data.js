const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel.js');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    dbName: 'backendPractice', // Here I define the db name by default it would be test
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connection) ///
    console.log('Connection Successful');
  });

//Read JSON File

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);
//Import Data into Data base

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data Successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
//Delete all the data from Collection

const deleteData = async () => {
  try {
    await Tour.deleteMany(); //It deletes all the data in the collection
    console.log('data Successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);

///Read Me file

// In this we have the whole data of this file and its usage

// here we are making an external script throught which we can directly add data in backend rather that earlier time we added data through post method,

// Import points on this:

// when in comamnd line we wrote --import the importData() function works and --delete the deleteData() function runs

// process.argv its used to provide an array of the cmd that we have entered in the terminal 