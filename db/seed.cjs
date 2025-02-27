
const client = require('./client.cjs')

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
        customers_id INTEGER REFERENCES customers(id) NOT NULL
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

  await client.end()
  console.log('disconnected for the db')
}


syncAndSeed()