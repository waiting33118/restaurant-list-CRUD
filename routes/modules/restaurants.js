const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 進入單一頁面(detail)
router.get('/:_id', (req, res) => {
  const id = req.params._id
  Restaurant.findById(id)
    .lean()
    .then((item) => res.render('show', { item }))
    .catch((err) => console.error(err))
})

// 接收新增餐廳表單
router.post('/new', (req, res) => {
  if (!req.body.image) {
    req.body.image =
      'https://image.freepik.com/free-vector/elegant-restaurant-composition_23-2147855078.jpg'
  }
  const info = req.body
  Restaurant.create(info)
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
})

// 修改餐廳頁面
router.get('/:_id/edit', (req, res) => {
  const id = req.params._id
  Restaurant.findById(id)
    .lean()
    .then((item) => res.render('edit', { item }))
    .catch((err) => console.error(err))
})

// 接收修改餐廳表單
router.put('/:_id', (req, res) => {
  const id = req.params._id
  const info = req.body
  if (!info.image) {
    info.image =
      'https://image.freepik.com/free-vector/elegant-restaurant-composition_23-2147855078.jpg'
  }
  Restaurant.findById(id)
    .then((item) => {
      Object.assign(item, info)
      item.save()
    })
    .then(res.redirect(`/restaurants/${id}`))
})

// 接收刪除餐廳表單
router.delete('/:_id', (req, res) => {
  const id = req.params._id
  Restaurant.findById(id)
    .then((item) => item.remove())
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
