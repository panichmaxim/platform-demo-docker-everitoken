const utils = require('./utils');

class Wallet {
  constructor(address, privateKey) {
    this.address = address;
    this.privateKey = privateKey;
  }

  getAddress() {
    return this.address;
  }

  getPrivateKeyBuffer() {
    return Buffer.from(utils.hexlify(this.privateKey), 'hex')
  }

  getPrivateKey() {
    return this.privateKey;
  }
}

module.exports = Wallet;
