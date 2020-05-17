const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

//進入單一頁面(detail)
router.get('/:_id', (req, res) => {
	const id = req.params._id
	Restaurant.findById(id)
		.lean()
		.then((item) => res.render('show', { item }))
		.catch((err) => console.error(err))
})

//修改餐廳頁面
router.get('/:_id/edit', (req, res) => {
	const id = req.params._id
	Restaurant.findById(id)
		.lean()
		.then((item) => res.render('edit', { item }))
		.catch((err) => console.error(err))
})

//接收修改餐廳表單
router.put('/:_id', (req, res) => {
	const id = req.params._id
	const info = req.body
	if (!info.image) {
		info.image = `https://image.freepik.com/free-vector/elegant-restaurant-composition_23-2147855078.jpg`
	}
	Restaurant.findById(id)
		.then((item) => {
			;(item.name = info.name),
				(item.name_en = info.name_en),
				(item.category = info.category),
				(item.image = info.image),
				(item.location = info.location),
				(item.phone = info.phone),
				(item.google_map = info.google_map),
				(item.google_map_iframe = info.google_map_iframe),
				(item.rating = info.rating),
				(item.description = info.description)
			item.save()
		})
		.then(res.redirect(`/restaurants/${id}`))
})

//接收刪除餐廳表單
router.delete('/:_id', (req, res) => {
	const id = req.params._id
	Restaurant.findById(id)
		.then((item) => item.remove())
		.then(res.redirect('/'))
		.catch((err) => console.log(err))
})

module.exports = router
