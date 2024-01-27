const express = require('express');
const router = express.Router();

const {
    saveUserAgent,
    getUserAgentsData,

}
    = require("../controllers/extra");

router.get("/saveUserAgent", saveUserAgent);
router.get("/getUserAgentsData", getUserAgentsData);


module.exports = router;

