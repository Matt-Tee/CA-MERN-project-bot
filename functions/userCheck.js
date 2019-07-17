const { axiosGet } = require('./axiosGet');
const { axiosPost } = require('./axiosPost');

// Checks if user exists in database and then registers them if they don't.
module.exports.userCheck = async (author, client) => {
    // A 404 error will be logged if user is not found. This is expected and handled. Do not be alarmed.
    let user = await axiosGet(author.id)
    if (!user.user_id) {
        user = await axiosPost(author.id, author.username)
        client.users.get(author.id).send(`Congratulations ${user.username}! You have been noticed by ${client.user.username}.`)
    }
}   