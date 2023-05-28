const { db }= require("../config/database");

async function getCoutryIdByName(country) {
    const query = "SELECT country_id where ?";
    const countryName = { "country_name": country };

    return new Promise((resolve, reject) => {
        db.query(query, countryName, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result.length !== 0) {
                resolve(result[0]);
            } else {
                resolve(null);
            }
        })
    })
}

async function create(city, country, streetName, streetNumber, postalCode) {
    try {
        const countryId = await getCoutryIdByName(country);
        return new Promise((resolve, reject) => {
            const query = "INSERT INTO addresses set ?";
            const address = {
                "city": city,
                "country_id": countryId,
                "street_name": streetName,
                "street_number": streetNumber,
                "postal_code": postalCode
            }
            db.query(query, address, (error, result) => {
                if (error) {
                    console.log(error.message);
                    reject(error);
                } else if (result) {
                    resolve(result);
                } else {
                    resolve(null);
                }
            });
        })
    } catch (error) {
        console.log(error);
    }
}

async function contains(city, countryId, streetName, streetNumber, postalCode) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * from addresses where ?";
        const address = {
            "city": city,
            "country_id": countryId,
            "street_name": streetName,
            "street_number": streetNumber,
            "postal_code": postalCode
        }
        db.query(query, address, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                resolve(result[0].id);
            } else {
                resolve(null);
            }
        });
    })
}

async function assignAddressToCustomer(addressId, customerId, addressNumber) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO customer_addresses set ?";
        const customerAddress = {
            "customer_id": customerId,
            "address_id": addressId,
            "address_number": addressNumber
        }
        db.query(query, customerAddress, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                resolve(result);
            } else {
                resolve(null);
            }
        });
    })
}

async function handleAddressCreationAndAssignment(city, countryId, streetName, streetNumber, postalCode, customerId, addressNumber) {
    let addressId = await contains(city, countryId, streetName, streetNumber, postalCode, customerId, addressNumber)
    if (!addressId) {
        addressId = (await create(city, countryId, streetName, streetNumber, postalCode, customerId, addressNumber))[0].id;
    }
    const addressInfo = await assignAddressToCustomer(addressId, customerId, addressNumber);
    return addressInfo;
}

module.exports = {
    create,
    assignAddressToCustomer,
    contains,
    handleAddressCreationAndAssignment
}