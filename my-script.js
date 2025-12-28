window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('project-log-posts.yaml');
        const yamlText = await response.text();
        const data = jsyaml.load(yamlText);

        console.log(data);
    } catch (err) {
        console.log('Error loading YAML:', err);
    }
});
