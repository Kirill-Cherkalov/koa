const Router = require('koa-router');
const mongoose = require('mongoose');

const Product = require('../models/product');

const router = new Router();

router.get('/products', async (ctx) => {
  try {
    const docs = await Product
    .find()
    .select('name price _id')
    .exec();

    ctx.body = docs;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

router.get('/product/:id', async (ctx) => {
  try {
    const id = ctx.params.id

    const doc = await Product.findById(id).exec();
    ctx.body = doc;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
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
    ctx.status = 400;
    ctx.body = error;
  }
});

router.put('/product/:id', async (ctx) => {
  try {
    const _id = ctx.params.id;
    const res = await Product.update({ _id },
      {
        $set: {
          name: ctx.request.body.name,
          price: ctx.request.body.price,
        }
      }).exec();

      ctx.body = res;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error
  }
});

router.delete('/product/:id', async (ctx) => {
  try {
    const id = ctx.params.id;
    const res = await Product.remove({ _id: id }).exec();

    ctx.body = res;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

module.exports = router;