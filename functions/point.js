const {axiosPointPatch} = require('./axiosPointPatch');
const {pointCalculator} = require('./pointCalculator');
const {axiosGet} = require('./axiosGet');

// Takes the id of the person who is supposed to get the points and the one who is supposed to be giving the points and decides how many points the receiver should get.
module.exports.point = async (id, giverId) => {
    // It's not cool to react to your own message. Return false for testing purposes.
    if (id == giverId) return false;
    // A simple way to call the same function for a different result. If we want to give the reactor a point for reacting we just pass the giverId as null
    if (giverId == null) {
        axiosPointPatch(id, 1, 0)
        // Return true for testing purposes.
        return true
    }
    // Get the givers points
    let giver = await axiosGet(giverId)
    // Calculate how many points a react from the giver is worth
    let receiverPoints = pointCalculator(giver.points)
    // Give the receiver the points they deserve
    axiosPointPatch(id, receiverPoints, giverId)
    // Return true for testing purposes
    return true
}