module.exports.axiosPatch = async (id, usernameObject) => {
    result = await new Promise((resolve) => {
        resolve({user_id: id, username: usernameObject.username, points: 1})
    })
    return result;
}