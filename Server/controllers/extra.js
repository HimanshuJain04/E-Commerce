const useragent = require('useragent');
const Browser = require("../models/browser");
const Users = require("../models/user");


// Helper function to determine if the User-Agent corresponds to a mobile device
function isMobile(userAgent) {
    return userAgent.includes('Mobile');
}

exports.getGenderData = async (req, res) => {
    try {

        // Query all user documents
        const users = await Users.find();

        const gender = {
            male: 0,
            female: 0,
            other: 0
        };


        users.forEach(user => {
            const userGender = user.gender.toLowerCase();

            if (userGender === 'male') {
                gender.male++;

            } else if (userGender === 'female') {
                gender.female++;

            } else {
                gender.other++;
            }
        });

        return res.status(200).json(
            {
                success: true,
                data: gender,
                mesage: "User gender fetched successfully"
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                mesage: "User gender fetched failed",
                error: err.message
            }
        )
    }
}


exports.getUserAgentsData = async (req, res) => {
    try {

        // Query all browser documents
        const browsers = await Browser.find();

        // Count visits by device type
        const visitsByDevice = {
            desktop: 0,
            mobile: 0,
            tablet: 0,
            other: 0 // Optionally, handle other device types
        };


        // Iterate through browser documents and categorize by device type
        browsers.forEach(browser => {
            const userAgent = browser.userAgent.toLowerCase();

            // Check if user agent contains keywords indicating device type
            if (userAgent.includes('mobile')) {
                visitsByDevice.mobile++;
            } else if (userAgent.includes('tablet')) {
                visitsByDevice.tablet++;
            } else if (userAgent.includes('macintosh') || userAgent.includes('windows')) {
                visitsByDevice.desktop++;
            } else {
                visitsByDevice.other++;
            }
        });

        return res.status(200).json(
            {
                success: true,
                data: visitsByDevice,
                mesage: "User agent fetched successfully"
            }
        )

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                mesage: "User agent fetched failed",
                error: err.message
            }
        )
    }
}

exports.saveUserAgent = async (req, res) => {
    try {

        const agent = useragent.parse(req.headers['user-agent']);

        const { family, major, minor, patch, source } = agent;

        // Create a new Browser document
        const browser = new Browser({
            browserFamily: family,
            browserMajorVersion: major,
            browserMinorVersion: minor,
            browserPatchVersion: patch,
            userAgent: source,
        });

        await browser.save();

        return res.status(200).json(
            {
                success: true,
                mesage: "User agent saved successfully"
            }
        )


    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                error: err.message,
                mesage: "User agent saved failed"
            }
        )
    }
}
