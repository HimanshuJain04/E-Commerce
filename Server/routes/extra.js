const express = require('express');
const router = express.Router();

const { saveUserAgent } = require("../controllers/extra");

router.get("/saveUserAgent", saveUserAgent);


module.exports = router;
