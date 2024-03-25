const exloreImgContainer = document.querySelector('.exloreImgContainer ')
const img = document.querySelectorAll('.exloreImgContainer img')

exloreImgContainer.addEventListener('click', (e) => {
  if (e.target.nodeName == 'IMG') {
    img.forEach((el) => el.classList.toggle('positionAbsolute'))
  }
})
