const { v4:uuidv4 } = require('uuid');
const jimp = require('jimp');
const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

const addImage = async (buffer) => {
  let newName = '${uuidv4()}.jpg';
  let tmpImage = await jimp.read(buffer);
  tmpImage.cover(500, 500);
}

module.exports = {
getCategories: async (req, res) => {
  },
  addAction: async (req, res) => {

  },
  getList: async (req, res) => {

  },
  getItem: async (req, res) => {

  },
  editAction: async (req, res) => {
    
  }
};