const out = document.querySelector('.customInputValue')
const date = []

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const drowDate = () => {
  const value = `${date[0]} - ${date[1]}`
  out.textContent = `${date[0]} - ${date[1]}`

  return value
}

class Cal {
  //Сохраняем идентификатор div
  constructor(divId) {
    this.divId = divId

    // Дни недели с понедельника
    this.DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чтв', 'Птн', 'Суб', 'Вск']

    // Месяцы начиная с января
    this.Months = months

    this.currMonth = new Date().getMonth('9')
    this.currYear = new Date().getFullYear('22')
    this.currDay = new Date().getDate('3')
  }

  nextMonth() {
    if (this.currMonth == 11) {
      this.currMonth = 0
      this.currYear = this.currYear + 1
    } else {
      this.currMonth = this.currMonth + 1
    }
    this.showcurr()
  }

  previousMonth() {
    if (this.currMonth == 0) {
      this.currMonth = 11
      this.currYear = this.currYear - 1
    } else {
      this.currMonth = this.currMonth - 1
    }
    this.showcurr()
  }

  showcurr() {
    this.showMonth(this.currYear, this.currMonth)
  }

  showMonth(y, m) {
    // Первый день недели в выбранном месяце
    ;(firstDayOfMonth = new Date(y, m, 7).getDay()),
      // Последний день выбранного месяца
      (lastDateOfMonth = new Date(y, m + 1, 0).getDate()),
      // Последний день предыдущего месяца
      (lastDayOfLastMonth =
        m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate())

    let html = '<table>'

    // Запись выбранного месяца и года
    html += '<thead><tr>'
    html +=
      '<td colspan="7" class="monthAndYead">' +
      this.Months[m] +
      ' ' +
      y +
      '</td>'
    html += '</tr></thead>'

    // заголовок дней недели
    html += '<tr class="days">'
    for (let i = 0; i < this.DaysOfWeek.length; i++) {
      html += '<td>' + this.DaysOfWeek[i] + '</td>'
    }
    html += '</tr>'

    // Записываем дни
    let i = 1
    do {
      const dow = new Date(y, m, i).getDay()

      // Начать новую строку в понедельник
      if (dow == 1) {
        html += '<tr>'
      }

      // Если первый день недели не понедельник показать последние дни предидущего месяца
      else if (i == 1) {
        html += '<tr>'
        let k = lastDayOfLastMonth - firstDayOfMonth + 1
        for (let j = 0; j < firstDayOfMonth; j++) {
          html += '<td class="not-current">' + k + '</td>'
          k++
        }
      }

      // Записываем текущий день в цикл
      const chk = new Date()
      const chkY = chk.getFullYear()
      const chkM = chk.getMonth()

      if (
        chkY == this.currYear &&
        chkM == this.currMonth &&
        i == this.currDay
      ) {
        html += '<td class="today">' + i + '</td>'
      } else {
        html += '<td class="normal">' + i + '</td>'
      }
      // закрыть строку в воскресенье
      if (dow == 0) {
        html += '</tr>'
      }
      // Если последний день месяца не воскресенье, показать первые дни следующего месяца
      else if (i == lastDateOfMonth) {
        let k = 1
        for (dow; dow < 7; dow++) {
          html += '<td class="not-current">' + k + '</td>'
          k++
        }
      }

      i++
    } while (i <= lastDateOfMonth)

    // Конец таблицы
    html += '</table>'

    // Записываем HTML в div
    document.querySelector(`.${this.divId}`).innerHTML = html
  }

  getThisDate() {
    const myDate = {
      day: this.currDay,
      month: this.Months[this.currMonth],
      year: this.currYear,
    }
    return myDate
  }
}

// При загрузке окна
window.onload = function () {
  // Начать календарь
  const c = new Cal('divCal')
  c.showcurr()

  // Привязываем кнопки «Следующий» и «Предыдущий»
  document.querySelector('.btnNext').onclick = function () {
    c.nextMonth()
  }
  document.querySelector('.btnPrev').onclick = function () {
    c.previousMonth()
  }

  const c2 = new Cal('divCal2')

  c2.showcurr()

  // Привязываем кнопки «Следующий» и «Предыдущий»
  document.querySelector('.btnNext2').onclick = function () {
    c2.nextMonth()
  }
  document.querySelector('.btnPrev2').onclick = function () {
    c2.previousMonth()
  }

  const today = document.querySelector('.today')

  date[0] = `${today.textContent} ${c.getThisDate()['month']} ${
    c.getThisDate()['year']
  }`
  date[1] = `${today.textContent} ${c2.getThisDate()['month']} ${
    c2.getThisDate()['year']
  }`

  const divCal = document.querySelector('.divCal')
  const divCal2 = document.querySelector('.divCal2')

  drowDate()

  function addEvent(el, pos, instance) {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('normal')) {
        const monthAndYead = document.querySelectorAll('.monthAndYead')[pos]
        date[pos] = `${e.target.textContent} ${monthAndYead.textContent}`
      }
      if (e.target.classList.contains('not-current')) {
        if (+e.target.textContent < 10) {
          instance.nextMonth()
        } else {
          instance.previousMonth()
        }
        const monthAndYead = document.querySelectorAll('.monthAndYead')[pos]
        date[pos] = `${e.target.textContent} ${monthAndYead.textContent}`
      }
      drowDate()
    })
  }

  addEvent(divCal, 0, c)
  addEvent(divCal2, 1, c2)
}

const calendar = document.querySelector('.customDateInput')
const dataSelect = document.querySelector('.dataSelect')
const calendarWrapper = document.querySelectorAll('.calendar-wrapper')
const btn = document.querySelector('.dataBtn')
const dataTripTitle = document.querySelector('.dataTripTitle')

calendarWrapper.forEach((el) =>
  el.addEventListener('click', (e) => {
    e.stopPropagation()
  }),
)

calendar.addEventListener('click', (e) => {
  e.stopPropagation()
})

dataSelect.addEventListener('click', (e) => {
  calendar.classList.toggle('active')
  e.stopPropagation()
})

window.addEventListener('click', (e) => {
  e.stopPropagation()
  if (calendar.classList.contains('active')) calendar.classList.remove('active')
})

const fixdate = () => {
  const date = drowDate().split(' ')
  date[1] = months.indexOf(date[1]) + 1
  date[5] = months.indexOf(date[5]) + 1
  const numDate = date
    .join(' ')
    .split('-')
    .map((elem) =>
      elem
        .split(' ')
        .filter((e) => e)
        .map((el) => (+el < 10 ? `0${el}` : el))
        .join(':'),
    )
    .join(' - ')
  return numDate
}

btn.addEventListener('click', () => {
  calendar.classList.remove('active')
  dataTripTitle.textContent = fixdate()
})
