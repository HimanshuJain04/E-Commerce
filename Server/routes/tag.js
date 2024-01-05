const express = require('express');
const router = express.Router();

const { createTag } = require("../controllers/tag");
const { getAllTags } = require("../controllers/tag");

router.post("/createTag", createTag);
router.get("/getAllTags", getAllTags);


module.exports = router;
