const EveriToken = require('./providers/everitoken/everitoken');
const EveriWallet = require('./providers/everitoken/wallet');

module.exports = {
  createProvider(name, wallet, network = 'rinkeby') {
    switch (name) {
      case 'everitoken':
        return new EveriToken(
          new EveriWallet(wallet.getAddress(), wallet.getPrivateKey()),
          network
        );

      default:
        return new Error('Unsupported provider: ' + name);
    }
  }
};
