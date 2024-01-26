const express = require('express');

const {
    getAllOrders
} = require("../controllers/order");

const router = express.Router();


router.get("/getAllOrders", getAllOrders);



module.exports = router;