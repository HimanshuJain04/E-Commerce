const express = require('express');
const router = express.Router();

const {
    saveUserAgent,
    getGenderData,
    getUserAgentsData,
}
    = require("../controllers/extra");

router.get("/saveUserAgent", saveUserAgent);

router.get("/getUserAgentsData", getUserAgentsData);

router.get("/getGenderData", getGenderData);

module.exports = router;

