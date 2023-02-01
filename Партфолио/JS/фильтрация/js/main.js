const users = [
    {
        fio: 'Романчук Павел Андреевич',
        login: 'pavel_29',
        age:  29
    },
    {
        fio: 'Комяк Ирина Георгиевна',
        login: 'irina_69',
        age:  54
    },
    {
        fio: 'Дронова Екатерина Олеговна',
        login: 'dron',
        age:  26
    },
    {
        fio: 'Романчук Вячеслав Павлович',
        login: 'slava',
        age:  3
    },
    {
        fio: 'Лагун Людмила Георгиевна',
        login: 'lahun',
        age:  59
    },
    {
        fio: 'Загорская Наталья Олеговна',
        login: 'zag',
        age:  24
    },
]

  function filter(arr, prop, value) {
    let result = [],
    copy = [...arr]
    for (const item of arr) {
        if (String(item[prop]).includes(value) == true) result.push(item) 
    }
    return result
  }

function render(arr) {
    const list = document.querySelector('.users-list')
    list.innerHTML = ''
    
const fioVal = document.getElementById('inp-name').value,
ageVal = document.getElementById('inp-age').value

let newArr = [...arr]
if (fioVal !== '') newArr = filter(newArr, 'fio', fioVal)
if(ageVal !== '') newArr = filter (newArr, 'age', ageVal)

    for (const user of newArr) {
        const li = document.createElement('li')
        li.textContent = user.fio + ', Age: ' + user.age
        list.append(li) 
    }
}
document.getElementById('filter-form').addEventListener('submit', function(event) {
    event.preventDefault()
    render(users)
})
render(users)