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

  hide(...elements) {
    elements.forEach(elm => elm.classList.add('hidden'))
  },

  show(...elements) {
    elements.forEach(elm => elm.classList.remove('hidden'))
  },

}
