// let work = new Worker('./work.js');


function A() {
  
}

let a = new A();
A.prototype = a;
let b = new A();
console.log(A.prototype === b.__proto__) // true

console.log(a.__proto__ === b.__proto__) // true
console.log(a === b.__proto__) // false
