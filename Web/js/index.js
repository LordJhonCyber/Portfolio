// Página Index - Carrega projetos da API
document.addEventListener('DOMContentLoaded', async () => {
  await loadProjects();
});

async function loadProjects() {
  try {
    const response = await fetchAPI('/portfolio?limit=6');
    const container = document.getElementById('projects-grid');

    // Projetos em destaque padrão
    const defaultProjects = [
      {
        title: 'Estudos de Dados para E-commerce',
        description: 'Análise de dados e estudo de caso para plataforma de e-commerce com insights valiosos.',
        category: 'web',
        technologies: ['Python', 'Pandas', 'Data Analysis'],
        githubLink: 'https://github.com/LordJhonCyber/Projeto_de_Estudos_de_Dados_para_E_commerce',
        link: 'https://github.com/LordJhonCyber/Projeto_de_Estudos_de_Dados_para_E_commerce'
      },
      {
        title: 'Automação de DevOps',
        description: 'Pipeline CI/CD automatizado com Docker, Kubernetes e integração contínua.',
        category: 'web',
        technologies: ['Docker', 'Kubernetes', 'CI/CD'],
        githubLink: 'https://github.com/LordJhonCyber/Devops_automation',
        link: 'https://github.com/LordJhonCyber/Devops_automation'
      }
    ];

    let projectsToShow = [];

    if (response.success && response.portfolio.length > 0) {
      projectsToShow = response.portfolio;
    } else {
      projectsToShow = defaultProjects;
    }

    if (projectsToShow.length > 0) {
      container.innerHTML = projectsToShow
        .map(
          project => `
        <div class="project-card">
          <span class="category-badge">${project.category || 'Projeto'}</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="project-meta">
            <small>${project.technologies?.join(', ') || 'Projeto'}</small>
          </div>
          <div style="margin-top: 1rem;">
            ${project.link ? `<a href="${project.link}" target="_blank" class="btn">Ver Projeto →</a>` : ''}
            ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="btn">Repositório →</a>` : ''}
          </div>
        </div>
      `
        )
        .join('');
    } else {
      container.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Nenhum projeto disponível ainda.</p>';
    }
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
    
    // Carregar projetos padrão em caso de erro
    const defaultProjects = [
      {
        title: 'Estudos de Dados para E-commerce',
        description: 'Análise de dados e estudo de caso para plataforma de e-commerce com insights valiosos.',
        category: 'web',
        technologies: ['Python', 'Pandas', 'Data Analysis'],
        githubLink: 'https://github.com/LordJhonCyber/Projeto_de_Estudos_de_Dados_para_E_commerce',
        link: 'https://github.com/LordJhonCyber/Projeto_de_Estudos_de_Dados_para_E_commerce'
      },
      {
        title: 'Automação de DevOps',
        description: 'Pipeline CI/CD automatizado com Docker, Kubernetes e integração contínua.',
        category: 'web',
        technologies: ['Docker', 'Kubernetes', 'CI/CD'],
        githubLink: 'https://github.com/LordJhonCyber/Devops_automation',
        link: 'https://github.com/LordJhonCyber/Devops_automation'
      }
    ];

    document.getElementById('projects-grid').innerHTML = defaultProjects
      .map(
        project => `
      <div class="project-card">
        <span class="category-badge">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-meta">
          <small>${project.technologies.join(', ')}</small>
        </div>
        <div style="margin-top: 1rem;">
          <a href="${project.link}" target="_blank" class="btn">Ver Projeto →</a>
          <a href="${project.githubLink}" target="_blank" class="btn">Repositório →</a>
        </div>
      </div>
    `
      )
      .join('');
  }
}
