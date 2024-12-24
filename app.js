const express= require('express');
const fs =require('fs')
const app=express();
app.use(express.json());
app.use(express.text());
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
const tours =JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
//If not add JSON.parse it will treat data as Buffer and post adding it , converts it into array 
app.get('/api/v1/tours',(req,res)=>{
 res.status(200).json({
  status:'Success',
  results:tours.length,
  data: {
    tours:tours
  }
 })
});

//Responding to URL parameter
app.get('/api/v1/tours/:id',(req,res)=>{

  console.log(req.params)
  //req.param take parameter from the url that is nothing but :id 

  const id =req.params.id*1; //Initally id was string { id: '4' } to this we are doing to convert into number 

  if(id>tours.length){//here we are cheking if id is bevond the tours length 
    return res.status(404).send("Failed")
  }
  const tour =tours.find(el=>el.id===id);
  res.status(200).json({
    status:"success",
    data:tour
  })

 });

//Handling Post call

app.post('/api/v1/tours',(req,res)=>{
  //console.log(req.body);
  const newId= tours[tours.length-1].id +1;
  const newTour=Object.assign({id:newId},req.body)
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
    res.status(201).json({
      status:'success',
      data:{
        tour:newTour
      }
    })
  })
  
})

//Patch request it is used to update the request 
app.patch('/api/v1/tours/:id',(req,res)=>{

  if(req.params.id*1 >tours.length){
    return res.status(404).json({
      status:'fail',
      message:'Invalid ID '
    })
  }
  res.status(200).json({
    status:"success",
    data:{
      tour:'<Updated tour here>'
    }
  })
})

//Delete request it is used to remove a particular data from dataset

app.delete('/api/v1/tours/:id',(req,res)=>{

  if(req.params.id*1 >tours.length){
    return res.status(404).json({
      status:'fail',
      message:'Invalid ID '
    })
  }
  res.status(204).json({
    status:"success",
    data:null
  })
})


const port =3000
app.listen(port,()=>{
    console.log(`App is running on the server${port}...`);
});


