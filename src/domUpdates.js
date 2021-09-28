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
    this.show(usernameHeading, pastBookingBtn, newBookingBtn)
    this.hide(logInForm)
    this.displayTotalSpent(user)
    usernameHeading.innerText = `Welcome back, ${user.name}`
  },

  displayTotalSpent(user) {
    const userTotalSpent = document.getElementById('js-user-total-spent')
    let totalSpent = 0
    user.bookings.forEach(booking => {
      totalSpent += booking.costPerNight
    })
    userTotalSpent.innerText = `Total spent with us: $${totalSpent.toFixed(2)}`
  },

  displayPastBookings(previousBookings) {
    const pastBookingsBlock = document.getElementById('js-booking-cards-container')
    const heading = document.getElementById('js-body-heading')
    const totalSpent = document.getElementById('js-user-total-spent')
    heading.innerText = 'Your previous bookings'
    this.show(pastBookingsBlock, heading, totalSpent)
    this.hide(document.getElementById('find-rooms-form'),
      document.getElementById('js-vacant-room-info'))
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

  displayAvailableRooms(bookedRooms, allRooms, roomType) {
    const pastBookingsBlock = document.getElementById('js-booking-cards-container')
    const heading = document.getElementById('js-body-heading')
    heading.innerText = 'Available Rooms'
    this.show(pastBookingsBlock, heading)
    this.hide(document.getElementById('find-rooms-form'),
      document.getElementById('js-vacant-room-info'),
      document.getElementById('js-user-total-spent'))
    pastBookingsBlock.innerHTML = ""
    if (bookedRooms.length >= 25) {
      pastBookingsBlock.innerHTML = `
      <p>Sorry, there are no rooms available on this date</p>
      `
      return
    }
    if (roomType !== "Any") {
      allRooms = allRooms.filter(room => {
        return room.roomType === roomType
      })
    }
    allRooms.forEach(room => {
      if(!bookedRooms.includes(room.number)) {
        pastBookingsBlock.innerHTML += `
        <article class="past-booking" id="room${room.number}">
          <h3>${room.roomType}</h3>
          <p>Room: ${room.number}</p>
          <p>${room.numBeds} ${room.bedSize}</p>
          <p>Cost per night: ${room.costPerNight}</p>
        </article>
        `
      }
    })
  },

  displayRoomInformation(roomArticle, apiData) {
    if (roomArticle.id.substring(0,4) === "room") {
      this.show(document.getElementById('js-book-room-btn'),
        document.getElementById('js-vacant-room-info'))
      this.hide(document.getElementById('js-booking-cards-container'),
        document.getElementById('js-body-heading'),
        document.getElementById('js-user-total-spent'))
      this.populateAvailableRoomInfo(roomArticle, apiData)
    } else {
      this.show(document.getElementById('js-vacant-room-info'))
      this.hide(document.getElementById('js-booking-cards-container'),
        document.getElementById('js-body-heading'),
        document.getElementById('js-book-room-btn'),
        document.getElementById('js-user-total-spent'))
        this.populatePreviousBookingInfo(roomArticle, apiData)
    }
  },

  populatePreviousBookingInfo(roomArticle, apiData) {
    const matchingBooking = apiData.bookings.find(booking => {
      return booking.id === roomArticle.id
    })
    const infoBlock = document.getElementById('js-vacant-room-details')
    const roomInfoHeading = document.getElementById('js-room-info-heading')
    roomInfoHeading.innerText = `Your booking from ${matchingBooking.date}`
    infoBlock.innerHTML = `
      <ul>
        <li>${matchingBooking.numBeds} ${matchingBooking.bedSize}</li>
        <li>Cost per Night: $${matchingBooking.costPerNight}</li>
        <li>${matchingBooking.roomType}</li>
      <ul>
    `
  },

  populateAvailableRoomInfo(roomArticle, apiData) {
    const roomNumber = parseInt(roomArticle.id.substring(4))
    const matchingRoom = apiData.rooms.find(room => {
      return room.number === roomNumber
    })
    const infoBlock = document.getElementById('js-vacant-room-details')
    const roomInfoHeading = document.getElementById('js-room-info-heading')
    roomInfoHeading.innerText = `Room ${roomNumber}`
    infoBlock.innerHTML = `
      <ul>
        <li>${matchingRoom.numBeds} ${matchingRoom.bedSize}</li>
        <li>Cost per Night: $${matchingRoom.costPerNight}</li>
        <li>${matchingRoom.roomType}</li>
      <ul>
    `

  },

  hide(...elements) {
    elements.forEach(elm => elm.classList.add('hidden'))
  },

  show(...elements) {
    elements.forEach(elm => elm.classList.remove('hidden'))
  },

}
