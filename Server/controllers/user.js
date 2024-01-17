const Product = require("../models/product");
const User = require("../models/user");
const RatingAndReview = require("../models/rating_review");
const { ObjectId } = require('mongodb'); // Note the correct casing

// update the user
exports.updateUserAddress = async (req, res) => {
    try {

        const { name, city, country, state, pincode, nearBy, street, phoneNo, userId } = req.body;

        const user = await User.findByIdAndUpdate(
            { _id: userId },
            {
                $push: {
                    address: {
                        name: name,
                        city: city,
                        state: state,
                        pincode: pincode,
                        nearBy: nearBy,
                        street: street,
                        phoneNo: phoneNo,
                        country: country
                    },
                }
            },
            { new: true }
        ).populate("wishlists")
            .populate("carts.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            ).exec();

        if (!user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "User not found",
                    error: "User not found",
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "User address update successfully",
                data: user,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "user address update failed",
                error: err.message,
            }
        )
    }
}


// getAllUserData
exports.getAllUserData = async (req, res) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId)
            .populate("wishlists")
            .populate("carts.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            )
            .exec();

        if (!user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "User not found",
                    error: "User not found",
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Get all user product data successfully",
                data: {
                    wishlists: user.wishlists,
                    carts: user.carts,
                    orders: user.orders,
                },
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Get all user product data failed",
                error: err.message,
            }
        )
    }
}


// Wishlist Controllers
exports.addToWishlist = async (req, res) => {
    try {

        const { userId, productId } = req.body;

        const user = await User.findByIdAndUpdate(
            { _id: userId },
            {
                $push: {
                    wishlists: productId,
                }
            },
            { new: true }
        ).populate("wishlists")
            .populate("carts.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            ).exec();

        if (!user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "User not found",
                    error: "User not found",
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Add to wishlist successfully",
                data: user,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "add to wishlist failed",
                error: err.message,
            }
        )
    }
}


exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        const user = await User.findByIdAndUpdate(
            { _id: userId },
            {
                $pull: {
                    wishlists: productId
                }
            },
            { new: true }
        ).populate("wishlists")
            .populate("carts.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            ).exec();

        if (!user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "User not found",
                    error: "User not found",
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "remove from wishlist successfully",
                data: user,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "remove from wishlist failed",
                error: err.message,
            }
        )
    }
}


// Cart Controllers
exports.addToCart = async (req, res) => {
    try {

        const { productId, userId } = req.body;

        const product = await Product.findById(productId);
        const user = await User.findById(userId);

        if (!product || !user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "product or user not found",
                    error: " product or user not found",
                }
            )
        }

        // check product is already in user cart or not
        const cartItem = user.carts.find(item => item.product._id.equals(productId));

        if (cartItem) {
            // If the product is already in the cart, update the quantity
            cartItem.quantity += 1;
        } else {
            // If the product is not in the cart, add a new item
            user.carts.push({
                product: product,
                quantity: 1
            });
        }

        await user.save();

        const data = await User.findById(userId)
            .populate("wishlists")
            .populate("carts.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            ).exec();

        return res.status(200).json(
            {
                success: true,
                message: "Add to cart successfully",
                data: data,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "add to cart failed",
                error: err.message,
            }
        )
    }
}


exports.removeFromCart = async (req, res) => {
    try {

        const { productId, userId } = req.body;

        let user = await User.findById(userId);

        if (!user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "user not found",
                    error: "user not found",
                }
            )
        }

        // check product is already in user cart or not
        const updatedCart = user.carts.filter(cartItem => cartItem?._id.toString() !== productId);

        user.carts = updatedCart;

        await user.save();


        user = await User.findById(userId)
            .populate("wishlists")
            .populate("carts.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            ).exec();

        return res.status(200).json(
            {
                success: true,
                message: "remove from cart successfully",
                data: user,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "remove from wishlist failed",
                error: err.message,
            }
        )
    }
}


exports.descreaseFromCart = async (req, res) => {
    try {

        const { cartItemId, userId } = req.body;

        let user = await User.findById(userId);

        if (!user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "user not found",
                    error: "user not found",
                }
            )
        }

        // check product is already in user cart or not
        const cartItem = user.carts.find(item => item?._id.equals(cartItemId));



        if (cartItem.quantity === 1) {

            const updatedCart = user.carts.filter(cartItem => cartItem?._id.toString() !== cartItemId);
            user.carts = updatedCart;

        } else {
            cartItem.quantity = cartItem.quantity - 1;
        }

        await user.save();

        user = await User.findById(userId)
            .populate("wishlists")
            .populate("carts.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            ).exec();


        return res.status(200).json(
            {
                success: true,
                message: "descrease from cart successfully",
                data: user,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "descrease from cart failed",
                error: err.message,
            }
        )
    }
}

// Order Controllers
// TODO: remove this method when
exports.getAllOrders = async (req, res) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(500).json(
                {
                    success: false,
                    message: "User not found",
                    error: "User not found",
                }
            )
        }

        return res.status(200).json(
            {
                success: true,
                message: "Add to wishlist successfully",
                data: user.wishlists,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "add to wishlist failed",
                error: err.message,
            }
        )
    }
}


// TODO:Upadte it for only one time use
// rating and review
exports.updateRatingAndReview = async (req, res) => {
    try {

        const { rating, review, productId, userId } = req.body;
        const ratingInt = parseInt(rating);

        let user = await User.findById(userId).populate("orders").exec();
        const product = await Product.findById(productId).populate("rating_review").exec();

        if (!user || !product) {
            return res.status(500).json(
                {
                    success: false,
                    message: "User or product not found",
                    error: "User or product not found",
                }
            )
        }

        const ratingReview = await RatingAndReview.create(
            {
                user: user._id,
                product: product._id,
                rating: rating,
                review: review
            }
        );


        const totalRating = (product.rating_review.reduce((acc, entry) => acc + entry.rating, 0))

        const avg = (totalRating + ratingInt) / (product.rating_review.length + 1);

        product.rating_review.push(ratingReview);
        product.averageRating = avg;

        const matchingProduct = user.orders
            .map(order =>
                order.products.find(product =>
                    new ObjectId(product.product).equals(new ObjectId(productId))
                )
            )
            .filter(product => product !== undefined)[0];

        matchingProduct.isReviewed = true;

        await user.save();

        await product.save();

        await Product.findById(productId)
            .populate("rating_review")
            .exec();

        user = await User.findById(userId)
            .populate("wishlists")
            .populate("carts.product")
            .populate(
                {
                    path: 'orders',
                    populate: {
                        path: 'products.product',
                        model: 'Product',
                    },
                }
            )
            .exec();


        return res.status(200).json(
            {
                success: true,
                message: "update rating and review successfully",
                data: user,
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "update rating and review failed ",
                error: err.message,
            }
        )
    }
}