const gemController = require('../controllers/gem');

let userWallet = {
  gemBalance: 0,
  save: () => {},
  findOne: () => userWallet,
};

jest.mock('../models', () => ({
  Wallet: userWallet,
}));

describe('USER APIs', () => {
  test('should return gems', async () => {
    const req = {
      user: {
        id: 1,
      },
      body: {
        gemCount: 2,
      },
    };

    let statusVal, sendVal, jsonVal;

    const res = {
      status: (val) => {
        statusVal = val;
        return res;
      },
      send: (val) => {
        sendVal = val;
        return res;
      },
      json: (val) => {
        jsonVal = val;
        return res;
      },
    };

    await gemController.getGems(req, res);
    expect(userWallet.gemBalance).toBe(2);
  });
});
