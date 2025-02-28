const client =require ('./client.cjs')

const createReservation = async(reservationDate, partyCount, RestaurantId, customerId) => {
  try {
   const { rows } = await client.query(`
      INSERT INTO reservations (date, party_count, restaurant_id, customer_id)
      VALUES('${reservationDate}', ${partyCount}, ${RestaurantId}, ${customerId})
      RETURNING *
      `);


    const retrievedReservations = rows[0]
    return retrievedReservations

  } catch (error) {
    console.log(error)
  }
}

const destroyReservation = async (reservationID) => {
  try {
    await client.query(`
      DELETE FROM reservations WHERE id=${reservationID}
      `)   
    } catch (error) {
    console.log(error)
  }
}

const getAllReservations = async() => {
  try {
    const { rows: retrievedReservations } = await client.query(`
      SELECT * FROM reservations;
      `)
      
    return retrievedReservations 
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createReservation,
  destroyReservation,
  getAllReservations
}