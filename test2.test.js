const { spy, addOne, solution } = require('./index2');

describe('spy', () => {
  function _sum(a, b) {
    return a + b;
  }

  it('test case 1', () => {
    const sum = spy(_sum);

    expect(sum(2, 2)).toEqual(4); // 4
    expect(sum(21, 21)).toEqual(42); // 42
    /* количество вызовов функции _sum */
    expect(sum.data.calls).toEqual(2); // 2
    /* аргументы с которыми была вызвана функция _sum, с сохранением порядка вызовов */
    expect(sum.data.args).toEqual([[2, 2], [21, 21]]); // [[2, 2], [21, 21]]
    /* результаты, которые вернула функция _sum, с сохранением порядка вызовов */
    expect(sum.data.results).toEqual([4, 42]); // [4 , 42]
  });
});

describe('addOne', () => {
  it('test case 1', () => {
    expect(addOne()()().getValue()).toEqual(3); // 3
    expect(addOne()().getValue()).toEqual(2); // 2
    expect(addOne().getValue()).toEqual(1); // 1
  });
});

describe('solution', () => {
  it('test case 1', (done) => {
    const wait = () => new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    const runTest = () => {
      const renderedMessages = [];
      const expectedMessages = [
        { id: 1, text: 'One' },
        { id: 2, text: 'Two' },
        { id: 3, text: 'Three' },
        { id: 4, text: 'Four' },
        { id: 5, text: 'Five' },
        { id: 6, text: 'Six' },
        { id: 7, text: 'Seven' },
      ];

      const testConnect = async (cb) => {
        cb({ id: 1, text: 'One' });
        await wait();
        cb({ id: 2, text: 'Two' });
        await wait();
        cb({ id: 3, text: 'Three' });
        await wait();
        cb({ id: 6, text: 'Six' });
        await wait();
        cb({ id: 5, text: 'Five' });
        await wait();
        cb({ id: 4, text: 'Four' });
        await wait();
        cb({ id: 7, text: 'Seven' });

        if (JSON.stringify(renderedMessages) !== JSON.stringify(expectedMessages)) {
          console.error(`Expected: ${JSON.stringify(expectedMessages)}`);
          console.error(`Received: ${JSON.stringify(renderedMessages)}`);
          return;
        }

        console.log('Test passed');
        expect(renderedMessages).toEqual(expectedMessages);
        done();
      };

      const skipMessages = [];

      const renderSkipMessages = (nextMissedMessageIndex) => {
        const skippedMessage = skipMessages[nextMissedMessageIndex];
        renderedMessages.push(skippedMessage);
        skipMessages.splice(nextMissedMessageIndex, 1);

        if (skippedMessage.id + 1 === skippedMessage.id) {
          renderSkipMessages(0);
        }
      };

      const testRenderMsg = (msg) => {
        console.log('Rendered message: ', msg);
        const lastRenderMessage = renderedMessages[renderedMessages.length - 1];

        if (!lastRenderMessage || lastRenderMessage.id + 1 === msg.id) {
          renderedMessages.push(msg);
        } else {
          const nextMissedMessageIndex = skipMessages.findIndex((message) => lastRenderMessage.id + 1 === message.id);

          if (nextMissedMessageIndex !== -1) {
            renderSkipMessages(nextMissedMessageIndex);
          } else {
            skipMessages.push(msg);
            skipMessages.sort((a, b) => a.id - b.id);
          }
        }
      };
      solution(testConnect, testRenderMsg);
    };

    runTest();
  });
});
