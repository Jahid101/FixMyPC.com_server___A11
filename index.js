const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome (^.^)');
})


app.listen(PORT)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9v095.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const serviceCollection = client.db("fixmypc").collection("services");
  const feedbackCollection = client.db("fixmypc").collection("feedbacks");
  const adminCollection = client.db("fixmypc").collection("admins");
  const orderCollection = client.db("fixmypc").collection("orders");


  app.post('/addService', (req, res) => {
    const newService = req.body;
    serviceCollection.insertOne(newService)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.get('/service', (req, res) => {
    serviceCollection.find()
      .toArray((err, services) => {
        res.send(services);
      })
  })


  app.get('/serviceBooking/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    serviceCollection.find({ _id: id })
      .toArray((err, products) => {
        res.send(products[0]);
      })
  })


  app.post('/addFeedback', (req, res) => {
    const newFeedback = req.body;
    feedbackCollection.insertOne(newFeedback)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.get('/feedback', (req, res) => {
    feedbackCollection.find()
      .toArray((err, feedbacks) => {
        res.send(feedbacks);
      })
  })


  app.post('/addAdmin', (req, res) => {
    const newAdmin = req.body;
    adminCollection.insertOne(newAdmin)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.get('/admin', (req, res) => {
    adminCollection.find()
      .toArray((err, admins) => {
        res.send(admins);
      })
  })


  app.post('/addOrder', (req, res) => {
    const newOrder = req.body;
    orderCollection.insertOne(newOrder)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.delete('/deleteService/:id', (req, res) => {
    const id = ObjectID(req.params.id)
    serviceCollection.deleteOne({ _id: id })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })


});
