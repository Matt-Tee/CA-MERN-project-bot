require('dotenv').config();
const axios = require('axios');
const jwt = require('jsonwebtoken')


// Updates user object in database. Slightly different to the axiosPatch due to the configuration of the express API being used.
module.exports.axiosPointPatch = async (id, points, reactorId) => {
    axios({
        method: 'patch',
        url: `${process.env.EXPRESSURL}/users/${id}/points`,
        headers: {
            common: {
                Authorization: jwt.sign({ authed: true }, 'superSecretKey')
            }
        },
        data: {points: points, reactor: reactorId}
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
}