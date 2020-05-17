const express = require('express')
const routes = require('./routes')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const Restaurant = require('./models/restaurant')
require('./config/mongoose')
const app = express()
const hostname = `127.0.0.1`
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)

app.listen(port, hostname, () => {
	console.log(`The Server is running on http://${hostname}:${port}`)
})
