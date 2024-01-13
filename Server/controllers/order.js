const Order = require("../models/order");

exports.updateProductSale = async (orderId) => {
    try {
        const order = await Order.findById(orderId).populate('category.product');

        order.products.forEach(({ product, quantity }) => {
            // Update the sales count for each product in the order
            product.sales += quantity;
            product.save();
        });


    } catch (err) {
        console.log("Update Product Sales Failed");
        console.log(err);
    }
}

