const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const app = express()

const hostname = `127.0.0.1`
const port = 3000

mongoose.connect('mongodb://localhost/my-restaurant', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', () => console.error('connection error!'))
db.once('open', () => console.log('database connected!'))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

//渲染主頁面
app.get('/', (req, res) => {
	Restaurant.find()
		.lean()
		.then((item) => res.render('home', { item }))
		.catch((err) => console.error(err))
})

//進入單一頁面(detail)
app.get('/restaurants/:_id', (req, res) => {
	const id = req.params._id
	Restaurant.findById(id)
		.lean()
		.then((item) => res.render('show', { item }))
		.catch((err) => console.error(err))
})

//搜尋關鍵字
app.get('/search', (req, res) => {
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
app.get('/new', (req, res) => {
	res.render('new')
})

//修改餐廳頁面
app.get('/restaurants/:_id/edit', (req, res) => {
	const id = req.params._id
	Restaurant.findById(id)
		.lean()
		.then((item) => res.render('edit', { item }))
		.catch((err) => console.error(err))
})

//接收新增餐廳表單
app.post('/new', (req, res) => {
	if (!req.body.image) {
		req.body.image = `https://image.freepik.com/free-vector/elegant-restaurant-composition_23-2147855078.jpg`
	}
	const info = req.body
	Restaurant.create(info)
		.then(res.redirect('/'))
		.catch((err) => console.log(err))
})

//接收修改餐廳表單
app.post('/restaurants/:_id/edit', (req, res) => {
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

app.listen(port, hostname, () => {
	console.log(`The Server is running on http://${hostname}:${port}`)
})
