const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//渲染主頁面
router.get('/', (req, res) => {
	Restaurant.find()
		.lean()
		.sort('_id')
		.then((item) => res.render('home', { item }))
		.catch((err) => console.error(err))
})

//搜尋關鍵字
router.get('/search', (req, res) => {
	const keyword = req.query.keyword
	Restaurant.find({
		$or: [
			{ name: { $regex: `${keyword}`, $options: 'i' } },
			{ category: { $regex: `${keyword}`, $options: 'i' } },
		],
	})
		.lean()
		.then((item) => res.render('home', { item, keyword: req.query.keyword }))
		.catch((err) => console.error(err))
})

//新增餐廳頁面
router.get('/new', (req, res) => {
	res.render('new')
})

//接收新增餐廳表單
router.post('/new', (req, res) => {
	if (!req.body.image) {
		req.body.image = `https://image.freepik.com/free-vector/elegant-restaurant-composition_23-2147855078.jpg`
	}
	const info = req.body
	Restaurant.create(info)
		.then(res.redirect('/'))
		.catch((err) => console.log(err))
})

module.exports = router
