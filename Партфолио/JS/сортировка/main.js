
let arr = [
{
    name: 'Павел',
    age: 29
},
{
    name: 'Оля',
    age: 26
},
{
    name: 'Борис',
    age: 54
},
{
    name: 'Алеся',
    age: 3
},
]

const sortUser = (arr, prop, dir = false) => arr.sort((a,b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 1)
console.log(sortUser(arr, 'age', true));
