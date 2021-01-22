import {
  setSearchFocus,
  showClear,
  clearSearch,
  clearPushListener,
} from './searchBar.js';
import {
  buildSearchItem,
  deleteSearchResults,
  clearStatLines,
  setStatLines,
} from './searchResult.js';
import { getSearchTerm, retrieveSearchResults } from './dataFunctions.js';

document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = document.getElementById('search');
  search.addEventListener('input', showClear);
  const clear = document.getElementById('clear');
  clear.addEventListener('click', clearSearch);
  clear.addEventListener('keydown', clearPushListener);

  const form = document.getElementById('searchBar');
  form.addEventListener('submit', submitTheSearch);
};

// procedural work flow
const submitTheSearch = (event) => {
  event.preventDefault();
  deleteSearchResults();
  processTheSearch();
  setSearchFocus();
};

// procedural
const processTheSearch = async () => {
  clearStatLines();
  const searchTerm = getSearchTerm();
  if (searchTerm === '') return;
  const resultArray = await retrieveSearchResults(searchTerm);
  if (resultArray.length) buildSearchItem(resultArray);
  setStatLines(resultArray.length);
};
