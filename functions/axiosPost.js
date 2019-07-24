require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken')
const cctsAPI = axios.create({
    baseURL: process.env.EXPRESSURL,
    headers: {
        common: {
            Authorization: jwt.sign('authed', 'superSecretKey')
        }
    }
});
// Registers user in database with a default of 1 point
module.exports.axiosPost = async (id, username) => {
    const result = cctsAPI.post('/users', { user_id: id, username: username, points: 1 }).then(response => {
        return response.data
    }).catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
    // Return the response data to confirm the registration was successful
    return result;
}