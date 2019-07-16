const axios = require('axios');
const cctsAPI = axios.create({ baseURL: 'https://stormy-tundra-35633.herokuapp.com/' });

// Retrives a user object from the database if one exists
module.exports.axiosGet = async (id) => {
    const result = cctsAPI.get(`/users/${id}`).then(response => {
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
        // return an object for not found perposes
        return { user_id: false}
    });
    return result;
}