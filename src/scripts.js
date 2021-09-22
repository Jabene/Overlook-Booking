import './css/base.scss';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import {domUpdates} from './domUpdates'
import {ApiData} from './classes/ApiData'

const daysSelector = document.getElementById('js-days')
const monthsSelector = document.getElementById('js-months');
const yearsSelector = document.getElementById('js-years')
const findRoomsForm = document.getElementById('find-rooms-form')
let apiData;

window.addEventListener('load', loadApiData);
monthsSelector.addEventListener('change', function () {
  domUpdates.updateDay(monthsSelector, true)
})
findRoomsForm.addEventListener('submit', validateDateInput)

function loadApiData() {
  apiData = new ApiData();
  apiData.getCustomerData();
  apiData.getBookingData();
  apiData.getRoomsData();
  domUpdates.updateDate(monthsSelector)
}

function findAvailableRooms() {
  console.log('success')
}

function validateDateInput() {
  event.preventDefault()
  const date = new Date()
  const error = document.getElementById('rooms-form-error')
  if (yearsSelector.value != date.getFullYear()) {
    domUpdates.hide(error)
    return findAvailableRooms()
  }
  if(
    (monthsSelector.selectedIndex < date.getMonth())
      ||
        (monthsSelector.selectedIndex == date.getMonth()
          &&
        daysSelector.selectedIndex < date.getDate())
    ) {
    return error.classList.remove('hidden');
  }
  domUpdates.hide(error)
  findAvailableRooms()
}
