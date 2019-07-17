const {axiosPointPatch} = require('./axiosPointPatch');
const {pointCalculator} = require('./pointCalculator');
const {axiosGet} = require('./axiosGet');

module.exports.unPoint = async (id, takerId) => {
    if (id == takerId){return false}
    let taker = await axiosGet(takerId);
    let losersPoints = (-1 * pointCalculator(taker.points));
    axiosPointPatch(id, { points: losersPoints })
    return true
}