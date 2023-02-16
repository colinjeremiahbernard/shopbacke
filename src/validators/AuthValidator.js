const { checkSchema } = require('express-validator');
const { signin } = require('../AuthController');

module.exports = {
  signup: checkSchema({
    name: {
      trim: true,
      isLenght: {
        options: { min: 2 },
        },
      errorMessage:"Nome precisa ter pelo menos 2 caracteres"  
  },
  email: {
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Email invalido"
  },
  password: {
    isLength: {
      options: { min: 2 },
},
  errorMessage: "Senha precisa ter pelo menos 2 caracteres"
},
 state: {
  notEmpty: true,
  errorMessage: "Estado não pode ser vazio"
 }
  }),
  signin: checkSchema({
   email: {
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Email invalido"
  },
  password: {
    isLength: {
      options: { min: 2 },
},
  errorMessage: "Senha precisa ter pelo menos 2 caracteres"
}
  })
};