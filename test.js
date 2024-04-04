let i = 10;
const array = [];

while (i--) {
  array.push(function() {
    return i + i;
  });
}

console.log([
  array[0](), // -2
  array[1](), // -2
])
