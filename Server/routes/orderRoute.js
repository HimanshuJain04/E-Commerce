const express = require('express');

const {
    getAllOrders,
    updateProductStatus,
    deleteOrderbyId,
    generateDailySalesReport,
    getTotalRevenueAndTotalOrders,
} = require("../controllers/order");

const router = express.Router();


router.get("/getAllOrders", getAllOrders);

router.post("/updateProductStatus", updateProductStatus);

router.get("/getTotalRevenueAndTotalOrders", getTotalRevenueAndTotalOrders);


router.post("/deleteOrderbyId/:id", deleteOrderbyId);


router.get("/getSalesReportOnDayBasis", generateDailySalesReport);





module.exports = router;