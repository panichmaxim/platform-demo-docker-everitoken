module.exports = {
  async wait(fn, options = {}) {
    let result = null;
    let attempt = 0;
    let interval;
    return new Promise((resolve, reject) => {
      interval = setInterval(async () => {
        result = await fn();
        if (result) {
          clearInterval(interval);
          return resolve(result);
        }
        attempt++;
        if (options.maxAttempt && attempt >= options.maxAttempt) {
          clearInterval(interval);
          return reject();
        }
      }, options.delay || 0);
    });
  }
};
