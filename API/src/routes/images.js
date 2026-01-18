const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');

// Diretório de imagens
const IMAGES_DIR = path.join(__dirname, '../../Imagens');

// Garantir que o diretório existe
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// Listar todas as imagens disponíveis
router.get('/list', async (req, res, next) => {
  try {
    if (!fs.existsSync(IMAGES_DIR)) {
      return res.status(200).json({
        success: true,
        images: [],
        message: 'Pasta de imagens vazia',
      });
    }

    const files = fs.readdirSync(IMAGES_DIR);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.jfif'];

    const images = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return imageExtensions.includes(ext);
      })
      .map(file => {
        const filePath = path.join(IMAGES_DIR, file);
        const stats = fs.statSync(filePath);

        return {
          id: file,
          name: file,
          url: `/api/images/${file}`,
          size: stats.size,
          createdAt: stats.birthtime,
        };
      });

    res.status(200).json({
      success: true,
      count: images.length,
      images,
    });
  } catch (error) {
    next(error);
  }
});

// Servir imagem específica
router.get('/:filename', (req, res, next) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(IMAGES_DIR, filename);

    // Validar caminho para evitar traversal attacks
    const normalizedPath = path.normalize(filePath);
    if (!normalizedPath.startsWith(IMAGES_DIR)) {
      return res.status(403).json({
        success: false,
        message: 'Acesso negado',
      });
    }

    // Verificar se arquivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Imagem não encontrada',
      });
    }

    // Enviar arquivo com cache
    res.set('Cache-Control', 'public, max-age=31536000');
    res.sendFile(filePath);
  } catch (error) {
    next(error);
  }
});

// Obter informações de uma imagem
router.get('/info/:filename', (req, res, next) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(IMAGES_DIR, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Imagem não encontrada',
      });
    }

    const stats = fs.statSync(filePath);

    res.status(200).json({
      success: true,
      image: {
        id: filename,
        name: filename,
        url: `/api/images/${filename}`,
        size: stats.size,
        createdAt: stats.birthtime,
        mimeType: getMimeType(filename),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Função auxiliar para obter MIME type
function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.jfif': 'image/jpeg',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

module.exports = router;
