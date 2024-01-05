const express = require('express');
const router = express.Router();

const { createCategory } = require("../controllers/category");
const { getAllCategory } = require("../controllers/category");

router.post("/createCategory", createCategory);
router.get("/getAllCategory", getAllCategory);


module.exports = router;
