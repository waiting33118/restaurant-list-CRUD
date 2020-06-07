const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user')

// 登入介面
router.get('/login', (req, res) => {
  res.render('login')
})

// 註冊介面
router.get('/register', (req, res) => {
  res.render('register')
})

// 登入資料form
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

// 註冊資料form
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
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => {
        return User.create({
          name,
          email,
          password: hash
        })
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
