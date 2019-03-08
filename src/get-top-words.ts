import axios from 'axios';
import pLimit from 'p-limit';
import {countWords} from "./count-words";

// Our rate limiter
const limit = pLimit(3);

export async function getTopWords(rss: string): Promise<[string, number][]> {
  let data = await getFeedData(rss);
  return await countWords(data)
}

async function getFeedData(rss: string): Promise<string> {
  const response = await limit(() => axios.get(rss));
  console.log(response.data);
  return response.data;
}
