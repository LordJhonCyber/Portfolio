# API - Site Jhon

Uma API REST robusta e estável para o website, construída com Node.js e Express.

## 🚀 Características

- ✅ Autenticação com JWT
- ✅ Middleware de segurança (Helmet, CORS)
- ✅ Validação de entrada com Express Validator
- ✅ Tratamento centralizado de erros
- ✅ Logging de requisições
- ✅ Compressão de respostas
- ✅ Modelos MongoDB com Mongoose
- ✅ Suporte a roles (admin, user)
- ✅ Documentação de API

## 📋 Pré-requisitos

- Node.js (v14+)
- MongoDB (local ou Atlas)
- npm ou yarn

## 🔧 Instalação

1. **Clonar ou acessar o projeto**

   ```bash
   cd API
   npm install
   ```

2. **Configurar variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

3. **Editar `.env` com suas configurações**

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/site-jhon
   JWT_SECRET=sua_chave_super_segura_aqui
   ```

## ▶️ Executar

**Modo desenvolvimento:**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor estará disponível em `http://localhost:5000`

## 📚 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/refresh` - Renovar token JWT

### Usuários
- `GET /api/users/me` - Obter perfil (autenticado)
- `PUT /api/users/me` - Atualizar perfil (autenticado)
- `GET /api/users` - Listar usuários (admin)
- `GET /api/users/:id` - Obter usuário (admin)
- `DELETE /api/users/:id` - Deletar usuário (admin)

### Conteúdo
- `GET /api/content` - Listar conteúdos publicados
- `GET /api/content/:slug` - Obter conteúdo por slug
- `POST /api/content` - Criar conteúdo (autenticado)
- `PUT /api/content/:id` - Atualizar conteúdo (autor/admin)
- `DELETE /api/content/:id` - Deletar conteúdo (autor/admin)

### Portfólio
- `GET /api/portfolio` - Listar projetos do portfólio
- `GET /api/portfolio/:slug` - Obter projeto por slug
- `POST /api/portfolio` - Criar projeto (autenticado)
- `PUT /api/portfolio/:id` - Atualizar projeto (autor/admin)
- `DELETE /api/portfolio/:id` - Deletar projeto (autor/admin)

### Imagens
- `GET /api/images/list` - Listar todas as imagens disponíveis
- `GET /api/images/:filename` - Servir imagem específica
- `GET /api/images/info/:filename` - Obter informações da imagem

### Saúde
- `GET /health` - Status da API

## 🧪 Testando a API

### Registrar usuário
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### Criar projeto de portfólio
```bash
curl -X POST http://localhost:5000/api/portfolio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "title": "Meu Projeto Web",
    "description": "Descrição do projeto",
    "category": "web",
    "images": [
      {
        "filename": "profile01.jfif",
        "url": "/api/images/profile01.jfif",
        "alt": "Screenshot do projeto",
        "order": 1
      }
    ],
    "thumbnail": {
      "filename": "profile01.jfif",
      "url": "/api/images/profile01.jfif"
    },
    "technologies": ["Node.js", "React", "MongoDB"],
    "link": "https://seu-projeto.com",
    "githubLink": "https://github.com/seu-usuario/projeto"
  }'
```

### Listar imagens disponíveis
```bash
curl http://localhost:5000/api/images/list
```

### Servir imagem
```
http://localhost:5000/api/images/profile01.jfif
```

## 🔐 Segurança

- Senhas são hash com bcrypt
- JWT para autenticação
- Helmet para headers HTTP
- CORS configurável
- Validação de entrada
- Rate limiting (recomendado em produção)

## 📦 Dependências Principais

- **express** - Framework web
- **mongoose** - ODM MongoDB
- **jsonwebtoken** - Autenticação JWT
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de dados
- **helmet** - Segurança de headers
- **cors** - Cross-Origin Resource Sharing
- **compression** - Compressão de respostas

## 🚀 Deploy

Para produção:

1. Configurar variáveis de ambiente
2. Usar HTTPS
3. Implementar rate limiting
4. Configurar backup do banco de dados
5. Usar serviço de monitoramento
6. Implementar testes automatizados

## 📝 Próximas Melhorias

- [ ] Implementar rate limiting
- [ ] Adicionar testes unitários
- [ ] Swagger/OpenAPI documentation
- [ ] Caching com Redis
- [ ] Upload de arquivos
- [ ] Email notifications
- [ ] Webhooks
- [ ] Analytics

## 📄 Licença

MIT

## 👤 Autor

Jhon

---

Para mais informações ou suporte, entre em contato.
