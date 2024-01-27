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
const orderRoute = require("./routes/orderRoute");
const extraRoutes = require("./routes/extra");


// extras
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigin = 'http://localhost:3000'; // Update with your client's origin
const corsOptions = {
    origin: allowedOrigin,
    credentials: true, // Allow cookies to be sent
};



// use middlewares
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: "/tmp/"
    }
));

// Set Access-Control-Allow-Credentials header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


// mounting the routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/tag", tagRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/extra", extraRoutes);



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


