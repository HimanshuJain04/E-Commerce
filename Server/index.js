// import
const express = require('express');
const { dbConnection } = require('./config/dbConnection');
const { cloudinaryConn } = require('./config/cloudinary');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const fileUpload = require('express-fileupload');


// import routes
const authRoute = require('./routes/authRoute');
const tagRoute = require('./routes/tag');
const categoryRoute = require('./routes/category');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const adminRoute = require("./routes/adminRoute");


// extras
const app = express();
const PORT = process.env.PORT || 5000;


// use middlewares
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: "/tmp/"
    }
));



// mounting the routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);



// calling the database and cloudinary
dbConnection();
cloudinaryConn();


// server is listening
app.listen(PORT, () => {
    console.log("Server listening on port : ", PORT);
});


// default routes
app.get("/", (req, res) => {
    res.send("E-Commerce Default Route");
});



// TODOS:
// remove old image from clodinary when user chnage his profile image samw with product when deleted
// create logout route


