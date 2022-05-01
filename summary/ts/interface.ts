// 函数
interface A {
  (a: string, b: number): number;
}

let a: A;
a = function (x: string, y: number) {
  return Number(x + y);
};

// 可索引类型
interface StringArray {
  [index: number]: string;
}
let arr: StringArray;
arr = ['1', '2'];
let str: string = arr[0];

let brr: Array<string>;
brr = ['1', '2'];

let x: number = 1;
let y: null = null;
let z: string = '1';
x = y;

interface B {
  a: '1'
}