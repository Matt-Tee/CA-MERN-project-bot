module.exports.axiosPost = async (id, username) => {
    result = await new Promise((resolve) => {
        resolve({user_id: id, username: username, points: 1})
    })
    return result;
}