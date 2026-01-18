// Página Portfolio
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', async () => {
  await loadPortfolio();
  setupFilters();
});

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      await loadPortfolio();
    });
  });
}

async function loadPortfolio() {
  try {
    const endpoint = currentFilter === 'all' ? '/portfolio' : `/portfolio?category=${currentFilter}`;
    const response = await fetchAPI(endpoint);
    const container = document.getElementById('portfolio-grid');

    if (response.success && response.portfolio.length > 0) {
      container.innerHTML = response.portfolio
        .map(
          project => `
        <div class="portfolio-item">
          <img src="${project.thumbnail?.url || 'https://via.placeholder.com/280x200'}" alt="${project.title}">
          <div class="portfolio-content">
            <span class="category-badge">${project.category}</span>
            <h3>${project.title}</h3>
            <p>${project.description.substring(0, 80)}...</p>
            <div class="project-meta">
              <span>👁️ ${project.views} visualizações</span>
            </div>
          </div>
        </div>
      `
        )
        .join('');
    } else {
      container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Nenhum projeto nesta categoria.</p>';
    }
  } catch (error) {
    console.error('Erro ao carregar portfólio:', error);
    document.getElementById('portfolio-grid').innerHTML =
      '<p style="text-align: center; grid-column: 1 / -1; color: red;">Erro ao carregar portfólio</p>';
  }
}
