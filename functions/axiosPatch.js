const axios = require('axios');
const jwt = require('jsonwebtoken')
const cctsAPI = axios.create({
    baseURL: process.env.EXPRESSURL,
    headers: {
        common: {
            Authorization: jwt.sign({ authed: true }, 'superSecretKey')
        }
    }
});
// Updates user object in database.
module.exports.axiosPatch = async (id, userObject) => {
    const result = cctsAPI.patch(id, userObject).then(response => {
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
    // Return the response data to confirm the update
    return result;
}