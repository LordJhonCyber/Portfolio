// Página Blog
document.addEventListener('DOMContentLoaded', async () => {
  await loadBlog();
  setupCategoryFilters();
});

async function loadBlog() {
  try {
    const response = await fetchAPI('/content?limit=10');
    const container = document.getElementById('blog-posts');

    if (response.success && response.content.length > 0) {
      container.innerHTML = response.content
        .map(
          post => `
        <article class="blog-card">
          <img src="${post.image?.url || 'https://via.placeholder.com/400x250'}" alt="${post.title}">
          <div class="blog-content">
            <span class="category-badge">${post.category}</span>
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <div class="blog-meta">
              <span>📅 ${new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
              <span>👁️ ${post.views} visualizações</span>
            </div>
            <a href="#" class="btn btn-primary" style="font-size: 0.9rem; margin-top: 1rem;">Ler Mais</a>
          </div>
        </article>
      `
        )
        .join('');
    } else {
      container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Nenhum post ainda.</p>';
    }
  } catch (error) {
    console.error('Erro ao carregar blog:', error);
    document.getElementById('blog-posts').innerHTML =
      '<p style="text-align: center; grid-column: 1 / -1; color: red;">Erro ao carregar posts</p>';
  }
}

function setupCategoryFilters() {
  document.querySelectorAll('.widget a[data-category]').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const category = e.target.dataset.category;
      try {
        const response = await fetchAPI(`/content?category=${category}`);
        const container = document.getElementById('blog-posts');

        if (response.success && response.content.length > 0) {
          container.innerHTML = response.content
            .map(
              post => `
            <article class="blog-card">
              <img src="${post.image?.url || 'https://via.placeholder.com/400x250'}" alt="${post.title}">
              <div class="blog-content">
                <span class="category-badge">${post.category}</span>
                <h3>${post.title}</h3>
                <p>${post.description}</p>
                <div class="blog-meta">
                  <span>📅 ${new Date(post.publishedAt).toLocaleDateString('pt-BR')}</span>
                  <span>👁️ ${post.views} visualizações</span>
                </div>
              </div>
            </article>
          `
            )
            .join('');
        } else {
          container.innerHTML = '<p style="text-align: center;">Nenhum post nesta categoria.</p>';
        }
      } catch (error) {
        console.error('Erro ao filtrar:', error);
      }
    });
  });
}
