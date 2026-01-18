// Página de Login
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const messageDiv = document.getElementById('login-message');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetchAPI('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });

        if (response.success) {
          setToken(response.token);
          messageDiv.textContent = 'Login realizado! Redirecionando...';
          messageDiv.classList.add('success');
          messageDiv.classList.remove('error');
          messageDiv.style.display = 'block';

          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1500);
        } else {
          throw new Error(response.message || 'Erro ao fazer login');
        }
      } catch (error) {
        messageDiv.textContent = error.message || 'Erro ao fazer login';
        messageDiv.classList.add('error');
        messageDiv.classList.remove('success');
        messageDiv.style.display = 'block';
      }
    });
  }
});
