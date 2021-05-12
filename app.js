const express = require('express');
const app =express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const dbService=require('./dbservice');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// create 
app.post('/insert', (request,response) => {
    
   
    const { id,name,venue,time,seats,cost } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(id,name,venue,time,seats,cost);

    result
    .then(data => response.json({success : true}))
    .catch(err => console.log(err));
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})
//update
//delete

app.delete('/delete/:ID',(request,response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();
    const result = db.deleteRowById(id);
   
  //  app.listen(process.env.PORT, () => 
  //console.log(result);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})


app.listen(process.env.PORT, () => console.log('app is running'));
