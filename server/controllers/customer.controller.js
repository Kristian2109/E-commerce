const bcrypt = require("bcrypt");
const User = require("../models/customer.model");
const Address = require("../models/address.model");
const verifyAuthentication = require("../middleware/verifyAuth");
const uuidv4 = require("uuid").v4;
const { isValidUserData } = require("../utils/verifyData");
const { sendRegistrationMessage, sendInternalServerErrorMessage } = require("../utils/helpers");
const redisClient = require("../config/redis")

const SESSION_DURATION = 10 * 24 * 3600;
const VERIFICATION_TIMEFRAME = 3600 * 1000;

async function loginUserHttp(req, res) {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        const user = await User.getUserByEmail(email);

        if (user.length == 0) {
            return res.status(401).json({error: "Not such email", success: false});
        }
        console.log(user.id);

        const isVerified = await bcrypt.compare(password, user.password);

        if (!isVerified) {
            return res.status(401).json({error: "False password", success: false});
        }

        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        const sessionId = uuidv4();
        res.cookie("sessionId", sessionId, {
            maxAge: SESSION_DURATION,
            httpOnly: true
        });

        await redisClient.setEx(`SessionId:${sessionId}`, SESSION_DURATION, JSON.stringify(payload));
        return res.status(200).json({msg:"Login successful!", data: payload, success: false});
    } catch (error) {
        return sendInternalServerErrorMessage(res, error);
    }
}

async function registerUserHttp(req, res) {
    try {
        const { email, password, firstName, lastName, phoneNumber } = req.body;

        if (!isValidUserData(email, firstName, lastName, password, phoneNumber)) {
            return res.status(401).json({error: "Invalid credentials!", success: false});
        }

        const user = await User.getUserByEmail(email);

        if (user) {
            return res.status(403).json({error: "User already registered!", success: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {email, hashedPassword, firstName, lastName, phoneNumber};

        await redisClient.setEx(`UnverifiedUser:${email}`, VERIFICATION_TIMEFRAME, JSON.stringify(userData));

        const urlForVerification = `http://localhost:3000/api/v1/auth/verifyRegistration/${email}`;

        sendRegistrationMessage(urlForVerification, email);
        return res.status(200).json({msg: "Waiting for verification on the email address!", success: true});

    } catch (error) {
        console.log(error.message);
        return res.status(501).json({error: "Internal server error!", success: false});
    }
}

async function verifyRegistrationHttp(req, res) {
    try {
        const email = req.params.email;
        console.log(email);
        let user = await redisClient.get(`UnverifiedUser:${email}`);

        if (!user) {
            return res.status(401).json({error: "Invalid email!", success: false});
        }

        user = JSON.parse(user);
        console.log(user);

        await User.create(user.email, user.hashedPassword, user.firstName, user.lastName, user.phoneNumber, 3);

        return res.status(200).json({msg: "Registration completed!", success: true});
        
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function updateCustomerAddressHttp(req, res) {
    try {
        const { city, country, streetName, streetNumber, postalCode, customerId, addressNumber } = req.body;
        
        const result = await Address.handleAddressCreationAndAssignment(city, country, streetName, streetNumber, postalCode, customerId, addressNumber);

        return res.status(200).json({data: result, msg: "Address update completed!", success: true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function updateCustomerDetailsHttp(req, res) {

}

async function deleteCustomerProfileHttp(req, res) {

}

async function logoutCustomerHttp(req, res) {

}

module.exports = {
    loginUserHttp,
    registerUserHttp,
    logoutCustomerHttp,
    verifyRegistrationHttp,
    updateCustomerAddressHttp,
    updateCustomerDetailsHttp,
    deleteCustomerProfileHttp
}