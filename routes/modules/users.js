const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: '電子郵件、密碼與確認密碼為必填項目！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符，請重新輸入！' })
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: '此Email已被註冊！' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email
      })
    }
    User.create({
      name,
      email,
      password
    })
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => console.log(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出！')
  res.redirect('/users/login')
})

module.exports = router
