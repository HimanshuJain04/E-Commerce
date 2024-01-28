const useragent = require('useragent');
const Browser = require("../models/browser");


// Helper function to determine if the User-Agent corresponds to a mobile device
function isMobile(userAgent) {
    return userAgent.includes('Mobile');
}

exports.getUserAgentsData = async (req, res) => {
    try {

        // Query the database to retrieve browser data
        const browsers = await Browser.find({});

        // Analyze User-Agent data and categorize users
        const desktopUsers = [];
        const mobileUsers = [];

        browsers.forEach(browser => {
            if (isMobile(browser.userAgent)) {
                mobileUsers.push(browser);
            } else {
                desktopUsers.push(browser);
            }
        });

        // Format categorized user data
        const userData = {
            desktopUsers: desktopUsers.length,
            mobileUsers: mobileUsers.length
        };

        return res.status(200).json(
            {
                success: true,
                data: userData,
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