function fn() {
  console.log(2);
  return new Promise((resolve, reject) => {
    console.log(3);
    resolve(1);
    console.log(9);
  })
}

async function fn1() {
  console.log(7);
  await fn();
  console.log(1);
}

console.log(4);
fn1();
setTimeout(() => {
  console.log(6);
})
console.log(8);