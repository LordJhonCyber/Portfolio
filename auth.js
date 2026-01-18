// Gerenciar autenticação
function updateAuthUI() {
  const isAuth = isAuthenticated();
  const authLink = document.getElementById('auth-link');
  const profileLink = document.getElementById('profile-link');
  const logoutLink = document.getElementById('logout-link');
  const adminSection = document.getElementById('admin-section');

  if (isAuth) {
    if (authLink) authLink.style.display = 'none';
    if (profileLink) profileLink.style.display = 'block';
    if (logoutLink) logoutLink.style.display = 'block';
    if (adminSection) adminSection.style.display = 'block';
  } else {
    if (authLink) authLink.style.display = 'block';
    if (profileLink) profileLink.style.display = 'none';
    if (logoutLink) logoutLink.style.display = 'none';
    if (adminSection) adminSection.style.display = 'none';
  }
}

// Logout
function logout() {
  removeToken();
  updateAuthUI();
  window.location.href = 'index.html';
}

// Menu responsivo
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
});
