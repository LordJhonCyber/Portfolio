const mongoose = require('mongoose');

const connect = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/site-jhon';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Conectado ao MongoDB com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ Desconectado do MongoDB');
  } catch (error) {
    console.error('❌ Erro ao desconectar:', error.message);
  }
};

module.exports = { connect, disconnect };
