const express = require('express');
const router = express.Router();

const { createProduct } = require("../controllers/product");
const { getAllProducts } = require("../controllers/product");
const { getProductById } = require("../controllers/product");
const { getRelatedProducts } = require("../controllers/product");

router.post("/createProduct", createProduct);

router.get("/getAllProducts", getAllProducts);

router.get("/getProductById/:id", getProductById);

router.get("/getRelatedProducts/:id", getRelatedProducts);


module.exports = router;
