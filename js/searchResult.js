export const deleteSearchResults = () => {
  const parent = document.getElementById('searchResults');
  let child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
};

export const buildSearchItem = (result) => {
  result.forEach((element) => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('resultItem');
    const resultTitle = createResultTitle(element);
    const resultContent = createResultContent(element);
    resultItem.append(resultTitle);
    resultItem.append(resultContent);
    const searchResults = document.getElementById('searchResults');
    searchResults.append(resultItem);
  });
};

const createResultTitle = (element) => {
  const resultTitle = document.createElement('div');
  resultTitle.classList.add('resultTitle');
  const anchorTag = document.createElement('a');
  anchorTag.href = `https://en.wikipedia.org/?curid=${element.id}`;
  anchorTag.textContent = element.title;
  anchorTag.target = '_blank';
  resultTitle.append(anchorTag);
  return resultTitle;
};

const createResultContent = (element) => {
  const resultContent = document.createElement('div');
  resultContent.classList.add('resultContents');

  // result image
  if (element.img) {
    const resultImage = document.createElement('div');
    resultImage.classList.add('resultImage');
    const image = document.createElement('img');
    image.src = element.img;
    image.alt = element.title;
    resultImage.append(image);
    resultContent.append(resultImage);
  }

  // result text
  const resultText = document.createElement('div');
  resultText.classList.add('resultText');
  const p = document.createElement('p');
  p.classList.add('resultDescription');
  p.textContent = element.text;
  resultText.append(p);
  resultContent.append(resultText);

  return resultContent;
};

export const setStatLines = (length) => {
  let statLine = document.getElementById('stats');
  if (length) {
    statLine.textContent = `Displaying ${length} results`;
  } else {
    statLine.textContent = 'No results';
  }
};

export const clearStatLines = () => {
  document.getElementById('stats').textContent = '';
};
