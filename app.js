const express = require('express');
const app = express();
require("dotenv").config();
const appRoutes = require("./routes/app_routes");
const assoc = require("./utils/assoc_db");
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(appRoutes);const cors = require('cors');
app.use(cors());

app.use(appRoutes);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


assoc()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running in port ${PORT}`);
        });
    
    })
    .catch((error) => {
        console.log(error.message);
    });
