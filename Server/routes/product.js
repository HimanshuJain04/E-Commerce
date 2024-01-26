const express = require('express');
const router = express.Router();

const
    {
        getAllProducts,
        getAllProductsAtOnce,
        createProduct,
        deleteProductById,
        getProductById,
        getSimilarProducts,
        getProductByTag,
        getProductsByCategory,
        getTopSellingProducts,
        getProductsBySearch,
        getProductsByNameAndDesc,

    } = require("../controllers/product");

const { updateProductSale } = require("../controllers/order");

router.post("/createProduct", createProduct);

router.get('/getAllProducts', getAllProducts);

router.get('/getAllProductsAtOnce', getAllProductsAtOnce);

router.delete('/deleteProductById/:id', deleteProductById);

router.post("/updateProductSale", updateProductSale);

router.get("/getProductById/:id", getProductById);

router.get("/getSimilarProducts/:productId", getSimilarProducts);

router.get("/getTopSellingProducts/:tagId", getTopSellingProducts);

router.get("/getProductsByTag/:tagId", getProductByTag);

router.get("/getProductsBySearch/:query", getProductsBySearch);

router.get("/getProductsByNameAndDesc/:query", getProductsByNameAndDesc);

router.get("/getProductsByCategory/:categoryId", getProductsByCategory);





module.exports = router;
