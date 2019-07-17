const users = [{user_id: 1, username: 'bob', points: 2},{user_id: 2, username: 'margret', points: 7},{user_id: 3, username: 'bob', points: 10}]

module.exports.axiosGet = async (id) => {
    if (id == false){return {user_id: false}}
    user= await new Promise((resolve) => {
    resolve(users[(id-1)])
    })
    return user
}