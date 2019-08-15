const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

const User = require('./app/models/user');

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.find({ _id: id }).exec();

    done(null, user)
  } catch(err) {
    done(err)
  }
})

passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username }).exec();
      
    if (user) {
      const res = await bcrypt.compare(password, user.passwordHash);

      if (res) {
        return done(null, user);
      }

      return done(null, false, 'Password is not correct.');
    } else {
      return done(null, false, 'User not found.');
    }
  } catch (error) {
    return done(error)
  }
}))





// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const User = require('./app/models/user');

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     console.log(username, password, 'username, password');
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

// // passport.use(new LocalStrategy({
// //         usernameField: 'email',
// //         passwordField: 'password'
// //     }, 
// //     function (email, password, cb) {
// //         //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
// //         return User.findOne({ email, password })
// //            .then(user => {
// //                if (!user) {
// //                    return cb(null, false, {message: 'Incorrect email or password.'});
// //                }
// //                return cb(null, user, {message: 'Logged In Successfully'});
// //           })
// //           .catch(err => cb(err));
// //     }
// // ));