const client = require('./client.cjs')

const createRestaurant = async (restaurantName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO restaurants (name)
      VALUES('${restaurantName}')
      RETURNING *
      `)
    const restaurant = rows[0]
    return restaurant
  } catch (error) {
    console.log(error)
  }
}

const getAllRestaurants = async () => {
  try {
    const { rows: retrievedRestaurants } = await client.query(`
      SELECT * FROM restaurants;
      `)
    return retrievedRestaurants
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createRestaurant,
  getAllRestaurants
}