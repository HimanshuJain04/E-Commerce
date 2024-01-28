const express = require('express');

const {
    getAllOrders,
    updateProductStatus,
    deleteOrderbyId,
    generateDailySalesReport,
} = require("../controllers/order");

const router = express.Router();


router.get("/getAllOrders", getAllOrders);

router.post("/updateProductStatus", updateProductStatus);

router.post("/deleteOrderbyId/:id", deleteOrderbyId);


router.get("/getSalesReportOnDayBasis", generateDailySalesReport);





module.exports = router;