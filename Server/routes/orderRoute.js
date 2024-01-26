const express = require('express');

const {
    getAllOrders,
    updateProductStatus
} = require("../controllers/order");

const router = express.Router();


router.get("/getAllOrders", getAllOrders);
router.post("/updateProductStatus", updateProductStatus);



module.exports = router;