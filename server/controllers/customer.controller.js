const bcrypt = require("bcrypt");
const Customer = require("../models/customer.model");
const Address = require("../models/address.model");
const verifyAuthentication = require("../middleware/verifyAuth");
const uuidv4 = require("uuid").v4;
const { isValidUserData, isValidName, isValidPassword } = require("../utils/verifyData");
const { sendRegistrationMessage, sendInternalServerErrorMessage } = require("../utils/helpers");
const redisClient = require("../config/redis")

const SESSION_DURATION = 10 * 24 * 3600;
const VERIFICATION_TIMEFRAME = 3600 * 1000;

async function loginUserHttp(req, res) {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        const user = await Customer.getUserByEmail(email);

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
        return res.status(200).json({msg:"Login successful!", data: payload, success: true});
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

        const user = await Customer.getUserByEmail(email);

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

        await Customer.create(user.email, user.hashedPassword, user.firstName, user.lastName, user.phoneNumber, 3);

        return res.status(200).json({msg: "Registration completed!", success: true});
        
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function changePasswordHttp(req, res) {

}

async function createRestorePasswordUrlHttp(req, res) {
    try {
        const { email } = req.body;

        const urlToken = uuidv4();
        await redisClient.setEx(`Forgotten pass, token:${urlToken}`, VERIFICATION_TIMEFRAME, JSON.stringify(email));

        const restorePasswordUrl = `http://localhost:3000/api/v1/auth/restore-password/${urlToken}`;
        
        return res.status(200).json({data: restorePasswordUrl, msg: "Link for restoration of the password!", success: true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function restorePasswordHttp(req, res) {
    try {
        const urlToken = req.params.urlToken;
        if (!urlToken) {
            res.status(401).json({error: "No token!", success: false});
        }

        const email = await redisClient.get(`Forgotten pass, token:${urlToken}`);

        if (!email) {
            res.status(401).json({error: "No valid token!", success: false});
        }

        const newPassword = req.body.newPassword;
        if (!isValidPassword(newPassword)) {
            res.status(403).json({error: "Invalid password format!", success: false});
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await Customer.updatePassword(email, hashedPassword);
        return res.status(200).json({msg: "Password changed successfully!", success: true});

    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function updateCustomerAddressHttp(req, res) {
    try {
        const customerId = req.params.customerId;
        const { city, country, streetName, streetNumber, postalCode, addressNumber } = req.body;
        const result = await Address.handleAddressCreationAndAssignment(city, country, streetName, streetNumber, postalCode, customerId, addressNumber);

        return res.status(200).json({data: result, msg: "Address update completed!", success: true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function updateCustomerDetailsHttp(req, res) {
    try {
        const { firstName, lastName, phoneNumber } = req.body;
        const userId = Number(req.params.customerId);

        const customer = await Customer.getById(userId);

        if (firstName) {
            if (!isValidName(firstName)) {
                return res.status(400).json({error: "Invalid first name format!", success: false});
            } 
            customer.first_name = firstName;
        }

        if (lastName) {
            if (!isValidName(lastName)) {
                return res.status(400).json({error: "Invalid last name format!", success: false});
            }
            customer.last_name = lastName;
        }

        if (phoneNumber) {
            customer.phone_number = phoneNumber;
        }

        await Customer.update(customer);
        return res.status(202).json({msg: "Update completed!", data: customer, success: true});

    } catch (error) {
        sendInternalServerErrorMessage(res, error);
    }
}

async function deleteCustomerProfileHttp(req, res) {

}

async function logoutCustomerHttp(req, res) {
    try {
        const sessionId = req.cookies?.sessionId;
        
        if (!sessionId) {
            return res.status(200).json({msg:"Already logged out!", success:true});
        }

        await redisClient.del(`SessionId:${sessionId}`);
        return res.status(200).json({msg:"Logged out successfully!", success:true});
    } catch (error) {
        sendInternalServerErrorMessage(res, error)
    }
}

module.exports = {
    loginUserHttp,
    registerUserHttp,
    logoutCustomerHttp,
    restorePasswordHttp,
    verifyRegistrationHttp,
    updateCustomerAddressHttp,
    updateCustomerDetailsHttp,
    deleteCustomerProfileHttp,
    createRestorePasswordUrlHttp
}