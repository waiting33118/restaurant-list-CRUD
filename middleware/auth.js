module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.flash('alert_msg', '請先登入帳號！')
    res.redirect('/users/login')
  }
}
