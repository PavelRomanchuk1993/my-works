import Student from './student.js'
// МАССИВ
const students = [
    new Student('Павел', 'Романчук', 'Андреевич', new Date(1993, 4, 14), 2021, 'Програмирования'),
    new Student('Екатерина', 'Дронова', 'Олеговна', new Date(1996, 6, 16), 2020, 'Иностранных языков'),
    new Student('Ирина', 'Комяк', 'Георгиевна', new Date(1969, 6, 27), 2019, 'Дефектологии'),
    new Student('Вячеслав', 'Романчук', 'Павлович', new Date(2019, 6, 5), 2021, 'Програмирования'),
    new Student('Людмила', 'Лагун', 'Георгиевна', new Date(1964, 1, 14), 2018, 'Педиатрия')
]
const $studentsList = document.getElementById('students-list'),
$studentsListTHAll = document.querySelectorAll('.studentsTable th')

let column = 'fio',
columnDir = true

// ПОЛУЧЕНИЕ TR Студента
function newStudentTR(student) {
    const $studentTR = document.createElement('tr'),
    $fioTD = document.createElement('td'),
    $birthDateTD = document.createElement('td'),
    $startTD = document.createElement('td'),
    $facultiTD = document. createElement('td')

    $fioTD.textContent = student.fio;
    $birthDateTD.textContent = student.getBirthDateString () + ' (' + student.getAge () + ' лет)';
    (student.getStart () <= 4) ? $startTD.textContent = student.start + ' - ' +  student.getFinish () + ' (' + student.getStart () + ' курс)': $startTD.textContent = student.start + ' - ' +  student.getFinish () + ' (' + 'Закончил)';

    $facultiTD.textContent = student.faculti;

    $studentTR.append($fioTD)
    $studentTR.append( $birthDateTD)
    $studentTR.append($startTD)
    $studentTR.append($facultiTD)

    return $studentTR;
}


//Получение СОРТИРОВКИ МАССИВА
function getSortStudents(prop, dir) {
    const studentsCopy = [...students]
    return studentsCopy.sort(function(studentA, studentB) {
        if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
        return - 1;
    })
}
// ФИЛЬТРАЦИЯ МАССИВА
function getFilterStudents(students, prop, value) {
  let result = [],
  studentsCopy = [...students]
  for (const item of studentsCopy ) {
    if(String(item[prop]).includes(value) == true) result.push(item)
  }
  return result
}


function renderFilt() {
  const list = document.querySelector('.table-body')
  list.innerHTML = ''

  const fioVal = document.getElementById('filter-form__fio-inp').value,
   facultiVal = document.getElementById('filter-form__faculte-inp').value,
   startVal = document.getElementById('filter-form__start-inp').value,
   finishVal = document.getElementById('filter-form__finish-inp').value

  let newArr = [...students]
  if(fioVal !== '') newArr = getFilterStudents(newArr, 'fio', fioVal)
  if(facultiVal !== '') newArr = getFilterStudents(newArr, 'faculti', facultiVal)
  if(startVal !== '') newArr = getFilterStudents(newArr, 'start', startVal)
  if(finishVal !== '') newArr = getFilterStudents(newArr, 'finish', finishVal)

  for (const student of newArr) {
    const $trTabl = document.createElement('tr'),
          $tdFIO = document.createElement('td'),
          $tdBirth = document.createElement('td'),
          $tdStart = document.createElement('td'),
          $tdFac = document.createElement('td')

          $tdFIO.textContent = student.fio;
          $tdBirth.textContent = student.getBirthDateString () + ' (' + student.getAge () + ' лет)';
          (student.getStart () <= 4) ? $tdStart.textContent = student.start + ' - ' +  student.getFinish () + ' (' + student.getStart () + ' курс)': $tdStart.textContent = student.start + ' - ' +  student.getFinish () + ' (' + 'Закончил)';
          $tdFac.textContent = student.faculti;

          list.append($trTabl)
          $trTabl.append($tdFIO)
          $trTabl.append($tdBirth)
          $trTabl.append($tdStart)
          $trTabl.append($tdFac)
  }
}

document.getElementById('filter-form').addEventListener('submit', function(event){
  event.preventDefault()
  renderFilt(students)
})
renderFilt(students)


//ОТРИСОВКА
function render() {
    let studentsCopy = [...students]

    studentsCopy = getSortStudents(column, columnDir)

    $studentsList.innerHTML = ''
    for (const student of studentsCopy) {
        $studentsList.append(newStudentTR(student))
    }
}

//СОБЫТИЕ СОРТИРОВКИ
$studentsListTHAll.forEach(elment => {
    elment.addEventListener('click', function() {
        column = this.dataset.column;
        columnDir = !columnDir
        render()
    })
})

//ВАЛИДАЦИЯ
function validation(form) {

function removeError(input) {
  const parent = input.parentNode;

  if(parent.classList.contains('error')){
    parent.querySelector('.error-lable').remove()
    parent.classList.remove('error')
  }
}
function createError(input, text) {
  const parent = input.parentNode;
  const errorLable = document.createElement('label')
  errorLable.classList.add('error-lable')
  errorLable.textContent = text

  parent.classList.add('error')

  parent.append(errorLable)
}

let result = true;
const allInputs = form.querySelectorAll('input');
for (const input of allInputs) {

  removeError(input)

  if (input.type === "number") {
    removeError(input)
    if (Number(input.value) < 2000) {
    removeError(input)
    createError(input, "Введите дату начиная с 2000 года")
    result = false
    } else if (Number(input.value) > new Date().getFullYear()) {
    removeError(input)
    createError(input, "Введите корректную дату")
    result = false
    }
  }

  if (input.type === "date") {
    removeError(input)
    const date = input.value.split('-');
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const fullDate = new Date(date[0], date[1]-1, date[2]);
    const year = date[0];

    if (year < 1900) {
      removeError(input)
      createError(input, "Выберете дату начиная с 01.01.1900 года")
      result = false
    } else if ((fullDate > today) || isNaN(fullDate))	 {
      removeError(input)
      createError(input, "Введите корректную дату")
      result = false
    }
  }

  if (input.dataset.minLength) {

    if (input.value.length < input.dataset.minLength) {
      removeError(input)
      createError(input, `Минимальное количество символов: ${input.dataset.minLength}`)
      result = false
    }
  }

  if(input.value.trim() =="") {
    removeError(input)
    createError(input, 'Поле не заполнено!')
    result = false
  }
}

return result
}

//ДОБАВЛЕНИЕ
document.getElementById('add-student').addEventListener('submit', function(event) {
    event.preventDefault();

  if(validation(this) == true) {
    alert('Форма проверена успешно!')

    students.push(new Student(
        document.getElementById('input-name').value.trim(),
        document.getElementById('input-surname').value.trim(),
        document.getElementById('input-lastname').value.trim(),
        new Date(document.getElementById('input-birthDate').value.trim()),
        Number(document.getElementById('input-trainingStart').value.trim()),
        document.getElementById('input-faculty').value,
    ))
  }
    render()
})

render()







