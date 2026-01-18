const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Título é obrigatório'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Descrição é obrigatória'],
    },
    body: {
      type: String,
    },
    category: {
      type: String,
      enum: ['blog', 'page', 'portfolio', 'news'],
      default: 'page',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [String],
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    image: {
      url: String,
      alt: String,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Gerar slug antes de salvar
contentSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Content', contentSchema);
