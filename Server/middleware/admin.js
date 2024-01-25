const User = require("../models/user");

exports.isAdmin = async (req, res, next) => {
    try {

        const id = req.user;
        console.log("User : Amdin : ", id)

        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json(
                {
                    success: false,
                    message: "User not found"
                }
            )
        }

        if (user.role !== "Admin") {
            return res.status(400).json(
                {
                    success: false,
                    message: "User is not admin"
                }
            )
        }

        next();

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Admin middleware failed",
                error: err.message
            }
        )
    }

}