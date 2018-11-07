module.exports = {
  hexlify(value) {
    return Buffer.from(this.unhexlifyString(value), 'hex');
  },

  unhexlifyString(value) {
    return value.startsWith('0x') ? value.slice(2) : value;
  },

  hexlifyString(value) {
    return value.startsWith('0x') ? value : `0x${value}`;
  }
};
