export class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.userName = userData.username
    this.bookings = null;
  }
}
