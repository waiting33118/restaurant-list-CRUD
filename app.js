const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json')
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
app.use(express.static('public'))

app.get('/', (req, res) => {
	res.render('home', { restaurant: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
	const restaurant = restaurantList.results.find(
		(item) => item.id.toString() === req.params.id
	)
	res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
	const keyword = req.query.keyword.toLowerCase()
	const restaurant = restaurantList.results.filter(
		(item) =>
			item.name.toLowerCase().includes(keyword) ||
			item.category.includes(keyword)
	)
	res.render('home', { restaurant, keyword: req.query.keyword })
})

app.listen(port, hostname, () => {
	console.log(`The Server is running on http://${hostname}:${port}`)
})
