const Router = require('koa-router');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('koa-passport')
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = new Router();

router.post('/login', async (ctx) => {
  return passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = err;
    }
    if (user === false) {
      ctx.status = 401;
      ctx.body = { success: false, info }
    } else {
      ctx.body = { success: true }
      return ctx.login(user)
    }
  })(ctx)
});

router.post('/logout', async (ctx) => {
  try {
    console.log('logout')
    ctx.body = 'logout'
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

router.get('/users', async (ctx) => {
  try {
    const users = await User
    .find()
    .select('_id username email passwordHash')
    .exec();

    ctx.body = users;
  } catch (error) {
    ctx.body = error;
  }
});

router.post('/auth', async (ctx) => {
  try {
    const hash = await bcrypt.hash(ctx.request.body.password, Number(process.env.SALT_ROUNDS));
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: ctx.request.body.username,
      // email: ctx.request.body.email,
      passwordHash: hash,
    });
    const res = await user.save();
    ctx.body = res;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }
});

router.post('/user-check', async (ctx) => {
  try {
    const user = await User.findOne({ username: ctx.request.body.username }).exec();
    
    if (user) {
      const res = await bcrypt.compare(ctx.request.body.password, user.passwordHash);
      ctx.body = res;
    } else {
      ctx.body = 'User not Found'
    }
    
  } catch (error) {
    ctx.status = 400;
    ctx.body = error
  }
});


module.exports = router;