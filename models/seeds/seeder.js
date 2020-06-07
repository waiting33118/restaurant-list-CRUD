if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const User = require('../user')
const Restaurant = require('../restaurant')
const userInfo = require('../seeds/info.json').users

db.once('open', () => {
  console.log('Create User1')
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(userInfo[0].password, salt))
    .then((hash) => {
      return User.create({
        name: userInfo[0].name,
        email: userInfo[0].email,
        password: hash
      }).catch((err) => console.log(err))
    })
    .then((user) => {
      const userId = user._id
      return Promise.all(
        Array.from(userInfo[0].restaurants, (info) =>
          Restaurant.create({
            name: info.name,
            name_en: info.name_en,
            category: info.category,
            image: info.image,
            location: info.location,
            phone: info.phone,
            google_map: info.google_map,
            google_map_iframe: info.google_map_iframe,
            rating: info.rating,
            description: info.description,
            userId
          })
        )
      )
    })

  console.log('Create User2')
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(userInfo[1].password, salt))
    .then((hash) => {
      return User.create({
        name: userInfo[1].name,
        email: userInfo[1].email,
        password: hash
      }).catch((err) => console.log(err))
    })
    .then((user) => {
      const userId = user._id
      return Promise.all(
        Array.from(userInfo[1].restaurants, (info) =>
          Restaurant.create({
            name: info.name,
            name_en: info.name_en,
            category: info.category,
            image: info.image,
            location: info.location,
            phone: info.phone,
            google_map: info.google_map,
            google_map_iframe: info.google_map_iframe,
            rating: info.rating,
            description: info.description,
            userId
          })
        )
      )
    })
    .then(() => {
      console.log('The Data has been created!')
      process.exit()
    })
})
