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
