const cloudinary = require('cloudinary').v2;

exports.uploadFileToCloudinary = async (file, folder) => {
    const options = { folder };
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};

exports.uploadMultipleFile = async (images, folder) => {
    return Promise.all(images.map((image) => {
        return this.uploadFileToCloudinary(image, folder); // Make sure to return the promise
    }))
        .then((values) => {
            return values; // Return the values from the resolved promise
        })
        .catch((err) => {
            console.error("Error uploading files:", err);
            throw err; // Rethrow the error to propagate it
        });
};
