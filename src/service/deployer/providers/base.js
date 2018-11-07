class Base {
  constructor(wallet, network) {
    this.wallet = wallet;
    this.network = network;
  }

  getNetwork() {
    return this.network;
  }

  getWallet() {
    return this.wallet;
  }

  getTransactionStatus(hash) {
    throw new Error('Not implemented');
  }

  encodeContractMethod(abi, address, method, args = []) {
    throw new Error('Not implemented');
  }

  callContractMethod(abi, address, method, args = []) {
    throw new Error('Not implemented');
  }

  getEstimateGas(tx) {
    throw new Error('Not implemented');
  }

  getTransactionUrl(hash) {
    throw new Error('Not implemented');
  }

  sendTransaction(tx) {
    throw new Error('Not implemented');
  }

  getNonce() {
    throw new Error('Not implemented');
  }

  deployContract(contract, replacements = {}) {
    throw new Error('Not implemented');
  }
}

module.exports = Base;
