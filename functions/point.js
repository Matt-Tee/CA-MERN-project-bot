const {axiosPointPatch} = require('./axiosPointPatch');
const {pointCalculator} = require('./pointCalculator');
const {axiosGet} = require('./axiosGet');

module.exports.point = async (id, giverId) => {
    if (id == giverId) return false;
    if (giverId == null) {
        axiosPointPatch(id, { points: 1 })
        return true
    }
    let giver = await axiosGet(giverId)
    let recieverPoints = pointCalculator(giver.points)
    axiosPointPatch(id, { points: recieverPoints })
    return true
}