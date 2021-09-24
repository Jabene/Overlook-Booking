export class ApiData {
  constructor(){
    this.customers = null;
    this.customer = null;
    this.bookings = null;
    this.rooms = null;
  }

  getCustomersData() {
    return fetch('http://localhost:3001/api/v1/customers')
    .then( response => {
        return response.json()
    })
    .then( customers =>
      this.customers = customers.customers
    );
  }

  getBookingData() {
    return fetch('http://localhost:3001/api/v1/bookings')
    .then( response => {
        return response.json()
    })
    .then( bookings =>
      this.bookings = bookings.bookings
    );
  }

  getRoomsData() {
    return fetch('http://localhost:3001/api/v1/rooms')
    .then( response => {
        return response.json()
    })
    .then( rooms =>
      this.rooms = rooms.rooms
    );
  }

  getUsernames() {
    this.customers = this.customers.map(customer => {
      return {
        id: customer.id,
        name: customer.name,
        username: `customer${customer.id}`
      }
    })
  }

  getCompleteBookingInfo() {
    this.bookings = this.bookings.map(booking => {
      const matchingRoom = this.rooms.find(room => {
        return booking.roomNumber === room.number
      })
      return {
        id: booking.id,
        userID: booking.userID,
        date: booking.date,
        roomNumber: booking.roomNumber,
        roomServiceCharges: [],
        roomType: matchingRoom.roomType,
        bedSize: matchingRoom.bedSize,
        numBeds: matchingRoom.numBeds,
        costPerNight: matchingRoom.costPerNight
      }
    })
  }
}
