function isLetter(char) {
    return char.toLower() === char.toUpper();
}

const uppercaseRegex = /^[A-Z]$/;
const lowerCaseRegex = /^[a-z]$/;
const letterRegex = /[a-zA-Z]/;
const numberRegex = /[0-9]/;
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function isValidName(name) {
    if (!uppercaseRegex.test(name[0])) { return false; }

    for (let i = 1; i < name.length; i++) {
        if (!lowerCaseRegex.test(name[i])) {
            return false;
        }
    }

    return true;
}

function isValidPhoneNumber(phoneNumber) {
    if (phoneNumber.length == 0) { return false; }

    let indexFirstSymbol = (phoneNumber[0] == '+') ? 1: 0;

    for (let i = indexFirstSymbol; i < phoneNumber.length; i++) {
        if (!lowerCaseRegex.test(phoneNumber[i])) {
            return false;
        }
    }

    return true;
}

function isValidPassword(password) {
    if (password.length < 8)  { return false; }
    
    if (!letterRegex.test(password) || !numberRegex.test(password))  { return false; }
    
    return true;
}

function isValidEmail(email) {
    return emailRegex.test(emailRegex);
}

function isValidUserData(email, firstName, lastName, password, phoneNumber) {
    if (!email || !firstName || !lastName || !password) {
        return false;
    }
    console.log(isValidName(firstName), isValidName(lastName),
    isValidPassword(password))

    return isValidName(firstName) &&
           isValidName(lastName) &&
           isValidPassword(password)
}

module.exports = {
    isValidUserData,
    isValidName,
    isValidPassword
}