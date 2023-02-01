export default class Student {
    constructor (name, surname, lastname, birthDate, start, faculti) {
        this.name = name
        this.surname = surname
        this.lastname = lastname
        this.birthDate = birthDate
        this.start = start
        this.faculti = faculti
    }

getFIO () {
        return this.surname + ' ' + this.name + ' ' + this.lastname
        }

get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
    }
 getFinish () {
  const finish = this.start + 4;
        return finish;
        }
get finish() {
  const finish = this.start + 4;
        return finish;
}
getStart () {
        const currentTime = new Date()
        return currentTime.getFullYear() - this.start
        }
getBirthDateString () {
        const yyyy = this.birthDate.getFullYear();
        let mm = this.birthDate.getMonth() + 1;
        let dd = this.birthDate.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return dd + '.' + mm + '.' + yyyy;
        }
getAge () {
        const today = new Date();
        let age = today.getFullYear() - this.birthDate.getFullYear();
        let m = today.getMonth() - this.birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
            age--;
        }
        return age;
        }

}
