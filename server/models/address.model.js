const { db }= require("../config/database");

async function getCoutryIdByName(country) {
    const query = "SELECT id from countries where ?";
    const countryName = { "name": country };

    return new Promise((resolve, reject) => {
        db.query(query, countryName, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result.length !== 0) {
                resolve(result[0].id);
            } else {
                resolve(null);
            }
        })
    })
}

async function create(city, countryId, streetName, streetNumber, postalCode) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO addresses (city, country_id, street_name, street_number, postal_code) values
                    ('${city}',${countryId},
                    '${streetName}','${streetNumber}','${postalCode}')`;

        db.query(query, (error, result) => {
            if (error) {
                console.log(error);
                reject(error);
            } else if (result) {
                console.log(result.insertId);
                resolve(result);
            } else {
                resolve(null);
            }
        });
    })
}

async function contains(city, countryId, streetName, streetNumber, postalCode) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * from addresses
                       where city='${city}' and
                            country_id ='${countryId}' and
                            street_name ='${streetName}' and
                            street_number = ${streetNumber} and
                            postal_code = ${postalCode}`;
        
        db.query(query, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result.length !== 0) {
                console.log(result);
                resolve(result[0].id);
            } else {
                resolve(null);
            }
        });
    })
}

async function deleteCustomerAddress(customerId, addressLevel) {
    return new Promise((resolve, reject) => {
        const query = `delete from customer_addresses where customer_id = ${customerId} and address_level = ${addressLevel}`;
        db.query(query, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                console.log(result);
                resolve(result);
            } else {
                resolve(null);
            }
        })
    })
}

async function assignAddressToCustomer(addressId, customerId, addressLevel) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO customer_addresses set ?";
        const customerAddress = {
            "customer_id": Number(customerId),
            "address_id": Number(addressId),
            "address_level": addressLevel
        }
        
        db.query(query, customerAddress, (error, result) => {
            if (error) {
                console.log(error.message);
                reject(error);
            } else if (result) {
                console.log(result);
                resolve(result);
            } else {
                resolve(null);
            }
        });
    })
}

async function handleAddressCreationAndAssignment(city, countryName, streetName, streetNumber, postalCode, customerId, addressNumber) {
    const countryId = await getCoutryIdByName(countryName);
    let addressId = await contains(city, countryId, streetName, streetNumber, postalCode, customerId, addressNumber)
    if (!addressId) {
        addressId = await create(city, countryId, streetName, streetNumber, postalCode, customerId, addressNumber);
    }

    await deleteCustomerAddress(customerId, addressNumber);
    console.log(addressId, customerId, addressNumber);
    const addressInfo = await assignAddressToCustomer(addressId, customerId, addressNumber);
    return addressInfo;
}

module.exports = {
    create,
    assignAddressToCustomer,
    contains,
    handleAddressCreationAndAssignment
}