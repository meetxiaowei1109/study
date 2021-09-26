let arr = [-1, -2, -3, 0, 0, 0, 0, 7]
function shuffle(arr) {
    let answer = [];
    let max = arr.length;
    for (let i = 0; i < max; i++) {
        let a = Math.floor(Math.random() * arr.length)
        answer.push(arr[a]);
        arr.splice(a, 1)
    }
    return answer;
}

function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
    console.log(this.name);
};
function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.sayAge = function () {
    console.log(this.age);
};

let n = '))';
let s = '123${n}123123,123';
let x = s.replace(/\$\{(.*?)\}/g, (match,a,c)=>{
    console.log(eval(a));
    return eval(a);
});
console.log(x);

// function find(arr){
//     let left = 0;
//     let right = arr.length - 1;
//     while(arr[left] < 0 || arr[right] >0){
//         if(arr[left] < 0){
//             left ++;
//         }
//         if(arr[right] > 0){
//             right --;
//         }
//     }
//     return [left, right];
// }


// function binarySearch(arr,target){
//     if(!arr.length) return -1;// 考虑边界值
//     if(arr.length == 1)return 0;//只有一位无需进入循环
//     let start = 0;
//     let end = arr.length-1;
//     while(start <= end){
//         let mid = Math.floor((start + end) / 2);//取中位数，可能除不尽向下取整
//         if(arr[mid] === target){
//             return mid;
//         }else if(target > arr[mid]){// 若目标值大于中位值
//             start = mid +1 //则说明目标值在更右侧，将初始下标右移至中位数右侧，再次循环
//         }else{// 若目标值小于中位值
//             end = mid -1 //则说明目标值在更左侧，将结束下标左移至中位数左侧，再次循环
//         }
//     }
//     return -1
// }

// function binarySearch(arr, num){
//     let start = 0;
//     let end = arr.length - 1;
//     while(start <= end){
//         let mid = Math.floor((start+end)/2);
//         if(arr[mid] === num){
//             return mid;
//         } else if(arr[mid] > num){
//             end = mid-1;
//         } else if(arr[mid] < num){
//             start = mid+1;
//         }
//     }
//     return -1;
// }