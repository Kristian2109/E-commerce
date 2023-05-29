require("dotenv").config();
const redisClient = require("../config/redis");
const { sendInternalServerErrorMessage } = require("../utils/helpers");

async function verifyAuth(req, res, next) {
    try {
        const sessionId = req.cookies?.sessionId;

        if (!sessionId) {
            return res.status(401).json({error: "No sessionId, Please logIn!", success: false});
        }
        
        let user = await redisClient.get(`SessionId:${sessionId}`);

        if (!user) {
            return res.status(401).json({error: "False sessionId!", success: false});
        }

        user = JSON.parse(user);

        req.user = user;
        next();
    } catch (error) {
        return sendInternalServerErrorMessage(res, error);
    }
}

module.exports = {
    verifyAuth
}