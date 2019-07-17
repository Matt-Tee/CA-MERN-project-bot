const {pointCalculator} = require('../functions/pointCalculator');

test('Should be defined', () => {
    expect(pointCalculator).toBeDefined()
})

test('Returns a positive value', () => {
    expect((pointCalculator(1)) > 0).toBe(true)
})