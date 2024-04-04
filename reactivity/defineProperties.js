const person = {
  _originalName: 'Pavel', // приватное свойство
}

Object.defineProperty(person, 'name', {
  get() {
    console.log('Getting property name')
    return this._originalName
  },
  set(value) {
    console.log(`Setting property name to value ${value}`)
    this._originalName = value
  },
})

console.log(person.name) // 'Поучение имени свойства' и 'Павел'
person.name = 'Sergei' // Установка имени свойства в значение "Сергей"
