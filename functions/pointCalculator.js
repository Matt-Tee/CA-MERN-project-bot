const { coefficient, horizontalTranslator, verticalTranslator } = require('../parameters.json')

// Do some maths. This is just a simple cube root function shifted by the horizontal and vertical translators and adjusted by the coefficient.
// The variables can be adjusted in the parameters.json but it is recommended to do so only if you have an understanding of cube root functions and how the translators and coefficient effect its shape and position.
module.exports.pointCalculator = (giverPoints) => {
    // Do the maths to calculate the points
    let receiverPoints = (Math.floor(Math.cbrt((coefficient * giverPoints) - horizontalTranslator)) + verticalTranslator);
    // Return the points so that they can be given or taken
    return receiverPoints
}