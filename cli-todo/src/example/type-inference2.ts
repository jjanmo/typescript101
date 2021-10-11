export {};

// 객체의 타입 추론

// example1
const arr = [1, 2, 3, 4];
const [n1, n2, n3, n4] = arr;
// arr.push('5'); // error : arr의 타입이 number[]으로 타입 추론됨

// example2
const arr1 = [10, 'hello', false];
const [first, second, third] = arr1; // (string | number | boolean)[]으로 타입 추론됨
arr1.push(777);
arr1.push('world');
arr1.push(true);
// → 모두 가능!!

// example3
const obj = { id: 17, name: 'jjamo', age: '17' };
const { id, name, age } = obj;
// console.log(id === age); // error : different type
