const client = require('./client.cjs')

const createCustomer = async (customerName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO customers (name)
      VALUES ('${customerName}')
      RETURNING *;
      `)
    const customer = rows[0]
    return customer
  } catch (error) {
    console.log(error)
  }
}

const getAllCustomers = async () => {
  try {
    const { rows: retrievedCustomers } = await client.query(`
      SELECT * FROM customers;
      `)
    return retrievedCustomers
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createCustomer,
  getAllCustomers
}