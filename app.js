const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require("koa-bodyparser");
const session = require('koa-session')
const passport = require('koa-passport')

require('dotenv').config()
require('./mongo');
require('./passport');

const app = new Koa();
const router = new Router();

const productRouter = require('./app/routes/products');
const authRouter = require('./app/routes/auth');

app.use(bodyParser());
app.keys = ['secret']
app.use(session({}, app))
app.use(passport.initialize())
app.use(passport.session())

router.get('/', async (ctx) => {
  let name = ctx.request.body.name || 'world';
  
  ctx.body = {
    message: `Hello ${name}!`
  }
});

// app.use(router.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/app',
//     failureRedirect: '/'
//   })
// ))

app.use(logger());
app.use(router.routes());
app.use(productRouter.routes());
app.use(authRouter.routes());

app.listen(3000);
