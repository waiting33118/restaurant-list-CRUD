const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
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
            bcrypt.compare(password, user.password).then((isMatch) => {
              if (isMatch) {
                return done(null, user)
              }
              return done(null, false, req.flash('alert_msg', '密碼錯誤！'))
            })
          })
          .catch((err) => done(err))
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
      },
      (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json
        User.findOne({ email }).then((user) => {
          if (user) return done(null, user)
          // 若無帳號紀錄則建立
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then((salt) => bcrypt.hash(randomPassword, salt))
            .then((hash) => {
              return User.create({
                name,
                email,
                password: hash
              })
            })
            .then((user) => done(null, user))
            .catch((err) => console.log(err))
        })
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
