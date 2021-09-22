export const customers = {
  getAllCustomers() {
    return fetch('http://localhost:3001/api/v1/customers')
    .then( response => {
      if (response.ok) {
        return response.json()
      } else {
        return 'error'
      }
    });
  }
}

customers.getAllCustomers()
