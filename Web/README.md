# Website - Jhon Portfolio & Blog

Um site moderno, responsivo e funcional para portfólio pessoal e blog, integrado com a API Node.js.

## 🌐 Estrutura do Site

```
Web/
├── index.html              # Página inicial
├── portfolio.html          # Galeria de projetos
├── blog.html              # Blog e artigos
├── about.html             # Página sobre
├── login.html             # Login de usuários
├── register.html          # Registrar novo usuário
├── styles/
│   ├── main.css          # Estilos principais
│   └── responsive.css    # Estilos responsivos
└── js/
    ├── config.js         # Configuração e API
    ├── auth.js           # Autenticação
    ├── login.js          # Lógica de login
    ├── register.js       # Lógica de registro
    ├── home.js           # Lógica da página inicial
    ├── portfolio.js      # Lógica do portfólio
    └── blog.js           # Lógica do blog
```

## ✨ Funcionalidades

### Públicas
- ✅ Visualizar portfólio de projetos
- ✅ Ler blog e artigos
- ✅ Página sobre o desenvolvedor
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Filtros de categoria no portfólio
- ✅ Contador de visualizações

### Autenticadas
- ✅ Criar novo projeto no portfólio
- ✅ Criar novo artigo no blog
- ✅ Editar e deletar conteúdo próprio
- ✅ Perfil de usuário

### Admin
- ✅ Gerenciar todos os projetos
- ✅ Gerenciar todos os artigos
- ✅ Deletar usuários

## 🚀 Como Usar

### 1. Iniciar a API

```bash
cd "c:\Users\Jhon\OneDrive\Projetos\Site Jhon\API"
npm install
npm run dev
```

A API estará em `http://localhost:5000`

### 2. Abrir o Website

Você pode servir o site de várias formas:

**Opção A: Usar Live Server no VS Code**
- Instale a extensão "Live Server"
- Clique com botão direito em `index.html`
- Selecione "Open with Live Server"

**Opção B: Usar Python**
```bash
cd "c:\Users\Jhon\OneDrive\Projetos\Site Jhon\Web"
python -m http.server 8000
```

**Opção C: Usar Node.js HTTP Server**
```bash
npm install -g http-server
cd "c:\Users\Jhon\OneDrive\Projetos\Site Jhon\Web"
http-server
```

O site estará em `http://localhost:8000` (ou a porta indicada)

## 📱 Páginas do Site

### Página Inicial (`index.html`)
- Hero section com apresentação
- Projetos em destaque
- Últimas postagens do blog
- Informações sobre

### Portfólio (`portfolio.html`)
- Grid de projetos
- Filtros por categoria (Web, Design, Mobile, Fotografia)
- Card com imagem, título, descrição
- Contador de visualizações

### Blog (`blog.html`)
- Lista de artigos
- Filtro por categoria
- Sidebar com categorias
- Paginação

### Sobre (`about.html`)
- Informações pessoais
- Habilidades principais
- Foto de perfil
- Links de redes sociais

### Login (`login.html`)
- Formulário de login
- Validação de dados
- Armazenamento de token

### Registrar (`register.html`)
- Formulário de registro
- Validação de senhas
- Criação de conta

## 🎨 Design e Estilos

### Cores
- **Primário**: `#00a8ff` (Azul)
- **Secundário**: `#ff6b6b` (Vermelho)
- **Dark**: `#1a1a2e` (Preto)
- **Light**: `#f5f5f5` (Cinza claro)

### Responsividade
- **Desktop**: Layout otimizado com grid
- **Tablet**: Ajustes de espaçamento (768px)
- **Mobile**: Layout em coluna única (480px)

### Componentes
- Navbar sticky com menu responsivo
- Hero section com gradiente
- Cards com hover effects
- Botões com transições suaves
- Formulários validados
- Footer com links sociais

## 🔗 Integração com API

O site se comunica com a API através do arquivo `js/config.js`:

```javascript
const API_URL = 'http://localhost:5000/api';

// Exemplos de endpoints utilizados:
GET    /api/portfolio           // Listar projetos
GET    /api/portfolio/:slug     // Detalhe do projeto
POST   /api/portfolio           // Criar projeto (autenticado)

GET    /api/content             // Listar artigos
POST   /api/content             // Criar artigo (autenticado)

GET    /api/images/list         // Listar imagens
GET    /api/images/:filename    // Servir imagem

POST   /api/auth/register       // Registrar usuário
POST   /api/auth/login          // Login
```

## 🔐 Autenticação

- Token JWT armazenado no `localStorage`
- Validação automática em cada requisição
- Menu atualizado após login/logout
- Redirecionamento em páginas protegidas

## 📸 Imagens

As imagens são armazenadas em `../Imagens/` e servidas pela API:

```
GET http://localhost:5000/api/images/profile01.jfif
GET http://localhost:5000/api/images/list
```

## 🛠️ Troubleshooting

### Erro de CORS
Certifique-se de que a API está configurada com CORS correto:
```env
CORS_ORIGIN=http://localhost:3000,http://localhost:8000
```

### Imagens não carregam
Verifique se:
- A pasta `Imagens/` contém as imagens
- A API está rodando
- O nome do arquivo está correto

### Token expirado
O token expira após 7 dias. Faça login novamente.

## 📱 Recursos Futuros

- [ ] Dark mode
- [ ] Comentários em artigos
- [ ] Sistema de busca
- [ ] Tags em posts
- [ ] Galeria de imagens
- [ ] Newsletter
- [ ] Formulário de contato
- [ ] Analytics

## 📄 Licença

MIT

---

**Site desenvolvido com ❤️ para Jhon**
