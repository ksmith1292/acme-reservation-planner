const client = require('./client.cjs')
const {createCustomer, getAllCustomers} = require('./customers.cjs')
const {createRestaurant, getAllRestaurants} = require('./restaurants.cjs')
const {createReservation, destroyReservation} = require('./reservations.cjs')

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS reservations;
      DROP TABLE IF EXISTS restaurants;
      DROP TABLE IF EXISTS customers;
      `)
  } catch (error) {
    console.log(error)
  }
}

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL      
      );

      CREATE TABLE restaurants (
       id SERIAL PRIMARY KEY,
       name VARCHAR(30) NOT NULL
      );
      CREATE TABLE reservations (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        restaurant_id INTEGER REFERENCES restaurants(id) NOT NULL,
        customer_id INTEGER REFERENCES customers(id) NOT NULL
      )
    `)

  } catch (error) {
    console.log(error)
  }
}


const syncAndSeed = async () => {
  await client.connect()
  console.log('connected to the db')

  console.log('dropping tables')
  await dropTables()
  console.log('tables dropped')

  console.log('creating tables')
  await createTables()
  console.log('tables created')

  console.log('creating customer')
  const greg = await createCustomer('greg')
  const kevin = await createCustomer('kevin')
  const john = await createCustomer('john')
  const harry = await createCustomer('harry')
  console.log('customer created')

  console.log('creating restuarant')
  const subway = await createRestaurant('subway')
  const mcds =await createRestaurant('mcds')
  const portillos = await createRestaurant('portillos')
  const burgerKing = await createRestaurant('burger king')
  console.log('restaurant created')

  console.log('creating reservation')
  await createReservation('2025-01-22', 4, subway.id, greg.id)
  await createReservation('2025-02-22', 2, mcds.id, kevin.id)
  await createReservation('2025-03-22', 3, portillos.id, john.id)
  await createReservation('2025-04-22', 1, burgerKing.id, harry.id)
  await createReservation('2025-05-22', 5, portillos.id, john.id)
  await createReservation('2025-06-22', 2, mcds.id, kevin.id)
 const subwayHarryJuly22 = await createReservation('2025-07-22', 4, subway.id, harry.id)
  console.log('reservation created')

  console.log('Getting all customers')
  const allCustomers = await getAllCustomers()
  console.log(allCustomers)

  console.log('Getting all restaurants')
  const allRestaurants = await getAllRestaurants()
  console.log(allRestaurants)

  console.log('deleting reservation')
  await destroyReservation(subwayHarryJuly22.id)

  await client.end()
  console.log('disconnected for the db')
}


syncAndSeed()