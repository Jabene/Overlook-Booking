import './css/base.scss';
import './images/reception-background.png'
import './images/single-king-room.png'
import {domUpdates} from './domUpdates'
import {ApiData} from './classes/ApiData'
import {User} from './classes/User'

const monthsSelector = document.getElementById('js-months');
const daysSelector = document.getElementById('js-days')
const yearsSelector = document.getElementById('js-years')
const findRoomsForm = document.getElementById('find-rooms-form')
const logInForm = document.getElementById('js-log-in-form');
const pastBookingsBtn = document.getElementById('js-past-bookings-btn');
const newBookingBtn = document.getElementById('js-make-new-booking-btn');
const cardsContainer = document.getElementById('js-booking-cards-container')

let apiData;
let user;

window.addEventListener('load', loadApiData);
monthsSelector.addEventListener('change', function () {
  domUpdates.updateDay(monthsSelector, true)
})
findRoomsForm.addEventListener('submit', validateDateInput)
logInForm.addEventListener('submit', validateLogInInput)
pastBookingsBtn.addEventListener('click', displayPastBookings)
newBookingBtn.addEventListener('click', makeNewBooking)
cardsContainer.addEventListener('click', verifyCardWasClicked)

function loadApiData() {
  apiData = new ApiData();
  apiData.getCustomersData();
  apiData.getBookingData();
  apiData.getRoomsData();
  domUpdates.updateDate()
}

function findAvailableRooms() {
  const day = daysSelector.value
  const year = yearsSelector.value
  let month = monthsSelector.selectedIndex + 1
  if (month < 10){
    month = "0"+month
  }
  const selectedDate = `${year}/${month}/${day}`
  let bookedRooms = apiData.bookings.filter(booking => {
    return booking.date === selectedDate
  })
  bookedRooms = bookedRooms.map(booking => {
    return booking.roomNumber
  })
  domUpdates.displayAvailableRooms(bookedRooms, apiData.rooms)
}

function validateDateInput(event) {
  event.preventDefault()
  const date = new Date()
  const error = document.getElementById('rooms-form-error')
  if (parseInt(yearsSelector.value) !== date.getFullYear()) {
    domUpdates.hide(error)
    return findAvailableRooms()
  }
  if (
    (monthsSelector.selectedIndex < date.getMonth())
      ||
        (monthsSelector.selectedIndex === date.getMonth()
          &&
        daysSelector.selectedIndex < date.getDate())
  ) {
    return error.classList.remove('hidden');
  }
  domUpdates.hide(error)
  findAvailableRooms()
}

function validateLogInInput(event) {
  event.preventDefault()
  apiData.getUsernames()
  const username = document.getElementById('js-log-in-username').value;
  const password = document.getElementById('js-log-in-password').value;
  apiData.customer = apiData.customers.find(customer => {
    return customer.username === username
  })
  if (apiData.customer
    && (password === 'overlook2021')) {
      user = new User(apiData.customer);
      retrievePreviousBookings()
      domUpdates.displayUserInfo(user)
      return
  }
  domUpdates.show(document.getElementById('sign-in-error'))
}

function retrievePreviousBookings() {
  apiData.getCompleteBookingInfo()
  const previousBookings = apiData.bookings.filter(booking => {
    return booking.userID === user.id
  })
  user.bookings = previousBookings
}

function displayPastBookings(event) {
  event.preventDefault()
  domUpdates.displayPastBookings(user.bookings)

}

function makeNewBooking(event) {
  event.preventDefault()
  domUpdates.show(findRoomsForm)
  domUpdates.hide(document.getElementById('js-booking-cards-container'))
}

function verifyCardWasClicked(event) {
  event.preventDefault()
  if (event.target.id === 'js-booking-cards-container') {
    return
  }

}
