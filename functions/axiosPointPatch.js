const axios = require('axios');

// Updates user object in database.
module.exports.axiosPointPatch = async (id, userObject) => {
    axios({
        method: 'patch',
        url: `https://stormy-tundra-35633.herokuapp.com/users/${id}/points`,
        data: userObject
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