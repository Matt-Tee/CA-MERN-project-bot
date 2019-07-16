const {axiosPointPatch} = require('./axiosPointPatch');
const {pointCalculator} = require('./pointCalculator');
const {axiosGet} = require('./axiosGet');

module.exports.point = async (id, giverId) => {
    if (id == giverId){return console.log("reacting to yourself isn't cool")}
    let giver = await axiosGet(giverId)
    let recieverPoints = pointCalculator(giver.points)
    axiosPointPatch(id, { points: recieverPoints })
}