const express = require('express');

const {
    getAllOrders,
    updateProductStatus,
    deleteOrderbyId,
    getTodaysDetails,
    generateDailySalesReport,
    getLatestOrders,
    getCategoryStats,
    getTagStats,
    getTotalDetails,
} = require("../controllers/order");

const router = express.Router();


router.get("/getAllOrders", getAllOrders);

router.post("/updateProductStatus", updateProductStatus);

router.get("/getTotalDetails", getTotalDetails);

router.get("/getTodaysDetails", getTodaysDetails);

router.get("/getLatestOrders", getLatestOrders);

router.get("/getCategoryStats", getCategoryStats);

router.get("/getTagStats", getTagStats);

router.get("/getLatestOrders", getLatestOrders);

router.post("/deleteOrderbyId/:id", deleteOrderbyId);


router.get("/getSalesReportOnDayBasis", generateDailySalesReport);





module.exports = router;