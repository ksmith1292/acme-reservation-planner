const client =require ('./client.cjs')

const createReservation = async(reservationDate, partyCount, RestaurantId, customerId) => {
  try {
    await client.query(`
      INSERT INTO reservations (date, party_count, restaurant_id, customer_id)
      VALUES('${reservationDate}', ${partyCount}, ${RestaurantId}, ${customerId})
      `)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createReservation
}