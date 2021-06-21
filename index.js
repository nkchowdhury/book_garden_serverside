const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

require('dotenv').config();

const port = 4000




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.trj6m.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})
 










const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookCollections = client.db("bookGarden").collection("bookDetails");
  const orders = client.db("bookGarden").collection("orders")
  

app.get("/books", (req, res) => {

  bookCollections.find()
  .toArray((err, books) => {
    
    res.send(books)
    console.log(books)
  })


})




app.post("/addBook", (req, res) => {

  const newBook = req.body;
  console.log("adding new book:", newBook  )

  bookCollections.insertOne(newBook)
  .then(result => {
    console.log("result count", result.insertedCount)
    res.send(result.insertedCount > 0)
  })

})



  // console.log("db connected successfully")
  // client.close();



// delete product from database

app.delete('/deleteProduct/:id', (req, res) => {
  const id = ObjectId(req.params.id);
  bookCollections.deleteOne({ _id: id })
     .then((result) => {
       console.log(result);
         res.send(result.deletedCount > 0)
     })
})





//order send to data base
app.post('/addOrder',(req,res) =>{
  const order=req.body;
  //console.log('adding new product',event);
  orders.insertOne(order)
  .then(result =>{
    //console.log('inserted Count',result.insertedCount)
      res.send(result.insertedCount >0)
  })
})



//Show Order on Ui

app.get('/orders',(req,res)=>{

  // console.log(req.query.email)

  orders.find({email: req.query.email})
  .toArray((err,documents) =>{
    res.send(documents)
  })


})


});








app.listen(process.env.PORT ||  port)