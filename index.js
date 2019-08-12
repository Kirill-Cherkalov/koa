const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(logger());

router.get('/', async (ctx) => {
  let name = ctx.request.body.name || 'world';
  // let name = ctx.request.query.name || "World";

  ctx.body = {
    message: `Hello ${name}!`
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
