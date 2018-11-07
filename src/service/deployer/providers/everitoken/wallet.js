const EVT = require('evtjs');
const BaseWallet = require('../../wallet');

class Wallet extends BaseWallet {
  constructor(address, privateKey) {
    super(address, privateKey);
    if (false === EVT.EvtKey.isValidPrivateKey(privateKey)) {
      throw new Error('invalid private key');
    }

    if (false === EVT.EvtKey.isValidPublicKey(address)) {
      throw new Error('invalid wallet address');
    }
  }
}

module.exports = Wallet;
