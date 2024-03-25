const openBtn = document.querySelector('.popUpOpenBtn')
const popUp = document.querySelector('nav')

openBtn.addEventListener('click', () => {
  popUp.style.right = 0
})

window.addEventListener('click', (e) => {
  console.log(e.target.parentNode)

  if (
    e.target != popUp &&
    e.target != openBtn &&
    e.target.parentNode != openBtn
  ) {
    popUp.style.right = '-290px'
  }
})
