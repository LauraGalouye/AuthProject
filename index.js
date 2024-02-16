const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user.routers');

const app = express();



const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use(userRouter);



const uri = "mongodb+srv://lauragalouye:RZ6kS4M9UjZCzpm0@cluster0.zae484n.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {useUnifiedTopology: true })
  .then(() => {
    console.log("Connecté à la base de données MongoDB");
    
  })
  .catch((err) => console.error("Erreur de connexion à la base de données MongoDB:", err));


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})



