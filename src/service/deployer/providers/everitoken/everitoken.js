const EVT = require('evtjs');
const Base = require('../base');

class EveriToken extends Base {
  constructor(wallet, network) {
    super(wallet, network);

    /*
    const endpoint = network === 'mainnet' ? {
      host: 'mainnet1.everitoken.io',
      port: 443,
      protocol: 'https'
    } : {
      host: 'testnet1.everitoken.io',
      port: 8888,
      protocol: 'http'
    };
    */
    const endpoint = {
      host: 'mainnet1.everitoken.io',
      port: 443,
      protocol: 'https'
    };

    this.apiCaller = EVT({
      endpoint,
      keyProvider: wallet.getPrivateKey()
    });
    this.endpoint = 'https://evtscan.io';
  }

  /**
   * Отправить транзакцию
   *
   * @param action
   * @returns {Promise<*>}
   */
  async sendTransaction(action) {
    const { transactionId } = await this.apiCaller.pushTransaction(action);

    return transactionId;
  }

  /**
   * Получить данные о транзакции
   *
   * @param transactionId
   * @returns {Promise<*>}
   */
  async getTransaction(transactionId) {
    const { transaction } = await this.apiCaller.getTransactionDetailById(transactionId);

    return transaction;
  }

  /**
   * Получить статус транзакции
   *
   * @param transactionId
   * @returns {Promise<boolean>}
   */
  async getTransactionStatus(transactionId) {
    const info = await this.apiCaller.getInfo();
    const transaction = await this.getTransaction(transactionId);

    return info.last_irreversible_block_num > transaction.ref_block_num;
  }

  /**
   * Получить url транзакции
   *
   * @param transactionId
   * @returns {string}
   */
  getTransactionUrl(transactionId) {
    return `${this.endpoint}/trx/${transactionId}`;
  }

  /**
   * Получить url токена
   *
   * @param symbol_id
   * @returns {string}
   */
  getTokenUrl(symbol_id) {
    return `${this.endpoint}/fungible/${symbol_id}`;
  }

  /**
   * Получить баланс
   *
   * @param address
   * @param symbol_id
   * @returns {Promise<*>}
   */
  async getBalance(address = null, symbol_id) {
    const balances = await this.apiCaller.getFungibleBalance(address || this.wallet.getAddress(), symbol_id);
    for (let i = 0; i < balances.length; i++) {
      const balance = balances[i];
      if (balance.indexOf(String(symbol_id)) > -1) {
        return balance.replace(` S#${symbol_id}`, '');
      }
    }
    return 0;
  }

  /**
   * Получить оценочную сумму транзакционной комиссии за одну транзакцию.
   *
   * @param name <string>
   * @param abi <object>
   * @returns {Promise<void>}
   */
  async getEstimatedChargeForTransaction(name, abi) {
    const action = new EVT.EvtAction(name, abi);
    const { charge } = await this.apiCaller.getEstimatedChargeForTransaction(action);
    return charge;
  }

  /**
   * Получить адрес токена
   *
   * @param symbol_id <number>
   * @returns {Promise<*>}
   */
  async getTokenAddress(symbol_id) {
    const { address } = await this.apiCaller.getFungibleSymbolDetail(parseInt(symbol_id));
    return address;
  }

  /**
   * Получить текущий supply
   *
   * @param symbol_id <number>
   * @returns {Promise<*>}
   */
  async getTokenCurrentSupply(symbol_id) {
    const { current_supply } = await this.apiCaller.getFungibleSymbolDetail(parseInt(symbol_id));
    return current_supply;
  }

  /**
   * Перечислить токены на другой адрес
   *
   * @param symbol_id <number>
   * @param address <string>
   * @param amount <string>
   * @param memo <string>
   * @param decimals <int|string>
   * @returns {Promise<*>}
   */
  sendTokens(symbol_id, address, amount, memo, decimals) {
    const parameters = {
      address,
      number: `${parseFloat(amount).toFixed(decimals).toString()} S#${symbol_id}`,
      memo
    };

    return this.sendTransaction(new EVT.EvtAction('issuefungible', parameters, '.fungible', String(symbol_id)));
  }

  /**
   * Создание и деплой токена
   *
   * @returns {Promise<*>}
   */
  async createToken({ type, supply, name, symbol, decimals }) {
    const symbol_id = String(Date.now()).substr(-6);
    const precision = parseFloat(supply).toFixed(decimals);
    const total_supply = precision + ' S#' + symbol_id;

    const authorizers = [
      { ref: '[A] ' + this.wallet.getAddress(), weight: 1 }
    ];

    const parameters = {
      name,
      sym_name: symbol,
      sym: decimals + ',S#' + symbol_id,
      creator: this.wallet.getAddress(),
      manage: { name: 'manage', threshold: 1, authorizers },
      issue: { name: 'issue', threshold: 1, authorizers },
      total_supply
    };

    await this.sendTransaction(new EVT.EvtAction('newfungible', parameters));

    return {
      symbol_id,
      address: await this.getTokenAddress(symbol_id)
    };
  }
}

module.exports = EveriToken;
