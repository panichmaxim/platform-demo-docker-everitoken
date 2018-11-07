const poll = require('../../util/poll');

describe('util/poll', () => {
  test('wait async', async () => {
    let i = 0;
    const res = await poll.wait(async () => {
      i++;
      if (i === 100) {
        return i;
      }
    });
    expect(res).toEqual(100);
  });

  test('wait sync', async () => {
    let i = 0;
    const res = await poll.wait(() => {
      i++;
      if (i === 100) {
        return i;
      }
    });
    expect(res).toEqual(100);
  });

  test('wait maxAttempt', async () => {
    let i = 0;
    try {
      await poll.wait(() => {
        i += 1;
      }, { maxAttempt: 100 });
    } catch (e) {
      expect(i).toEqual(100);
    }
  });

  test('wait delay', async () => {
    let i = 0;
    let start = Date.now() / 1000;
    let end = null;
    try {
      await poll.wait(() => {
        i += 1;
      }, { delay: 200, maxAttempt: 2 });
    } catch (e) {
      end = Date.now() / 1000;
      expect(end - start).toBeGreaterThan(.4);
    }
  });
});
