const {axiosPointPatch} = require('./axiosPointPatch');

module.exports.messagePoint = async (m, basepoint, multiplier) => {
    axiosPointPatch(m.author.id, { points: (multiplier * basepoint) })
}