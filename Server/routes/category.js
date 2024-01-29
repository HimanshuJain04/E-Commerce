const express = require('express');
const router = express.Router();

const {

    getAllCategory,
    createCategory,
} = require("../controllers/category");

router.post("/createCategory", createCategory);
router.get("/getAllCategory", getAllCategory);

module.exports = router;
