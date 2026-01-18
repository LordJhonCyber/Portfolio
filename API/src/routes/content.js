const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth');
const Content = require('../models/Content');

// Middleware de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Listar conteúdos publicados
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, tag } = req.query;

    const filter = { published: true };
    if (category) filter.category = category;
    if (tag) filter.tags = tag;

    const content = await Content.find(filter)
      .populate('author', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ publishedAt: -1 });

    const total = await Content.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: content.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      content,
    });
  } catch (error) {
    next(error);
  }
});

// Obter conteúdo por slug
router.get('/:slug', async (req, res, next) => {
  try {
    const content = await Content.findOne({ slug: req.params.slug }).populate(
      'author',
      'name email'
    );

    if (!content || !content.published) {
      return res.status(404).json({
        success: false,
        message: 'Conteúdo não encontrado',
      });
    }

    // Incrementar visualizações
    content.views += 1;
    await content.save();

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    next(error);
  }
});

// Criar novo conteúdo (autenticado)
router.post(
  '/',
  authenticate,
  [
    body('title').notEmpty().withMessage('Título é obrigatório'),
    body('description').notEmpty().withMessage('Descrição é obrigatória'),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { title, description, body, category, tags, image } = req.body;

      const content = new Content({
        title,
        description,
        body,
        category,
        tags,
        image,
        author: req.user.id,
      });

      await content.save();

      res.status(201).json({
        success: true,
        message: 'Conteúdo criado com sucesso',
        content,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Atualizar conteúdo (autor ou admin)
router.put(
  '/:id',
  authenticate,
  async (req, res, next) => {
    try {
      const content = await Content.findById(req.params.id);

      if (!content) {
        return res.status(404).json({
          success: false,
          message: 'Conteúdo não encontrado',
        });
      }

      // Verificar permissão
      if (content.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Você não tem permissão para atualizar este conteúdo',
        });
      }

      const { title, description, body, category, tags, image, published } = req.body;

      Object.assign(content, {
        title: title || content.title,
        description: description || content.description,
        body: body || content.body,
        category: category || content.category,
        tags: tags || content.tags,
        image: image || content.image,
        published: published !== undefined ? published : content.published,
      });

      if (published && !content.publishedAt) {
        content.publishedAt = new Date();
      }

      await content.save();

      res.status(200).json({
        success: true,
        message: 'Conteúdo atualizado com sucesso',
        content,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Deletar conteúdo (autor ou admin)
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Conteúdo não encontrado',
      });
    }

    // Verificar permissão
    if (content.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Você não tem permissão para deletar este conteúdo',
      });
    }

    await Content.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Conteúdo deletado com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
