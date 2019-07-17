let {unPoint} = require('../functions/unPoint');
jest.mock('../functions/axiosGet');
jest.mock('../functions/axiosPointPatch');

test('Should be defined', () => {
    expect.assertions(1);
    expect(unPoint).toBeDefined();
})

test('Should not take points from self', async () => {
    expect.assertions(1);
    data = await unPoint(1,1);
    expect(data).toBe(false);
})

test('Should take points from others', async () => {
    expect.assertions(1);
    data = await unPoint(1,2);
    expect(data).toBe(true);
})