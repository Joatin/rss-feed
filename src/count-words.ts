export async function countWords(words: string): Promise<[string, number][]> {
  let map: { [word: string]: number } = {};

  // We split all world by space. This is not perfect since forgotten spaces can screw things up
  let splitWords = words
    .replace(/\W/g, ' ') // <- We remove some common noise
    .split(' ')
    .filter(item => item.trim() !== '');

  // Count all words
  for (const word of splitWords) {
    if (map[word]) {
      map[word] += 1;
    } else {
      map[word] = 1;
    }
  }

  // We then transform it to a list of tuples
  const list = [...Object.entries(map)].sort((a, b) => b[1] - a[1]);

  // We only need top 100
  return list.splice(0, 100);
}
