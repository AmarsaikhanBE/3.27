let countNumber = Number(localStorage.getItem('cNum'))
count.textContent = countNumber
let intervalFuntion = null
toDoList.innerHTML = localStorage.getItem('listItems')
if (toDoList.innerHTML != '') {
    toDoList.querySelector('div:last-child div').style.top = '0'
}
addItem.addEventListener('click', () => {
    if (text.value != '') {
        const lstCon = document.createElement('div')
        const lstBox = document.createElement('div')
        const textBox = document.createElement('p')
        const checkBtn = document.createElement('button')
        const removeBtn = document.createElement('button')
        textBox.textContent = text.value
        checkBtn.classList.add('chck-btn')
        checkBtn.innerHTML = '&#x2714'
        removeBtn.classList.add('rmv-btn')
        removeBtn.innerHTML = '&#x1F5D1'
        lstBox.append(textBox)
        lstBox.append(checkBtn)
        lstBox.append(removeBtn)
        lstCon.append(lstBox)
        toDoList.append(lstCon)
        let i = 30
        const frame = () => {
            if (i == 0) {
                clearInterval(intervalFuntion)
            } else {
                i--
                lstBox.style.top = i + 'px'
            }
        }
        intervalFuntion = setInterval(frame, 10);
        countNumber++
        localStorage.setItem('cNum', countNumber)
        count.textContent = countNumber
    }
    text.value = ''
    localStorage.setItem('listItems', toDoList.innerHTML)
})
document.querySelector('.import input').addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        event.preventDefault()
        document.querySelector('#addItem').click()
    }
})
toDoList.addEventListener('click', (event) => {
    // console.log(event.target)
    if (event.target.className == 'chck-btn' || event.target.className == 'chck-btn active') {
        event.target.classList.toggle('active')
        event.target.parentElement.querySelector('p').classList.toggle('checked')
    } else if (event.target.className == 'rmv-btn') {
        const removingItem = event.target.parentElement.parentElement
        let i = 0
        const remo = () => {
            i--
            removingItem.style.height = eval(30 + i) + 'px'
            removingItem.querySelector('div').style.top = i + 'px'
        }
        intervalFuntion = setInterval(remo, 10)
        setTimeout(() => {
            removingItem.remove()
            localStorage.setItem('listItems', toDoList.innerHTML)
        }, 350)
        countNumber--
        localStorage.setItem('cNum', countNumber)
        count.textContent = countNumber
    }
})