import test from 'ava';
import {countWords} from "./count-words";


test("It should count correct amount of words", async t => {
  const words = `
        test, test, test, test,
        hello, hello,
        silence...
    `;

  t.deepEqual(await countWords(words), [
    ['test', 4],
    ['hello', 2],
    ['silence', 1]
  ]);
});
