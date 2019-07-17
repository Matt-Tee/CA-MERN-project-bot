const users = [{id: 1, name: 'bob', points: 2},{id: 2, name: 'margret', points: 7},{id: 3, name: 'bob', points: 10}]

module.exports.axiosGet = async (id) => {
    user= await new Promise((resolve) => 
    resolve(users[(id-1)]))
    return user
}