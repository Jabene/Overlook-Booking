export class ApiData {
  constructor(){
    this.customers = [];
    this.customer = {};
    this.bookings = [];
    this.rooms = [];
  }

  getCustomerData() {
    return fetch('http://localhost:3001/api/v1/customers')
    .then( response => {
      if (response.ok) {
        return response.json()
      } else {
        return 'error'
      }
    })
    .then( customers =>
      this.customers = customers.customers
    );
  }

  getBookingData() {
    return fetch('http://localhost:3001/api/v1/bookings')
    .then( response => {
      if (response.ok) {
        return response.json()
      } else {
        return 'error'
      }
    })
    .then( bookings =>
      this.bookings = bookings.bookings
    );
  }

  getRoomsData() {
    return fetch('http://localhost:3001/api/v1/rooms')
    .then( response => {
      if (response.ok) {
        return response.json()
      } else {
        return 'error'
      }
    })
    .then( rooms =>
      this.rooms = rooms.rooms
    );
  }
}
