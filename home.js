// Página Home
document.addEventListener('DOMContentLoaded', async () => {
  await loadFeaturedProjects();
  await loadBlogPosts();
});

async function loadFeaturedProjects() {
  try {
    const response = await fetchAPI('/portfolio?featured=true&limit=3');
    const container = document.getElementById('featured-projects');

    if (response.success && response.portfolio.length > 0) {
      container.innerHTML = response.portfolio
        .map(
          project => `
        <div class="project-card">
          <img src="${project.thumbnail?.url || 'https://via.placeholder.com/300x200'}" alt="${project.title}">
          <div class="project-content">
            <span class="category-badge">${project.category}</span>
            <h3>${project.title}</h3>
            <p>${project.description.substring(0, 100)}...</p>
            <a href="portfolio.html#${project.slug}" class="btn btn-primary" style="font-size: 0.9rem;">Ver Projeto</a>
          </div>
        </div>
      `
        )
        .join('');
    } else {
      container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Nenhum projeto em destaque ainda.</p>';
    }
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
    document.getElementById('featured-projects').innerHTML =
      '<p style="text-align: center; grid-column: 1 / -1; color: red;">Erro ao carregar projetos</p>';
  }
}

async function loadBlogPosts() {
  try {
    const response = await fetchAPI('/content?limit=3');
    const container = document.getElementById('blog-posts');

    if (response.success && response.content.length > 0) {
      container.innerHTML = response.content
        .map(
          post => `
        <div class="blog-card">
          <img src="${post.image?.url || 'https://via.placeholder.com/300x200'}" alt="${post.title}">
          <div class="blog-content">
            <span class="category-badge">${post.category}</span>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <div class="blog-meta">
              <span>${new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
              <span>${post.views} visualizações</span>
            </div>
          </div>
        </div>
      `
        )
        .join('');
    } else {
      container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Nenhum post ainda.</p>';
    }
  } catch (error) {
    console.error('Erro ao carregar posts:', error);
    document.getElementById('blog-posts').innerHTML =
      '<p style="text-align: center; grid-column: 1 / -1; color: red;">Erro ao carregar posts</p>';
  }
}
