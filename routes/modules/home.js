const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 渲染主頁面
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort('_id')
    .then((item) => res.render('home', { item }))
    .catch((err) => console.error(err))
})

// 依照排序顯示
router.get('/sort/:by', (req, res) => {
  const userId = req.user._id
  const sortBy = req.params.by
  Restaurant.find({ userId })
    .lean()
    .sort(sortBy)
    .then((item) => {
      res.render('home', { item })
    })
    .catch((err) => console.error(err))
})

// 搜尋關鍵字
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  Restaurant.find({
    userId,
    $or: [
      { name: { $regex: `${keyword}`, $options: 'i' } },
      { category: { $regex: `${keyword}`, $options: 'i' } }
    ]
  })
    .lean()
    .then((item) => res.render('home', { item, keyword: req.query.keyword }))
    .catch((err) => console.error(err))
})

module.exports = router
