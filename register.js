// Página de Registro
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const messageDiv = document.getElementById('register-message');

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;

      if (password !== confirmPassword) {
        messageDiv.textContent = 'As senhas não correspondem';
        messageDiv.classList.add('error');
        messageDiv.classList.remove('success');
        messageDiv.style.display = 'block';
        return;
      }

      try {
        const response = await fetchAPI('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        });

        if (response.success) {
          setToken(response.token);
          messageDiv.textContent = 'Registro realizado! Redirecionando...';
          messageDiv.classList.add('success');
          messageDiv.classList.remove('error');
          messageDiv.style.display = 'block';

          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1500);
        } else {
          throw new Error(response.message || 'Erro ao registrar');
        }
      } catch (error) {
        messageDiv.textContent = error.message || 'Erro ao registrar';
        messageDiv.classList.add('error');
        messageDiv.classList.remove('success');
        messageDiv.style.display = 'block';
      }
    });
  }
});
