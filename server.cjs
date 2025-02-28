const client = require('./db/client.cjs')
client.connect()

const { getAllCustomers } = require('./db/customers.cjs')
const { getAllRestaurants } = require('./db/restaurants.cjs')
const { getAllReservations, createReservation } = require('./db/reservations.cjs')


const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req,res,next) => {
  res.send('welcome')
})

app.get('/api/customers',  async (req, res, next)  =>{
  try {
    const allCustomers = await getAllCustomers ()

    res.send(allCustomers)
  } catch (error) {
    next(error)
  
  }
})

app.get('/api/restaurants',  async (req, res, next)  =>{
  try {
    const allRestaurants = await getAllRestaurants ()

    res.send(allRestaurants)
  } catch (error) {
    next(error)
  
  }
})

app.get('/api/reservations',  async (req, res, next)  =>{
  try {
    const allReservations = await getAllReservations ()

    res.send(allReservations)
  } catch (error) {
    next(error)
  
  }
})

app.post('/api/customers/:id/reservations', async(req,res,next)  => {
  const { id: customerId } = req.params;
  const { restaurant_id, date, party_count } = req.body
  try {
   const newReservation = await createReservation(date, party_count, restaurant_id, customerId)
   res.send(newReservation)
  } catch (error) {
    next(error)
  }
  
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
})