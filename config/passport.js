const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ email })
          .then((user) => {
            if (!user) {
              return done(
                null,
                false,
                req.flash('alert_msg', '此帳號尚未註冊！')
              )
            }
            if (password !== user.password) {
              return done(null, false, req.flash('alert_msg', '密碼錯誤！'))
            }
            return done(null, user)
          })
          .catch((err) => done(err))
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user._id)
  })
  passport.deserializeUser((_id, done) => {
    User.findById({ _id })
      .lean()
      .then((user) => {
        done(null, user)
      })
      .catch((err) => done(err))
  })
}
