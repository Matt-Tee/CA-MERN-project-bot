const {axiosPointPatch} = require('./axiosPointPatch');
const {pointCalculator} = require('./pointCalculator');
const {axiosGet} = require('./axiosGet');

// Takes the id of the person who has the points and the person who gave them the points and decides how many points to take away.
module.exports.unPoint = async (id, takerId) => {
    // Not going to punish someone for removing their reactions from themselves. Return false for testing purposes.
    if (id == takerId){return false}
    // Taking back the points the reactor got for reacting
    if (takerId == null) {
        axiosPointPatch(id, { points: -1 }, 0)
        // Return true for testing purposes
        return true
    }
    // Get the reactors points
    let taker = await axiosGet(takerId);
    // Calculate how many points should be taken
    let losersPoints = (-1 * pointCalculator(taker.points));
    // Take the points
    axiosPointPatch(id, { points: losersPoints }, takerId)
    // Return true for testing purposes
    return true
}