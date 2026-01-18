const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
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
    category: {
      type: String,
      enum: ['web', 'design', 'mobile', 'photography', 'other'],
      default: 'web',
    },
    images: [
      {
        filename: String,
        url: String,
        alt: String,
        order: Number,
      },
    ],
    thumbnail: {
      filename: String,
      url: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    technologies: [String],
    link: String,
    githuLink: String,
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Gerar slug antes de salvar
portfolioSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
