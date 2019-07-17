let {point} = require('../functions/point');
jest.mock('../functions/axiosGet');
jest.mock('../functions/axiosPointPatch');

test('Should be defined', () => {
    expect.assertions(1);
    expect(point).toBeDefined();
})

test('Should not give points to self', async () => {
    expect.assertions(1);
    data = await point(1,1);
    expect(data).toBe(false);
})

test('Should give points to others', async () => {
    expect.assertions(1);
    data = await point(1,2);
    expect(data).toBe(true);
})