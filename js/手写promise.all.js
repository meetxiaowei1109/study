let a = Promise.resolve(123);
let b = Promise.resolve(23);
let c = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("x-ray");
  }, 2000);
});

Promise.mall = (arr) =>
  new Promise((resolve, reject) => {
    let index = 0;
    let answer = [];
    for (let i = 0; i < arr.length; i++) {
      arr[i]
        .then((res) => {
          answer.push(res);
          if (++index === arr.length) {
            resolve(answer);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });

Promise.mall([a, b, c])
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log(err);
  });
