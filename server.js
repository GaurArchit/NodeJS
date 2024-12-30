const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    dbName:"backendPractice", // Here I define the db name by default it would be test 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log(con.connection)
    console.log('Connection Successful');
  });

//Notes :

  // Schema in Mongo DB is the that defines the type of table that willbe formed in the backend 
  //   here we can define the table or collection configuration it can be either single line or in detailed as defined here 


  const toursSchema =new mongoose.Schema({
    name:{
      type:String,
      required:[true,'A tour must have a price'],
      unique:true
    },
    rating:{
      type:Number,
      default:4.5
    },
    price:{
      type:Number,
      required:[true,'A tour must have a price ']
    }
  });
 //Model here we define the table or collection name that is to be used eg here we use Tours here 
  const Tour =mongoose.model('Tour',toursSchema);
  
  const testTour =new Tour({
    name:"Archit Gaur",
    rating:4.7,
    price:497
  })
 //Save method is used to send the data to the table 
  testTour.save().then((doc)=>{
    console.log(doc)
  })


const app = require('./app');
//console.log(process.env);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is running on the server${port}...`);
});
