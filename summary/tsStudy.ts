let ww1: boolean = true;
let ww2: number = 1;
let ww3: string = '1';
let ww4: null = null;
let ww5: undefined = undefined;
const ww6 = (param: unknown) => param as number / 2;
const ww7 = (param: any) => param / 2;
const ww8 = (): void => { };
const ww9 = (): never => { throw new Error() };
const ww10: number[] = []; ww10.push(1); //数组里面只能存同类型的元素
const ww11: [number, string] = [1, '2']; ww11.push('3');
const ww12 = (a: number, c: boolean = true, b?: string): string => '1'; ww12(1, undefined, '2');
interface Type {name: string}
enum Direction {up,down,left,right}
// console.log(Direction.up, Direction[0])
let ww13: number | string = 1; ww13 = '2'; //联合类型
let ww14: Type & {age: number} = {name:'ww', age:3}; //交叉类型
type arrItem = string | number | boolean;
const ww15: (string | number)[] = [1, '2', 3];
const ww16: arrItem[] = [1, '2', 3, true];