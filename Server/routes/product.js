const express = require('express');
const router = express.Router();

const { createProduct } = require("../controllers/product");
const { getAllProducts } = require("../controllers/product");
const { getProductById } = require("../controllers/product");
const { getSimilarProducts } = require("../controllers/product");
const { getProductByTag } = require("../controllers/product");
const { getProductsByCategory } = require("../controllers/product");
const { getTopSellingProducts } = require("../controllers/product");
const { getProductsBySearch } = require("../controllers/product");

router.post("/createProduct", createProduct);

router.get("/getAllProducts", getAllProducts);

router.get("/getProductById/:id", getProductById);

router.get("/getSimilarProducts/:productId", getSimilarProducts);

router.get("/getTopSellingProducts/:tagId", getTopSellingProducts);

router.get("/getProductsByTag/:tagId", getProductByTag);

router.get("/getProductsByCategory/:categoryId", getProductsByCategory);

router.get("/getProductsBySearch/:query", getProductsBySearch);





module.exports = router;
