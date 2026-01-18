const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth');
const Portfolio = require('../models/Portfolio');

// Middleware de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Listar projetos do portfólio (públicos)
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 12, category, featured } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (featured === 'true') filter.featured = true;

    const portfolio = await Portfolio.find(filter)
      .populate('author', 'name email')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Portfolio.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: portfolio.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      portfolio,
    });
  } catch (error) {
    next(error);
  }
});

// Obter projeto por slug
router.get('/:slug', async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({ slug: req.params.slug }).populate(
      'author',
      'name email'
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado',
      });
    }

    // Incrementar visualizações
    portfolio.views += 1;
    await portfolio.save();

    res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    next(error);
  }
});

// Criar novo projeto (autenticado)
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
      const { title, description, category, images, thumbnail, technologies, link, githubLink, featured } = req.body;

      const portfolio = new Portfolio({
        title,
        description,
        category,
        images: images || [],
        thumbnail,
        author: req.user.id,
        technologies: technologies || [],
        link,
        githubLink,
        featured: featured || false,
      });

      await portfolio.save();

      res.status(201).json({
        success: true,
        message: 'Projeto criado com sucesso',
        portfolio,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Atualizar projeto (autor ou admin)
router.put(
  '/:id',
  authenticate,
  async (req, res, next) => {
    try {
      const portfolio = await Portfolio.findById(req.params.id);

      if (!portfolio) {
        return res.status(404).json({
          success: false,
          message: 'Projeto não encontrado',
        });
      }

      // Verificar permissão
      if (portfolio.author.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({
          success: false,
          message: 'Você não tem permissão para atualizar este projeto',
        });
      }

      const { title, description, category, images, thumbnail, technologies, link, githubLink, featured } = req.body;

      Object.assign(portfolio, {
        title: title || portfolio.title,
        description: description || portfolio.description,
        category: category || portfolio.category,
        images: images || portfolio.images,
        thumbnail: thumbnail || portfolio.thumbnail,
        technologies: technologies || portfolio.technologies,
        link: link || portfolio.link,
        githubLink: githubLink || portfolio.githubLink,
        featured: featured !== undefined ? featured : portfolio.featured,
      });

      await portfolio.save();

      res.status(200).json({
        success: true,
        message: 'Projeto atualizado com sucesso',
        portfolio,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Deletar projeto (autor ou admin)
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: 'Projeto não encontrado',
      });
    }

    // Verificar permissão
    if (portfolio.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Você não tem permissão para deletar este projeto',
      });
    }

    await Portfolio.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Projeto deletado com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
