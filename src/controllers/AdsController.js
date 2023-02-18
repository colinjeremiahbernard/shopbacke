const { v4:uuidv4 } = require('uuid');
const jimp = require('jimp');
const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

const addImage = async (buffer) => {
  let newName = '${uuidv4()}.jpg';
  let tmpImage = await jimp.read(buffer);
  tmpImage.cover(500, 500).quality(80).write(`./public/
  media/${newName}`);
  return newName;
}

module.exports = {
getCategories: async (req, res) => {
  const cats = await Category.find().exec();
  let categories = [];
  for (let index in cats) {
    categories.push({
      ...cats[index]._doc,
      img:`${process.env.BASE}/assets/images/
      ${cats[index].slug}.png`
    })
  }
  res.json({categories});
  },
  addAction: async (req, res) => {
    let {title, price, priceneg, desc, cat, token}= req.body;
    const user = await User.findOne({ token }).exec();
    if (!title || !cat) {
      res.json({error:'title or cat is required'});
      return;
    }
    if (cat.length < 12) {
      res.json({error:'category id not valid'});
      return;
    }
    const category = await Category.findById(cat);
    if (!Category) {
      res.json({error:'category is not found'});
      return;
    }
    if (price) {
      price = price
      .replace('.','')
      .replace(',','.')
      .replace('R$','');
      price = parseFloat(price);
    } else {
      price = 0;
    }
    const newAd = new Ad();
    newAd.status = true;
    newAd.idUser = user._id;
    newAd.state = user.state;
    newAd.dateCreated = new date();
    newAd.title = title;
    newAd.category = cat;
    newAd.price = price;
    newAd.priceNegotiable = (priceneg === 'true')
     ? true:false;
    newAd.description = desc;
    newAd.views = 0;
    if (req.files && req.files.img) {
      if (req.files.img.length === undefined) {
        if(['image/jpeg', 'image/jpg', 'image/png']
        .includes(req.files.img.mimetype)) {
          let url = await addImage(req.files.img[index].data);
          newAd.images.push({
            url,
            default: false
          })
        }
      }else {
        for (let index = 0; index < req.files.img.length;
          index++) {
            if(['image/jpeg', 'image/jpg', 'image/png']
            .includes(req.files.img.mimetype)) {
              let url = await addImage(req.files.img.data);
              newAd.images.push({
                url,
                default: false
          });
        }
      }
    }
  }
  if (newAd.images.length > 0) {
    newAd.images[0].default = true;
  }
  const info = await newAd.save();
  res.json({ id: info._id });
  },
  getList: async (req, res) => {

  },
  getItem: async (req, res) => {

  },
  editAction: async (req, res) => {
    
  }
};