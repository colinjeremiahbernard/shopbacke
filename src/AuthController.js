const { validationResult, matchedData } =
 require('express-validator');

module.exports = {
  signin: async(res, req) => {
    
  },
  signup: async(req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
      res.json({ error: errors.mapped() });
      return;
       }
       const data = matchedData(req);
       res.json({ tudoCerto: true, data });
}
};
const express = require('express');
const router = express.Router();