const Router = require('koa-router');
const mongoose = require('mongoose');

const Product = require('../models/product');

const router = new Router();

router.get('/product', async (ctx) => {
  try {
    ctx.status = 200;
    ctx.body = 'Product'
  } catch (error) {
    console.log(error);
  }
});

router.get('/product/:id', async (ctx) => {
  try {
    const id = ctx.params.id
    ctx.body = id;
    
  } catch (error) {
    console.log(error);
  }
});

router.post('/product', async (ctx) => {
  try {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: ctx.request.body.name,
      price: ctx.request.body.price,
    });
    const res = await product.save();
    ctx.body = res;
  } catch (error) {
    console.log(error);
  }
});

router.put('/product/:id', async (ctx) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
});

router.delete('/product/:id', async (ctx) => {
  try {
    
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;