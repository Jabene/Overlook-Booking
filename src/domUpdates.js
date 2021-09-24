export let domUpdates = {

  updateDate() {
    const date = new Date();
    const monthsSelector = document.getElementById('js-months')
    monthsSelector.selectedIndex = date.getMonth()
    this.updateDay(monthsSelector, false)
    this.updateYear(date.getFullYear())
  },

  updateDay(monthsSelector, userChangedMonth) {
    const date = new Date();
    const days = parseInt(monthsSelector.value)
    const daysSelector = document.getElementById('js-days')
    daysSelector.innerHTML = ''
    for ( let i = 0; i < days; i++) {
      daysSelector.innerHTML += `<option>${i + 1}</option>`
    }
    if (!userChangedMonth) {
      return daysSelector.selectedIndex = date.getDate()
    }
    daysSelector.selectedIndex = 0
  },

  updateYear(currentYear) {
    const yearsSelector = document.getElementById('js-years')
    for ( let i = 0; i < 4; i++) {
      const year = currentYear + i
      yearsSelector.innerHTML += `<option value = '${year}'>${year}</option>`
    }
  },

  displayUserInfo(user) {
    const usernameHeading = document.getElementById('username')
    const logInForm = document.getElementById('js-sign-in')
    const pastBookingBtn = document.getElementById('js-past-bookings-btn')
    const newBookingBtn = document.getElementById('js-make-new-booking-btn')
    const userTotalSpent = document.getElementById('js-user-total-spent')
    this.show(usernameHeading, pastBookingBtn, newBookingBtn, userTotalSpent)
    this.hide(logInForm)
    this.displayTotalSpent(userTotalSpent, user)
    usernameHeading.innerText = `Welcome back, ${user.name}`
  },

  displayTotalSpent(userTotalSpent, user) {
    let totalSpent = 0
    user.bookings.forEach(booking => {
      totalSpent += booking.costPerNight
    })
    userTotalSpent.innerText = `Total spent with us: $${totalSpent.toFixed(2)}`
  },

  displayPastBookings(previousBookings) {
    const pastBookingsBlock = document.getElementById('js-booking-cards-container')
    this.show(pastBookingsBlock)
    this.hide(document.getElementById('find-rooms-form'))
    pastBookingsBlock.innerHTML = ""
    previousBookings.forEach(booking => {
      pastBookingsBlock.innerHTML += `
        <article class="past-booking" id="${booking.id}">
          <h3 id="${booking.id}">${booking.date}</h3>
          <p id="${booking.id}">${booking.roomType}</p>
          <p id="${booking.id}">${booking.numBeds} ${booking.bedSize}</p>
        </article>
      `
    })
  },

  displayAvailableRooms(bookedRooms, allRooms) {
    const pastBookingsBlock = document.getElementById('js-booking-cards-container')
    this.show(pastBookingsBlock)
    this.hide(document.getElementById('find-rooms-form'))
    pastBookingsBlock.innerHTML = ""
    allRooms.forEach(room => {
      if(!bookedRooms.includes(room.number)) {
        pastBookingsBlock.innerHTML += `
        <article class="past-booking" id="room${room.number}">
          <h3 id="room${room.number}">${room.roomType}</h3>
          <p id="room${room.number}">Room: ${room.number}</p>
          <p id="room${room.number}">${room.numBeds} ${room.bedSize}</p>
          <p id="room${room.number}">Cost per night: ${room.costPerNight}</p>
        </article>
        `
      }
    })
  },

  displayRoomInformation() {
    if (event.target.id.substring(0,4) === "room") {
      this.show()//book this room button)
    }
  },

  hide(...elements) {
    elements.forEach(elm => elm.classList.add('hidden'))
  },

  show(...elements) {
    elements.forEach(elm => elm.classList.remove('hidden'))
  },

}
