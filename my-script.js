window.addEventListener('DOMContentLoaded', async () => {
  dataURL = getDataByTitle()

  try {
    const response = await fetch(dataURL);
    const yamlText = await response.text();
    const data = jsyaml.load(yamlText);

    console.log(document.title);
    console.log(data);
  } catch (err) {
    console.log('Error loading YAML:', err);
  }
});

function getDataByTitle() {
  title = document.title

  switch (title) {
    case 'Project Log':
      dataURL = 'https://raw.githubusercontent.com/ACBradley7/project-log/refs/heads/main/project-log-posts.yml';
      break;
    case 'Future Projects':
      dataURL = 'https://raw.githubusercontent.com/ACBradley7/project-log/refs/heads/main/future-projects-posts.yml';
      break;
    case 'About Me':
      dataURL = 'https://raw.githubusercontent.com/ACBradley7/project-log/refs/heads/main/about-me-posts.yml';
      break;
    default:
      dataURL = null;
  }

  return dataURL
}
