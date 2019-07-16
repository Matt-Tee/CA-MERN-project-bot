const { coefficient, horizontalTranslator, verticalTranslator } = require('../parameters.json')

module.exports.pointCalculator = (giverPoints) => {
    let recieverPoints = (Math.floor(Math.cbrt((coefficient * giverPoints) - horizontalTranslator)) + verticalTranslator);
    return recieverPoints
}