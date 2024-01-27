const useragent = require('useragent');
const Browser = require("../models/browser");


exports.saveUserAgent = async (req, res) => {
    try {

        const agent = useragent.parse(req.headers['user-agent']);
        console.log("Agent : ", agent)

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
                success: true
            }
        )


    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                error: err.message
            }
        )
    }
}