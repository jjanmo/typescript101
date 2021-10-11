export {};

// example1
let num = 10; // num은 숫자타입으로 타입 추론이 된다. → 타입 추론 : 타입을 정의하지 않아도 자동으로 타입이 정의된다.
let str = 'hello world';

// num = true; // 위에서 num은 숫자 타입으로 추론되었기때문에 불리언값이 할당되면 에러가 된다.
// str = ['hello', 'world']; // 마찬가지로 str은 위에서 문자열로 타입 추론되었기 때문에 배열 타입이 할당되면 에러가 된다

// example2
const num1 = 777;
const str1 = 'hello';
// let num2: typeof num1 = 888;
// const 로 타입을 선언하면 num1의 타입이 number가 아니라 777이 된다.
// → literal type
// → 그래서 num2에는 항상 777 만이 할당 가능하다.

// 위에서 본바와 같이 타입스크립트에서는 literal 타입을 지원한다. → 3가지 string, number, boolean
// let과 const의 차이로 인해 타입 추론의 규칙이 달라진다.(아래 예제는 let인 경우)

// examplet3
let num3 = 100;
let num4: typeof num3 = 666;
// typeof num3은 우리가 일반적으로 생각하는 number가 되어서 num4에는 숫자형 값을 할당할 수 있다.

/*
✅ 변수를 let으로 선언하냐, const로 선언하냐에 따라서 타입 추론하는 원칙이 달라진다.
let으로 선언 : 값의 타입으로 추론 → 우리가 일반적으로 생각하는 원칙
const로 선언 : 값을 타입으로 추론 → literal type
*/
