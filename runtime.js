Promise.resolve(1)
  .then(x => {
    console.log('counter', 1);
    return x + 1;
  })
  .then(x => {
    console.log('counter', 2);
    throw x;
  })
  .then(x => {
    console.log('counter', 3);
    return console.log(x);
  })
  .catch(err => {
    console.log('counter', 4);
    return console.log(err);
  })
  .then(x => {
    console.log('counter', 5);
    return Promise.resolve(1);
  })
  .catch(err => {
    console.log('counter', 6);
    return console.log(err);
  })
  .then(x => {
    console.log('counter', 7);
    console.log(x);
  });
