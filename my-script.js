window.addEventListener('DOMContentLoaded', async () => {
  let pageTitle = document.title;
  let dataURL = 'https://raw.githubusercontent.com/ACBradley7/project-log/refs/heads/main/posts.yml';

  try {
    const response = await fetch(dataURL);
    const yamlText = await response.text();
    const postsData = jsyaml.load(yamlText);
    createContentFromYaml(pageTitle, postsData);
  } catch (err) {
    console.log('Error loading YAML:', err);
  }
});

function createContentFromYaml(pageTitle, postsData) {
  let mainElt = document.querySelector('main');
  let postsBlocksArr = [];
  let postNumByThread = {};

  let postsKeys = Object.keys(postsData['posts']);
  for (i = 1; i <= postsKeys.length; i++) {
    let postData = postsData['posts'][`post-${i}`];
    postNum = populatePostNumByThread(postNumByThread, postData);

    if (pageTitle == postData['page']) {
      let block = createBlock(pageTitle, postNum, postData);
      postsBlocksArr.push(block);
    }
  }

  for (i = postsBlocksArr.length - 1; i >= 0; i --) {
    let postDiv = postsBlocksArr[i];
    mainElt.appendChild(postDiv);
  }
}

function populatePostNumByThread(obj, postData) {
  let thread = postData['thread'];

  if (thread in obj) {
    obj[thread] += 1;
  }
  else {
    obj[thread] = 1;
  }

  return obj[thread];
}

function createBlock(pageTitle, postNum, postData) {
  let postDiv = createPostDiv();

  createPostTitle(postDiv, postNum, postData);
  createPostType(postDiv, postData);
  createPostDate(postDiv, postData);
  createPostContent(postDiv, postData);

  return postDiv;
}

function createPostDiv() {
  let postDiv = document.createElement('div');
  postDiv.setAttribute('class', 'post');
  return postDiv;
}

function createPostTitle(div, num, postData) {
  let titleElt = document.createElement('h3');
  let postThread = postData['thread'];
  let numSpot = postData['num-spot'];
  console.log(postData, num);

  switch (numSpot) {
    case "BEFORE":
      titleElt.textContent = `Post #${num}: ${postThread}`;
      break;
    case "AFTER":
      titleElt.textContent = `${postThread} #${num}`;
      break;
    default:
      titleElt.textContent = postThread;
      break;
  }

  div.appendChild(titleElt);
}

function createPostType(div, postData) {
  let postType = postData['type'];

  if (postType) {
    let typeElt = document.createElement('h4');
    typeElt.textContent = `Type: ${postType}`;
    div.appendChild(typeElt);
  }
}

function createPostDate(div, postData) {
  let dateElt = null;
  let startDate = postData['start-date'];
  let endDate = postData['end-date'];

  if (startDate) {
    dateElt = document.createElement('h5');
    dateElt.textContent = startDate;
  }

  if (startDate && endDate) {
    dateElt.textContent = `${startDate} - ${endDate}`;
    dateElt.setAttribute('id', 'date-elt');
  }

  if (startDate) {
    div.appendChild(dateElt);
  }
}

function createPostContent(div, postData) {
  let postContent = postData['content'];

  if (postContent) {
    for (let i = 0; i < postContent.length; i++) {
      key = Object.keys(postContent[i])[0];
      contentType = key;
      contentItems = postContent[i][key];
      createContentFromType(div, contentType, contentItems);
    }
  }
}

function createContentFromType(div, type, items) {
  if (type == 'paragraph') {
    createParagraph(div, items);
  } else if (type == 'ordered-list') {
    createList(div, items, 'ol');
  } else if (type == 'unordered-list') {
    createList(div, items, 'ul');
  }
}

function createParagraph(div, item) {
  let paragraphElt = document.createElement('p');
  paragraphElt.textContent = item;
  div.appendChild(paragraphElt);
}

function createList(div, items, tag) {
  let listContainerElt = document.createElement(tag);

  for (let i = 0; i < items.length; i++) {
    let listItemElt = document.createElement('li');
    listItemElt.textContent = items[i];
    listContainerElt.appendChild(listItemElt);
  }

  div.appendChild(listContainerElt);
}
