const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticate, authorize } = require('../middleware/auth');
const User = require('../models/User');

// Middleware de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

// Obter perfil do usuário autenticado
router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
});

// Atualizar perfil do usuário
router.put(
  '/me',
  authenticate,
  [
    body('name').optional().notEmpty().withMessage('Nome não pode ser vazio'),
    body('email').optional().isEmail().withMessage('Email inválido'),
  ],
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const { name, email } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, email },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        message: 'Perfil atualizado com sucesso',
        user: user.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  }
);

// Listar todos os usuários (apenas admin)
router.get('/', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      users: users.map(u => u.toJSON()),
    });
  } catch (error) {
    next(error);
  }
});

// Obter usuário por ID (apenas admin)
router.get('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
});

// Deletar usuário (apenas admin)
router.delete('/:id', authenticate, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Usuário deletado com sucesso',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
