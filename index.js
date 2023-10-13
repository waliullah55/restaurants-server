const express = require("express");
const myPath = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;

myPath.use(cors());
myPath.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4njvdfp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menuCollection = client.db('restaurentManage').collection('menu');
    const reviewCollection = client.db('restaurentManage').collection('reviews');

    myPath.get('/menu',  async(req, res) => {
        const result = await menuCollection.find().toArray();
        res.send(result);
    })
    myPath.get('/reviews', async(req, res) => {
        const result = await reviewCollection.find().toArray();
        res.send(result);
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

myPath.get("/", (req, res) => {
  res.send("reastaurent is opning...........");
});
myPath.listen(port, (req, res) => {
  console.log(`restaurent is opening on PORT: `, port);
});
