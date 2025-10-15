const multer = require('multer');
const { resolve } = require('node:path');
const { v4 } = require('uuid');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (_request, file, callback) => {
      const uniqueName = v4().concat(`-${file.originalname}`);
      return callback(null, uniqueName);
    },
  }),
};

// configurando a onde vai salvar os arquivos
// abilitando que pode salvar os mesma imagen, porem cada um vai ter um ID unico
