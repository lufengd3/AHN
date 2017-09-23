const BASE = 'https://hacker-news.firebaseio.com/v0/';
const SUFFIX = '.json';

const getURL = (t) => {
  return `${BASE}${t}${SUFFIX}`;
}

export default {
  TOP: getURL('topstories'),
  BEST: getURL('beststories'),
  NEW: getURL('newstories'),
  ITEM: (id) => getURL(`item/${id}`)
}