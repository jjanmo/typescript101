/*
함수의 타입 호환성

함수 타입 A가 함수 타입 B로 할당 가능하기 위한 조건
1. A의 매개변수의 개수가 B의 매개변수 개수보다 적어야 한다.
2. 같은 위치의 매개변수에 대해 B의 매개변수가 A의 매개변수로 할당 가능해야 한다.
3. A의 반환값은 B의 반환값으로 할당 가능해야 한다.

→ 사실 위의 글로서 함수의 타입 호환성을 이해하는 것보다 느낌적인 느낌을 찾는 것이 중요하다.
→ ✅ Tip 함수의 타입 호환성은 실제로 함수를 호출한다고 가정했을 때, 문제가 나타나지 않아야 호환이 가능하다.
*/

export {};

type F1 = (a: number, b: string) => string;
type F2 = (a: number, b: string | number) => string;
type F3 = (a: number) => string;
type F4 = (a: number) => number | string;

let f1: F1 = (a, b) => `${a} ${b.length}`;
let f2: F2 = (a, b) => `${a} ${b}`;
let f3: F3 = a => `${a}`;
let f4: F4 = a => (a < 10 ? a : 'too big');

// 조건 1
f1 = f3;
// → f1(1, 2)를 호출하면 f3 함수가 실행되는 것 : 아무런 문제 없이 실행된다.
// f3 = f1; // error
// f3(10)을 호출하면 f1의 함수가 실행되는 것과 같다.
// → 이 경우 파라미터 b가 undefined이 되기때문에 undefined.length로 에러나 발생한다.

// 조건 2
f1 = f2;
// f2 = f1; // error
// f2(10, 11) 를 실행하면, 결국 f1(10, 11)이 실행되는데, 그렇게 되면 11.length에서 에러가 나게 된다.
// → f2의 파라미터 b가 f1의 파라미터 b에 할당가능하지 않기 때문에 함수 f1은 함수 f2로 할당할 수 없다.

// 조건 3
f4 = f3; // f3의 리턴타입이 f4의 리턴타입에 할당 가능
// f3 = f4; // error
// f4의 리턴타입이 f3의 리턴타입에 할당 불가능
// → f4의 실행결과 리턴타입으로 number가 나올수 있지만, f3의 리턴타입으로는 숫자가 불가능하다.
