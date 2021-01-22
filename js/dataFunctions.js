export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById('search').value.trim();
  const regex = /[ ]{2, }/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, ' ');
  return searchTerm;
};

export const retrieveSearchResults = async (searchTerm) => {
  const wikiSearchString = getWikiSearchString(searchTerm);
  const wikiSearchResults = await requestData(wikiSearchString);
  let resultArray = [];
  if (wikiSearchResults.hasOwnProperty('query')) {
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }
  return resultArray;
};
const getWikiSearchString = (searchTerm) => {
  const maxChars = getMaxChars();
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
};
const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars;
  if (width < 414) maxChars = 65;
  if (width >= 414 && width < 1400) maxChars = 100;
  if (width >= 1400) maxChars = 130;
  return maxChars;
};

const requestData = async (wikiSearchString) => {
  try {
    const response = await fetch(wikiSearchString);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const processWikiResults = (data) => {
  const resultArray = [];
  Object.keys(data).forEach((key) => {
    const id = key;
    const title = data[key].title;
    const text = data[key].extract;
    const img = data[key].hasOwnProperty('thumbnail')
      ? data[key].thumbnail.source
      : null;
    const item = {
      id,
      title,
      text,
      img,
    };
    resultArray.push(item);
  });
  return resultArray;
};
