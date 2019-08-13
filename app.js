const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require("koa-bodyparser");

require('dotenv').config()
require('./mongo');

const app = new Koa();
const router = new Router();

const productRouter = require('./app/routes/products');

app.use(bodyParser());

router.get('/', async (ctx) => {
  let name = ctx.request.body.name || 'world';
  
  ctx.body = {
    message: `Hello ${name}!`
  }
});

app.use(logger());
app.use(router.routes());
app.use(productRouter.routes());
// app.use(router.allowedMethods());

app.listen(3000);
