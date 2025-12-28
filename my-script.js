window.addEventListener('DOMContentLoaded', async () => {
  dataURL = getDataByTitle()

  try {
    const response = await fetch(dataURL);
    const yamlText = await response.text();
    const postsData = jsyaml.load(yamlText);
    createContentFromPosts(postsData);
  } catch (err) {
    console.log('Error loading YAML:', err);
  }
});

function getDataByTitle() {
  let title = document.title;
  let dataURL = "";

  switch (title) {
    case 'Project Log':
      dataURL = 'https://raw.githubusercontent.com/ACBradley7/project-log/refs/heads/main/posts/project-log-posts.yml';
      break;
    case 'Future Projects':
      dataURL = 'https://github.com/ACBradley7/project-log/blob/main/posts/future-projects-posts.yml';
      break;
    case 'About Me':
      dataURL = 'https://github.com/ACBradley7/project-log/blob/main/posts/about-me-posts.yml';
      break;
  }

  return dataURL
}

function createContentFromPosts(postsData) {
  let mainElt = document.querySelector('main');

  for (i = 1; i <= Object.keys(postsData).length; i++) {
    console.log(postsData["posts"][`post-${i}`]);
    let postData = postsData["posts"][`post-${i}`];

    let postDiv = createPostDiv(mainElt);
    createPostTitle(postDiv, postData['id'], postData['title']);
    createPostType(postDiv, postData['type']);
    createPostDate(postDiv, postData['start-date'], postData['end-date']);
    createPostContent(postDiv, postData['content']);
  }
}

function createPostDiv(mainElt) {
  let postDiv = document.createElement('div');
  postDiv.setAttribute('class', 'post');
  mainElt.appendChild(postDiv);
  return postDiv;
}

function createPostTitle(div, id, postTitle) {
  if (id && postTitle) {
    let titleElt = document.createElement('h3');
    titleElt.textContent = `Post: #${id}: ${postTitle}`;
    div.appendChild(titleElt);
  }
}

function createPostType(div, postType) {
  if (postType) {
    let typeElt = document.createElement('h4');
    typeElt.textContent = `Type: ${postType}`;
    div.appendChild(typeElt);
  }
}

function createPostDate(div, postStartDate, postEndDate) {
  let dateElt = null;

  if (postStartDate) {
    dateElt = document.createElement('h5');
    dateElt.textContent = postStartDate;
  }

  if (postStartDate && postEndDate) {
    dateElt.textContent = `${postStartDate} - ${postEndDate}`;
    dateElt.setAttribute('id', 'date-elt');
  }

  if (postStartDate) {
    div.appendChild(dateElt);
  }
}

function createPostContent(div, postContent) {
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
  if (type == "paragraph") {
    createParagraph(div, items);
  } else if (type == "ordered-list") {
    createList(div, items, "ol");
  } else if (type == "unordered-list") {
    createList(div, items, "ul");
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
