const express = require('express');
const router = express.Router();

const { isAdmin } = require("../middleware/admin");


router.get("/", (req, res) => {
    res.send("admin")
})

router.use(isAdmin);

// protected routes





module.exports = router;