require("dotenv").config();
const express = require('express');
const cors = require("cors");
const connectDB = require("./config/db.js");
const jobRoutes = require("./Routes/jobtracker.route.js");
const errorHandler = require("./middlewares/errorHandler.js");
const AppError = require("./utils/AppError.js");

const app = express();
connectDB();
app.use(express.json());

const options = {
    origin: "*",
    credentials: true,
}
app.use(cors(options));



app.use("/api/jobs", jobRoutes);


app.all(/.*/, (req, res, next) => {
    next (new AppError("Page not found", 404))
  });
  

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log("Server is listening on port: ", port);
});