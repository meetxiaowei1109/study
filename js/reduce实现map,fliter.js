let arr = [3, 12, 5, 3, 7, 4, 8, 3, 9, 1];

Array.prototype.mmap = function (callback) {
  let answer = [];
  this.reduce((oldValue, newValue) => {
    answer.push(callback(newValue));
  }, 0);
  return answer;
};
let a = arr.mmap((e) => e * 2);
console.log(a);

let arr = [3, 2, 1];
Array.prototype.mfilter = function (callback) {
  let answer = [];
  this.reduce((oldValue, newValue) => {
    callback(newValue) && answer.push(newValue);
  }, 0);
  return answer;
};
let a = arr.mfilter((e) => e != 2);
console.log(a);
